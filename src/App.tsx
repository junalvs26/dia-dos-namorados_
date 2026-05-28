import { useState, useEffect } from 'react'
import type { Screen, MuseumConfig } from './types'
import { DEFAULT_CONFIG } from './lib/defaults'
import { deserializeConfig } from './lib/sharing'
import { audioManager } from './lib/audio'
import ConfigScreen from './components/ConfigScreen'
import LoaderScreen from './components/LoaderScreen'
import SplashScreen from './components/SplashScreen'
import IntroScreen from './components/IntroScreen'
import MuseumGallery from './components/MuseumGallery'
import YouTubeAudioPlayer from './components/YouTubeAudioPlayer'

export default function App() {
  const [screen, setScreen] = useState<Screen>('config')
  const [cfg, setCfg] = useState<MuseumConfig>(DEFAULT_CONFIG)
  const [isSharedLink, setIsSharedLink] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Verifica na montagem se há dados do museu na URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const museumB64 = params.get('museum')
    if (museumB64) {
      const decoded = deserializeConfig(museumB64)
      if (decoded) {
        setCfg(decoded)
        setIsSharedLink(true)
        setScreen('splash') // Abre direto na tela de surpresa romântica
      }
    }
  }, [])

  const handleStart = (config: MuseumConfig) => {
    setCfg(config)
    setIsSharedLink(false)
    setScreen('loading')
  }

  const handleEnterFromSplash = () => {
    // Inicializa a Web Audio API para os sinos sintéticos
    audioManager.initSynth()
    setScreen('intro')
  }

  const handleExit = () => {
    audioManager.stopMusic(600)
    // Se era um link compartilhado, remove o query param ao voltar para permitir nova criação limpa
    if (isSharedLink) {
      window.history.replaceState({}, document.title, window.location.pathname)
      setIsSharedLink(false)
    }
    setScreen('config')
  }

  return (
    <>
      {screen === 'config' && (
        <ConfigScreen onStart={handleStart} />
      )}
      {screen === 'loading' && (
        <LoaderScreen onDone={() => setScreen('splash')} />
      )}
      {screen === 'splash' && (
        <SplashScreen cfg={cfg} onEnter={handleEnterFromSplash} />
      )}
      {screen === 'intro' && (
        <IntroScreen texts={cfg.introTexts} onDone={() => setScreen('museum')} />
      )}
      {screen === 'museum' && (
        <MuseumGallery cfg={cfg} onExit={handleExit} isMuted={isMuted} setIsMuted={setIsMuted} />
      )}
      <YouTubeAudioPlayer
        url={cfg.customMusicUrl}
        isPlaying={screen !== 'config' && screen !== 'loading'}
        isMuted={isMuted}
      />
    </>
  )
}
