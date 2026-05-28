import { useState } from 'react'
import { Dialog, DialogContent } from './ui/dialog'
import { audioManager } from '../lib/audio'

interface Props { open: boolean; onClose: () => void; partner1: string; accent: string }

interface HeartParticle {
  id: number
  x: number // Posição horizontal em % (0 a 100)
  size: number // Tamanho em pixels
  delay: number // Atraso em ms
  duration: number // Duração em segundos
  emoji: string
}

export default function QuizModal({ open, onClose, accent }: Props) {
  const [answered, setAnswered] = useState(false)
  const [hearts, setHearts] = useState<HeartParticle[]>([])

  const handleAnswer = () => {
    setAnswered(true)
    // Toca sinos duplos para dar efeito de harpa estendida
    audioManager.playProximityChime()
    setTimeout(() => audioManager.playProximityChime(), 150)

    // Gera partículas de corações
    const emojis = ['💖', '❤️', '💝', '🌸', '💕', '💗']
    const list: HeartParticle[] = []
    for (let i = 0; i < 45; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 22 + 14, // 14px a 36px
        delay: Math.random() * 1200,
        duration: Math.random() * 3 + 2.5, // 2.5s a 5.5s
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      })
    }
    setHearts(list)
  }

  const handleClose = () => {
    setAnswered(false)
    setHearts([])
    onClose()
  }

  return (
    <>
      {/* Bloco de animação nativo para garantir queda de corações sem depender de CSS externo */}
      <style>{`
        @keyframes heart-fall {
          0% {
            transform: translateY(-50px) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: translateY(0vh) rotate(45deg) scale(1);
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }
        .animate-heart-fall {
          animation-name: heart-fall;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-fill-mode: forwards;
        }
      `}</style>

      {/* Partículas de coração flutuando na tela se respondido */}
      {answered && open && (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
          {hearts.map((h) => (
            <div
              key={h.id}
              className="absolute animate-heart-fall"
              style={{
                left: `${h.x}%`,
                top: `-60px`,
                fontSize: h.size,
                animationDelay: `${h.delay}ms`,
                animationDuration: `${h.duration}s`,
              }}
            >
              {h.emoji}
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={v => { if (!v) handleClose() }}>
        <DialogContent
          className="border-0 max-w-sm w-[90vw] text-white text-center overflow-hidden z-[9990]"
          style={{ background: 'linear-gradient(135deg, #1a0a2e, #2d1050)', boxShadow: `0 0 60px ${accent}30` }}
        >
          {!answered ? (
            <div className="space-y-6 py-4">
              <div className="text-5xl animate-float">💖</div>
              <h2 className="text-lg font-bold leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                Meu amor, quer continuar escrevendo todos os capítulos da nossa história juntos?
              </h2>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAnswer}
                  className="py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, #e91e8c, ${accent})` }}
                >
                  SIM! Para todo o sempre! 💍
                </button>
                <button
                  onClick={handleAnswer}
                  className="py-3 rounded-xl font-semibold text-white/80 hover:text-white transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  Sim! (E com direito a beijinho) 💋
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4 animate-fade-in">
              <div className="text-5xl">🎉</div>
              <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                EEEEEBAAA!
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Nossos corações batem na mesma sintonia. Te amo infinito! ❤️
              </p>
              <button
                onClick={handleClose}
                className="py-2.5 px-6 rounded-lg text-sm text-white/60 hover:text-white transition-colors"
              >
                Continuar no Museu →
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
