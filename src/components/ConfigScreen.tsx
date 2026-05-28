import { useState, useRef } from 'react'
import type { MuseumConfig, AvatarConfig, Vibe, Weather, Frame, Music, Gender, Hair, HairColor, Outfit, Accessory } from '../types'
import { DEFAULT_CONFIG } from '../lib/defaults'
import { VIBE_LABELS, WEATHER_LABELS, FRAME_LABELS, MUSIC_LABELS } from '../lib/themes'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ScrollArea } from './ui/scroll-area'
import ChibiCanvas from './ChibiCanvas'
import LivePreview from './LivePreview'

interface Props { onStart: (cfg: MuseumConfig) => void }

const PHOTO_HEADERS = [
  'O Início de Tudo','Momentos Felizes','Cumplicidade','Aventuras Juntos','O Apoio Mútuo',
  'Carinho Puro','Conquistas','Abraço de Alma','Promessa de Amor','O Nosso Futuro',
]

function AvatarEditor({ label, value, onChange }: {
  label: string; value: AvatarConfig; onChange: (v: AvatarConfig) => void
}) {
  const set = <K extends keyof AvatarConfig>(k: K, v: AvatarConfig[K]) => onChange({ ...value, [k]: v })
  const sel = (id: string, val: string, opts: [string,string][], cb: (v: string) => void) => (
    <div className="space-y-1">
      <Label className="text-[10px] font-bold tracking-widest uppercase text-white/30">{id}</Label>
      <Select value={val} onValueChange={cb}>
        <SelectTrigger className="h-8 text-base md:text-xs inp-dark border-0 border-b rounded-none focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#0f0f1a] border-white/10 text-white">
          {opts.map(([v,l]) => <SelectItem key={v} value={v} className="focus:bg-white/10">{l}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
  return (
    <div className="glass rounded-xl p-4 space-y-3">
      <p className="text-xs font-semibold text-rose-300/80">{label}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {sel('Estilo', value.gender, [['male','🧑 Masculino'],['female','👧 Feminino']], v => set('gender', v as Gender))}
        {sel('Cabelo', value.hair, [['short','Curto'],['long','Longo'],['fringe','Franja'],['none','Careca']], v => set('hair', v as Hair))}
        {sel('Cor', value.hairColor, [['black','⚫ Preto'],['brown','🟤 Castanho'],['blonde','🟡 Loiro'],['red','🟠 Ruivo'],['pink','🌸 Rosa']], v => set('hairColor', v as HairColor))}
        {sel('Roupa', value.outfit, [['blue','🔵 Azul'],['red','🔴 Vermelho'],['pink','💗 Rosa'],['green','🟢 Verde'],['purple','🟣 Roxo'],['black','⚫ Preto']], v => set('outfit', v as Outfit))}
        <div className="col-span-2">
          {sel('Acessório', value.accessory, [['none','❌ Nenhum'],['crown','👑 Coroa'],['cap','🧢 Boné'],['halo','👼 Auréola'],['glasses','🕶️ Óculos']], v => set('accessory', v as Accessory))}
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="section-line mb-5">
      <span className="text-[10px] font-black tracking-widest text-rose-400/60 uppercase shrink-0">{num}</span>
      <span className="text-sm font-semibold text-white/70 shrink-0">{title}</span>
    </div>
  )
}

export default function ConfigScreen({ onStart }: Props) {
  const [cfg, setCfg] = useState<MuseumConfig>(DEFAULT_CONFIG)
  const [openPhoto, setOpenPhoto] = useState<number>(0)
  const fileRefs = useRef<(HTMLInputElement | null)[]>([])

  const set = <K extends keyof MuseumConfig>(k: K, v: MuseumConfig[K]) =>
    setCfg(c => ({ ...c, [k]: v }))

  const setPhoto = (i: number, field: 'title' | 'desc', v: string) =>
    setCfg(c => { const p = [...c.photos]; p[i] = { ...p[i], [field]: v }; return { ...c, photos: p } })

  const handlePhotoFile = (i: number, file: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = e =>
      setCfg(c => { const p = [...c.photos]; p[i] = { ...p[i], dataUrl: e.target?.result as string }; return { ...c, photos: p } })
    reader.readAsDataURL(file)
  }

  const setIntroText = (i: number, v: string) =>
    setCfg(c => { const t = [...c.introTexts]; t[i] = v; return { ...c, introTexts: t } })

  const inp = 'inp-dark rounded-lg h-10 text-base md:text-sm w-full px-3'
  const ta = 'inp-dark rounded-lg text-base md:text-sm w-full px-3 py-2.5 resize-none'

  const selField = (
    label: string,
    val: string,
    opts: Record<string,string>,
    cb: (v: string) => void,
  ) => (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-bold tracking-widest uppercase text-white/30">{label}</Label>
      <Select value={val} onValueChange={cb}>
        <SelectTrigger className="inp-dark h-10 text-base md:text-sm rounded-lg border-0 border-b focus:ring-0 [&>span]:text-white/80">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#0f0f1a] border-white/10 text-white/90 z-50">
          {Object.entries(opts).map(([v,l]) => (
            <SelectItem key={v} value={v} className="focus:bg-white/8 text-xs">{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: '#080810' }}
    >
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '-20%', left: '-15%',
            background: 'radial-gradient(circle, rgba(233,30,140,0.06) 0%, transparent 70%)',
            animation: 'spin-slow 40s linear infinite',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            bottom: '-20%', right: '-15%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
            animation: 'spin-slow 55s linear infinite reverse',
          }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Top header bar */}
        <header className="flex-none px-6 pt-6 pb-4 animate-fade-up animation-fill-both">
          <div className="flex items-start justify-between max-w-6xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-rose-400 animate-pulse-heart inline-block text-lg">❤</span>
                <span className="text-[10px] font-black tracking-[0.25em] uppercase text-white/30">Studio de Memórias</span>
              </div>
              <h1
                className="text-2xl font-bold text-white leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Nosso Museu Virtual
              </h1>
              <p className="text-white/35 text-xs mt-1">Crie um álbum romântico cinematográfico e interativo</p>
            </div>
            <button
              onClick={() => onStart(cfg)}
              className="btn-gradient hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shrink-0 mt-1"
            >
              <span>Entrar no Museu</span>
              <span>→</span>
            </button>
          </div>
        </header>

        {/* Thin separator */}
        <div className="flex-none mx-6 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Main split layout */}
        <div className="flex-1 flex overflow-hidden max-w-6xl mx-auto w-full gap-0">

          {/* LEFT: Form */}
          <ScrollArea className="flex-1 h-full">
            <div className="px-6 py-6 space-y-10 pb-24">

              {/* 01 — O Casal */}
              <section className="animate-fade-up animation-fill-both stagger-1">
                <SectionHeader num="01" title="O Casal" />
                <div className="space-y-5">
                  <div className="grid grid-cols-[1fr_28px_1fr] items-end gap-2">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Seu Nome</Label>
                      <input
                        className={inp}
                        value={cfg.partner1}
                        onChange={e => set('partner1', e.target.value)}
                        placeholder="Ex: João"
                      />
                    </div>
                    <div className="flex items-center justify-center pb-2.5">
                      <span className="text-rose-400 font-bold text-base">&</span>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Seu Amor</Label>
                      <input
                        className={inp}
                        value={cfg.partner2}
                        onChange={e => set('partner2', e.target.value)}
                        placeholder="Ex: Maria"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Data do Início do Relacionamento</Label>
                    <input
                      type="date"
                      className={inp}
                      value={cfg.startDate}
                      onChange={e => set('startDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold tracking-widest uppercase text-white/30">Carta de Amor Secreta</Label>
                    <textarea
                      className={`${ta} h-24`}
                      value={cfg.loveLetter}
                      onChange={e => set('loveLetter', e.target.value)}
                      placeholder="Escreva uma mensagem romântica profunda que será revelada como envelope selado..."
                    />
                  </div>
                </div>
              </section>

              {/* Thin divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />

              {/* 02 — Customização */}
              <section className="animate-fade-up animation-fill-both stagger-2">
                <SectionHeader num="02" title="Tema & Estética" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selField('Vibe / Estilo', cfg.vibe, VIBE_LABELS, v => set('vibe', v as Vibe))}
                  {selField('Atmosfera', cfg.weather, WEATHER_LABELS, v => set('weather', v as Weather))}
                  {selField('Molduras dos Quadros', cfg.frame, FRAME_LABELS, v => set('frame', v as Frame))}
                  {selField('Trilha Sonora', cfg.music, MUSIC_LABELS, v => set('music', v as Music))}
                </div>

                {cfg.music === 'custom' && (
                  <div className="mt-4 p-4 glass rounded-xl space-y-4 border border-rose-500/20 animate-fade-up animation-fill-both">
                    <p className="text-xs font-semibold text-rose-300">🎵 Configurar Música Personalizada</p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {/* Option A: Direct MP3 URL */}
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold tracking-widest uppercase text-white/40">Link Direto da Música (.MP3)</Label>
                        <input
                          type="text"
                          className={inp}
                          value={cfg.customMusicUrl || ''}
                          onChange={e => set('customMusicUrl', e.target.value)}
                          placeholder="Ex: https://meusite.com/musica.mp3"
                        />
                        <p className="text-[9px] text-white/30 leading-normal">
                          💡 **Recomendado para Compartilhar**: Cole um link direto para um arquivo MP3 público (ex: do Google Drive público, Dropbox com dl=1, ou Archive.org). Isso permite que a música toque no celular de quem receber o link!
                        </p>
                      </div>

                      {/* Option B: Local MP3 upload */}
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold tracking-widest uppercase text-white/40">Ou Enviar Arquivo Local (.MP3)</Label>
                        <div className="flex gap-3 items-center">
                          <button
                            type="button"
                            onClick={() => document.getElementById('audio-upload-input')?.click()}
                            className="px-4 py-2 border border-dashed border-white/20 rounded-lg text-xs hover:border-rose-400 hover:text-rose-400 transition-all cursor-pointer bg-white/3 text-white"
                          >
                            📁 {cfg.customMusicDataUrl ? '🔄 Trocar MP3 Enviado' : 'Carregar MP3 Local'}
                          </button>
                          <input
                            id="audio-upload-input"
                            type="file"
                            accept="audio/mp3,audio/*"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onload = ev => {
                                  set('customMusicDataUrl', ev.target?.result as string)
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                          />
                          {cfg.customMusicDataUrl && (
                            <span className="text-[10px] text-green-400 flex items-center gap-1">
                              ✓ MP3 Carregado ({Math.round(cfg.customMusicDataUrl.length * 0.75 / 1024 / 1024 * 10) / 10} MB)
                            </span>
                          )}
                        </div>
                        <p className="text-[9px] text-white/30 leading-normal">
                          ⚠️ **Aviso de Tamanho**: Arquivos de áudio são muito grandes. Ao usar um arquivo local, ele funcionará perfeitamente **neste computador**, mas não poderá ser anexado ao link de compartilhamento. Para links compartilhados, recomendamos usar o "Link Direto" acima!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <div className="h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />

              {/* 03 — Chibis */}
              <section className="animate-fade-up animation-fill-both stagger-3">
                <SectionHeader num="03" title="Seus Chibis" />
                <div className="mb-4 flex justify-start">
                  <div className="glass rounded-2xl p-3 inline-flex flex-col items-center gap-1">
                    <ChibiCanvas p1={cfg.p1} p2={cfg.p2} />
                    <p className="text-[10px] text-white/30">Preview do casal</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AvatarEditor label="👤 Seu Boneco" value={cfg.p1} onChange={v => set('p1', v)} />
                  <AvatarEditor label="💖 Boneco do Seu Amor" value={cfg.p2} onChange={v => set('p2', v)} />
                </div>
              </section>

              <div className="h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />

              {/* 04 — Fotos */}
              <section className="animate-fade-up animation-fill-both stagger-4">
                <SectionHeader num="04" title="Fotos & Declarações — 10 Quadros" />
                <p className="text-xs text-white/35 mb-4 -mt-2">
                  Faça upload de fotos e escreva legendas românticas. A sala aberta será exibida no preview.
                </p>
                <div className="space-y-2">
                  {cfg.photos.map((photo, i) => {
                    const isOpen = openPhoto === i
                    return (
                      <div
                        key={i}
                        className={`glass rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'glass-rose' : ''}`}
                      >
                        <button
                          className="w-full px-4 py-3 flex items-center justify-between text-left transition-colors hover:bg-white/3"
                          onClick={() => setOpenPhoto(isOpen ? -1 : i)}
                        >
                          <div className="flex items-center gap-3">
                            {photo.dataUrl ? (
                              <img
                                src={photo.dataUrl}
                                className="w-8 h-8 rounded object-cover"
                                alt=""
                              />
                            ) : (
                              <div className="w-8 h-8 rounded flex items-center justify-center text-sm"
                                style={{ background: 'rgba(255,255,255,0.05)' }}>
                                📷
                              </div>
                            )}
                            <div>
                              <span className="text-xs font-semibold text-white/70">Sala {i + 1}</span>
                              <span className="text-white/30 mx-2">·</span>
                              <span className="text-xs text-white/40">{PHOTO_HEADERS[i]}</span>
                            </div>
                          </div>
                          <span
                            className="text-white/25 text-xs transition-transform duration-300"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                          >
                            ▾
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 space-y-3 border-t border-white/6 pt-3 animate-fade-up animation-fill-both">
                            <div className="grid grid-cols-[100px_1fr] gap-3 items-start">
                              <button
                                onClick={() => fileRefs.current[i]?.click()}
                                className="h-[80px] rounded-lg border border-dashed border-white/15 flex flex-col items-center justify-center gap-1 text-[10px] text-white/30 hover:border-rose-400/50 hover:text-rose-400 transition-all duration-200 overflow-hidden cursor-pointer"
                                style={{ background: photo.dataUrl ? `url(${photo.dataUrl}) center/cover` : 'rgba(255,255,255,0.02)' }}
                              >
                                {!photo.dataUrl && (
                                  <>
                                    <span className="text-xl">📸</span>
                                    <span>Foto</span>
                                  </>
                                )}
                              </button>
                              <input
                                ref={el => { fileRefs.current[i] = el }}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => handlePhotoFile(i, e.target.files?.[0] ?? null)}
                              />
                              <div className="space-y-2">
                                <input
                                  className={`${inp} h-8 text-xs`}
                                  value={photo.title}
                                  onChange={e => setPhoto(i, 'title', e.target.value)}
                                  placeholder="Título do quadro"
                                />
                                <textarea
                                  className={`${ta} h-[52px] text-xs`}
                                  value={photo.desc}
                                  onChange={e => setPhoto(i, 'desc', e.target.value)}
                                  placeholder="Declaração romântica..."
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>

              <div className="h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />

              {/* 05 — Intro */}
              <section className="animate-fade-up animation-fill-both stagger-5">
                <SectionHeader num="05" title="Introdução Cinematográfica" />
                <p className="text-xs text-white/35 mb-4 -mt-2">
                  6 mensagens que surgem em fade-in suave antes de entrar na galeria.
                </p>
                <div className="space-y-3">
                  {cfg.introTexts.map((t, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-white/20 w-4 shrink-0">{i + 1}</span>
                      <input
                        className={`${inp} flex-1`}
                        value={t}
                        onChange={e => setIntroText(i, e.target.value)}
                        placeholder={`Mensagem ${i + 1}...`}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA mobile */}
              <div className="md:hidden">
                <button
                  onClick={() => onStart(cfg)}
                  className="btn-gradient w-full py-4 rounded-2xl text-white font-bold text-base animate-glow-pulse"
                >
                  ❤️ Entrar no Nosso Museu Virtual
                </button>
              </div>
            </div>
          </ScrollArea>

          {/* Vertical separator */}
          <div className="hidden md:block flex-none w-px bg-gradient-to-b from-transparent via-white/8 to-transparent my-4" />

          {/* RIGHT: Live Preview */}
          <div
            className="hidden md:flex flex-none w-[360px] flex-col p-6 animate-slide-right animation-fill-both"
            style={{ animationDelay: '0.2s' }}
          >
            <LivePreview cfg={cfg} activePhoto={openPhoto >= 0 ? openPhoto : 0} />

            {/* CTA desktop */}
            <div className="mt-4">
              <button
                onClick={() => onStart(cfg)}
                className="btn-gradient w-full py-4 rounded-2xl text-white font-bold text-sm animate-glow-pulse"
              >
                ❤️ Entrar no Museu
              </button>
              <p className="text-center text-[10px] text-white/20 mt-2">
                Toque para entrar · O amor espera por vocês
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
