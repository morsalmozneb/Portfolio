"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { smoothNoise } from "@/lib/noise"

/* ── Tuned for the hero portrait ──────────────────────── */
const CFG = {
  halftoneSize: 5,
  contrast: 1.3,   // gentle — preserves face mid-tones
  accentColor: "#8C91F7",   // portfolio purple
  mouseRadius: 88,
  repulsionStrength: 1.1,
  returnSpeed: 0.28,
  accentProbability: 0.04,
  sizeVariation: 0.32,
  MAX_W: 460,
  MAX_H: 560,
}

interface DotData {
  x: number; y: number
  baseX: number; baseY: number
  baseSize: number; brightness: number
  isAccent: boolean; sizeMultiplier: number
  twinklePhase: number; twinkleSpeed: number
  vx: number; vy: number
}
interface TrailPoint { x: number; y: number; timestamp: number; strength: number }

export function HalftonePortrait() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const dotsRef      = useRef<DotData[]>([])
  const mouseRef     = useRef({ x: -1000, y: -1000, prevX: -1000, prevY: -1000 })
  const rafRef       = useRef<number>()
  const trailRef     = useRef<TrailPoint[]>([])
  const lastMoveRef  = useRef(0)
  const firstMoveRef = useRef(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      const scaleX = CFG.MAX_W / img.width
      const scaleY = CFG.MAX_H / img.height
      const scale  = Math.min(1, scaleX, scaleY)
      const dpr    = window.devicePixelRatio || 1
      const dW     = img.width  * scale
      const dH     = img.height * scale

      canvas.width        = dW * dpr
      canvas.height       = dH * dpr
      canvas.style.width  = `${dW}px`
      canvas.style.height = `${dH}px`

      ctx.scale(dpr, dpr)
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(img, 0, 0, dW, dH)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        data[i]     = Math.max(0, Math.min(255, ((data[i]     / 255 - 0.5) * CFG.contrast + 0.5) * 255))
        data[i + 1] = Math.max(0, Math.min(255, ((data[i + 1] / 255 - 0.5) * CFG.contrast + 0.5) * 255))
        data[i + 2] = Math.max(0, Math.min(255, ((data[i + 2] / 255 - 0.5) * CFG.contrast + 0.5) * 255))
      }

      const dots: DotData[] = []
      const adj = Math.max(2, CFG.halftoneSize * scale)

      for (let y = 0; y < dH; y += adj) {
        for (let x = 0; x < dW; x += adj) {
          const sx = Math.floor(x * dpr)
          const sy = Math.floor(y * dpr)
          const idx = (sy * canvas.width + sx) * 4
          const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3
          const dotSize = (brightness / 255) * adj * 0.9
          if (dotSize > 0.6) {   // keep most face pixels; near-black deep shadows still filtered
            const cx = x + adj / 2
            const cy = y + adj / 2
            dots.push({
              x: cx, y: cy, baseX: cx, baseY: cy,
              baseSize: dotSize, brightness,
              isAccent: Math.random() < CFG.accentProbability && brightness > 150,
              sizeMultiplier: 1 + (Math.random() - 0.5) * CFG.sizeVariation,
              twinklePhase: Math.random() * Math.PI * 2,
              twinkleSpeed: 0.02 + Math.random() * 0.03,
              vx: 0, vy: 0,
            })
          }
        }
      }

      dotsRef.current = dots
      setReady(true)

      /* ── Animation loop ── */
      const animate = () => {
        // Clear to transparent — no black background
        ctx.clearRect(0, 0, dW, dH)

        const timeSinceLast = Date.now() - lastMoveRef.current
        if (timeSinceLast > 100) trailRef.current = []

        const time = Date.now() * 0.001

        dots.forEach((dot) => {
          let maxDF = 0
          let fX = 0, fY = 0

          trailRef.current.forEach((tp) => {
            const dx = tp.x - dot.x
            const dy = tp.y - dot.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist > CFG.mouseRadius * 1.5) return
            const noise = smoothNoise(dot.baseX, dot.baseY, 0.02, time)
            const iR = CFG.mouseRadius * (0.7 + noise * 0.6)
            if (dist < iR) {
              const df = 1 - dist / iR
              const sf = df * df * (3 - 2 * df)
              maxDF = Math.max(maxDF, sf)
              if (dist > 0.1) {
                const force = CFG.repulsionStrength * sf * tp.strength * 0.5
                fX -= (dx / dist) * force
                fY -= (dy / dist) * force
              }
            }
          })

          let isTwinkling = false
          if (mouseRef.current.x > 0) {
            const dx = mouseRef.current.x - dot.x
            const dy = mouseRef.current.y - dot.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const noise = smoothNoise(dot.baseX, dot.baseY, 0.02, time)
            const iR = CFG.mouseRadius * (0.7 + noise * 0.6)
            if (dist < iR) {
              const df = 1 - dist / iR
              maxDF = Math.max(maxDF, df * df * (3 - 2 * df))
              isTwinkling = true
            }
          }

          dot.vx += fX + (dot.baseX - dot.x) * CFG.returnSpeed * 0.1
          dot.vy += fY + (dot.baseY - dot.y) * CFG.returnSpeed * 0.1
          dot.vx *= 0.85; dot.vy *= 0.85
          dot.x += dot.vx; dot.y += dot.vy

          let opacity = 1
          if (maxDF > 0) {
            dot.twinklePhase += dot.twinkleSpeed
            const tw = Math.sin(dot.twinklePhase) * 0.5 + 0.5
            const twAmt = (0.3 + tw * 0.7) * maxDF
            opacity = 1 - (1 - twAmt) * maxDF
          }

          // Let dot SIZE carry the brightness info — no extra alpha scaling needed.
          // Dark areas naturally produce tiny/no dots, page bg shows through.
          ctx.globalAlpha = opacity
          ctx.fillStyle = dot.isAccent ? CFG.accentColor : "#ffffff"
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, (dot.baseSize * dot.sizeMultiplier) / 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = 1
        })

        rafRef.current = requestAnimationFrame(animate)
      }

      animate()

      /* ── Mouse tracking ── */
      const onMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        const nx = e.clientX - rect.left
        const ny = e.clientY - rect.top
        lastMoveRef.current = Date.now()

        if (firstMoveRef.current) {
          mouseRef.current = { x: nx, y: ny, prevX: nx, prevY: ny }
          firstMoveRef.current = false
          return
        }

        const velX = nx - mouseRef.current.x
        const velY = ny - mouseRef.current.y
        const speed = Math.sqrt(velX * velX + velY * velY)
        const steps = Math.max(1, Math.ceil(speed / 10))

        for (let i = 0; i < steps; i++) {
          const t = i / steps
          trailRef.current.push({
            x: mouseRef.current.x + velX * t,
            y: mouseRef.current.y + velY * t,
            timestamp: Date.now(),
            strength: Math.min(speed / 10, 1),
          })
        }

        mouseRef.current.prevX = mouseRef.current.x
        mouseRef.current.prevY = mouseRef.current.y
        mouseRef.current.x = nx
        mouseRef.current.y = ny

        const now = Date.now()
        trailRef.current = trailRef.current.filter((p) => now - p.timestamp < 150)
      }

      const onLeave = () => {
        mouseRef.current = { x: -1000, y: -1000, prevX: -1000, prevY: -1000 }
        firstMoveRef.current = true
        trailRef.current = []
      }

      canvas.addEventListener("mousemove", onMove)
      canvas.addEventListener("mouseleave", onLeave)

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        canvas.removeEventListener("mousemove", onMove)
        canvas.removeEventListener("mouseleave", onLeave)
      }
    }

    img.src = "/images/Morsal_Portrait.png"
  }, [])

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: CFG.MAX_W, height: CFG.MAX_H }}
    >
      {/* Ambient glow behind canvas */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(140,145,247,0.30) 0%, rgba(120,88,220,0.12) 50%, transparent 76%)",
          filter: "blur(20px)",
          zIndex: 0,
        }}
      />

      {/* Canvas */}
      <motion.canvas
        ref={canvasRef}
        className="relative cursor-crosshair block"
        style={{ zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Hover hint — fades out after 2.5 s */}
      {ready && (
        <motion.p
          className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[10px] tracking-[0.25em] uppercase"
          style={{ color: "rgba(140,145,247,0.55)", zIndex: 2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 3.5, times: [0, 0.2, 0.7, 1], delay: 1.2 }}
        >
          Move cursor to interact
        </motion.p>
      )}
    </div>
  )
}
