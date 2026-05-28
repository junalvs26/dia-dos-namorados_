import type { Vibe, Frame } from '../types'

export const VIBE_LABELS: Record<string, string> = {
  classic: '🏛️ Luxo Clássico — Mármore & Ouro',
  cozy:    '🏡 Cabana Aconchegante — Lareira & Estrelas',
  retro:   '👾 Retro Pixel — Neon & Arcade',
  anime:   '🌸 Sonho Anime — Sakura & Janela',
  disney:  '👑 Magia Disney — Castelo & Estrelas',
  studios: '📚 Estudos Lo-Fi — Chuva & Café',
}

export const WEATHER_LABELS: Record<string, string> = {
  stars:  '✨ Céu Estrelado',
  rain:   '🌧️ Chuva Romântica',
  aurora: '🌌 Aurora Boreal',
  none:   '☀️ Sem Efeito',
}

export const FRAME_LABELS: Record<string, string> = {
  gold:      '✨ Ouro Barroco — Imperial',
  wood:      '🪵 Rústica de Madeira',
  neon:      '🌈 Neon Luminoso',
  retro:     '🔳 Pixel Art — Borda Retro',
  polaroid:  '📷 Polaroid — Clássico Analógico',
  vintage:   '🕰️ Vintage — Ornamentos Dourados',
  botanical: '🌿 Botânico — Moldura de Folhas',
  cinema:    '🎬 Cinema — Borda de Filme',
}

export const MUSIC_LABELS: Record<string, string> = {
  theme:    '🎵 Sincronizar com o Estilo',
  piano:    '🎹 Chopin — Nocturne Op. 9 No. 2',
  acoustic: '🎻 Pachelbel — Canon em Ré Maior',
  synth:    '🌙 Debussy — Clair de Lune',
  retro:    '🌸 Satie — Gymnopédie No. 1',
  lofi:     '🌌 Beethoven — Moonlight Sonata',
  custom:   '📁 Enviar Música (.MP3)',
}

export interface VibeTheme {
  bg: string
  accent: string
  text: string
  wallBg: string
  floorBg: string
  nameFont: string
}

export const VIBE_THEMES: Record<Vibe, VibeTheme> = {
  classic: {
    bg: '#100820',
    accent: '#d4af37',
    text: '#f5f0e8',
    wallBg: 'linear-gradient(180deg, #1e1035 0%, #120828 100%)',
    floorBg: 'linear-gradient(180deg, #1e1035 0%, #0e0618 100%)',
    nameFont: "'Cinzel', serif",
  },
  cozy: {
    bg: '#120a04',
    accent: '#e8a060',
    text: '#f5e6d0',
    wallBg: 'linear-gradient(180deg, #1a0c06 0%, #0e0804 100%)',
    floorBg: 'linear-gradient(180deg, #2a1408 0%, #1a0c06 100%)',
    nameFont: "'Dancing Script', cursive",
  },
  retro: {
    bg: '#060612',
    accent: '#ff6eb4',
    text: '#e8d5ff',
    wallBg: 'linear-gradient(180deg, #080818 0%, #040410 100%)',
    floorBg: 'linear-gradient(180deg, #0c0c24 0%, #060612 100%)',
    nameFont: "'Press Start 2P', monospace",
  },
  anime: {
    bg: '#0c1828',
    accent: '#ffb0d8',
    text: '#fff0f8',
    wallBg: 'linear-gradient(180deg, #0f1c30 0%, #080f1c 100%)',
    floorBg: 'linear-gradient(180deg, #14243c 0%, #0c1828 100%)',
    nameFont: "'Cormorant Garamond', serif",
  },
  disney: {
    bg: '#060818',
    accent: '#f8d040',
    text: '#fff8e7',
    wallBg: 'linear-gradient(180deg, #08081e 0%, #040412 100%)',
    floorBg: 'linear-gradient(180deg, #100c28 0%, #080818 100%)',
    nameFont: "'Cinzel', serif",
  },
  studios: {
    bg: '#080e18',
    accent: '#7eb8c9',
    text: '#e8f0f5',
    wallBg: 'linear-gradient(180deg, #0c1420 0%, #060c14 100%)',
    floorBg: 'linear-gradient(180deg, #101820 0%, #080e18 100%)',
    nameFont: "'Outfit', sans-serif",
  },
}

/* ── Frame border styles ─────────────────────────────────── */
export const FRAME_STYLES: Record<Frame, string> = {
  gold:      '6px double #d4af37',
  wood:      '8px solid #5c3d24',
  neon:      '3px solid #00ffcc',
  retro:     '5px solid #ff6eb4',
  polaroid:  '10px solid #fdfaf3',
  vintage:   '7px solid #c9a46a',
  botanical: '6px solid #3a7a3a',
  cinema:    '24px solid #111',
}

export const FRAME_SHADOWS: Record<Frame, string> = {
  gold:      '0 0 0 2px #aa771c, 0 10px 25px rgba(0,0,0,0.55), inset 0 0 15px rgba(0,0,0,0.4)',
  wood:      '0 0 0 2px #3d2514, inset 0 0 12px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.45)',
  neon:      '0 0 10px #00ffcc, 0 0 25px rgba(0,255,204,0.5), inset 0 0 8px rgba(0,255,204,0.3)',
  retro:     '0 0 0 4px #060612, 0 0 0 7px #a855f7, 0 8px 20px rgba(255,110,180,0.35)',
  polaroid:  '0 10px 20px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.15)',
  vintage:   '0 0 0 2px #7c6035, inset 0 0 12px rgba(0,0,0,0.45), 0 12px 28px rgba(0,0,0,0.5)',
  botanical: '0 0 0 2px #204520, inset 0 0 8px rgba(0,0,0,0.3), 0 8px 22px rgba(0,0,0,0.4)',
  cinema:    'inset 0 0 0 1px #333, 0 12px 30px rgba(0,0,0,0.65)',
}

/* Extra styles: bottom padding for polaroid, border details and animations */
export const FRAME_EXTRA: Partial<Record<Frame, React.CSSProperties>> = {
  gold: { outline: '1px solid rgba(255,215,0,0.35)', outlineOffset: -4, borderRadius: '4px' },
  wood: { borderRadius: '6px' },
  neon: { borderRadius: '12px' },
  retro: { borderRadius: '0px' },
  polaroid: { borderBottomWidth: 36, borderColor: '#fdfaf3', transform: 'rotate(-0.8deg)', borderRadius: '2px' },
  vintage: { outline: '1px solid rgba(124,96,53,0.5)', outlineOffset: -5, borderRadius: '3px' },
  botanical: { borderRadius: '16px', outline: '2px solid #55a655', outlineOffset: -4 },
  cinema: { borderLeftWidth: 8, borderRightWidth: 8, borderRadius: '4px' },
}
