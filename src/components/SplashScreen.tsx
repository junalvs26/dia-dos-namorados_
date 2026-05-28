import { useEffect, useState } from 'react'
import { useTimer } from '../hooks/useTimer'
import type { MuseumConfig } from '../types'

interface Props { cfg: MuseumConfig; onEnter: () => void }

export default function SplashScreen({ cfg, onEnter }: Props) {
  const timer = useTimer(cfg.startDate)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: '#080810' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(233,30,140,0.09) 0%, transparent 60%)',
          animation: 'fade-in 1.5s ease both',
        }}
      />

      {/* Decorative rings */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full border pointer-events-none"
        style={{
          borderColor: 'rgba(233,30,140,0.06)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'spin-slow 30s linear infinite',
        }}
      />
      <div
        className="absolute w-[340px] h-[340px] rounded-full border pointer-events-none"
        style={{
          borderColor: 'rgba(201,168,76,0.06)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'spin-slow 20s linear infinite reverse',
        }}
      />

      <div
        className="relative z-10 text-center space-y-8 px-8 max-w-sm w-full transition-all duration-800"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Icon */}
        <div className="relative inline-flex">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(233,30,140,0.25), transparent)',
              transform: 'scale(2.5)',
              animation: 'pulse-heart 3s ease-in-out infinite',
            }}
          />
          <span className="text-6xl animate-float-slow">💖</span>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1
            className="text-2xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Você recebeu uma<br />
            <span className="text-shimmer">surpresa especial</span>
          </h1>
          <p className="text-white/40 text-sm">
            Prepare o coração para uma jornada de amor.
          </p>
        </div>

        {/* Timer box */}
        <div
          className="glass rounded-2xl px-6 py-4 space-y-1.5"
          style={{ border: '1px solid rgba(233,30,140,0.15)' }}
        >
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/30">
            Nossos corações batem juntos há
          </p>
          <p
            className="font-mono text-lg font-bold"
            style={{
              background: 'linear-gradient(90deg, #e91e8c, #c9a84c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {timer}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onEnter}
          className="btn-gradient w-full py-4 rounded-2xl text-white font-bold text-base animate-glow-pulse"
        >
          Abrir Minha Surpresa 💌
        </button>
      </div>
    </div>
  )
}
