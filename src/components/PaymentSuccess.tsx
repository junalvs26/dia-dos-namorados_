import { useEffect } from 'react'
import { audioManager } from '../lib/audio'

interface Props {
  paymentId: string
  onContinue: () => void
}

export default function PaymentSuccess({ paymentId, onContinue }: Props) {
  useEffect(() => {
    // Toca o sino sintetizado mágico de comemoração
    audioManager.initSynth()
    audioManager.playProximityChime()
  }, [])

  const handleStart = () => {
    // Salva a chave de validação de pagamento no localStorage contra F5 acidentais
    localStorage.setItem('payment_verified_id', paymentId)
    onContinue()
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#06060c] text-white flex flex-col items-center justify-center font-sans px-6 select-none">
      {/* Confetti hearts floating container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 20 + 10
          const delay = Math.random() * 5
          const duration = Math.random() * 6 + 5
          const left = Math.random() * 100
          return (
            <div
              key={i}
              className="absolute text-rose-500/20 text-center select-none pointer-events-none animate-float-heart"
              style={{
                fontSize: size,
                left: `${left}%`,
                top: '105%',
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            >
              ❤️
            </div>
          )
        })}
      </div>

      <div className="relative z-10 w-full max-w-sm glass rounded-3xl p-8 border border-green-500/20 text-center space-y-6 bg-gradient-to-b from-[#0a1410] to-[#060c0a] shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-3xl mx-auto animate-bounce">
          🎉
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-black tracking-widest text-green-400 uppercase">Pagamento Aprovado</span>
          <h2 className="text-2xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Seu Acesso Foi Liberado!
          </h2>
          <p className="text-xs text-white/50 leading-relaxed px-2">
            Muito obrigado pela sua compra! O seu pagamento foi processado e o seu espaço de memórias já está pronto para ganhar vida.
          </p>
        </div>

        {/* Payment info tag */}
        <div className="bg-black/30 border border-white/5 rounded-xl px-4 py-2.5 inline-flex flex-col items-center gap-1 w-full text-left">
          <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest leading-none">Código da Transação</span>
          <span className="text-xs font-mono text-white/70 leading-none">{paymentId}</span>
        </div>

        <button
          onClick={handleStart}
          className="btn-gradient w-full py-3.5 rounded-xl text-white text-xs font-black tracking-wider uppercase animate-glow-pulse flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <span>💖</span>
          <span>Começar a Criar</span>
        </button>

        <p className="text-[9px] text-white/25 leading-normal">
          💡 **Aviso contra F5**: Gravamos este recibo em seu navegador. Você pode recarregar ou editar o museu com segurança até finalizar!
        </p>
      </div>
    </div>
  )
}
