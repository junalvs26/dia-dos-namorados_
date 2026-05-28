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
import LandingPage from './components/LandingPage'
import PaymentSuccess from './components/PaymentSuccess'

export default function App() {
  const [screen, setScreen] = useState<Screen>(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('museum')) return 'config' // Transitará no useEffect
    if (params.get('status') === 'approved' && params.get('payment_id')) return 'payment-success'
    if (localStorage.getItem('payment_verified_id')) return 'config'
    return 'lp'
  })
  
  const [isSharedLink, setIsSharedLink] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [paymentId, setPaymentId] = useState('')

  const [cfg, setCfg] = useState<MuseumConfig>(() => {
    const params = new URLSearchParams(window.location.search)
    const museumB64 = params.get('museum')
    if (museumB64) {
      const decoded = deserializeConfig(museumB64)
      if (decoded) return decoded
    }
    try {
      const draft = localStorage.getItem('museum_draft')
      if (draft) return JSON.parse(draft)
    } catch (e) {
      console.error("Falha ao ler rascunho do museu:", e)
    }
    return DEFAULT_CONFIG
  })

  // Salva o rascunho no localStorage sempre que o cfg mudar e não for link compartilhado
  useEffect(() => {
    if (!isSharedLink) {
      try {
        localStorage.setItem('museum_draft', JSON.stringify(cfg))
      } catch (e) {
        console.error("Falha ao salvar rascunho do museu:", e)
      }
    }
  }, [cfg, isSharedLink])

  // Verifica na montagem se há dados do museu na URL ou status de compra
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
    } else {
      const status = params.get('status')
      const pId = params.get('payment_id')
      if (status === 'approved' && pId) {
        setPaymentId(pId)
        setScreen('payment-success')
        // Limpa os parâmetros de pagamento da URL para ficar limpa e profissional
        window.history.replaceState({}, document.title, window.location.pathname)
      } else if (localStorage.getItem('payment_verified_id')) {
        setScreen('config')
      } else {
        setScreen('lp')
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
      {screen === 'lp' && (
        <LandingPage />
      )}
      {screen === 'payment-success' && (
        <PaymentSuccess paymentId={paymentId} onContinue={() => setScreen('config')} />
      )}
      {screen === 'config' && (
        <ConfigScreen cfg={cfg} setCfg={setCfg} onStart={handleStart} />
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
        <MuseumGallery cfg={cfg} onExit={handleExit} isMuted={isMuted} setIsMuted={setIsMuted} isSharedLink={isSharedLink} />
      )}
      <YouTubeAudioPlayer
        url={cfg.customMusicUrl}
        isPlaying={screen !== 'lp' && screen !== 'payment-success' && screen !== 'config' && screen !== 'loading'}
        isMuted={isMuted}
      />
    </>
  )
}
