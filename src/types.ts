export type Screen = 'lp' | 'payment-success' | 'config' | 'loading' | 'splash' | 'intro' | 'museum'

export type Vibe = 'classic' | 'cozy' | 'retro' | 'anime' | 'disney' | 'studios'
export type Weather = 'stars' | 'rain' | 'aurora' | 'none'
export type Frame = 'gold' | 'wood' | 'neon' | 'retro' | 'polaroid' | 'vintage' | 'botanical' | 'cinema'
export type Music = 'theme' | 'piano' | 'acoustic' | 'synth' | 'retro' | 'lofi' | 'custom'
export type Gender = 'male' | 'female'
export type Hair = 'short' | 'long' | 'fringe' | 'none'
export type HairColor = 'black' | 'brown' | 'blonde' | 'red' | 'pink'
export type Outfit = 'blue' | 'red' | 'pink' | 'green' | 'purple' | 'black' | 'yellow'
export type Accessory = 'none' | 'crown' | 'cap' | 'halo' | 'glasses'

export interface AvatarConfig {
  gender: Gender
  hair: Hair
  hairColor: HairColor
  outfit: Outfit
  accessory: Accessory
}

export interface PhotoSlot {
  title: string
  desc: string
  dataUrl: string | null
}

export interface MuseumConfig {
  partner1: string
  partner2: string
  startDate: string
  loveLetter: string
  vibe: Vibe
  weather: Weather
  frame: Frame
  music: Music
  p1: AvatarConfig
  p2: AvatarConfig
  photos: PhotoSlot[]
  introTexts: string[]
  customMusicUrl?: string
  customMusicDataUrl?: string
}
