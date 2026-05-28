import type { Vibe } from '../types'

/* ═══════════════════════════════════════════════════
   CLASSIC — Grande Salão de Mármore com Ouro
   ═══════════════════════════════════════════════════ */
function ClassicScenery() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base wall */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0e0820 0%, #160c30 45%, #0e0820 100%)' }}/>

      {/* Back wall arch with window */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="cl_gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b08010"/>
            <stop offset="25%" stopColor="#f0d458"/>
            <stop offset="55%" stopColor="#c8a018"/>
            <stop offset="80%" stopColor="#f0d458"/>
            <stop offset="100%" stopColor="#b08010"/>
          </linearGradient>
          <linearGradient id="cl_gold_v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0d458"/>
            <stop offset="50%" stopColor="#b08010"/>
            <stop offset="100%" stopColor="#f0d458"/>
          </linearGradient>
          <linearGradient id="cl_marble" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d8ccee"/>
            <stop offset="35%" stopColor="#b8a8d8"/>
            <stop offset="65%" stopColor="#d0c4e8"/>
            <stop offset="100%" stopColor="#c0b0dc"/>
          </linearGradient>
          <linearGradient id="cl_col_shaft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c0b0d8"/>
            <stop offset="20%" stopColor="#e8daf8"/>
            <stop offset="50%" stopColor="#c8b8e0"/>
            <stop offset="80%" stopColor="#e0d0f0"/>
            <stop offset="100%" stopColor="#b8a8d0"/>
          </linearGradient>
          <linearGradient id="cl_window_sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#040820"/>
            <stop offset="60%" stopColor="#080c28"/>
            <stop offset="100%" stopColor="#0c1440"/>
          </linearGradient>
          <radialGradient id="cl_chandelier_glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe878" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#d4a010" stopOpacity="0"/>
          </radialGradient>
          <filter id="cl_glow">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="cl_glow_soft">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <pattern id="cl_floor_tile" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect width="32" height="32" fill="#180c38"/>
            <rect width="16" height="16" fill="#1c1040"/>
            <rect x="16" y="16" width="16" height="16" fill="#1c1040"/>
            <rect width="32" height="32" fill="none" stroke="rgba(212,175,55,0.08)" strokeWidth="0.5"/>
          </pattern>
          <linearGradient id="cl_floor_fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.7)"/>
          </linearGradient>
        </defs>

        {/* ── Ceiling ── */}
        <rect width="400" height="60" fill="#1e1248"/>
        {/* Coffered panels */}
        {[0,1,2,3].map(col => [0,1].map(row => (
          <g key={`${col}-${row}`}>
            <rect x={col*100+6} y={row*28+4} width="88" height="24" rx="2" fill="none" stroke="rgba(212,175,55,0.14)" strokeWidth="1.5"/>
            <rect x={col*100+11} y={row*28+8} width="78" height="16" rx="1" fill="rgba(212,175,55,0.04)"/>
          </g>
        )))}
        {/* Ceiling molding */}
        <rect y="58" width="400" height="7" fill="#251450"/>
        <rect y="58" width="400" height="1.5" fill="url(#cl_gold)"/>
        <rect y="64" width="400" height="1" fill="rgba(212,175,55,0.3)"/>
        {/* Egg-and-dart */}
        {[...Array(25)].map((_,i) => (
          <g key={i} transform={`translate(${i*16+6},59)`}>
            <ellipse cx="5" cy="3.5" rx="4" ry="4.5" fill="rgba(212,175,55,0.18)"/>
            <line x1="0" y1="7" x2="10" y2="7" stroke="rgba(212,175,55,0.12)" strokeWidth="0.8"/>
          </g>
        ))}

        {/* ── Back arched window centre ── */}
        <rect x="155" y="68" width="90" height="120" fill="url(#cl_window_sky)" rx="2"/>
        {/* Gothic tracery arch */}
        <path d="M 155 68 Q 200 30 245 68" fill="url(#cl_window_sky)" stroke="rgba(212,175,55,0.5)" strokeWidth="2"/>
        {/* Tracery inner arcs */}
        <path d="M 163 68 Q 190 48 200 68 Q 210 48 237 68" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1.2"/>
        <path d="M 175 68 Q 190 55 200 68" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1"/>
        <path d="M 225 68 Q 215 55 200 68" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1"/>
        {/* Central mullion */}
        <line x1="200" y1="68" x2="200" y2="188" stroke="rgba(212,175,55,0.35)" strokeWidth="1.5"/>
        <line x1="155" y1="128" x2="245" y2="128" stroke="rgba(212,175,55,0.35)" strokeWidth="1.5"/>
        {/* Moon in window */}
        <circle cx="212" cy="95" r="13" fill="rgba(220,215,185,0.22)" filter="url(#cl_glow)"/>
        <circle cx="215" cy="92" r="10" fill="rgba(220,215,185,0.18)"/>
        {/* Stars */}
        {[[170,80],[180,95],[168,115],[186,142],[230,82],[222,105],[238,130],[165,155],[235,158]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={i%3===0?1.5:1} fill="rgba(255,255,200,0.7)" filter={i%4===0?"url(#cl_glow)":undefined}/>
        ))}
        {/* Window frame border */}
        <path d="M 155 68 Q 200 30 245 68 L 245 188 L 155 188 Z" fill="none" stroke="url(#cl_gold)" strokeWidth="2"/>
        {/* Window glow ambient */}
        <rect x="155" y="68" width="90" height="120" fill="url(#cl_chandelier_glow)" opacity="0.3"/>

        {/* ── Left windows (flanking) ── */}
        <rect x="30" y="75" width="58" height="100" fill="url(#cl_window_sky)" rx="2"/>
        <path d="M 30 75 Q 59 50 88 75" fill="url(#cl_window_sky)" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5"/>
        <line x1="59" y1="75" x2="59" y2="175" stroke="rgba(212,175,55,0.25)" strokeWidth="1"/>
        <line x1="30" y1="125" x2="88" y2="125" stroke="rgba(212,175,55,0.25)" strokeWidth="1"/>
        {[[38,90],[44,108],[38,128],[65,88],[72,112],[65,140]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="0.9" fill="rgba(255,255,200,0.6)"/>
        ))}
        <path d="M 30 75 Q 59 50 88 75 L 88 175 L 30 175 Z" fill="none" stroke="url(#cl_gold)" strokeWidth="1.5"/>

        {/* ── Right window ── */}
        <rect x="312" y="75" width="58" height="100" fill="url(#cl_window_sky)" rx="2"/>
        <path d="M 312 75 Q 341 50 370 75" fill="url(#cl_window_sky)" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5"/>
        <line x1="341" y1="75" x2="341" y2="175" stroke="rgba(212,175,55,0.25)" strokeWidth="1"/>
        <line x1="312" y1="125" x2="370" y2="125" stroke="rgba(212,175,55,0.25)" strokeWidth="1"/>
        {[[318,90],[325,115],[320,140],[350,88],[344,112],[352,140]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="0.9" fill="rgba(255,255,200,0.6)"/>
        ))}
        <path d="M 312 75 Q 341 50 370 75 L 370 175 L 312 175 Z" fill="none" stroke="url(#cl_gold)" strokeWidth="1.5"/>

        {/* ── Left wall pilaster pair ── */}
        {[10, 95].map((x,ci) => (
          <g key={ci}>
            {/* Shadow */}
            <rect x={x+2} y="65" width="22" height="170" fill="rgba(0,0,0,0.3)"/>
            {/* Shaft */}
            <rect x={x} y="65" width="22" height="170" fill="url(#cl_col_shaft)"/>
            {/* Flutes */}
            {[0,1,2,3].map(fi => <line key={fi} x1={x+4+fi*4} y1="70" x2={x+4+fi*4} y2="228" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>)}
            {/* Capital top */}
            <rect x={x-4} y="56" width="30" height="11" fill="url(#cl_marble)"/>
            <rect x={x-2} y="62" width="26" height="4" fill="rgba(212,175,55,0.3)"/>
            {/* Volute left */}
            <ellipse cx={x+1} cy="67" rx="4" ry="3" fill="rgba(212,175,55,0.4)"/>
            {/* Volute right */}
            <ellipse cx={x+21} cy="67" rx="4" ry="3" fill="rgba(212,175,55,0.4)"/>
            {/* Base */}
            <rect x={x-3} y="232" width="28" height="10" fill="url(#cl_marble)"/>
            <rect x={x-5} y="240" width="32" height="6" fill="url(#cl_marble)"/>
          </g>
        ))}

        {/* ── Right wall pilaster pair ── */}
        {[283, 368].map((x,ci) => (
          <g key={ci}>
            <rect x={x+2} y="65" width="22" height="170" fill="rgba(0,0,0,0.3)"/>
            <rect x={x} y="65" width="22" height="170" fill="url(#cl_col_shaft)"/>
            {[0,1,2,3].map(fi => <line key={fi} x1={x+4+fi*4} y1="70" x2={x+4+fi*4} y2="228" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>)}
            <rect x={x-4} y="56" width="30" height="11" fill="url(#cl_marble)"/>
            <rect x={x-2} y="62" width="26" height="4" fill="rgba(212,175,55,0.3)"/>
            <ellipse cx={x+1} cy="67" rx="4" ry="3" fill="rgba(212,175,55,0.4)"/>
            <ellipse cx={x+21} cy="67" rx="4" ry="3" fill="rgba(212,175,55,0.4)"/>
            <rect x={x-3} y="232" width="28" height="10" fill="url(#cl_marble)"/>
            <rect x={x-5} y="240" width="32" height="6" fill="url(#cl_marble)"/>
          </g>
        ))}

        {/* ── Curtains ── */}
        {/* Left curtain */}
        <path d="M 0 65 C 8 80 4 120 10 140 C 16 160 12 200 8 240 L 30 240 C 26 200 30 160 26 140 C 22 120 28 80 24 65 Z" fill="rgba(100,20,60,0.75)"/>
        <path d="M 4 65 C 12 85 8 125 14 145 C 18 165 14 205 10 240" fill="none" stroke="rgba(180,40,100,0.25)" strokeWidth="2"/>
        <path d="M 15 65 C 22 88 18 130 22 150 C 26 170 22 210 18 240" fill="none" stroke="rgba(180,40,100,0.2)" strokeWidth="1.5"/>
        {/* Tassel */}
        <circle cx="12" cy="160" r="5" fill="#c09020"/>
        <line x1="12" y1="165" x2="12" y2="175" stroke="#c09020" strokeWidth="2"/>
        <ellipse cx="12" cy="176" rx="3" ry="4" fill="#c09020"/>
        {/* Right curtain */}
        <path d="M 400 65 C 392 80 396 120 390 140 C 384 160 388 200 392 240 L 370 240 C 374 200 370 160 374 140 C 378 120 372 80 376 65 Z" fill="rgba(100,20,60,0.75)"/>
        <path d="M 396 65 C 388 85 392 125 386 145 C 382 165 386 205 390 240" fill="none" stroke="rgba(180,40,100,0.25)" strokeWidth="2"/>
        <circle cx="388" cy="160" r="5" fill="#c09020"/>
        <line x1="388" y1="165" x2="388" y2="175" stroke="#c09020" strokeWidth="2"/>
        <ellipse cx="388" cy="176" rx="3" ry="4" fill="#c09020"/>

        {/* ── Picture rail ── */}
        <rect y="64" width="400" height="4" fill="url(#cl_gold)"/>

        {/* ── Floor in perspective ── */}
        <rect x="0" y="235" width="400" height="45" fill="url(#cl_floor_tile)"/>
        <rect x="0" y="235" width="400" height="45" fill="url(#cl_floor_fade)"/>
        <rect y="234" width="400" height="2.5" fill="url(#cl_gold)"/>
        {/* Floor reflection */}
        <rect x="0" y="236" width="400" height="44" fill="rgba(100,60,180,0.06)"/>
        {/* Skirting board */}
        <rect y="234" width="400" height="6" fill="#251450"/>

        {/* ── Chandelier (central) ── */}
        <g transform="translate(200,0)">
          {/* Chain */}
          {[0,4,8,12,16].map(y=><rect key={y} x="-2" y={y} width="4" height="3" rx="1.5" fill="url(#cl_gold_v)"/>)}
          {/* Top ceiling rose */}
          <ellipse cx="0" cy="20" rx="18" ry="8" fill="url(#cl_gold)"/>
          <circle cx="0" cy="18" r="5" fill="#e8c030"/>
          {/* Canopy */}
          <path d="M -18 20 C -16 32 -20 48 -18 58 L 18 58 C 20 48 16 32 18 20 Z" fill="url(#cl_gold_v)"/>
          <ellipse cx="0" cy="58" rx="18" ry="7" fill="url(#cl_gold)"/>
          {/* Tier 2 */}
          <path d="M -12 64 C -14 72 -16 82 -14 88 L 14 88 C 16 82 14 72 12 64 Z" fill="url(#cl_gold_v)"/>
          <ellipse cx="0" cy="88" rx="14" ry="6" fill="url(#cl_gold)"/>
          {/* Ambient glow */}
          <circle cx="0" cy="75" r="55" fill="url(#cl_chandelier_glow)" filter="url(#cl_glow_soft)"/>
          {/* 6 arms */}
          {[0,60,120,180,240,300].map((angle,i)=>{
            const r = (angle-90)*Math.PI/180
            const ax = Math.cos(r)*45, ay = Math.sin(r)*28
            return (
              <g key={i}>
                <path d={`M 0 72 C ${ax*0.4} ${72+ay*0.4+15} ${ax*0.75} ${72+ay*0.6+10} ${ax} ${72+ay}`} fill="none" stroke="url(#cl_gold)" strokeWidth="3"/>
                {/* Cup */}
                <circle cx={ax} cy={72+ay} r="5" fill="url(#cl_gold)"/>
                {/* Candle */}
                <rect x={ax-3} y={72+ay-15} width="6" height="12" rx="3" fill="#fff8e8"/>
                {/* Flame */}
                <path d={`M ${ax} ${72+ay-16} C ${ax-4} ${72+ay-24} ${ax+4} ${72+ay-28} ${ax} ${72+ay-34} C ${ax-2} ${72+ay-28} ${ax+2} ${72+ay-24} ${ax} ${72+ay-16}`} fill="#ffd050" filter="url(#cl_glow)"/>
                <path d={`M ${ax} ${72+ay-18} C ${ax-2} ${72+ay-24} ${ax+2} ${72+ay-26} ${ax} ${72+ay-30}`} fill="#fff8a0"/>
                {/* Per-candle glow */}
                <circle cx={ax} cy={72+ay-22} r="12" fill="rgba(255,220,80,0.12)" filter="url(#cl_glow_soft)"/>
              </g>
            )
          })}
          {/* Crystal drops from main tier */}
          {[...Array(12)].map((_,i)=>{
            const a=(i/12)*Math.PI*2, cx2=Math.cos(a)*16, cy2=58+Math.sin(a)*6+6
            return (
              <g key={i}>
                <line x1={cx2} y1={cy2} x2={cx2-1} y2={cy2+9} stroke="rgba(180,220,255,0.5)" strokeWidth="0.8"/>
                <ellipse cx={cx2-1} cy={cy2+11} rx="2.5" ry="3.5" fill="rgba(210,235,255,0.65)"/>
              </g>
            )
          })}
          {/* Crystal drops from tier 2 */}
          {[...Array(8)].map((_,i)=>{
            const a=(i/8)*Math.PI*2, cx3=Math.cos(a)*11, cy3=88+Math.sin(a)*4+5
            return (
              <g key={i}>
                <line x1={cx3} y1={cy3} x2={cx3} y2={cy3+8} stroke="rgba(180,220,255,0.4)" strokeWidth="0.8"/>
                <ellipse cx={cx3} cy={cy3+10} rx="2" ry="3" fill="rgba(200,230,255,0.55)"/>
              </g>
            )
          })}
        </g>

        {/* ── Gold wall sconces (flanking windows) ── */}
        {[128, 272].map((x,i)=>(
          <g key={i} transform={`translate(${x},120)`}>
            <rect x="-4" y="-18" width="8" height="20" rx="3" fill="url(#cl_gold)"/>
            <ellipse cx="0" cy="5" rx="8" ry="5" fill="url(#cl_gold)"/>
            {/* Flame */}
            <path d="M 0 0 C -3 -8 3 -12 0 -18 C -2 -12 2 -8 0 0" fill="#ffd050" filter="url(#cl_glow)"/>
            <circle cx="0" cy="-8" r="8" fill="rgba(255,220,80,0.15)" filter="url(#cl_glow_soft)"/>
          </g>
        ))}

        {/* ── Floating musical notes ── */}
        {['♪','♫','♩','♬','♪','♫'].map((note,i)=>(
          <text key={i} x={40+i*58} y={200+((i%3)*18)} fontSize={14+i%3*4} fill={`rgba(212,175,55,${0.25+i%3*0.1})`}
            style={{ animation:`float ${3+i*0.6}s ease-in-out ${i*0.5}s infinite` }}>{note}</text>
        ))}
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   COZY — Cabana com Lareira e Luzes
   ═══════════════════════════════════════════════════ */
function CozyScenery() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#0d0804' }}/>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="cz_wood_wall" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a0c06"/>
            <stop offset="30%" stopColor="#261408"/>
            <stop offset="60%" stopColor="#1e1007"/>
            <stop offset="100%" stopColor="#1a0c06"/>
          </linearGradient>
          <linearGradient id="cz_beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a2c10"/>
            <stop offset="50%" stopColor="#3a2008"/>
            <stop offset="100%" stopColor="#2e180a"/>
          </linearGradient>
          <linearGradient id="cz_stone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3c3030"/>
            <stop offset="50%" stopColor="#302626"/>
            <stop offset="100%" stopColor="#282020"/>
          </linearGradient>
          <linearGradient id="cz_fire" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ff4000"/>
            <stop offset="40%" stopColor="#ff8000"/>
            <stop offset="70%" stopColor="#ffc000"/>
            <stop offset="100%" stopColor="rgba(255,220,100,0)"/>
          </linearGradient>
          <linearGradient id="cz_fire2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ff6000"/>
            <stop offset="50%" stopColor="#ffa000"/>
            <stop offset="100%" stopColor="rgba(255,200,0,0)"/>
          </linearGradient>
          <radialGradient id="cz_fire_glow" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="rgba(255,100,0,0.4)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="cz_floor" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2a1608"/>
            <stop offset="15%" stopColor="#3a2210"/>
            <stop offset="30%" stopColor="#2e1c0c"/>
            <stop offset="50%" stopColor="#381e0e"/>
            <stop offset="70%" stopColor="#2e1c0c"/>
            <stop offset="85%" stopColor="#3a2210"/>
            <stop offset="100%" stopColor="#2a1608"/>
          </linearGradient>
          <filter id="cz_warm">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Background wall */}
        <rect width="400" height="240" fill="url(#cz_wood_wall)"/>
        {/* Horizontal wood planks */}
        {[...Array(14)].map((_,i)=>(
          <g key={i}>
            <rect x="0" y={i*17} width="400" height="16" fill={i%2===0?"rgba(30,16,8,0.3)":"rgba(40,22,10,0.2)"}/>
            <line x1="0" y1={i*17+16} x2="400" y2={i*17+16} stroke="rgba(0,0,0,0.4)" strokeWidth="1"/>
          </g>
        ))}
        {/* Wood grain lines */}
        {[...Array(8)].map((_,i)=>(
          <path key={i} d={`M ${50+i*44} 0 C ${55+i*44} 40 ${48+i*44} 80 ${53+i*44} 120 C ${50+i*44} 160 ${56+i*44} 200 ${51+i*44} 240`}
            fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5"/>
        ))}

        {/* Ceiling beams */}
        {[0,1,2].map(i=>(
          <g key={i}>
            <rect x={i*140} y="0" width="80" height="30" fill="url(#cz_beam)"/>
            <rect x={i*140} y="28" width="80" height="3" fill="rgba(0,0,0,0.4)"/>
            <line x1={i*140} y1="0" x2={i*140} y2="30" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
            <line x1={i*140+80} y1="0" x2={i*140+80} y2="30" stroke="rgba(255,200,120,0.05)" strokeWidth="1"/>
          </g>
        ))}

        {/* ── Fireplace (left) ── */}
        <g transform="translate(0,80)">
          {/* Outer stone surround */}
          <path d="M 0 155 L 0 0 L 12 0 L 12 8 L 8 8 L 8 130 L 82 130 L 82 8 L 78 8 L 78 0 L 90 0 L 90 155 Z" fill="url(#cz_stone)"/>
          {/* Arch */}
          <path d="M 8 80 L 8 0 Q 45 -30 82 0 L 82 80 Z" fill="#1a1010"/>
          <path d="M 8 80 L 8 0 Q 45 -30 82 0 L 82 80" fill="none" stroke="rgba(80,60,50,0.5)" strokeWidth="1.5"/>
          {/* Stone blocks texture */}
          {[0,1,2].map(row=>[0,1,2].map(col=>(
            <rect key={`${row}-${col}`} x={col*30} y={row*28+28} width="29" height="27" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
          )))}
          {/* Hearth */}
          <rect x="0" y="128" width="90" height="14" fill="#282020"/>
          <rect x="0" y="140" width="90" height="6" fill="#1a1414"/>
          <rect x="0" y="145" width="90" height="10" fill="url(#cz_stone)"/>
          {/* Fire glow background */}
          <rect x="10" y="-20" width="70" height="100" fill="url(#cz_fire_glow)"/>
          {/* Logs */}
          <ellipse cx="30" cy="125" rx="16" ry="6" fill="#2a1a0a"/>
          <ellipse cx="60" cy="125" rx="16" ry="6" fill="#221408"/>
          <ellipse cx="45" cy="122" rx="14" ry="5" fill="#301a0c"/>
          {/* Main flames */}
          <path d="M 20 125 C 15 100 25 75 30 50 C 35 30 40 15 45 0 C 50 15 55 30 60 50 C 65 75 75 100 70 125 Z" fill="url(#cz_fire)" style={{animation:'float 1.1s ease-in-out infinite'}}/>
          <path d="M 28 125 C 25 105 32 82 35 62 C 38 45 42 28 45 12 C 48 28 52 45 55 62 C 58 82 65 105 62 125 Z" fill="url(#cz_fire2)" style={{animation:'float 0.85s ease-in-out 0.2s infinite'}}/>
          <path d="M 35 125 C 33 110 38 95 40 80 C 42 65 44 52 45 40 C 46 52 48 65 50 80 C 52 95 57 110 55 125 Z" fill="rgba(255,240,100,0.8)" style={{animation:'float 0.7s ease-in-out 0.1s infinite'}}/>
          {/* Fire top glow */}
          <ellipse cx="45" cy="40" rx="22" ry="15" fill="rgba(255,160,30,0.25)" filter="url(#cz_warm)"/>
          {/* Mantelpiece top */}
          <rect x="-4" y="-8" width="98" height="10" fill="url(#cz_beam)"/>
          <rect x="-6" y="-14" width="102" height="8" fill="rgba(60,36,16,0.9)"/>
          {/* Items on mantel */}
          {/* Candle */}
          <rect x="4" y="-30" width="7" height="18" rx="3.5" fill="#fff8e8"/>
          <path d="M 7.5 -32 C 4 -40 11 -44 7.5 -50 C 5 -44 10 -40 7.5 -32" fill="#ffd050" filter="url(#cz_warm)"/>
          <circle cx="7.5" cy="-40" r="7" fill="rgba(255,200,50,0.18)" filter="url(#cz_warm)"/>
          {/* Small pot */}
          <path d="M 74 -22 C 72 -22 70 -16 70 -14 L 84 -14 C 84 -16 82 -22 80 -22 C 80 -24 74 -24 74 -22 Z" fill="#5a3820"/>
          <ellipse cx="77" cy="-14" rx="7" ry="2.5" fill="#6a4828"/>
          {/* Clock */}
          <rect x="60" y="-32" width="16" height="20" rx="2" fill="rgba(40,24,12,0.9)"/>
          <circle cx="68" cy="-22" r="6" fill="none" stroke="rgba(200,160,80,0.6)" strokeWidth="1"/>
          <line x1="68" y1="-22" x2="68" y2="-26" stroke="rgba(200,160,80,0.8)" strokeWidth="1"/>
          <line x1="68" y1="-22" x2="71" y2="-22" stroke="rgba(200,160,80,0.8)" strokeWidth="1"/>
        </g>

        {/* Fireplace ambient warm glow (left) */}
        <rect x="0" y="0" width="200" height="280" fill="url(cz_fire_glow)" opacity="0.3"/>
        <ellipse cx="45" cy="200" rx="140" ry="100" fill="rgba(255,80,10,0.07)" filter="url(#cz_warm)"/>

        {/* ── Bookshelf (right) ── */}
        <g transform="translate(310,40)">
          {/* Frame */}
          <rect x="0" y="0" width="90" height="180" fill="#1e1008"/>
          <rect x="0" y="0" width="90" height="180" fill="none" stroke="#3a2010" strokeWidth="3"/>
          {/* Shelves */}
          {[0,1,2,3].map(shelf=>(
            <g key={shelf}>
              <rect x="0" y={shelf*44+41} width="90" height="4" fill="#3a2010"/>
              {/* Books on shelf */}
              {[
                {w:10,h:32,c:'#c0402a',t:shelf*44+10},
                {w:8,h:28,c:'#2060a0',t:shelf*44+13},
                {w:12,h:35,c:'#208040',t:shelf*44+7},
                {w:6,h:26,c:'#c08020',t:shelf*44+15},
                {w:10,h:30,c:'#803080',t:shelf*44+11},
                {w:8,h:34,c:'#204080',t:shelf*44+8},
                {w:6,h:25,c:'#a02040',t:shelf*44+16},
                {w:10,h:31,c:'#205060',t:shelf*44+10},
              ].map((book,bi)=>{
                const bx = bi*11+2
                return (
                  <g key={bi}>
                    <rect x={bx} y={book.t} width={book.w-1} height={book.h} fill={book.c}/>
                    <rect x={bx} y={book.t} width="1.5" height={book.h} fill="rgba(255,255,255,0.1)"/>
                    <rect x={bx+book.w-2} y={book.t} width="1.5" height={book.h} fill="rgba(0,0,0,0.2)"/>
                    {bi%3===0&&<text x={bx+2} y={book.t+book.h/2} fontSize="3" fill="rgba(255,255,255,0.3)" transform={`rotate(-90,${bx+4},${book.t+book.h/2})`}>{['AMOR','VIDA','MEMÓRIA'][bi%3]}</text>}
                  </g>
                )
              })}
            </g>
          ))}
          {/* Small plant on top */}
          <path d="M 35 5 C 30 -5 25 -15 20 -10 C 24 -4 28 0 35 5" fill="#205020"/>
          <path d="M 55 5 C 60 -5 65 -15 70 -10 C 66 -4 62 0 55 5" fill="#206020"/>
          <path d="M 45 5 C 45 -10 42 -20 45 -25 C 48 -20 45 -10 45 5" fill="#186818"/>
          <ellipse cx="45" cy="6" rx="8" ry="5" fill="#3a2010"/>
        </g>

        {/* ── Round window ── */}
        <circle cx="200" cy="60" r="35" fill="#040c20" stroke="url(#cz_beam)" strokeWidth="5"/>
        <circle cx="200" cy="60" r="32" fill="#050e28"/>
        {/* Window cross spokes */}
        <line x1="200" y1="28" x2="200" y2="92" stroke="#3a2010" strokeWidth="3"/>
        <line x1="168" y1="60" x2="232" y2="60" stroke="#3a2010" strokeWidth="3"/>
        {/* Stars in window */}
        {[[192,42],[210,38],[218,55],[207,70],[188,67],[196,50],[214,65]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={i%2===0?1.5:1} fill="rgba(255,255,200,0.8)"
            style={{animation:`pulse-heart ${1.5+i*0.3}s ease-in-out ${i*0.2}s infinite`}}/>
        ))}
        {/* Moon */}
        <circle cx="210" cy="48" r="8" fill="rgba(220,215,180,0.35)"/>
        <circle cx="212" cy="46" r="6" fill="rgba(220,215,180,0.28)"/>

        {/* ── String lights across top ── */}
        {/* Rope curves */}
        <path d="M 0 32 Q 100 50 200 32 Q 300 14 400 32" fill="none" stroke="rgba(80,50,20,0.6)" strokeWidth="1.5"/>
        {/* Bulbs */}
        {[...Array(11)].map((_,i)=>{
          const t=i/10, x=t*400
          const y=32+Math.sin(t*Math.PI)*18
          const colors=['#ff9040','#ffb830','#ff5030','#ffd030','#ff7020','#80d040']
          const c=colors[i%colors.length]
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={x} y2={y+8} stroke="rgba(80,50,20,0.5)" strokeWidth="1"/>
              <path d={`M ${x-4} ${y+8} C ${x-5} ${y+14} ${x+5} ${y+14} ${x+4} ${y+8} Z`} fill={c} style={{filter:`drop-shadow(0 0 5px ${c})`}}/>
              <ellipse cx={x} cy={y+8} rx="4" ry="2.5" fill="rgba(255,255,255,0.2)"/>
            </g>
          )
        })}

        {/* ── Floor planks ── */}
        <rect x="0" y="238" width="400" height="42" fill="url(#cz_floor)"/>
        {/* Plank lines */}
        {[0,1,2,3,4].map(i=><line key={i} x1={i*80+40} y1="238" x2={i*80} y2="280" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>)}
        {[...Array(7)].map((_,i)=><line key={i} x1="0" y1={238+i*6} x2="400" y2={238+i*6} stroke="rgba(0,0,0,0.15)" strokeWidth="0.5"/>)}
        <rect x="0" y="237" width="400" height="2" fill="#3a2010"/>

        {/* Floating hearts */}
        {['❤','🤍','❤','💛','❤'].map((h,i)=>(
          <text key={i} x={260+i*20} y={180+i%2*30} fontSize={10+i%3*4} opacity={0.25}
            style={{animation:`float ${3+i*0.7}s ease-in-out ${i*0.5}s infinite`}}>{h}</text>
        ))}
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   RETRO — Pixel Art Arcade
   ═══════════════════════════════════════════════════ */
function RetroScenery() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#040410' }}/>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="rt_neon_pink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff2080"/>
            <stop offset="50%" stopColor="#ff60c0"/>
            <stop offset="100%" stopColor="#ff2080"/>
          </linearGradient>
          <linearGradient id="rt_neon_cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00c0ff"/>
            <stop offset="50%" stopColor="#40e8ff"/>
            <stop offset="100%" stopColor="#00c0ff"/>
          </linearGradient>
          <filter id="rt_neon_glow">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="rt_neon_glow2">
            <feGaussianBlur stdDeviation="8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <pattern id="rt_grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(0,200,255,0.08)" strokeWidth="0.5"/>
            <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(0,200,255,0.08)" strokeWidth="0.5"/>
          </pattern>
        </defs>

        {/* Grid background */}
        <rect width="400" height="280" fill="url(#rt_grid)"/>
        {/* Scanlines */}
        {[...Array(70)].map((_,i)=>(
          <line key={i} x1="0" y1={i*4} x2="400" y2={i*4} stroke="rgba(0,0,0,0.18)" strokeWidth="1.5"/>
        ))}

        {/* Top neon border */}
        <rect y="0" width="400" height="3" fill="url(#rt_neon_pink)" filter="url(#rt_neon_glow)"/>
        {/* Bottom neon border */}
        <rect y="237" width="400" height="3" fill="url(#rt_neon_cyan)" filter="url(#rt_neon_glow)"/>
        {/* Left border */}
        <rect x="0" y="0" width="3" height="280" fill="#ff2080" filter="url(#rt_neon_glow)" opacity="0.7"/>
        {/* Right border */}
        <rect x="397" y="0" width="3" height="280" fill="#00c0ff" filter="url(#rt_neon_glow)" opacity="0.7"/>

        {/* ── Arcade cabinet LEFT ── */}
        <g transform="translate(0,60)">
          {/* Body */}
          <path d="M 0 175 L 0 30 L 10 20 L 80 20 L 90 30 L 90 175 Z" fill="#0c0830"/>
          <path d="M 0 175 L 90 175 L 88 180 L 2 180 Z" fill="#0a0628"/>
          {/* Screen bezel */}
          <rect x="8" y="25" width="74" height="55" rx="3" fill="#060420"/>
          <rect x="11" y="28" width="68" height="49" rx="2" fill="#050318"/>
          {/* Screen */}
          <rect x="13" y="30" width="64" height="45" rx="1" fill="#030210"/>
          {/* Screen glow */}
          <rect x="13" y="30" width="64" height="45" rx="1" fill="rgba(255,50,120,0.08)"/>
          {/* Pixel art heart on screen */}
          {[
            [0,1,1,0,0,0,1,1,0],
            [1,1,1,1,0,1,1,1,1],
            [1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,0],
            [0,0,1,1,1,1,1,0,0],
            [0,0,0,1,1,1,0,0,0],
            [0,0,0,0,1,0,0,0,0],
          ].map((row,ri)=>row.map((cell,ci)=>cell?(
            <rect key={`${ri}-${ci}`} x={22+ci*5} y={34+ri*5} width="4" height="4" fill="#ff4090"/>
          ):null))}
          {/* Score display */}
          <rect x="12" y="78" width="66" height="6" fill="#060420"/>
          <text x="45" y="83" fontSize="5" fill="#ffff40" textAnchor="middle" fontFamily="monospace">SCORE 99999</text>
          {/* Marquee area */}
          <rect x="10" y="16" width="70" height="10" rx="2" fill="#100838"/>
          <text x="45" y="23.5" fontSize="6" fill="#ff60c0" textAnchor="middle" fontFamily="monospace" filter="url(#rt_neon_glow)">LOVE QUEST</text>
          {/* Control panel */}
          <rect x="5" y="138" width="80" height="40" rx="2" fill="#0a0628"/>
          {/* Joystick */}
          <circle cx="28" cy="155" r="8" fill="#1a1040"/>
          <circle cx="28" cy="155" r="5" fill="#ff4090"/>
          <rect x="25" y="150" width="6" height="12" rx="3" fill="#ff4090"/>
          {/* Buttons */}
          {([[52,148,'#ff4090'],[64,148,'#40e8ff'],[58,158,'#ffd040'],[70,158,'#80ff40']] as const).map(([bx,by,bc],bi)=>(
            <g key={bi}><circle cx={bx} cy={by} r="5" fill={bc} filter="url(#rt_neon_glow)"/><circle cx={bx-1} cy={by-1} r="2" fill="rgba(255,255,255,0.3)"/></g>
          ))}
        </g>

        {/* ── Arcade cabinet RIGHT ── */}
        <g transform="translate(310,80)">
          <path d="M 0 155 L 0 20 L 10 10 L 80 10 L 90 20 L 90 155 Z" fill="#0c0830"/>
          <rect x="8" y="15" width="74" height="55" rx="3" fill="#060420"/>
          <rect x="13" y="18" width="64" height="47" rx="1" fill="#040318" style={{boxShadow:'inset 0 0 10px rgba(0,200,255,0.3)'}}/>
          <rect x="13" y="18" width="64" height="47" rx="1" fill="rgba(0,200,255,0.05)"/>
          {/* Space invader style pixels */}
          {[
            [0,0,1,0,0,0,1,0,0],
            [0,0,0,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,0,0],
            [0,1,1,0,1,0,1,1,0],
            [1,1,1,1,1,1,1,1,1],
            [1,0,1,1,1,1,1,0,1],
            [1,0,1,0,0,0,1,0,1],
          ].map((row,ri)=>row.map((cell,ci)=>cell?(
            <rect key={`${ri}-${ci}`} x={22+ci*5} y={22+ri*4.5} width="4" height="3.5" fill="#40e8ff"/>
          ):null))}
          <rect x="8" y="74" width="74" height="8" rx="2" fill="#060420"/>
          <text x="45" y="80" fontSize="5" fill="#40e8ff" textAnchor="middle" fontFamily="monospace">HI-SCORE</text>
          <rect x="10" y="10" width="70" height="8" rx="2" fill="#0a0630"/>
          <text x="45" y="16" fontSize="5.5" fill="#40e8ff" textAnchor="middle" fontFamily="monospace" filter="url(#rt_neon_glow)">PIXEL LOVE</text>
          <rect x="5" y="120" width="80" height="35" rx="2" fill="#0a0628"/>
          {[[28,133,'#40e8ff'],[40,133,'#ff4090'],[34,143,'#ffd040'],[46,143,'#80ff40']].map(([bx,by,bc],bi)=>(
            <g key={bi}><circle cx={bx} cy={by} r="5" fill={bc as string} filter="url(#rt_neon_glow)"/></g>
          ))}
          <circle cx="68" cy="135" r="8" fill="#1a1040"/>
          <circle cx="68" cy="135" r="5" fill="#40e8ff"/>
        </g>

        {/* ── Neon signs on back wall ── */}
        {/* LOVE sign */}
        <g transform="translate(140,20)">
          <rect x="-5" y="-5" width="120" height="30" rx="4" fill="rgba(0,0,0,0.6)" stroke="rgba(255,50,120,0.3)" strokeWidth="1"/>
          <text x="55" y="18" fontSize="22" fill="#ff4090" textAnchor="middle" fontFamily="monospace" fontWeight="bold" filter="url(#rt_neon_glow2)">LOVE</text>
        </g>
        {/* ♥ pixel hearts floating */}
        {[...Array(7)].map((_,i)=>{
          const x=60+i*50, y=120+i%3*30
          return (
            <g key={i} style={{animation:`float ${2+i*0.4}s ease-in-out ${i*0.3}s infinite`}}>
              {/* Pixel heart 4x4 */}
              {[[0,1,1,0],[1,1,1,1],[1,1,1,1],[0,1,1,0],[0,0,1,0]].map((row,ri)=>row.map((cell,ci)=>cell?(
                <rect key={`${ri}-${ci}`} x={x+ci*4} y={y+ri*4} width="3" height="3" fill={i%2===0?"#ff4090":"#40e8ff"} opacity="0.6"/>
              ):null))}
            </g>
          )
        })}

        {/* ── Floor grid perspective ── */}
        <g transform="translate(0,240)">
          <rect width="400" height="40" fill="#030210"/>
          {/* Perspective grid lines */}
          {[0,1,2,3,4,5,6,7,8].map(i=>(
            <line key={i} x1={i*50} y1="0" x2="200" y2="-100" stroke={i%2===0?"rgba(255,50,120,0.3)":"rgba(0,200,255,0.3)"} strokeWidth="0.8"/>
          ))}
          {[0,1,2,3].map(i=>(
            <line key={i} x1="0" y1={i*12} x2="400" y2={i*12} stroke="rgba(100,50,200,0.2)" strokeWidth="0.5"/>
          ))}
        </g>

        {/* ── CRT vignette ── */}
        <radialGradient id="rt_vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)"/>
        </radialGradient>
        <rect width="400" height="280" fill="url(#rt_vignette)"/>

        {/* Neon score HUD */}
        <text x="200" y="20" fontSize="9" fill="#ffd040" textAnchor="middle" fontFamily="monospace" filter="url(#rt_neon_glow)">❤ ❤ ❤ P1 ❤ ❤ ❤</text>
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   ANIME — Sonho Romântico Sakura
   ═══════════════════════════════════════════════════ */
function AnimeScenery() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="an_sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0d1428"/>
            <stop offset="50%" stopColor="#121a30"/>
            <stop offset="100%" stopColor="#0e1020"/>
          </linearGradient>
          <linearGradient id="an_wall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#12192c"/>
            <stop offset="100%" stopColor="#0c1020"/>
          </linearGradient>
          <linearGradient id="an_curtain_l" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(220,160,190,0.6)"/>
            <stop offset="100%" stopColor="rgba(200,130,170,0.3)"/>
          </linearGradient>
          <linearGradient id="an_curtain_r" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(220,160,190,0.6)"/>
            <stop offset="100%" stopColor="rgba(200,130,170,0.3)"/>
          </linearGradient>
          <radialGradient id="an_moon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,252,230,0.5)"/>
            <stop offset="60%" stopColor="rgba(255,248,210,0.28)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <filter id="an_bloom">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="an_soft">
            <feGaussianBlur stdDeviation="2"/>
          </filter>
        </defs>

        {/* Wall background */}
        <rect width="400" height="280" fill="url(#an_wall)"/>
        {/* Subtle wall texture */}
        {[...Array(12)].map((_,i)=>(
          <line key={i} x1="0" y1={i*24} x2="400" y2={i*24} stroke="rgba(255,255,255,0.02)" strokeWidth="1"/>
        ))}

        {/* ── Large classroom window (centre) ── */}
        {/* Window recess */}
        <rect x="100" y="20" width="200" height="170" rx="4" fill="url(#an_sky)"/>
        {/* Sky gradient in window */}
        <rect x="104" y="24" width="192" height="162" fill="#080e1e"/>
        {/* Moon */}
        <circle cx="320" cy="55" r="22" fill="url(#an_moon)" filter="url(#an_bloom)"/>
        <circle cx="322" cy="52" r="16" fill="rgba(255,252,230,0.22)"/>
        {/* Stars in sky */}
        {[[120,35],[140,28],[165,42],[195,30],[220,38],[250,25],[280,40],[310,32],[338,48],[118,55],[142,62],[170,50],[235,55],[265,42],[295,58]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={i%4===0?2:i%3===0?1.5:1} fill="rgba(255,255,220,0.75)"
            style={{animation:`pulse-heart ${1.5+i%3*0.5}s ease-in-out ${i*0.15}s infinite`}} filter={i%5===0?"url(#an_bloom)":undefined}/>
        ))}
        {/* Cherry blossom tree visible through window */}
        {/* Main trunk */}
        <path d="M 260 185 C 258 160 262 130 255 100 C 252 80 248 60 250 40" fill="none" stroke="#5a3030" strokeWidth="4"/>
        <path d="M 255 100 C 240 90 225 75 218 60" fill="none" stroke="#5a3030" strokeWidth="3"/>
        <path d="M 250 120 C 268 110 280 95 290 80" fill="none" stroke="#4a2828" strokeWidth="2.5"/>
        <path d="M 255 80 C 245 65 250 50 252 36" fill="none" stroke="#4a2828" strokeWidth="2"/>
        {/* Sakura clusters */}
        {[
          [218,54],[228,44],[240,48],[225,62],[235,56],
          [248,34],[255,28],[265,38],[258,46],[270,44],
          [282,74],[292,68],[300,76],[288,82],[280,88],
          [212,70],[208,80],[216,76],
        ].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r={8+i%3*3} fill="rgba(255,160,190,0.35)" filter="url(#an_soft)"/>
            <circle cx={x} cy={y} r={5+i%3*2} fill="rgba(255,180,205,0.45)"/>
            {/* Petals */}
            {[0,72,144,216,288].map((angle,pi)=>{
              const r=(angle)*Math.PI/180, px=x+Math.cos(r)*5, py=y+Math.sin(r)*5
              return <ellipse key={pi} cx={px} cy={py} rx="3" ry="4.5" fill="rgba(255,190,210,0.6)" transform={`rotate(${angle},${px},${py})`}/>
            })}
            {/* Center */}
            <circle cx={x} cy={y} r="2" fill="rgba(255,220,180,0.8)"/>
          </g>
        ))}

        {/* Window frame */}
        <rect x="100" y="20" width="200" height="170" rx="4" fill="none" stroke="rgba(180,200,240,0.25)" strokeWidth="4"/>
        {/* Wooden frame */}
        <rect x="100" y="20" width="200" height="170" rx="4" fill="none" stroke="#2c3a50" strokeWidth="5"/>
        {/* Center mullion vertical */}
        <line x1="200" y1="20" x2="200" y2="190" stroke="#2c3a50" strokeWidth="4"/>
        {/* Center mullion horizontal */}
        <line x1="100" y1="105" x2="300" y2="105" stroke="#2c3a50" strokeWidth="4"/>
        {/* Frame inner highlight */}
        <rect x="102" y="22" width="196" height="166" rx="3" fill="none" stroke="rgba(200,220,255,0.1)" strokeWidth="1"/>

        {/* ── Curtains ── */}
        {/* Left curtain */}
        <path d="M 60 0 C 65 30 58 70 68 100 C 72 130 66 165 70 190 L 102 190 L 102 0 Z" fill="url(#an_curtain_l)"/>
        <path d="M 70 0 C 74 35 68 75 76 105 C 80 135 74 168 78 190" fill="none" stroke="rgba(240,180,210,0.3)" strokeWidth="2"/>
        <path d="M 82 0 C 86 38 80 78 88 108 C 90 138 84 170 86 190" fill="none" stroke="rgba(240,180,210,0.2)" strokeWidth="1.5"/>
        {/* Curtain tie-back */}
        <ellipse cx="85" cy="120" rx="8" ry="5" fill="rgba(220,170,190,0.5)" transform="rotate(-20 85 120)"/>
        {/* Right curtain */}
        <path d="M 340 0 C 335 30 342 70 332 100 C 328 130 334 165 330 190 L 298 190 L 298 0 Z" fill="url(#an_curtain_r)"/>
        <path d="M 330 0 C 326 35 332 75 324 105 C 320 135 326 168 322 190" fill="none" stroke="rgba(240,180,210,0.3)" strokeWidth="2"/>
        <ellipse cx="315" cy="120" rx="8" ry="5" fill="rgba(220,170,190,0.5)" transform="rotate(20 315 120)"/>

        {/* ── Falling sakura petals (animated) ── */}
        {[...Array(16)].map((_,i)=>{
          const x=20+i*24, y=(i*37)%200, size=6+i%4*3
          const hue=i%3===0?'rgba(255,160,190,0.7)':i%3===1?'rgba(255,190,210,0.65)':'rgba(255,200,220,0.6)'
          return (
            <g key={i} style={{animation:`float ${2.5+i*0.35}s ease-in-out ${i*0.28}s infinite`, transformOrigin:`${x}px ${y}px`}}>
              {[0,72,144,216,288].map((angle,pi)=>{
                const r=angle*Math.PI/180
                return <ellipse key={pi} cx={x+Math.cos(r)*size*0.6} cy={y+Math.sin(r)*size*0.6} rx={size*0.35} ry={size*0.55} fill={hue} transform={`rotate(${angle},${x+Math.cos(r)*size*0.6},${y+Math.sin(r)*size*0.6})`}/>
              })}
              <circle cx={x} cy={y} r={size*0.2} fill="rgba(255,220,180,0.7)"/>
            </g>
          )
        })}

        {/* ── Anime sparkles ── */}
        {[
          [50,80],[370,60],[380,140],[35,160],[60,200],[350,190],
        ].map(([x,y],i)=>(
          <g key={i} style={{animation:`pulse-heart ${1.2+i*0.4}s ease-in-out ${i*0.3}s infinite`}}>
            <line x1={x-8} y1={y} x2={x+8} y2={y} stroke="rgba(255,220,255,0.6)" strokeWidth="1.5"/>
            <line x1={x} y1={y-8} x2={x} y2={y+8} stroke="rgba(255,220,255,0.6)" strokeWidth="1.5"/>
            <line x1={x-5} y1={y-5} x2={x+5} y2={y+5} stroke="rgba(255,220,255,0.4)" strokeWidth="1"/>
            <line x1={x+5} y1={y-5} x2={x-5} y2={y+5} stroke="rgba(255,220,255,0.4)" strokeWidth="1"/>
            <circle cx={x} cy={y} r="2" fill="rgba(255,240,255,0.8)"/>
          </g>
        ))}

        {/* ── Wainscoting / lower wall ── */}
        <rect x="0" y="190" width="400" height="50" fill="#0c1020"/>
        <rect x="0" y="190" width="400" height="2" fill="rgba(180,200,240,0.15)"/>
        {/* Baseboard */}
        <rect x="0" y="236" width="400" height="8" fill="#0e1428"/>
        <rect x="0" y="236" width="400" height="1.5" fill="rgba(180,200,240,0.1)"/>
        {/* Floor */}
        <rect x="0" y="242" width="400" height="38" fill="#080c18"/>
        {[...Array(5)].map((_,i)=><line key={i} x1="0" y1={242+i*8} x2="400" y2={242+i*8} stroke="rgba(180,200,255,0.04)" strokeWidth="1"/>)}
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   DISNEY — Magia do Castelo Encantado
   ═══════════════════════════════════════════════════ */
function DisneyScenery() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="dn_sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020610"/>
            <stop offset="45%" stopColor="#040a1c"/>
            <stop offset="100%" stopColor="#060c24"/>
          </linearGradient>
          <radialGradient id="dn_moon_glow" cx="65%" cy="20%" r="25%">
            <stop offset="0%" stopColor="rgba(220,210,180,0.12)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <linearGradient id="dn_castle" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1035"/>
            <stop offset="100%" stopColor="#0e0a20"/>
          </linearGradient>
          <linearGradient id="dn_curtain_l" x1="100%" y1="0%" x2="0%" y2="10%">
            <stop offset="0%" stopColor="rgba(80,20,110,0.85)"/>
            <stop offset="100%" stopColor="rgba(50,10,80,0.6)"/>
          </linearGradient>
          <linearGradient id="dn_curtain_r" x1="0%" y1="0%" x2="100%" y2="10%">
            <stop offset="0%" stopColor="rgba(80,20,110,0.85)"/>
            <stop offset="100%" stopColor="rgba(50,10,80,0.6)"/>
          </linearGradient>
          <filter id="dn_star_glow">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="dn_magic">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Night sky */}
        <rect width="400" height="280" fill="url(#dn_sky)"/>
        {/* Moon glow */}
        <rect width="400" height="280" fill="url(#dn_moon_glow)"/>

        {/* ── Constellations ── */}
        {/* Constellation lines */}
        <g stroke="rgba(200,200,255,0.08)" strokeWidth="0.7">
          <line x1="50" y1="40" x2="80" y2="25"/><line x1="80" y1="25" x2="110" y2="45"/>
          <line x1="110" y1="45" x2="95" y2="65"/><line x1="95" y1="65" x2="70" y2="55"/>
          <line x1="70" y1="55" x2="50" y2="40"/>
          <line x1="280" y1="30" x2="310" y2="20"/><line x1="310" y1="20" x2="340" y2="35"/>
          <line x1="340" y1="35" x2="330" y2="55"/><line x1="330" y1="55" x2="295" y2="50"/>
        </g>

        {/* Stars (dense) */}
        {[...Array(50)].map((_,i)=>{
          const x=(i*73+13)%395, y=(i*47+7)%180
          const s=i%7===0?2.5:i%4===0?2:1.2
          return <circle key={i} cx={x} cy={y} r={s} fill={`rgba(${200+i%55},${200+i%55},${220+i%35},${0.4+i%5*0.1})`}
            filter={i%8===0?"url(#dn_star_glow)":undefined}
            style={{animation:`pulse-heart ${1.5+i%4*0.6}s ease-in-out ${i*0.08}s infinite`}}/>
        })}

        {/* Moon */}
        <circle cx="310" cy="50" r="28" fill="rgba(230,225,200,0.18)" filter="url(#dn_star_glow)"/>
        <circle cx="312" cy="48" r="22" fill="rgba(230,225,200,0.14)"/>
        <circle cx="313" cy="47" r="18" fill="rgba(235,230,205,0.1)"/>
        {/* Moon craters */}
        <circle cx="308" cy="52" r="4" fill="rgba(0,0,0,0.08)"/>
        <circle cx="318" cy="44" r="2.5" fill="rgba(0,0,0,0.06)"/>
        <circle cx="303" cy="44" r="2" fill="rgba(0,0,0,0.05)"/>

        {/* ── Elaborate castle silhouette ── */}
        <g fill="url(#dn_castle)" opacity="0.45">
          {/* Base wall */}
          <rect x="80" y="155" width="240" height="80"/>
          {/* Main central tower */}
          <rect x="175" y="100" width="50" height="60"/>
          {/* Central spire */}
          <polygon points="200,45 185,100 215,100"/>
          {/* Spire flag */}
          <line x1="200" y1="45" x2="200" y2="35" stroke="rgba(255,200,60,0.4)" strokeWidth="1.5"/>
          <polygon points="200,35 208,38 200,41" fill="rgba(255,200,60,0.4)"/>
          {/* Left tower */}
          <rect x="130" y="115" width="36" height="45"/>
          <polygon points="148,75 136,115 160,115"/>
          {/* Left tower battlement */}
          {[136,142,148,154,160].map((bx,i)=><rect key={i} x={bx} y="113" width="4" height="6"/>)}
          {/* Far left tower */}
          <rect x="88" y="130" width="28" height="30"/>
          <polygon points="102,100 90,130 114,130"/>
          {/* Right tower */}
          <rect x="234" y="115" width="36" height="45"/>
          <polygon points="252,75 240,115 264,115"/>
          {[240,246,252,258,264].map((bx,i)=><rect key={i} x={bx} y="113" width="4" height="6"/>)}
          {/* Far right tower */}
          <rect x="284" y="130" width="28" height="30"/>
          <polygon points="298,100 286,130 310,130"/>
          {/* Battlements on main wall */}
          {[...Array(12)].map((_,i)=><rect key={i} x={90+i*14} y="153" width="8" height="8"/>)}
          {/* Windows lit up */}
        </g>
        {/* Castle lit windows */}
        {[
          [192,115],[204,115],[192,132],[204,132],
          [138,125],[151,125],[242,125],[255,125],
          [96,135],[107,135],[290,135],[301,135],
        ].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="7" height="10" rx="3" fill="rgba(255,220,120,0.3)" filter="url(#dn_star_glow)"/>
        ))}
        {/* Castle moat/base */}
        <rect x="78" y="232" width="244" height="6" rx="3" fill="rgba(20,10,50,0.5)"/>

        {/* ── Ornate curtains ── */}
        {/* Left curtain */}
        <path d="M 0 0 C 8 40 2 90 12 130 C 18 165 10 200 14 235 L 60 235 L 60 0 Z" fill="url(#dn_curtain_l)"/>
        {/* Left curtain folds */}
        <path d="M 8 0 C 16 45 10 95 20 135 C 26 170 18 205 22 235" fill="none" stroke="rgba(150,60,200,0.3)" strokeWidth="2"/>
        <path d="M 22 0 C 30 50 24 100 34 140 C 40 175 32 210 36 235" fill="none" stroke="rgba(150,60,200,0.2)" strokeWidth="1.5"/>
        <path d="M 40 0 C 48 55 42 105 50 145" fill="none" stroke="rgba(150,60,200,0.15)" strokeWidth="1"/>
        {/* Left tie-back */}
        <ellipse cx="45" cy="145" rx="10" ry="6" fill="rgba(200,160,80,0.5)" transform="rotate(-25 45 145)"/>
        <line x1="35" y1="148" x2="55" y2="142" stroke="rgba(200,160,80,0.4)" strokeWidth="2"/>
        {/* Gold tassel */}
        <circle cx="45" cy="155" r="4" fill="rgba(200,160,40,0.6)"/>
        {[...Array(5)].map((_,i)=><line key={i} x1={42+i*1.5} y1="159" x2={41+i} y2="170" stroke="rgba(200,160,40,0.5)" strokeWidth="1"/>)}

        {/* Right curtain */}
        <path d="M 400 0 C 392 40 398 90 388 130 C 382 165 390 200 386 235 L 340 235 L 340 0 Z" fill="url(#dn_curtain_r)"/>
        <path d="M 392 0 C 384 45 390 95 380 135 C 374 170 382 205 378 235" fill="none" stroke="rgba(150,60,200,0.3)" strokeWidth="2"/>
        <path d="M 378 0 C 370 50 376 100 366 140 C 360 175 368 210 364 235" fill="none" stroke="rgba(150,60,200,0.2)" strokeWidth="1.5"/>
        <ellipse cx="355" cy="145" rx="10" ry="6" fill="rgba(200,160,80,0.5)" transform="rotate(25 355 145)"/>
        <line x1="345" y1="142" x2="365" y2="148" stroke="rgba(200,160,80,0.4)" strokeWidth="2"/>
        <circle cx="355" cy="155" r="4" fill="rgba(200,160,40,0.6)"/>
        {[...Array(5)].map((_,i)=><line key={i} x1={352+i*1.5} y1="159" x2={351+i} y2="170" stroke="rgba(200,160,40,0.5)" strokeWidth="1"/>)}

        {/* Curtain top swag (elaborate) */}
        <path d="M 0 0 Q 40 28 80 12 Q 120 28 160 10 Q 200 28 240 10 Q 280 28 320 12 Q 360 28 400 12 L 400 0 Z" fill="rgba(60,15,90,0.8)"/>
        {/* Swag gold trim */}
        <path d="M 0 12 Q 40 28 80 12 Q 120 28 160 10 Q 200 28 240 10 Q 280 28 320 12 Q 360 28 400 12" fill="none" stroke="rgba(200,160,40,0.5)" strokeWidth="1.5"/>
        {/* Swag tassels */}
        {[80,160,240,320].map((x,i)=>(
          <g key={i}>
            <circle cx={x} cy="28" r="3.5" fill="rgba(200,160,40,0.6)"/>
            {[...Array(4)].map((_,j)=><line key={j} x1={x-3+j*2} y1="31" x2={x-4+j*2.5} y2="42" stroke="rgba(200,160,40,0.4)" strokeWidth="0.8"/>)}
            <ellipse cx={x} cy="43" rx="5" ry="2" fill="rgba(200,160,40,0.3)"/>
          </g>
        ))}

        {/* ── Magic sparkle trail ── */}
        {[...Array(12)].map((_,i)=>{
          const x=120+i*14, y=80+Math.sin(i*0.8)*30, s=3+i%3*2
          return (
            <g key={i} style={{animation:`pulse-heart ${1+i*0.15}s ease-in-out ${i*0.12}s infinite`}}>
              <circle cx={x} cy={y} r={s} fill="rgba(255,220,80,0.7)" filter="url(#dn_star_glow)"/>
              <line x1={x-s*1.5} y1={y} x2={x+s*1.5} y2={y} stroke="rgba(255,220,80,0.4)" strokeWidth="0.8"/>
              <line x1={x} y1={y-s*1.5} x2={x} y2={y+s*1.5} stroke="rgba(255,220,80,0.4)" strokeWidth="0.8"/>
            </g>
          )
        })}

        {/* Fireflies */}
        {[...Array(8)].map((_,i)=>(
          <circle key={i} cx={(i*60+30)%380} cy={190+(i%3)*20} r="2.5" fill="rgba(180,255,100,0.6)"
            filter="url(#dn_star_glow)"
            style={{animation:`float ${2+i*0.7}s ease-in-out ${i*0.4}s infinite`}}/>
        ))}

        {/* Floor */}
        <rect x="0" y="235" width="400" height="45" fill="#04040e"/>
        {/* Floor shine */}
        {[...Array(4)].map((_,i)=>(
          <ellipse key={i} cx={80+i*80} cy="238" rx="30" ry="3" fill="rgba(255,220,80,0.04)"/>
        ))}
        <rect x="0" y="234" width="400" height="2" fill="rgba(160,100,200,0.2)"/>
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   STUDIOS — Lo-Fi Study Café
   ═══════════════════════════════════════════════════ */
function StudiosScenery() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="st_wall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#080e18"/>
            <stop offset="100%" stopColor="#0c1420"/>
          </linearGradient>
          <linearGradient id="st_window_sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#060c18"/>
            <stop offset="100%" stopColor="#081018"/>
          </linearGradient>
          <radialGradient id="st_lamp_glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(200,140,40,0.25)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <radialGradient id="st_monitor_glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(80,160,200,0.15)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
          <filter id="st_warm_glow">
            <feGaussianBlur stdDeviation="8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="st_soft_glow">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <pattern id="st_rain" x="0" y="0" width="10" height="20" patternUnits="userSpaceOnUse">
            <line x1="5" y1="0" x2="4" y2="10" stroke="rgba(120,180,255,0.2)" strokeWidth="0.8"/>
          </pattern>
        </defs>

        {/* Wall */}
        <rect width="400" height="280" fill="url(#st_wall)"/>

        {/* ── Bookshelf LEFT ── */}
        <g transform="translate(0,20)">
          <rect x="0" y="0" width="80" height="195" fill="#0c1018"/>
          <rect x="0" y="0" width="80" height="195" fill="none" stroke="#141e2c" strokeWidth="2"/>
          {/* 4 shelves */}
          {[0,1,2,3].map(s=>(
            <g key={s}>
              <rect x="0" y={s*48+44} width="80" height="3.5" fill="#1a2435"/>
              {/* Books */}
              {[
                {w:10,h:38,c:'#c84040'},{w:7,h:30,c:'#4060c8'},{w:12,h:42,c:'#30a850'},
                {w:8,h:35,c:'#c07830'},{w:9,h:38,c:'#8030a0'},{w:7,h:32,c:'#3080b0'},
                {w:6,h:28,c:'#b03050'},
              ].map((b,bi)=>{
                const bx=bi*(b.w+1)+1
                const by=s*48+44-b.h
                return (
                  <g key={bi}>
                    <rect x={bx} y={by} width={b.w} height={b.h} fill={b.c}/>
                    <rect x={bx} y={by} width="1.5" height={b.h} fill="rgba(255,255,255,0.12)"/>
                    <rect x={bx+b.w-1.5} y={by} width="1.5" height={b.h} fill="rgba(0,0,0,0.25)"/>
                    {bi%2===0&&<rect x={bx+1} y={by+4} width={b.w-2} height="1" fill="rgba(255,255,255,0.15)"/>}
                  </g>
                )
              })}
            </g>
          ))}
          {/* Plant on top */}
          <rect x="28" y="-12" width="24" height="18" rx="2" fill="#1a3018"/>
          <ellipse cx="40" cy="-12" rx="12" ry="5" fill="#1e3820"/>
          {/* Leaves */}
          <path d="M 40 -12 C 30 -28 22 -35 18 -30 C 24 -25 32 -18 40 -12" fill="#205028"/>
          <path d="M 40 -12 C 50 -28 58 -35 62 -30 C 56 -25 48 -18 40 -12" fill="#1e4820"/>
          <path d="M 40 -12 C 38 -32 36 -40 40 -44 C 44 -40 42 -32 40 -12" fill="#1a4020"/>
          {/* Trinkets on shelf */}
          <ellipse cx="70" cy="5" rx="8" ry="5" fill="#101820"/>
          <ellipse cx="70" cy="5" rx="6" ry="3.5" fill="#1a2a38"/>
          <circle cx="70" cy="4" r="2.5" fill="#204060" filter="url(#st_soft_glow)"/>
        </g>

        {/* ── Rainy window (centre) ── */}
        <g transform="translate(110,30)">
          {/* Frame */}
          <rect x="0" y="0" width="180" height="150" rx="4" fill="#0e1420"/>
          <rect x="0" y="0" width="180" height="150" rx="4" fill="none" stroke="#1e2e44" strokeWidth="5"/>
          {/* Glass */}
          <rect x="4" y="4" width="172" height="142" rx="2" fill="url(#st_window_sky)"/>
          {/* City light blobs outside */}
          {[[30,130],[60,120],[90,135],[120,118],[150,130],[165,122]].map(([x,y],i)=>(
            <ellipse key={i} cx={x} cy={y} rx={12+i%3*6} ry="4" fill={`rgba(${100+i*20},${120+i*15},255,0.06)`}/>
          ))}
          {/* Rain pattern */}
          <rect x="4" y="4" width="172" height="142" fill="url(#st_rain)"/>
          {/* Animated rain drops */}
          {[...Array(14)].map((_,i)=>(
            <line key={i} x1={10+i*12} y1={-5+((i*23)%150)} x2={8+i*12} y2={8+((i*23)%150)}
              stroke="rgba(140,200,255,0.25)" strokeWidth="1"
              style={{animation:`float ${0.6+i*0.08}s ease-in infinite`,animationDelay:`${i*0.07}s`}}/>
          ))}
          {/* Window reflection */}
          <rect x="4" y="4" width="30" height="142" rx="2" fill="rgba(255,255,255,0.02)"/>
          {/* Window frame cross */}
          <line x1="90" y1="4" x2="90" y2="146" stroke="#1e2e44" strokeWidth="4"/>
          <line x1="4" y1="75" x2="176" y2="75" stroke="#1e2e44" strokeWidth="4"/>
          {/* Frame inner bevel */}
          <rect x="4" y="4" width="172" height="142" rx="2" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        </g>

        {/* ── Desk surface ── */}
        <rect x="0" y="200" width="400" height="18" fill="#0e1628" rx="2"/>
        <rect x="0" y="198" width="400" height="3" fill="#141e30"/>
        {/* Desk highlight */}
        <rect x="0" y="198" width="400" height="1" fill="rgba(100,150,255,0.08)"/>

        {/* ── Desktop objects ── */}
        {/* Monitor */}
        <g transform="translate(135,120)">
          <rect x="0" y="0" width="130" height="82" rx="4" fill="#080e18"/>
          <rect x="0" y="0" width="130" height="82" rx="4" fill="none" stroke="#1a2840" strokeWidth="3"/>
          {/* Screen */}
          <rect x="6" y="6" width="118" height="66" rx="2" fill="#04080e"/>
          {/* Monitor content */}
          <rect x="6" y="6" width="118" height="66" rx="2" fill="url(#st_monitor_glow)"/>
          {/* Code-like lines */}
          {[0,1,2,3,4,5,6,7].map(li=>(
            <g key={li}>
              <rect x={10+li%3*2} y={12+li*7} width={20+li%4*18} height="2.5" rx="1.5" fill={`rgba(${80+li*15},${160-li*8},255,0.3)`}/>
              {li%2===0&&<rect x={38+li*3} y={12+li*7} width={15+li*5} height="2.5" rx="1.5" fill="rgba(80,255,160,0.2)"/>}
            </g>
          ))}
          {/* Monitor stand */}
          <rect x="58" y="80" width="14" height="10" fill="#0c1420"/>
          <rect x="48" y="88" width="34" height="4" rx="2" fill="#141e2e"/>
        </g>

        {/* ── Desk lamp (right) ── */}
        <g transform="translate(310,100)">
          {/* Base */}
          <ellipse cx="30" cy="100" rx="22" ry="6" fill="#101828"/>
          <rect x="26" y="60" width="8" height="40" rx="4" fill="#141c2c"/>
          {/* Arm */}
          <path d="M 30 60 C 25 45 35 25 42 15" fill="none" stroke="#141c2c" strokeWidth="5" strokeLinecap="round"/>
          {/* Shade */}
          <path d="M 30 15 C 26 10 52 5 56 15 L 50 28 C 44 22 32 22 26 28 Z" fill="#1a2438"/>
          {/* Light cone */}
          <path d="M 28 28 L 20 100 L 80 100 L 70 28 Z" fill="url(#st_lamp_glow)" opacity="0.6"/>
          {/* Bulb glow */}
          <circle cx="43" cy="16" r="10" fill="rgba(200,150,50,0.3)" filter="url(#st_warm_glow)"/>
          <circle cx="43" cy="16" r="4" fill="rgba(220,180,80,0.6)"/>
        </g>

        {/* ── Warm lamp ambient on desk ── */}
        <ellipse cx="350" cy="210" rx="120" ry="40" fill="rgba(200,130,40,0.07)" filter="url(#st_warm_glow)"/>

        {/* ── Coffee cup ── */}
        <g transform="translate(85,158)">
          <path d="M 0 38 L 4 0 L 36 0 L 40 38 Z" fill="#2a1a0c"/>
          <path d="M 2 38 L 38 38 L 40 42 L 0 42 Z" fill="#1e1208"/>
          {/* Cup handle */}
          <path d="M 36 10 C 46 10 48 20 48 25 C 48 30 46 38 36 38" fill="none" stroke="#2a1a0c" strokeWidth="4"/>
          {/* Coffee surface */}
          <ellipse cx="20" cy="2" rx="16" ry="4" fill="#180e06"/>
          <ellipse cx="20" cy="2" rx="11" ry="2.5" fill="#201408"/>
          {/* Steam */}
          {[0,1,2].map(i=>(
            <path key={i} d={`M ${10+i*10} -5 C ${8+i*10} -14 ${14+i*10} -20 ${10+i*10} -28`}
              fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"
              style={{animation:`float ${1.5+i*0.3}s ease-in-out ${i*0.3}s infinite`}}/>
          ))}
          {/* Saucer */}
          <ellipse cx="20" cy="42" rx="26" ry="5" fill="#201408"/>
        </g>

        {/* ── Vinyl record ── */}
        <g transform="translate(38,155)" style={{animation:'spin-slow 8s linear infinite'}}>
          <circle cx="22" cy="22" r="22" fill="#0e0e16"/>
          {/* Grooves */}
          {[8,12,16,20].map(r=><circle key={r} cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>)}
          {/* Label */}
          <circle cx="22" cy="22" r="7" fill="#c03050"/>
          <circle cx="22" cy="22" r="2.5" fill="#0e0e16"/>
          {/* Shine */}
          <path d="M 8 12 C 14 8 24 8 28 16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2"/>
        </g>

        {/* ── String lights (top) ── */}
        <path d="M 0 22 Q 100 38 200 22 Q 300 8 400 22" fill="none" stroke="rgba(60,90,140,0.4)" strokeWidth="1.5"/>
        {[...Array(10)].map((_,i)=>{
          const t=i/9, x=t*400
          const y=22+Math.sin(t*Math.PI)*16
          const colors=['#ffd080','#c0e0ff','#ffd080','#80ffcc','#ffd080']
          const c=colors[i%colors.length]
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={x} y2={y+8} stroke="rgba(60,90,140,0.3)" strokeWidth="0.8"/>
              <circle cx={x} cy={y+10} r="4" fill={c} filter="url(#st_soft_glow)" opacity="0.7"
                style={{animation:`pulse-heart ${1.5+i*0.25}s ease-in-out ${i*0.18}s infinite`}}/>
            </g>
          )
        })}

        {/* ── Headphones hanging (right wall) ── */}
        <g transform="translate(365,60)" opacity="0.45">
          <rect x="0" y="0" width="3" height="20" fill="#141e2c"/>
          <path d="M 15 5 C 15 -8 -15 -8 -15 5 C -15 18 -20 28 -22 38 L -28 38 C -28 38 -28 20 -28 18 L -2 18 L -2 38 L -8 38 C -8 28 -15 18 -15 5" fill="none" stroke="#1a2840" strokeWidth="3" strokeLinecap="round"/>
          {/* Earcups */}
          <ellipse cx="-15" cy="40" rx="8" ry="10" fill="#141e2c"/>
          <ellipse cx="15" cy="40" rx="8" ry="10" fill="#141e2c"/>
          {/* Speaker mesh */}
          <ellipse cx="-15" cy="40" rx="5" ry="7" fill="#0e1420"/>
          <ellipse cx="15" cy="40" rx="5" ry="7" fill="#0e1420"/>
        </g>

        {/* ── Notebook ── */}
        <g transform="translate(240,188)">
          <rect x="0" y="0" width="60" height="14" rx="1" fill="#1a2840" transform="rotate(-3 30 7)"/>
          {/* Spiral */}
          {[...Array(6)].map((_,i)=><circle key={i} cx={5+i*10} cy="0" r="2" fill="#0e1828"/>)}
          {/* Lines on page */}
          {[3,6,9].map(y=><line key={y} x1="5" y1={y} x2="55" y2={y} stroke="rgba(100,150,255,0.1)" strokeWidth="0.8" transform="rotate(-3 30 7)"/>)}
        </g>

        {/* Floor */}
        <rect x="0" y="218" width="400" height="62" fill="#060c14"/>
        <rect x="0" y="218" width="400" height="1.5" fill="rgba(80,120,200,0.1)"/>
        {/* Subtle floor reflection */}
        <rect x="0" y="220" width="400" height="60" fill="rgba(0,0,0,0.3)"/>
        {/* Monitor glow on floor */}
        <ellipse cx="200" cy="225" rx="80" ry="12" fill="rgba(60,120,200,0.05)" filter="url(#st_warm_glow)"/>

        {/* Cat silhouette (bonus detail) */}
        <g transform="translate(72,185)" opacity="0.35">
          <ellipse cx="20" cy="18" rx="18" ry="12" fill="#0c1418"/>
          <circle cx="20" cy="8" r="9" fill="#0c1418"/>
          {/* Ears */}
          <polygon points="13,3 10,-4 17,2" fill="#0c1418"/>
          <polygon points="27,3 30,-4 23,2" fill="#0c1418"/>
          {/* Tail */}
          <path d="M 38 20 C 48 16 52 8 46 4" fill="none" stroke="#0c1418" strokeWidth="4" strokeLinecap="round"/>
        </g>
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   Main Export
   ═══════════════════════════════════════════════════ */
export default function VibeScenery({ vibe }: { vibe: Vibe }) {
  const map: Record<Vibe, React.ReactNode> = {
    classic: <ClassicScenery />,
    cozy:    <CozyScenery />,
    retro:   <RetroScenery />,
    anime:   <AnimeScenery />,
    disney:  <DisneyScenery />,
    studios: <StudiosScenery />,
  }
  return <>{map[vibe]}</>
}
