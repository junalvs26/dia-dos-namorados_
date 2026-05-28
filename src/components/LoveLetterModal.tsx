import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from './ui/dialog'
import { audioManager } from '../lib/audio'

interface Props {
  open: boolean
  onClose: () => void
  letter: string
  from: string
  to: string
  accent: string
}

type Phase = 'envelope' | 'opening' | 'letter' | 'reading'

export default function LoveLetterModal({ open, onClose, letter, from, to, accent }: Props) {
  const [phase, setPhase] = useState<Phase>('envelope')
  const [visibleLines, setVisibleLines] = useState(0)
  const lines = letter.split(/(?<=[.!?])\s+/).filter(Boolean)

  useEffect(() => {
    if (!open) { setTimeout(() => { setPhase('envelope'); setVisibleLines(0) }, 400) }
  }, [open])

  useEffect(() => {
    if (phase !== 'reading') return
    if (visibleLines >= lines.length) return
    const t = setTimeout(() => setVisibleLines(v => v + 1), 550)
    return () => clearTimeout(t)
  }, [phase, visibleLines, lines.length])

  const handleOpen = () => {
    audioManager.playProximityChime()
    setPhase('opening')
    setTimeout(() => setPhase('letter'), 900)
    setTimeout(() => setPhase('reading'), 1400)
  }

  return (
    <Dialog open={open} onOpenChange={v => { if (!v) onClose() }}>
      <DialogContent
        className="border-0 max-w-sm w-[92vw] overflow-hidden p-0"
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        <div style={{ perspective: '800px' }}>
          {/* Envelope phase */}
          {(phase === 'envelope' || phase === 'opening') && (
            <div className="relative animate-scale-in animation-fill-both">
              {/* Envelope body */}
              <div
                className="relative mx-auto"
                style={{
                  width: '100%',
                  maxWidth: 340,
                  background: 'linear-gradient(145deg, #1e0e36, #130828)',
                  border: `1px solid ${accent}30`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: `0 0 60px ${accent}25, 0 20px 60px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Envelope flap */}
                <div
                  style={{
                    height: 120,
                    position: 'relative',
                    transformOrigin: 'top center',
                    transform: phase === 'opening' ? 'perspective(400px) rotateX(-145deg)' : 'perspective(400px) rotateX(0deg)',
                    transition: 'transform 0.8s cubic-bezier(0.4,0,0.2,1)',
                    background: `linear-gradient(135deg, ${accent}20, ${accent}08)`,
                    borderBottom: `1px solid ${accent}20`,
                  }}
                >
                  {/* Diamond fold lines */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="50%" y2="100%" stroke={`${accent}25`} strokeWidth="1"/>
                    <line x1="100%" y1="0" x2="50%" y2="100%" stroke={`${accent}25`} strokeWidth="1"/>
                  </svg>
                  {/* Wax seal */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: `radial-gradient(circle at 40% 35%, ${accent}, #800030)`,
                      boxShadow: `0 0 16px ${accent}60`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18,
                    }}>
                      ❤
                    </div>
                    <div style={{
                      position: 'absolute', inset: -3, borderRadius: '50%',
                      border: `1px solid ${accent}50`,
                      animation: 'pulse-heart 2s ease-in-out infinite',
                    }}/>
                  </div>
                </div>

                {/* Envelope bottom */}
                <div style={{ padding: '20px 24px 28px', minHeight: 100 }}>
                  {/* Inside triangle folds */}
                  <svg className="absolute bottom-0 left-0 right-0 w-full" height="60" style={{ opacity: 0.15 }} preserveAspectRatio="none">
                    <line x1="0" y1="100%" x2="50%" y2="0%" stroke={accent} strokeWidth="1"/>
                    <line x1="100%" y1="100%" x2="50%" y2="0%" stroke={accent} strokeWidth="1"/>
                  </svg>
                  <p className="text-center text-white/50 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                    Para {to}...
                  </p>
                </div>
              </div>

              {/* Click button */}
              {phase === 'envelope' && (
                <div className="mt-5 text-center animate-fade-up animation-fill-both">
                  <button
                    onClick={handleOpen}
                    className="px-8 py-3.5 rounded-2xl text-white font-semibold text-sm transition-all hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, #c9a84c)`,
                      boxShadow: `0 0 30px ${accent}40`,
                    }}
                  >
                    Abrir o Envelope 💌
                  </button>
                  <p className="text-white/25 text-xs mt-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle:'italic' }}>
                    Uma mensagem especial espera por você
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Letter phase */}
          {(phase === 'letter' || phase === 'reading') && (
            <div
              className="animate-scale-in animation-fill-both"
              style={{
                background: 'linear-gradient(160deg, #fffdf7, #fff8ec)',
                borderRadius: 10,
                padding: '32px 28px',
                boxShadow: `0 0 60px ${accent}30, 0 25px 60px rgba(0,0,0,0.5)`,
                position: 'relative',
                overflow: 'hidden',
                minHeight: 280,
              }}
            >
              {/* Paper texture lines */}
              {[...Array(10)].map((_,i) => (
                <div key={i} style={{ position:'absolute', left:28, right:28, top: 80 + i*28, height:1, background:'rgba(0,0,0,0.06)' }}/>
              ))}

              {/* Stamp area */}
              <div style={{ position:'absolute', top:16, right:16, width:36, height:42, border:'1.5px solid rgba(0,0,0,0.15)', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, opacity:0.6 }}>
                ❤
              </div>

              {/* Header */}
              <div style={{ marginBottom: 20 }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 15,
                  color: '#3a2010',
                  opacity: 0.7,
                }}>
                  Para o meu amor,
                </p>
              </div>

              {/* Letter content - line by line reveal */}
              <div style={{ minHeight: 140 }}>
                {lines.slice(0, visibleLines).map((line, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 15,
                      lineHeight: 1.75,
                      color: '#2a1a08',
                      marginBottom: 4,
                      opacity: 0,
                      animation: 'fade-up 0.5s ease both',
                      animationDelay: `${i * 0.05}s`,
                      animationFillMode: 'both',
                    }}
                  >
                    {line}
                  </p>
                ))}
                {phase === 'reading' && visibleLines < lines.length && (
                  <span style={{ display:'inline-block', width:2, height:16, background:'#8b4513', animation:'pulse-heart 1s ease-in-out infinite', verticalAlign:'middle', marginLeft:2 }}/>
                )}
              </div>

              {/* Signature */}
              {visibleLines >= lines.length && phase === 'reading' && (
                <div className="mt-4 animate-fade-up animation-fill-both" style={{ borderTop:'1px solid rgba(0,0,0,0.08)', paddingTop:12 }}>
                  <p style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: 18,
                    color: `${accent}`,
                    textAlign: 'right',
                  }}>
                    Com todo o meu amor ❤️
                    <br/>
                    <span style={{ fontSize: 14, opacity: 0.7 }}>— {from}</span>
                  </p>
                </div>
              )}

              {/* Close */}
              <button
                onClick={onClose}
                style={{
                  position:'absolute', top:10, left:14,
                  width:24, height:24, borderRadius:'50%',
                  background:'rgba(0,0,0,0.08)',
                  border:'none', cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12, color:'rgba(0,0,0,0.4)',
                }}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
