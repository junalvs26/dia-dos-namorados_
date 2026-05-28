import { useEffect, useState } from 'react'

const MESSAGES = [
  'Preparando as salas com carinho...',
  'Acendendo as velas do museu...',
  'Enquadrando as memórias de vocês...',
  'Ajustando a luz cinematográfica...',
  'Afinando a trilha sonora do amor...',
  'Quase lá... a surpresa está quase pronta 💖',
]

interface Props { onDone: () => void }

export default function LoaderScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0)
  const [msgIndex, setMsgIndex] = useState(0)
  const [entering, setEntering] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + (100 - p) * 0.075 + 0.4
        if (next >= 99.5) {
          clearInterval(interval)
          setTimeout(onDone, 600)
          return 100
        }
        return next
      })
    }, 80)
    const msgInterval = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length)
    }, 1000)
    return () => { clearInterval(interval); clearInterval(msgInterval) }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: '#080810' }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(233,30,140,0.08) 0%, transparent 60%)' }}
      />

      <div
        className="text-center space-y-8 px-8 max-w-xs w-full transition-all duration-700"
        style={{ opacity: entering ? 0 : 1, transform: entering ? 'translateY(16px)' : 'translateY(0)' }}
      >
        {/* Animated heart */}
        <div className="relative inline-flex items-center justify-center">
          <div
            className="absolute w-20 h-20 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(233,30,140,0.2) 0%, transparent 70%)', animation: 'pulse-heart 2s ease-in-out infinite' }}
          />
          <span className="text-5xl animate-float" style={{ animationDuration: '3s' }}>💖</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2
            className="text-xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Construindo sua Galeria...
          </h2>
          <p
            className="text-white/40 text-xs min-h-[16px] transition-all duration-500"
            key={msgIndex}
            style={{ animation: 'fade-up 0.4s ease both' }}
          >
            {MESSAGES[msgIndex]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-3">
          <div className="relative h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #e91e8c, #c9a84c)',
                boxShadow: '0 0 12px rgba(233,30,140,0.6)',
              }}
            />
          </div>
          <p className="text-rose-400 text-xs font-mono">{Math.round(progress)}%</p>
        </div>

        {/* Decoration dots */}
        <div className="flex justify-center gap-1.5">
          {[0,1,2,3,4].map(i => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 4, height: 4,
                background: i <= Math.floor(progress / 20) ? '#e91e8c' : 'rgba(255,255,255,0.12)',
                transition: 'background 0.4s ease',
                boxShadow: i <= Math.floor(progress / 20) ? '0 0 6px #e91e8c' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
