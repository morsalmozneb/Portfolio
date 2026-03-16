"use client"

import { useRef, useEffect } from "react"

interface MagicRingsProps {
  color?: string
  colorTwo?: string
  ringCount?: number
  speed?: number
  attenuation?: number
  lineThickness?: number
  baseRadius?: number
  radiusStep?: number
  scaleRate?: number
  opacity?: number
  blur?: number
  noiseAmount?: number
  rotation?: number
  ringGap?: number
  fadeIn?: number
  fadeOut?: number
  followMouse?: boolean
  mouseInfluence?: number
  hoverScale?: number
  parallax?: number
  clickBurst?: boolean
  style?: React.CSSProperties
  className?: string
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "")
  const full  = clean.length === 3
    ? clean.split("").map(c => c + c).join("")
    : clean
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ]
}

function lerpColor(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a)
  const [r2, g2, b2] = hexToRgb(b)
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`
}

export default function MagicRings({
  color        = "#fc42ff",
  colorTwo     = "#42fcff",
  ringCount    = 6,
  speed        = 1,
  attenuation  = 10,
  lineThickness = 2,
  baseRadius   = 0.35,
  radiusStep   = 0.1,
  scaleRate    = 0.1,
  opacity      = 1,
  blur         = 0,
  noiseAmount  = 0.1,
  rotation     = 0,
  ringGap      = 1.5,
  style,
  className,
}: MagicRingsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef  = useRef(0)
  const animRef   = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const dpr = window.devicePixelRatio || 1
      ctx.clearRect(0, 0, W, H)

      const cx   = W / 2
      const cy   = H / 2
      const maxR = Math.min(W, H) / 2
      const t    = frameRef.current * speed * 0.006

      for (let i = 0; i < ringCount; i++) {
        const phase    = t + i * ringGap * 0.55
        const rBase    = maxR * (baseRadius + i * radiusStep)
        const r        = rBase * (1 + scaleRate * Math.sin(phase * 1.4))
        const attFactor = Math.max(0, 1 - (attenuation / 100) * i)
        const alpha    = opacity * attFactor

        if (alpha <= 0.01 || r <= 1) continue

        const ringColor = lerpColor(color, colorTwo, i / Math.max(1, ringCount - 1))

        // Draw ring as a distorted polygon (80 points) for organic look
        const POINTS = 80
        ctx.beginPath()
        for (let j = 0; j <= POINTS; j++) {
          const angle = (j / POINTS) * Math.PI * 2 + rotation
          // Multi-frequency noise for organic, non-repeating distortion
          const noise = noiseAmount * rBase * (
            Math.sin(angle * 3  + phase * 1.3  + i * 0.7) * 0.45 +
            Math.sin(angle * 7  - phase * 0.9  + i * 1.2) * 0.30 +
            Math.sin(angle * 2  + phase * 2.0  - i * 0.5) * 0.25
          )
          const rx = cx + (r + noise) * Math.cos(angle)
          const ry = cy + (r + noise) * Math.sin(angle)
          if (j === 0) ctx.moveTo(rx, ry)
          else ctx.lineTo(rx, ry)
        }
        ctx.closePath()

        ctx.save()
        if (blur > 0) ctx.filter = `blur(${blur}px)`
        ctx.strokeStyle   = ringColor
        ctx.lineWidth     = lineThickness * dpr
        ctx.globalAlpha   = alpha
        ctx.shadowBlur    = 14 * dpr
        ctx.shadowColor   = ringColor
        ctx.stroke()
        ctx.restore()
      }

      frameRef.current++
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, colorTwo, ringCount, speed, attenuation, lineThickness,
      baseRadius, radiusStep, scaleRate, opacity, blur, noiseAmount,
      rotation, ringGap])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      className={className}
    />
  )
}
