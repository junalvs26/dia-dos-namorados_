import { memo } from 'react'
import type { AvatarConfig } from '../types'

/* ── Color palettes (Hand-drawn pastel crayon style) ─────── */
const HAIR: Record<string, { main: string; shadow: string; hi: string }> = {
  black:  { main: '#323335', shadow: '#212224', hi: '#55575a' },
  brown:  { main: '#8d5d42', shadow: '#6e452f', hi: '#ac785a' },
  blonde: { main: '#edd58a', shadow: '#cbb368', hi: '#f7e7ae' },
  red:    { main: '#d35b44', shadow: '#a9412e', hi: '#e8826d' },
  pink:   { main: '#f4a4b4', shadow: '#c87a8b', hi: '#fbd0da' },
}

const OUTFIT: Record<string, { main: string; shadow: string; hi: string }> = {
  blue:   { main: '#3e5c8e', shadow: '#2d446a', hi: '#5e7db3' },
  red:    { main: '#c25454', shadow: '#9a3b3b', hi: '#e37777' },
  pink:   { main: '#d38092', shadow: '#ad5c6f', hi: '#f3a5b6' },
  green:  { main: '#5d8c6b', shadow: '#466c51', hi: '#7fac8e' },
  purple: { main: '#796b8d', shadow: '#5d5071', hi: '#998bb0' },
  black:  { main: '#46474b', shadow: '#313235', hi: '#67686d' },
  yellow: { main: '#f2c949', shadow: '#cca530', hi: '#ffe380' },
}

const SKIN = { 
  base: '#fef1e1', // Warm pale peach
  shadow: '#f4dac1', 
  hi: '#fffcf7', 
  ear: '#f8dfc2' 
}

const OUTLINE = '#2c2d2f' // Cozy sketchy charcoal stroke

/* ── Hair paths (viewBox 0 0 100 148) ───────────────────── */

function HairBack({ style, hairKey }: { style: string; hairKey: string }) {
  const h = HAIR[hairKey] ?? HAIR.black
  if (style === 'none') return null
  
  if (style === 'long') {
    // Fluffy side pigtails, adjusted to sit perfectly on the smaller head (center 50,38)
    return (
      <g>
        {/* Left Pigtail */}
        <circle cx="26" cy="40" r="7" fill={h.main} stroke={OUTLINE} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M 24 35 C 21 40 22 45 27 44" fill="none" stroke={OUTLINE} strokeWidth="1" opacity="0.3" />
        <rect x="29" y="37" width="3" height="5" rx="1.2" fill="#c55656" stroke={OUTLINE} strokeWidth="1.2" />

        {/* Right Pigtail */}
        <circle cx="74" cy="40" r="7" fill={h.main} stroke={OUTLINE} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M 76 35 C 79 40 78 45 73 44" fill="none" stroke={OUTLINE} strokeWidth="1" opacity="0.3" />
        <rect x="68" y="37" width="3" height="5" rx="1.2" fill="#c55656" stroke={OUTLINE} strokeWidth="1.2" />
      </g>
    )
  }

  // Back hair base (cap overlay) for smaller head
  return (
    <path
      d="M 32 40 C 31 20 50 15 68 40 C 66 22 50 16 32 23 Z"
      fill={h.shadow}
      stroke={OUTLINE}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  )
}

function HairFront({ style, hairKey }: { style: string; hairKey: string }) {
  const h = HAIR[hairKey] ?? HAIR.black
  if (style === 'none') return null

  if (style === 'short') {
    return (
      <g>
        <path
          d="M 31 36 C 28 28 38 18 50 20 C 62 18 72 28 69 36 C 62 28 50 29 38 29 Z"
          fill={h.main}
          stroke={OUTLINE}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <rect x="40" y="24" width="4.5" height="2.5" fill={h.hi} rx="1" opacity="0.55" transform="rotate(-15 40 24)" />
      </g>
    )
  }

  if (style === 'long') {
    return (
      <g>
        <path
          d="M 31 34 C 33 18 67 18 69 34 C 62 36 50 31 38 36 Z"
          fill={h.main}
          stroke={OUTLINE}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M 31 34 Q 37 40 43 35 Q 49 40 55 35 Q 61 40 69 34" fill="none" stroke={OUTLINE} strokeWidth="2.2" />
        <path d="M 31 34 Q 37 40 43 35 Q 49 40 55 35 Q 61 40 69 34 Z" fill={h.main} />

        {/* Cute golden star hair clip */}
        <path 
          d="M 36 30 L 37.5 32 L 40.5 31.5 L 38 33.5 L 39.5 36.5 L 36.5 35 L 34.5 36.5 L 35 33 L 33 31.5 L 35 31.5 Z" 
          fill="#edd58a" 
          stroke={OUTLINE} 
          strokeWidth="1.0" 
          strokeLinejoin="round"
        />
      </g>
    )
  }

  if (style === 'fringe') {
    return (
      <g>
        <path
          d="M 31 33 C 33 17 67 17 69 33 C 62 35 50 33 38 35 Z"
          fill={h.main}
          stroke={OUTLINE}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M 31 33 L 34 38 L 38 36 L 42 38 L 47 37 L 52 38 L 57 37 L 62 38 L 66 36 L 69 33"
          fill="none" stroke={OUTLINE} strokeWidth="2.2" strokeLinejoin="round"
        />
        <path
          d="M 31 33 L 34 38 L 38 36 L 42 38 L 47 37 L 52 38 L 57 37 L 62 38 L 66 36 L 69 33 Z"
          fill={h.main}
        />
        
        {/* Golden star hair clip */}
        <path 
          d="M 36 30 L 37.5 32 L 40.5 31.5 L 38 33.5 L 39.5 36.5 L 36.5 35 L 34.5 36.5 L 35 33 L 33 31.5 L 35 31.5 Z" 
          fill="#edd58a" 
          stroke={OUTLINE} 
          strokeWidth="1.0" 
          strokeLinejoin="round"
        />
      </g>
    )
  }

  return null
}

/* ── Custom Cozy Sweater Textures and Folds ──────────────── */

function RenderSweaterDetails({ outfitKey, o }: { outfitKey: string; o: { main: string; shadow: string; hi: string } }) {
  switch (outfitKey) {
    case 'blue':
      // Cozy blue horizontal sailor stripes across the larger body
      return (
        <g>
          <path d="M 25 72 Q 50 76 75 72" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.8" />
          <path d="M 22 88 Q 50 92 78 88" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.8" />
          <path d="M 20 104 Q 50 108 80 104" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.8" />
          <path d="M 20 118 Q 50 121 80 118" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.8" />
        </g>
      )
    case 'red':
      // Red hoodie with front pouch and cute absolute white heart badge
      return (
        <g>
          {/* Front pouch pocket */}
          <path d="M 36 94 Q 50 98 64 94 L 60 116 L 40 116 Z" fill={o.shadow} stroke={OUTLINE} strokeWidth="1.8" />
          {/* Heart badge - absolute coordinates on upper right chest */}
          <path 
            d="M 58 70 C 56 68 53 68 51 70 C 49 72 49 76 52 78 L 58 84 L 64 78 C 67 76 67 72 65 70 C 63 68 60 68 58 70 Z" 
            fill="#ffffff" 
          />
        </g>
      )
    case 'pink':
      // Soft rose sweater with fluffy clouds across the larger body
      return (
        <g>
          {/* Cloud A */}
          <g>
            <ellipse cx="38" cy="76" rx="5.5" ry="3.5" fill="#ffffff" opacity="0.85" />
            <circle cx="34" cy="74" r="3" fill="#ffffff" opacity="0.85" />
            <circle cx="42" cy="74" r="3" fill="#ffffff" opacity="0.85" />
          </g>

          {/* Cloud B */}
          <g>
            <ellipse cx="60" cy="94" rx="5" ry="3.2" fill="#ffffff" opacity="0.85" />
            <circle cx="56" cy="92" r="2.5" fill="#ffffff" opacity="0.85" />
            <circle cx="63" cy="92" r="2.5" fill="#ffffff" opacity="0.85" />
          </g>

          {/* Cloud C */}
          <g>
            <ellipse cx="36" cy="110" rx="4.5" ry="2.8" fill="#ffffff" opacity="0.85" />
            <circle cx="33" cy="108" r="2.2" fill="#ffffff" opacity="0.85" />
            <circle cx="39" cy="108" r="2.2" fill="#ffffff" opacity="0.85" />
          </g>
        </g>
      )
    case 'green':
      // Sage-green cable-knit with vertical braids across the larger body
      return (
        <g>
          <path d="M 36 62 Q 39 74 36 86 Q 39 98 36 110 Q 39 122 36 124" fill="none" stroke={o.shadow} strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
          <path d="M 45 62 Q 48 74 45 86 Q 48 98 45 110 Q 48 122 45 124" fill="none" stroke={o.shadow} strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
          <path d="M 55 62 Q 58 74 55 86 Q 58 98 55 110 Q 58 122 55 124" fill="none" stroke={o.shadow} strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
          <path d="M 64 62 Q 67 74 64 86 Q 67 98 64 110 Q 67 122 64 124" fill="none" stroke={o.shadow} strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
        </g>
      )
    case 'purple':
      // Lavender sweater with a cute glowing golden star patch
      return (
        <path 
          d="M 50 80 L 53 86 L 59 86 L 54 90 L 56 96 L 50 93 L 44 96 L 46 90 L 41 86 L 47 86 Z" 
          fill="#edd58a" 
          stroke={OUTLINE} 
          strokeWidth="1.2" 
          strokeLinejoin="round" 
        />
      )
    case 'black':
      // Charcoal hoodie with thick white drawstrings and front pocket
      return (
        <g>
          {/* Hoodie drawstrings */}
          <path d="M 45 60 Q 42 75 44 88" fill="none" stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="44" cy="88" r="1.5" fill="#e2e8f0" />
          <path d="M 55 60 Q 58 75 56 88" fill="none" stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="56" cy="88" r="1.5" fill="#e2e8f0" />
          
          {/* Pouch */}
          <path d="M 35 96 Q 50 100 65 96 L 61 116 L 39 116 Z" fill={o.shadow} stroke={OUTLINE} strokeWidth="1.8" />
        </g>
      )
    case 'yellow':
      // Mustard turtleneck sweater with elegant ribbing lines
      return (
        <g>
          <line x1="34" y1="62" x2="34" y2="124" stroke={o.shadow} strokeWidth="1.5" opacity="0.45" />
          <line x1="38" y1="62" x2="38" y2="124" stroke={o.shadow} strokeWidth="1.5" opacity="0.45" />
          <line x1="42" y1="62" x2="42" y2="124" stroke={o.shadow} strokeWidth="1.5" opacity="0.45" />
          <line x1="46" y1="62" x2="46" y2="124" stroke={o.shadow} strokeWidth="1.5" opacity="0.45" />
          <line x1="50" y1="62" x2="50" y2="124" stroke={o.shadow} strokeWidth="1.5" opacity="0.45" />
          <line x1="54" y1="62" x2="54" y2="124" stroke={o.shadow} strokeWidth="1.5" opacity="0.45" />
          <line x1="58" y1="62" x2="58" y2="124" stroke={o.shadow} strokeWidth="1.5" opacity="0.45" />
          <line x1="62" y1="62" x2="62" y2="124" stroke={o.shadow} strokeWidth="1.5" opacity="0.45" />
          <line x1="66" y1="62" x2="66" y2="124" stroke={o.shadow} strokeWidth="1.5" opacity="0.45" />
        </g>
      )
    default:
      return null
  }
}

function MaleBody({ outfitKey }: { outfitKey: string }) {
  const o = OUTFIT[outfitKey] ?? OUTFIT.blue
  return (
    <g>
      {/* Cozy Turtleneck collar, raised to cy="56" */}
      <ellipse cx="50" cy="56" rx="9" ry="4" fill={o.main} stroke={OUTLINE} strokeWidth="2.2" />
      <path d="M 44 56 Q 50 59 56 56" fill="none" stroke={OUTLINE} strokeWidth="1.5" />

      {/* Main cozy round sweater body, taller and wider for more clothes details */}
      <path 
        d="M 35 56 C 26 70 20 85 20 124 L 80 124 C 80 85 74 70 65 56 Z" 
        fill={o.main} 
        stroke={OUTLINE} 
        strokeWidth="2.2" 
        strokeLinejoin="round" 
      />
      {/* Detailed texture overlays */}
      <RenderSweaterDetails outfitKey={outfitKey} o={o} />

      {/* Left sleeve (Outer hand - starts higher, holds positions) */}
      <path d="M 30 68 Q 16 88 11 110" fill="none" stroke={OUTLINE} strokeWidth="13" strokeLinecap="round" />
      <path d="M 30 68 Q 16 88 11 110" fill="none" stroke={o.main} strokeWidth="9" strokeLinecap="round" />
      <circle cx="10.5" cy="113.5" r="4.2" fill={SKIN.base} stroke={OUTLINE} strokeWidth="2.2" />

      {/* Right sleeve (Inner hand - extended to HOLD HANDS!) */}
      <path d="M 70 68 Q 84 88 95 110" fill="none" stroke={OUTLINE} strokeWidth="13" strokeLinecap="round" />
      <path d="M 70 68 Q 84 88 95 110" fill="none" stroke={o.main} strokeWidth="9" strokeLinecap="round" />
      <circle cx="95.5" cy="113.5" r="4.2" fill={SKIN.base} stroke={OUTLINE} strokeWidth="2.2" />

      {/* Tiny wobbly legs and round shoes */}
      <rect x="37" y="124" width="7" height="15" fill={SKIN.base} stroke={OUTLINE} strokeWidth="2.2" />
      <rect x="56" y="124" width="7" height="15" fill={SKIN.base} stroke={OUTLINE} strokeWidth="2.2" />
      
      <ellipse cx="39" cy="139" rx="5.5" ry="3.5" fill="#323335" stroke={OUTLINE} strokeWidth="2.2" />
      <ellipse cx="58" cy="139" rx="5.5" ry="3.5" fill="#323335" stroke={OUTLINE} strokeWidth="2.2" />
    </g>
  )
}

function FemaleBody({ outfitKey }: { outfitKey: string }) {
  const o = OUTFIT[outfitKey] ?? OUTFIT.yellow
  return (
    <g>
      {/* Cozy Turtleneck collar, raised to cy="56" */}
      <ellipse cx="50" cy="56" rx="9" ry="4" fill={o.main} stroke={OUTLINE} strokeWidth="2.2" />
      <path d="M 44 56 Q 50 59 56 56" fill="none" stroke={OUTLINE} strokeWidth="1.5" />

      {/* Main cozy round sweater body, taller and wider for more clothes details */}
      <path 
        d="M 35 56 C 26 70 20 85 20 124 L 80 124 C 80 85 74 70 65 56 Z" 
        fill={o.main} 
        stroke={OUTLINE} 
        strokeWidth="2.2" 
        strokeLinejoin="round" 
      />
      {/* Detailed texture overlays */}
      <RenderSweaterDetails outfitKey={outfitKey} o={o} />

      {/* Left sleeve (Outer hand - starts higher, holds positions) */}
      <path d="M 30 68 Q 16 88 11 110" fill="none" stroke={OUTLINE} strokeWidth="13" strokeLinecap="round" />
      <path d="M 30 68 Q 16 88 11 110" fill="none" stroke={o.main} strokeWidth="9" strokeLinecap="round" />
      <circle cx="10.5" cy="113.5" r="4.2" fill={SKIN.base} stroke={OUTLINE} strokeWidth="2.2" />

      {/* Right sleeve (Inner hand - extended to HOLD HANDS!) */}
      <path d="M 70 68 Q 84 88 95 110" fill="none" stroke={OUTLINE} strokeWidth="13" strokeLinecap="round" />
      <path d="M 70 68 Q 84 88 95 110" fill="none" stroke={o.main} strokeWidth="9" strokeLinecap="round" />
      <circle cx="95.5" cy="113.5" r="4.2" fill={SKIN.base} stroke={OUTLINE} strokeWidth="2.2" />

      {/* Tiny wobbly legs and round shoes */}
      <rect x="37" y="124" width="7" height="15" fill={SKIN.base} stroke={OUTLINE} strokeWidth="2.2" />
      <rect x="56" y="124" width="7" height="15" fill={SKIN.base} stroke={OUTLINE} strokeWidth="2.2" />
      
      <ellipse cx="39" cy="139" rx="5.5" ry="3.5" fill="#323335" stroke={OUTLINE} strokeWidth="2.2" />
      <ellipse cx="58" cy="139" rx="5.5" ry="3.5" fill="#323335" stroke={OUTLINE} strokeWidth="2.2" />
    </g>
  )
}

function Accessory({ type }: { type: string }) {
  // Hand-drawn minimalist accessories adjusted to fit smaller head (center 50,38)
  switch (type) {
    case 'crown': return (
      <g>
        <path d="M 38 20 L 41 12 L 50 16 L 59 12 L 62 20 Z" fill="#edd58a" stroke={OUTLINE} strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="41" cy="13" r="1.0" fill="#c25454" />
        <circle cx="50" cy="16" r="1.2" fill="#3e5c8e" />
        <circle cx="59" cy="13" r="1.0" fill="#c25454" />
      </g>
    )
    case 'halo': return (
      <ellipse cx="50" cy="12" rx="10" ry="2.5" fill="none" stroke="#edd58a" strokeWidth="2.2" />
    )
    case 'cap': return (
      <g>
        <path d="M 32 35 C 30 25 70 25 68 35 Z" fill="#c25454" stroke={OUTLINE} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M 27 35 Q 50 37 73 35" stroke={OUTLINE} strokeWidth="2.2" fill="none" />
      </g>
    )
    case 'glasses': return (
      <g>
        <circle cx="40" cy="38" r="6" fill="none" stroke={OUTLINE} strokeWidth="1.8" />
        <circle cx="60" cy="38" r="6" fill="none" stroke={OUTLINE} strokeWidth="1.8" />
        <path d="M 46 38 Q 50 36 54 38" fill="none" stroke={OUTLINE} strokeWidth="1.8" />
      </g>
    )
    default: return null
  }
}

const ChibiSVG = memo(function ChibiSVG({ cfg, facing = 'right', width = 90 }: { cfg: AvatarConfig; facing?: 'right'|'left'; width?: number }) {
  const flip = facing === 'left' ? 'scale(-1,1) translate(-100,0)' : undefined

  return (
    <svg
      viewBox="0 0 100 148"
      width={width}
      height={width * 1.48}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        <radialGradient id={`sk_${cfg.hairColor}`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor={SKIN.hi} />
          <stop offset="65%" stopColor={SKIN.base} />
          <stop offset="100%" stopColor={SKIN.shadow} />
        </radialGradient>
      </defs>

      <g transform={flip}>
        {/* Hair back layer */}
        <HairBack style={cfg.hair} hairKey={cfg.hairColor} />

        {/* Body (Cozy sweaters with hand-drawn textures that hold hands) */}
        {cfg.gender === 'female'
          ? <FemaleBody outfitKey={cfg.outfit} />
          : <MaleBody outfitKey={cfg.outfit} />
        }

        {/* Head base - smaller and scaled down to focus on clothes */}
        {/* Ears adjusted for head center 50,38 r=18 */}
        <circle cx="30" cy="38" r="4.5" fill={`url(#sk_${cfg.hairColor})`} stroke={OUTLINE} strokeWidth="2.2" />
        <circle cx="70" cy="38" r="4.5" fill={`url(#sk_${cfg.hairColor})`} stroke={OUTLINE} strokeWidth="2.2" />
        <path d="M 30 35 Q 28 38 30 41" fill="none" stroke={OUTLINE} strokeWidth="1" opacity="0.3" />
        <path d="M 70 35 Q 72 38 70 41" fill="none" stroke={OUTLINE} strokeWidth="1" opacity="0.3" />

        {/* Head sphere - shrunk to focus on detailed clothing */}
        <circle cx="50" cy="38" r="18" fill={`url(#sk_${cfg.hairColor})`} stroke={OUTLINE} strokeWidth="2.2" strokeLinejoin="round" />

        {/* Blush Cheeks (Crayon textured pastel pink) */}
        <ellipse cx="37" cy="46" rx="4.5" ry="2.5" fill="#ffb4a2" opacity="0.75" />
        <ellipse cx="63" cy="46" rx="4.5" ry="2.5" fill="#ffb4a2" opacity="0.75" />
        
        {/* Hand-drawn style freckle dots */}
        <circle cx="36" cy="46" r="0.5" fill="#aa775c" opacity="0.5" />
        <circle cx="38" cy="47" r="0.5" fill="#aa775c" opacity="0.5" />
        <circle cx="62" cy="47" r="0.5" fill="#aa775c" opacity="0.5" />
        <circle cx="64" cy="46" r="0.5" fill="#aa775c" opacity="0.5" />

        {/* NOTE: Facial Features (Eyes, Nose, Mouth) are deliberately omitted 
            to create a highly romantic, aesthetic "Faceless Silhouette" 
            that allows any client to easily identify and project themselves 
            onto the cozy custom sweaters and couple embrace. */}

        {/* Hair front layer */}
        <HairFront style={cfg.hair} hairKey={cfg.hairColor} />

        {/* Accessory */}
        <Accessory type={cfg.accessory} />
      </g>
    </svg>
  )
})

interface Props { p1: AvatarConfig; p2: AvatarConfig; size?: number }

const ChibiCanvas = memo(function ChibiCanvas({ p1, p2, size = 90 }: Props) {
  const totalW = size * 2.5
  const totalH = size * 1.48

  return (
    <div
      style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        gap: size * 0.04, // Snug gap so their inner hands lock perfectly!
        width: totalW, 
        height: totalH 
      }}
    >
      <ChibiSVG cfg={p1} facing="right" width={size} />

      {/* Heart */}
      <div style={{
        flexShrink: 0,
        fontSize: size * 0.28,
        lineHeight: 1,
        marginBottom: size * 0.36, // Floating perfectly right above their locked hands!
        filter: 'drop-shadow(0 0 6px rgba(233,30,140,0.8))',
        animation: 'pulse-heart 1.8s ease-in-out infinite',
      }}>
        ❤
      </div>

      <ChibiSVG cfg={p2} facing="left" width={size} />
    </div>
  )
})

export default ChibiCanvas

