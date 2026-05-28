import { useState, useRef, useEffect, useCallback } from 'react'
import type { MuseumConfig } from '../types'
import { VIBE_THEMES, FRAME_STYLES, FRAME_SHADOWS, FRAME_EXTRA } from '../lib/themes'
import { useTimer } from '../hooks/useTimer'
import { audioManager } from '../lib/audio'
import { serializeConfig } from '../lib/sharing'
import { Dialog, DialogContent } from './ui/dialog'
import ParticleCanvas from './ParticleCanvas'
import ChibiCanvas from './ChibiCanvas'
import VibeScenery from './VibeScenery'
import LoveLetterModal from './LoveLetterModal'
import QuizModal from './QuizModal'
import FrameOverlay from './FrameOverlay'

const ROOM_EMOJIS = ['🌹','💫','🎭','🗺️','🏡','🌸','⭐','🌙','💍','🏛️']

interface Props { cfg: MuseumConfig; onExit: () => void }

export default function MuseumGallery({ cfg, onExit }: Props) {
  const [slide, setSlide] = useState(0)
  const [letterOpen, setLetterOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [soundOn, setSoundOn] = useState(!audioManager.getIsMuted())
  const [hintsVisible, setHintsVisible] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const dragStart = useRef<number | null>(null)
  const timer = useTimer(cfg.startDate)
  const theme = VIBE_THEMES[cfg.vibe]
  const total = cfg.photos.length

  useEffect(() => {
    const t = setTimeout(() => setHintsVisible(false), 4500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (slide === total - 1) {
      setTimeout(() => setQuizOpen(true), 1500)
    }
  }, [slide, total])

  const goTo = useCallback((n: number) => {
    if (transitioning) return
    const target = Math.max(0, Math.min(total - 1, n))
    if (target === slide) return
    setTransitioning(true)
    // Toca o sino sintetizado mágico ao trocar de slide/sala
    audioManager.playProximityChime()
    setTimeout(() => {
      setSlide(target)
      setTransitioning(false)
    }, 350)
  }, [slide, total, transitioning])

  const prev = () => goTo(slide - 1)
  const next = () => goTo(slide + 1)

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
  }, [slide]) // eslint-disable-line

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  const onPointerDown = (e: React.PointerEvent) => { dragStart.current = e.clientX }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return
    const delta = dragStart.current - e.clientX
    if (Math.abs(delta) > 40) {
      delta > 0 ? next() : prev()
    }
    dragStart.current = null
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const w = window.innerWidth
    const h = window.innerHeight
    const relX = (e.clientX - w / 2) / (w / 2)
    const relY = (e.clientY - h / 2) / (h / 2)
    setTilt({ x: relX * 12, y: -relY * 12 })
  }

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  // Alterna o áudio entre mudo e ativo de forma suave
  const handleSoundToggle = () => {
    const nextMute = soundOn // se está ativo, o próximo estado de mudo é true
    audioManager.setMute(nextMute)
    setSoundOn(!soundOn)
  }

  // Gera o link codificado Base64 para compartilhamento
  const getShareUrl = () => {
    const b64 = serializeConfig(cfg)
    return `${window.location.origin}${window.location.pathname}?museum=${b64}`
  }

  const handleCopyLink = () => {
    const url = getShareUrl()
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true)
        audioManager.playProximityChime()
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(err => {
        console.error('Falha ao copiar link:', err)
      })
  }

  const photo = cfg.photos[slide]
  const frameStyle = FRAME_STYLES[cfg.frame]
  const frameShadow = FRAME_SHADOWS[cfg.frame]
  const frameExtra = FRAME_EXTRA[cfg.frame] ?? {}
  const shareUrl = getShareUrl()

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden select-none touch-none"
      style={{ background: theme.bg, fontFamily: "'Outfit', sans-serif" }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Vibe-specific scenery */}
      <div className="absolute inset-0 z-0">
        <VibeScenery vibe={cfg.vibe} />
      </div>

      {/* Particle overlay */}
      <ParticleCanvas weather={cfg.weather} vibe={cfg.vibe} />

      {/* HUD Top */}
      <div
        className="relative z-20 flex items-center justify-between px-3 md:px-4 py-2.5 gap-2"
        style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${theme.accent}18`,
        }}
      >
        <button
          onClick={onExit}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] md:text-xs font-semibold text-white/70 hover:text-white transition-all hover:bg-white/5"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        >
          ← Painel
        </button>

        <div className="flex flex-col items-center min-w-0">
          <span
            className="text-xs md:text-sm font-bold text-white truncate max-w-[140px] md:max-w-none"
            style={{ fontFamily: theme.nameFont, textShadow: `0 0 20px ${theme.accent}60` }}
          >
            {cfg.partner1} & {cfg.partner2}
          </span>
          <span className="text-[9px] md:text-[10px] font-mono" style={{ color: theme.accent + 'cc' }}>
            ⏱ {timer}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {cfg.loveLetter && (
            <button
              onClick={() => {
                audioManager.playProximityChime()
                setLetterOpen(true)
              }}
              className="px-2 py-1.5 rounded-lg text-xs hover:scale-105 active:scale-95 transition-all"
              style={{ background: `${theme.accent}18`, border: `1px solid ${theme.accent}35` }}
              title="Carta Secreta"
            >
              💌
            </button>
          )}
          <button
            onClick={() => {
              audioManager.playProximityChime()
              setShareOpen(true)
            }}
            className="px-2 py-1.5 rounded-lg text-[10px] md:text-xs font-bold text-white/80 hover:text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-1"
            style={{ background: `${theme.accent}25`, border: `1px solid ${theme.accent}45` }}
          >
            <span>🔗</span>
            <span className="hidden sm:inline">Compartilhar</span>
          </button>
          <button
            onClick={handleSoundToggle}
            className="px-2 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {soundOn ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      {/* Swipe hint */}
      {hintsVisible && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-fade-in animation-fill-both">
          <div className="px-4 py-2.5 rounded-2xl text-center" style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/50 text-[10px] md:text-[11px]">← → Arraste ou use as setas do teclado →</p>
          </div>
        </div>
      )}

      {/* Main gallery room */}
      <div className="flex-1 relative z-10 flex items-center justify-center px-4 xs:px-8 md:px-14">
        <div
          className="w-full max-w-[260px] xs:max-w-[280px] sm:max-w-xs md:max-w-sm transition-all duration-350"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'scale(0.97) translateY(6px)' : 'scale(1) translateY(0)',
          }}
        >
          {/* Room number */}
          <div
            className="absolute -top-3 -left-3 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black"
            style={{ background: theme.accent, color: '#080810', boxShadow: `0 0 16px ${theme.accent}60` }}
          >
            {slide + 1}
          </div>

          {/* Photo frame */}
          <div
            className="overflow-hidden relative"
            style={{
              border: frameStyle,
              boxShadow: frameShadow,
              ...frameExtra,
              transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transition: transitioning 
                ? 'transform 0.35s ease' 
                : 'border 0.4s ease, box-shadow 0.4s ease, transform 0.1s ease-out',
            }}
          >
            {/* Dynamic frame-specific ornament overlays */}
            <FrameOverlay 
              frame={cfg.frame} 
              title={photo.title} 
              date={cfg.startDate} 
            />

            {/* Detalhes extras para moldura de cinema (Tira de filme 35mm com perfurações) */}
            {cfg.frame === 'cinema' && (
              <>
                <div className="absolute top-0 left-0 right-0 h-4 flex justify-around items-center pointer-events-none z-10 py-1" style={{ background: '#111' }}>
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2 bg-white/15 rounded-sm" />
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-4 flex justify-around items-center pointer-events-none z-10 py-1" style={{ background: '#111' }}>
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2 bg-white/15 rounded-sm" />
                  ))}
                </div>
              </>
            )}

            {photo.dataUrl ? (
              <img
                src={photo.dataUrl}
                alt={photo.title}
                className="w-full object-cover block max-h-[35vh] md:max-h-[44vh] min-h-[160px]"
                style={{ height: 'auto' }}
              />
            ) : (
              <div
                className="w-full flex flex-col items-center justify-center gap-3 text-white/20"
                style={{ height: '32vh', background: 'rgba(255,255,255,0.02)' }}
              >
                <span className="text-4xl md:text-5xl">{ROOM_EMOJIS[slide]}</span>
                <span className="text-[9px] md:text-[10px] tracking-widest uppercase">Sala {slide + 1}</span>
              </div>
            )}
          </div>

          {/* Caption card */}
          <div
            className="mt-3 px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl text-center space-y-1 md:space-y-1.5"
            style={{
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${theme.accent}20`,
            }}
          >
            <h2
              className="font-bold text-white text-xs md:text-sm leading-tight"
              style={{ fontFamily: theme.nameFont, textShadow: `0 0 12px ${theme.accent}40` }}
            >
              {photo.title}
            </h2>
            <p className="text-white/60 text-[10px] md:text-[11px] leading-relaxed line-clamp-3">
              {photo.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      {slide > 0 && (
        <button
          onClick={prev}
          className="absolute left-1.5 md:left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-lg md:text-xl font-bold text-white transition-all hover:scale-110 active:scale-95"
          style={{ background: 'rgba(0,0,0,0.55)', border: `1px solid ${theme.accent}30`, backdropFilter: 'blur(8px)' }}
        >
          ‹
        </button>
      )}
      {slide < total - 1 && (
        <button
          onClick={next}
          className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-lg md:text-xl font-bold text-white transition-all hover:scale-110 active:scale-95"
          style={{ background: 'rgba(0,0,0,0.55)', border: `1px solid ${theme.accent}30`, backdropFilter: 'blur(8px)' }}
        >
          ›
        </button>
      )}

      {/* Bottom HUD */}
      <div
        className="relative z-20 flex items-center justify-between px-4 py-2 mt-auto"
        style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(16px)',
          borderTop: `1px solid ${theme.accent}18`,
        }}
      >
        {/* Progress dots */}
        <div className="flex items-center gap-1 min-w-0 overflow-hidden">
          {cfg.photos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-400 shrink-0"
              style={{
                width: i === slide ? 14 : 4,
                height: 4,
                background: i === slide
                  ? theme.accent
                  : i < slide
                  ? `${theme.accent}60`
                  : 'rgba(255,255,255,0.15)',
                boxShadow: i === slide ? `0 0 6px ${theme.accent}` : 'none',
              }}
            />
          ))}
        </div>

        <span
          className="text-[9px] md:text-[10px] font-mono shrink-0 ml-2"
          style={{ color: theme.text + '50' }}
        >
          Sala {slide + 1} / {total}
        </span>

        {/* Chibi mini */}
        <div style={{ transform: 'scale(0.38) md:scale(0.42)', transformOrigin: 'right bottom', marginRight: -16, marginBottom: -6 }} className="shrink-0">
          <ChibiCanvas p1={cfg.p1} p2={cfg.p2} size={80} />
        </div>
      </div>

      {/* Modals */}
      <LoveLetterModal
        open={letterOpen}
        onClose={() => setLetterOpen(false)}
        letter={cfg.loveLetter}
        from={cfg.partner1}
        to={cfg.partner2}
        accent={theme.accent}
      />
      <QuizModal
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        partner1={cfg.partner1}
        accent={theme.accent}
      />

      {/* Compartilhar Modal */}
      <Dialog open={shareOpen} onOpenChange={v => { if (!v) setShareOpen(false) }}>
        <DialogContent
          className="border-0 max-w-sm w-[92vw] text-white text-center p-6 rounded-2xl overflow-y-auto max-h-[85vh]"
          style={{ background: 'linear-gradient(135deg, #100820, #1e0c28)', boxShadow: `0 0 50px ${theme.accent}30` }}
        >
          <div className="space-y-5">
            <div className="text-4xl">🎁</div>
            <h3 className="text-lg font-bold" style={{ fontFamily: theme.nameFont, color: theme.accent }}>
              Compartilhar Nosso Museu
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Envie este link especial para o seu amor. Ao abrir, ele(a) receberá a surpresa romântica e as fotos exatamente como você configurou!
            </p>

            {/* QR Code Container */}
            <div className="bg-white p-3 rounded-xl inline-block mx-auto shadow-xl">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=120c12&data=${encodeURIComponent(shareUrl)}`}
                alt="QR Code do Museu"
                className="w-44 h-44 block object-contain"
              />
            </div>
            <p className="text-[10px] text-white/30">Escaneie com a câmera do celular para abrir</p>

            {/* Link Input & Copy */}
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-[10px] font-mono flex-1 min-w-0 text-white/70 text-left cursor-text"
                onClick={e => (e.target as HTMLInputElement).select()}
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 hover:scale-105 active:scale-95"
                style={{ background: copied ? '#22c55e' : theme.accent, color: copied ? '#fff' : '#000' }}
              >
                {copied ? '✓ Copiado!' : 'Copiar'}
              </button>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 border border-white/15 rounded-xl text-xs font-semibold hover:bg-white/5 transition-all text-white/80"
              >
                🖨️ Imprimir Presente (Físico)
              </button>
              <button
                onClick={() => setShareOpen(false)}
                className="w-full py-2 text-white/40 hover:text-white/60 transition-colors text-xs"
              >
                Voltar ao Museu
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
