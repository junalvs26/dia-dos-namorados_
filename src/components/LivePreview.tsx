import { useEffect, useRef } from 'react'
import type { MuseumConfig } from '../types'
import { VIBE_THEMES, FRAME_STYLES, FRAME_SHADOWS, FRAME_EXTRA } from '../lib/themes'
import { useTimer } from '../hooks/useTimer'
import ChibiCanvas from './ChibiCanvas'
import FrameOverlay from './FrameOverlay'

interface Props {
  cfg: MuseumConfig
  activePhoto?: number
}

const ROOM_EMOJIS = ['🌹','💫','🎭','🗺️','🏡','🌸','⭐','🌙','💍','🏛️']

function MiniParticles({ accent }: { accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: -0.15 - Math.random() * 0.2,
      size: 0.8 + Math.random() * 1.5,
      opacity: Math.random(),
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.save()
        ctx.globalAlpha = p.opacity * 0.7
        ctx.fillStyle = accent
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        p.y += p.vy
        p.opacity += Math.sin(Date.now() * 0.002 + p.x) * 0.008
        p.opacity = Math.max(0.1, Math.min(0.9, p.opacity))
        if (p.y < -4) p.y = canvas.height
      })
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [accent])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export default function LivePreview({ cfg, activePhoto = 0 }: Props) {
  const theme = VIBE_THEMES[cfg.vibe]
  const timer = useTimer(cfg.startDate)
  const photo = cfg.photos[activePhoto]
  const hasPhoto = Boolean(photo?.dataUrl)

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Live badge */}
      <div className="flex items-center gap-2">
        <div className="live-dot" />
        <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Preview ao vivo</span>
      </div>

      {/* Museum Room Preview */}
      <div
        className="preview-frame relative overflow-hidden flex-1 min-h-0"
        style={{
          background: theme.bg,
          transition: 'background 0.6s ease',
          minHeight: 380,
        }}
      >
        <MiniParticles accent={theme.accent} />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${theme.accent}18 0%, transparent 65%)`,
            transition: 'background 0.6s ease',
          }}
        />

        <div className="relative z-10 flex flex-col h-full p-5 gap-4">
          {/* Couple names header */}
          <div className="text-center">
            <h3
              className="text-lg font-bold leading-tight"
              style={{
                fontFamily: theme.nameFont,
                color: theme.accent,
                transition: 'color 0.4s ease',
                textShadow: `0 0 20px ${theme.accent}60`,
              }}
            >
              {cfg.partner1 || 'Seu Nome'} & {cfg.partner2 || 'Seu Amor'}
            </h3>
            <p
              className="text-[11px] font-mono mt-1"
              style={{ color: theme.text + '70', transition: 'color 0.4s ease' }}
            >
              ⏱ {timer}
            </p>
          </div>

          {/* Photo frame */}
          <div className="flex-1 flex items-center justify-center">
            {(() => {
              const frameExtra = FRAME_EXTRA[cfg.frame] ?? {}
              const adjustedFrameExtra = {
                ...frameExtra,
                ...(cfg.frame === 'polaroid' ? { borderBottomWidth: 26, transform: 'rotate(-0.5deg)' } : {})
              }
              return (
                <div
                  className="w-full relative rounded-sm"
                  style={{
                    border: FRAME_STYLES[cfg.frame],
                    boxShadow: FRAME_SHADOWS[cfg.frame],
                    ...adjustedFrameExtra,
                    transition: 'border 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
                    maxHeight: 180,
                  }}
                >
                  {/* Dynamic frame-specific ornament overlays (Mini mode) */}
                  <FrameOverlay 
                    frame={cfg.frame} 
                    title={photo?.title || ''} 
                    date={cfg.startDate} 
                    isMini={true} 
                  />

                  {hasPhoto ? (
                    <img
                      src={photo.dataUrl!}
                      alt={photo.title}
                      className="w-full h-[160px] object-cover block"
                      style={{ transition: 'opacity 0.4s ease' }}
                    />
                  ) : (
                    <div
                      className="w-full h-[130px] flex flex-col items-center justify-center gap-2"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                      <span className="text-3xl opacity-60">{ROOM_EMOJIS[activePhoto]}</span>
                      <span className="text-[10px]" style={{ color: theme.text + '40' }}>Sala {activePhoto + 1} — adicione uma foto</span>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>

          {/* Caption */}
          {photo && (
            <div
              className="rounded-lg p-3 text-center space-y-1"
              style={{ background: 'rgba(0,0,0,0.45)', border: `1px solid ${theme.accent}20` }}
            >
              <p
                className="text-xs font-semibold"
                style={{ fontFamily: theme.nameFont, color: theme.text }}
              >
                {photo.title || 'Título do Quadro'}
              </p>
              <p className="text-[10px] leading-snug line-clamp-2" style={{ color: theme.text + '60' }}>
                {photo.desc || 'Sua declaração romântica aparecerá aqui...'}
              </p>
            </div>
          )}

          {/* Chibi + room indicator */}
          <div className="flex items-end justify-between">
            <div style={{ transform: 'scale(0.48)', transformOrigin: 'bottom left' }}>
              <ChibiCanvas p1={cfg.p1} p2={cfg.p2} />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className="text-[9px] font-bold tracking-widest uppercase"
                style={{ color: theme.accent + '80' }}
              >
                Sala {activePhoto + 1} / 10
              </span>
              <div className="flex gap-1">
                {cfg.photos.slice(0, 10).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activePhoto ? 12 : 4,
                      height: 4,
                      background: i === activePhoto ? theme.accent : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme info */}
      <div className="glass rounded-xl px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
        {[
          ['Estilo', { classic:'Luxo Clássico', cozy:'Cabana', retro:'Retro Pixel', anime:'Anime', disney:'Disney', studios:'Lo-Fi' }[cfg.vibe] ?? cfg.vibe],
          ['Moldura', { gold:'Ouro', wood:'Madeira', neon:'Neon', retro:'Pixel', polaroid:'Polaroid', vintage:'Vintage', botanical:'Botânico', cinema:'Cinema' }[cfg.frame] ?? cfg.frame],
          ['Atmosfera', { stars:'Estrelas', rain:'Chuva', aurora:'Aurora', none:'Limpo' }[cfg.weather] ?? cfg.weather],
          ['Trilha', { theme:'Auto', piano:'Piano', acoustic:'Violão', synth:'Synth', retro:'Chiptune', lofi:'Lo-Fi', custom:'Custom' }[cfg.music] ?? cfg.music],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline gap-1.5">
            <span className="text-[9px] font-bold tracking-widest uppercase text-white/25">{k}</span>
            <span className="text-[11px] text-white/60 truncate">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
