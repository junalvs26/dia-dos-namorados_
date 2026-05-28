import { useState, useEffect, useRef } from 'react'

function CinematicParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - 20,
      size: 1.2 + Math.random() * 2.8,
      speedX: -0.4 + Math.random() * 0.8,
      speedY: 0.3 + Math.random() * 0.7,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: -0.015 + Math.random() * 0.03,
      opacity: 0.15 + Math.random() * 0.4,
      type: Math.random() > 0.45 ? 'petal' : 'spark',
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        
        if (p.type === 'petal') {
          ctx.rotate(p.rotation)
          ctx.fillStyle = 'rgba(255, 175, 200, 0.75)'
          ctx.beginPath()
          ctx.ellipse(0, 0, p.size * 1.6, p.size * 0.9, 0, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = 'rgba(233, 30, 140, 0.75)'
          ctx.shadowBlur = 6
          ctx.shadowColor = '#e91e8c'
          ctx.beginPath()
          ctx.arc(0, 0, p.size * 0.75, 0, Math.PI * 2)
          ctx.fill()
        }
        
        ctx.restore()

        p.x += p.speedX
        p.y += p.speedY
        p.rotation += p.rotationSpeed
        
        if (p.y > canvas.height + 12) {
          p.y = -12
          p.x = Math.random() * canvas.width
        }
        if (p.x < -12 || p.x > canvas.width + 12) {
          p.speedX = -p.speedX
        }
      })
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
}

interface Props { texts: string[]; onDone: () => void }

export default function IntroScreen({ texts, onDone }: Props) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')
  const [showEnter, setShowEnter] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t) }, [])

  useEffect(() => {
    if (showEnter) return
    if (index >= texts.length) { setShowEnter(true); return }

    const timings = [500, 2600, 3200] // in → hold → out → next
    const t1 = setTimeout(() => setPhase('hold'), timings[0])
    const t2 = setTimeout(() => setPhase('out'), timings[1])
    const t3 = setTimeout(() => { setIndex(i => i + 1); setPhase('in') }, timings[2])
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [index, texts.length, showEnter])

  const textStyle = {
    opacity: phase === 'hold' ? 1 : 0,
    filter: phase === 'hold' ? 'blur(0px)' : phase === 'in' ? 'blur(8px)' : 'blur(3px)',
    transform: phase === 'hold' ? 'translateY(0) scale(1)' : phase === 'in' ? 'translateY(18px) scale(0.97)' : 'translateY(-10px) scale(1.01)',
    transition: phase === 'in'
      ? 'opacity 0.7s ease, filter 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)'
      : 'opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease',
  }

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: '#060810',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 1s ease',
      }}
    >
      {/* Background cinematic particles */}
      <CinematicParticles />
      {/* Cinematic letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-14 pointer-events-none" style={{ background: '#000', zIndex: 20 }}/>
      <div className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none" style={{ background: '#000', zIndex: 20 }}/>

      {/* Deep background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(180,80,120,0.06) 0%, transparent 65%)' }}
      />

      {/* Film grain */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.35'/%3E%3C/svg%3E")`,
        backgroundSize: '150px',
        opacity: 0.04,
        mixBlendMode: 'overlay',
      }}/>

      {/* Skip */}
      <button
        onClick={onDone}
        className="absolute z-30 text-white/20 hover:text-white/50 transition-colors"
        style={{
          top: 58, right: 20,
          fontSize: 10,
          letterSpacing: '0.2em',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
          textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '4px 12px',
          borderRadius: 100,
        }}
      >
        Pular ⏭
      </button>

      {/* Scene number */}
      <div
        className="absolute z-10"
        style={{
          bottom: 58, left: 28,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11,
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.3em',
        }}
      >
        {String(index + 1).padStart(2, '0')} / {String(texts.length).padStart(2, '0')}
      </div>

      {/* Progress bar (cinematic) */}
      <div className="absolute z-10" style={{ bottom: 56, left: 70, right: 28, height: 1, background: 'rgba(255,255,255,0.08)' }}>
        {!showEnter && (
          <div style={{
            height: '100%',
            width: `${((index) / texts.length) * 100}%`,
            background: 'rgba(255,255,255,0.35)',
            transition: 'width 0.4s ease',
          }}/>
        )}
      </div>

      {/* Main text / CTA */}
      <div className="relative z-10 flex flex-col items-center justify-center px-12 max-w-xl text-center" style={{ minHeight: 140 }}>
        {!showEnter ? (
          <p
            style={{
              ...textStyle,
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 4.5vw, 32px)',
              fontWeight: 300,
              color: '#f0ece4',
              lineHeight: 1.5,
              letterSpacing: '0.02em',
              textShadow: '0 2px 30px rgba(0,0,0,0.8)',
            }}
          >
            {texts[index] ?? ''}
          </p>
        ) : (
          <div className="animate-fade-up animation-fill-both text-center space-y-8">
            <div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(18px, 3.5vw, 26px)',
                fontWeight: 300,
                color: '#f0ece4',
                letterSpacing: '0.03em',
              }}>
                O amor de vocês está guardado aqui.
              </p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(12px, 2vw, 16px)',
                color: 'rgba(240,236,228,0.45)',
                marginTop: 8,
                letterSpacing: '0.05em',
              }}>
                — entre e reviva cada momento
              </p>
            </div>
            <button
              onClick={onDone}
              style={{
                background: 'transparent',
                border: '1px solid rgba(240,236,228,0.3)',
                color: '#f0ece4',
                padding: '14px 40px',
                borderRadius: 2,
                fontFamily: "'Cinzel', serif",
                fontSize: 12,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = 'rgba(240,236,228,0.08)'
                el.style.borderColor = 'rgba(240,236,228,0.6)'
                el.style.letterSpacing = '0.3em'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'transparent'
                el.style.borderColor = 'rgba(240,236,228,0.3)'
                el.style.letterSpacing = '0.25em'
              }}
            >
              Entrar no Museu
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
