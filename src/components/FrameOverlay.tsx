import type { Frame } from '../types'

interface Props {
  frame: Frame
  title: string
  date: string
  isMini?: boolean
}

export default function FrameOverlay({ frame, title, date, isMini = false }: Props) {
  // Omit frame overlay rendering if it is semantically empty or handled by container border
  const cornerClass = isMini ? 'text-[6px]' : 'text-[9px]'
  const emojiClass = isMini ? 'text-[8px]' : 'text-[13px]'

  switch (frame) {
    case 'gold':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Innermost gold thin border */}
          <div className="absolute inset-0.5 border border-[#d4af37]/45 rounded-sm" />
          
          {/* Diamond corner ornaments */}
          <div className={`absolute top-1 left-1.5 text-[#d4af37] font-bold ${cornerClass} drop-shadow-md`}>◆</div>
          <div className={`absolute top-1 right-1.5 text-[#d4af37] font-bold ${cornerClass} drop-shadow-md`}>◆</div>
          <div className={`absolute bottom-1 left-1.5 text-[#d4af37] font-bold ${cornerClass} drop-shadow-md`}>◆</div>
          <div className={`absolute bottom-1 right-1.5 text-[#d4af37] font-bold ${cornerClass} drop-shadow-md`}>◆</div>

          {/* Sweeping diagonal gold shine */}
          <div 
            className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-30deg] animate-gold-shine"
          />
        </div>
      )

    case 'wood':
      const hingeSize = isMini ? 'w-2 h-2' : 'w-3.5 h-3.5'
      const rivetSize = isMini ? 'w-0.5 h-0.5' : 'w-1 h-1'
      return (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Metallic brass corner hinges */}
          {/* Top-Left Bracket */}
          <div className={`absolute top-0 left-0 ${hingeSize} border-t-2 border-l-2 border-[#8c6d58]/80`} />
          <div className={`absolute top-0.5 left-0.5 ${rivetSize} rounded-full bg-[#ffe8b0] shadow`} />
          
          {/* Top-Right Bracket */}
          <div className={`absolute top-0 right-0 ${hingeSize} border-t-2 border-r-2 border-[#8c6d58]/80`} />
          <div className={`absolute top-0.5 right-0.5 ${rivetSize} rounded-full bg-[#ffe8b0] shadow`} />
          
          {/* Bottom-Left Bracket */}
          <div className={`absolute bottom-0 left-0 ${hingeSize} border-b-2 border-l-2 border-[#8c6d58]/80`} />
          <div className={`absolute bottom-0.5 left-0.5 ${rivetSize} rounded-full bg-[#ffe8b0] shadow`} />
          
          {/* Bottom-Right Bracket */}
          <div className={`absolute bottom-0 right-0 ${hingeSize} border-b-2 border-r-2 border-[#8c6d58]/80`} />
          <div className={`absolute bottom-0.5 right-0.5 ${rivetSize} rounded-full bg-[#ffe8b0] shadow`} />
        </div>
      )

    case 'neon':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden animate-neon-hue rounded-[inherit]">
          {/* Multi-layered thin neon border */}
          <div className="absolute inset-0 border border-[#00ffcc]/70 rounded-[inherit]" />
          
          {/* Pulsing hearts in corners */}
          <div className={`absolute top-1 left-1.5 text-[#00ffcc] animate-pulse ${cornerClass}`}>❤</div>
          <div className={`absolute top-1 right-1.5 text-[#00ffcc] animate-pulse ${cornerClass}`}>❤</div>
          <div className={`absolute bottom-1 left-1.5 text-[#00ffcc] animate-pulse ${cornerClass}`}>❤</div>
          <div className={`absolute bottom-1 right-1.5 text-[#00ffcc] animate-pulse ${cornerClass}`}>❤</div>
        </div>
      )

    case 'retro':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-1.5 font-mono text-[7px] text-white/80">
          <div className="flex justify-between w-full opacity-60 leading-none">
            <span className="text-[#22c55e] animate-pulse">1P READY</span>
            <span className="text-[#a855f7] animate-pulse">2P READY</span>
          </div>
          
          {/* Pixel corners */}
          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-[#ff6eb4]" />
          <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-[#ff6eb4]" />
          <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-[#ff6eb4]" />
          <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-[#ff6eb4]" />
          
          <div className="text-center w-full opacity-50 animate-pulse text-[#ff6eb4] leading-none mb-0.5">
            INSERT HEART ❤
          </div>
        </div>
      )

    case 'polaroid':
      // The polaroid details go into the extended bottom white bezel
      return (
        <div 
          className="absolute left-0 right-0 pointer-events-none z-10 flex flex-col items-center justify-center text-center"
          style={{ 
            bottom: isMini ? -24 : -34, 
            height: isMini ? 24 : 34 
          }}
        >
          <span 
            style={{ 
              fontFamily: "'Dancing Script', cursive", 
              color: '#3a2512', 
              fontSize: isMini ? 10 : 13, 
              fontWeight: 700 
            }} 
            className="leading-none select-none max-w-[90%] truncate block"
          >
            {title || "Nosso Amor"}
          </span>
          <span 
            style={{ 
              fontFamily: "'Outfit', sans-serif", 
              color: '#8b705e', 
              fontSize: isMini ? 5 : 6, 
              fontWeight: 700, 
              letterSpacing: '0.15em' 
            }} 
            className="mt-0.5 uppercase opacity-75"
          >
            {date || "PARA SEMPRE"}
          </span>
          {/* Mini romantic hand-drawn heart in lower right */}
          <span 
            className="absolute text-rose-500/80 font-bold rotate-6"
            style={{
              right: isMini ? 4 : 8,
              bottom: isMini ? 2 : 4,
              fontSize: isMini ? 6 : 8,
            }}
          >
            ❤
          </span>
        </div>
      )

    case 'vintage':
      return (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0.5 border border-[#c9a46a]/30" />
          {/* Classic ornate brass fleur-de-lis corner flourishes */}
          <div className={`absolute top-0.5 left-1 text-[#c9a46a]/90 font-serif ${cornerClass}`}>⚜</div>
          <div className={`absolute top-0.5 right-1 text-[#c9a46a]/90 font-serif ${cornerClass}`}>⚜</div>
          <div className={`absolute bottom-0.5 left-1 text-[#c9a46a]/90 font-serif ${cornerClass}`}>⚜</div>
          <div className={`absolute bottom-0.5 right-1 text-[#c9a46a]/90 font-serif ${cornerClass}`}>⚜</div>
        </div>
      )

    case 'botanical':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]">
          {/* Fine inside leaf-green outline */}
          <div className="absolute inset-0.5 border border-[#55a655]/50 rounded-[inherit]" />
          
          {/* Leaf and cherry blossom corner emojis */}
          <div className={`absolute -top-1.5 -left-1.5 ${emojiClass}`}>🌿</div>
          <div className={`absolute -top-1.5 -right-1.5 ${emojiClass}`}>🌸</div>
          <div className={`absolute -bottom-1.5 -left-1.5 ${emojiClass}`}>🌸</div>
          <div className={`absolute -bottom-1.5 -right-1.5 ${emojiClass}`}>🌿</div>
        </div>
      )

    case 'cinema':
      return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
          {/* Film perforations (Top & Bottom black bars are handled inside FRAME_STYLES (cinema has 24px solid #111) */}
          {/* Inside vertical scratches film layer */}
          <div className="absolute inset-0 bg-transparent overflow-hidden pointer-events-none">
            <div className="absolute inset-y-0 w-px bg-white/20 left-[20%] animate-film-scratch pointer-events-none" />
            <div className="absolute inset-y-0 w-[1.5px] bg-white/15 left-[75%] animate-film-scratch pointer-events-none" />
          </div>

          {/* Kodak and Film Number Markings on margins */}
          {!isMini && (
            <>
              {/* Left Margin */}
              <div 
                className="absolute left-[-21px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-10 text-[6px] font-mono text-amber-500/60 font-black select-none uppercase rotate-90"
              >
                <span>KODAK 400</span>
                <span>SAFETY FILM</span>
              </div>
              {/* Right Margin */}
              <div 
                className="absolute right-[-21px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-12 text-[6px] font-mono text-amber-500/60 font-black select-none uppercase -rotate-90"
              >
                <span>▸ 24A</span>
                <span>N-24</span>
              </div>
            </>
          )}

          {/* Recording & Timer Overlay in camera screen */}
          <div className="absolute inset-2 flex justify-between items-start text-[6px] font-mono tracking-widest text-white/90 drop-shadow">
            <div className="flex items-center gap-1 bg-black/40 px-1 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse inline-block" />
              <span>REC</span>
            </div>
            <div className="bg-black/40 px-1 rounded-sm">
              <span>00:0{isMini ? '1' : '3'}:42:08</span>
            </div>
          </div>
        </div>
      )

    default:
      return null
  }
}
