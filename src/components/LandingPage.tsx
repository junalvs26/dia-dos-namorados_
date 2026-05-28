

// COLE O SEU LINK DE PAGAMENTO DO MERCADO PAGO AQUI:
const MERCADO_PAGO_CHECKOUT_URL = "https://www.mercadopago.com.br/" // Substitua pelo link de preferência real do seu checkout

export default function LandingPage() {
  const handlePurchase = () => {
    // Redireciona o usuário para o checkout do Mercado Pago
    // Para fins de teste/sandbox do Mercado Pago, redireciona simulando a aprovação
    const sandboxReturnUrl = `${window.location.origin}${window.location.pathname}?status=approved&payment_id=MP-${Math.floor(Math.random() * 900000 + 100000)}`
    
    // Se o URL padrão do Mercado Pago não tiver sido alterado, ajuda o usuário redirecionando para a simulação de sandbox aprovada local
    if (MERCADO_PAGO_CHECKOUT_URL.includes("mercadopago.com.br/")) {
      window.location.href = sandboxReturnUrl
    } else {
      window.location.href = MERCADO_PAGO_CHECKOUT_URL
    }
  }

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#06060c] text-white flex flex-col font-sans select-none pb-12">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '-10%', left: '10%',
            background: 'radial-gradient(circle, rgba(233,30,140,0.06) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            bottom: '10%', right: '5%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
        {/* Header Logo */}
        <header className="text-center mb-10 animate-fade-up">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-rose-500 animate-pulse text-2xl">❤️</span>
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/30">Presente Único & Exclusivo</span>
          </div>
          <h1 
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            O Museu Virtual do Nosso Amor
          </h1>
          <p className="text-white/50 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            Eternize seus melhores momentos, declarações e fotos em uma galeria interativa 3D de tirar o fôlego feita especialmente para o seu amor.
          </p>
        </header>

        {/* Feature grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12 animate-fade-up stagger-1">
          <div className="glass rounded-2xl p-5 border border-white/5 flex flex-col items-center text-center space-y-2 hover:border-rose-500/20 transition-all duration-350 hover:-translate-y-1">
            <span className="text-3xl">🎨</span>
            <h3 className="font-bold text-sm text-rose-300">Avatares Doodle de Mãos Dadas</h3>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Desenhos aconchegantes estilo rabisco em giz de cera sem rosto, focando na identificação perfeita das roupinhas e do abraço do casal.
            </p>
          </div>
          <div className="glass rounded-2xl p-5 border border-white/5 flex flex-col items-center text-center space-y-2 hover:border-rose-500/20 transition-all duration-350 hover:-translate-y-1">
            <span className="text-3xl">🎬</span>
            <h3 className="font-bold text-sm text-rose-300">Molduras & Parallax 3D</h3>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Molduras de luxo (ouro, madeira, neon, película de cinema) que reagem fisicamente ao movimento em uma perspectiva tridimensional linda.
            </p>
          </div>
          <div className="glass rounded-2xl p-5 border border-white/5 flex flex-col items-center text-center space-y-2 hover:border-rose-500/20 transition-all duration-350 hover:-translate-y-1">
            <span className="text-3xl">🎵</span>
            <h3 className="font-bold text-sm text-rose-300">Trilha Sonora do YouTube</h3>
            <p className="text-[11px] text-white/50 leading-relaxed">
              O museu toca apenas o áudio do vídeo do YouTube que você colocar em segundo plano de forma contínua, sem cortes entre as telas.
            </p>
          </div>
        </section>

        {/* Call to Action Offer Card */}
        <section className="glass rounded-3xl w-full p-8 md:p-10 border border-rose-500/10 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-[#120a1c] via-[#0b0714] to-[#120a1c] shadow-2xl shadow-rose-950/20 animate-fade-up stagger-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full" />
          
          <div className="space-y-4 max-w-md text-left">
            <div className="inline-block bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
              Acesso Vitalício Garantido
            </div>
            <h2 className="text-2xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Crie uma Surpresa Romântica que Ficará Gravada para Sempre
            </h2>
            <ul className="text-xs text-white/60 space-y-2 leading-relaxed">
              <li className="flex items-center gap-2">✓ 📂 10 salas/quadros totalmente customizáveis</li>
              <li className="flex items-center gap-2">✓ 💌 Carta secreta em envelope interativo</li>
              <li className="flex items-center gap-2">✓ 💍 Quiz final interativo de namoro/casamento com confetes</li>
              <li className="flex items-center gap-2">✓ 🔗 Link único e permanente do museu</li>
              <li className="flex items-center gap-2">✓ 🖨️ QR Code para imprimir e presentear fisicamente</li>
            </ul>
          </div>

          <div className="glass-rose border border-rose-400/20 rounded-2xl p-6 flex flex-col items-center justify-center min-w-[220px] md:min-w-[240px] text-center shrink-0 w-full md:w-auto relative z-10 shadow-lg">
            <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase mb-1">Preço Único</span>
            <div className="flex items-baseline justify-center gap-1.5 mb-1">
              <span className="text-sm font-semibold text-rose-300">R$</span>
              <span className="text-3xl font-black text-rose-100 tracking-tight">19</span>
              <span className="text-sm font-semibold text-rose-300">,90</span>
            </div>
            <p className="text-[9px] text-white/30 mb-4">Sem mensalidades · Acesso vitalício</p>

            <button
              onClick={handlePurchase}
              className="btn-gradient w-full py-3.5 rounded-xl text-white text-xs font-black tracking-wider uppercase animate-glow-pulse flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <span>🛒</span>
              <span>Comprar Acesso</span>
            </button>
            
            <p className="text-[8px] text-white/20 mt-3 flex items-center justify-center gap-1">
              🔒 Checkout Seguro via Mercado Pago
            </p>
          </div>
        </section>

        {/* Footer info */}
        <footer className="text-center text-[10px] text-white/20 w-full max-w-lg mt-6 leading-relaxed">
          Ao clicar para adquirir o acesso, você será redirecionado para a plataforma segura do Mercado Pago. Assim que o pagamento for concluído, você retornará para este site automaticamente com a área de criação 100% desbloqueada.
        </footer>
      </div>
    </div>
  )
}
