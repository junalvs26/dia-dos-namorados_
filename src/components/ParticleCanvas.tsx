import { useEffect, useRef } from 'react'
import type { Weather, Vibe } from '../types'
import { VIBE_THEMES } from '../lib/themes'

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; opacity: number; color: string; type: string
}

interface Props { weather: Weather; vibe: Vibe }

export default function ParticleCanvas({ weather, vibe }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const c = canvas
    const ctx = c.getContext('2d')!
    const theme = VIBE_THEMES[vibe]

    const resize = () => {
      c.width = window.innerWidth
      c.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const isMobile = window.innerWidth < 768
    const count = weather === 'none' ? 0 : (isMobile ? 25 : 60)
    particlesRef.current = Array.from({ length: count }, () => createParticle(c, weather, theme.accent))

    function createParticle(canvasObj: HTMLCanvasElement, w: Weather, accent: string): Particle {
      const colors: Record<Weather, string[]> = {
        stars: ['#ffffff', '#fffde7', '#fff9c4', accent],
        rain: ['rgba(100,180,255,0.6)', 'rgba(150,200,255,0.4)'],
        aurora: [accent, '#00ffcc', '#ff6eb4', '#a855f7'],
        none: [],
      }
      const colorList = colors[w] || [accent]
      return {
        x: Math.random() * canvasObj.width,
        y: Math.random() * canvasObj.height,
        vx: w === 'rain' ? 0.5 : (Math.random() - 0.5) * 0.3,
        vy: w === 'rain' ? 2 + Math.random() * 2 : -0.2 - Math.random() * 0.3,
        size: w === 'rain' ? 1 + Math.random() : 1 + Math.random() * 2.5,
        opacity: 0.3 + Math.random() * 0.7,
        color: colorList[Math.floor(Math.random() * colorList.length)],
        type: w,
      }
    }

    function draw() {
      ctx.clearRect(0, 0, c.width, c.height)
      particlesRef.current.forEach(p => {
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        if (p.type === 'stars') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.type === 'rain') {
          ctx.strokeStyle = p.color
          ctx.lineWidth = p.size
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x + p.vx * 4, p.y + p.vy * 4)
          ctx.stroke()
        } else if (p.type === 'aurora') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()

        p.x += p.vx; p.y += p.vy
        p.opacity += Math.sin(Date.now() * 0.001 + p.x) * 0.01

        if (p.y < -10) p.y = c.height + 10
        if (p.y > c.height + 10) p.y = -10
        if (p.x < -10) p.x = c.width + 10
        if (p.x > c.width + 10) p.x = -10
        p.opacity = Math.max(0.1, Math.min(1, p.opacity))
      })
      animRef.current = requestAnimationFrame(draw)
    }

    if (weather !== 'none') draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [weather, vibe])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
