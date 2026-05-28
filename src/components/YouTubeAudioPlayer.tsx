import { useEffect, useRef } from 'react'

interface Props {
  url?: string
  isPlaying: boolean
  isMuted: boolean
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void
    YT?: any
  }
}

export default function YouTubeAudioPlayer({ url, isPlaying, isMuted }: Props) {
  const videoId = getYouTubeId(url)
  const playerRef = useRef<any>(null)
  const elementId = 'youtube-audio-player-element'

  useEffect(() => {
    if (!videoId) return

    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    let player: any

    const createPlayer = () => {
      player = new window.YT.Player(elementId, {
        height: '1',
        width: '1',
        videoId: videoId,
        playerVars: {
          autoplay: isPlaying ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: videoId,
          rel: 0,
          showinfo: 0,
          mute: isMuted ? 1 : 0
        },
        events: {
          onReady: (event: any) => {
            playerRef.current = event.target
            if (isPlaying) {
              event.target.playVideo()
            }
            if (isMuted) {
              event.target.mute()
            } else {
              event.target.unmute()
              event.target.setVolume(45) // Confortável
            }
          }
        }
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      // Configura callback global caso o script da API ainda esteja carregando
      window.onYouTubeIframeAPIReady = () => {
        createPlayer()
      }
    }

    return () => {
      if (player && typeof player.destroy === 'function') {
        player.destroy()
      }
      playerRef.current = null
    }
  }, [videoId])

  useEffect(() => {
    const player = playerRef.current
    if (!player) return

    try {
      if (isPlaying) {
        player.playVideo()
      } else {
        player.pauseVideo()
      }
    } catch (e) {
      console.warn('Erro ao reproduzir/pausar YouTube Player:', e)
    }
  }, [isPlaying, videoId])

  useEffect(() => {
    const player = playerRef.current
    if (!player) return

    try {
      if (isMuted) {
        player.mute()
      } else {
        player.unmute()
        player.setVolume(45)
      }
    } catch (e) {
      console.warn('Erro ao alterar mudo do YouTube Player:', e)
    }
  }, [isMuted, videoId])

  if (!videoId) return null

  return (
    <div 
      style={{ 
        position: 'absolute', 
        width: '1px', 
        height: '1px', 
        left: '-9999px', 
        opacity: 0, 
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <div id={elementId} />
    </div>
  )
}

function getYouTubeId(url?: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}
