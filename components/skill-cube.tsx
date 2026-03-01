"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useState, useEffect, useMemo, useCallback } from "react"
import * as THREE from "three"

/* ── Face data ───────────────────────────────────────────────── */

const FACES = [
  { label: "Figma", icon: "Fg" },
  { label: "Photoshop", icon: "Ps" },
  { label: "React", icon: "Re" },
  { label: "Illustrator", icon: "Ai" },
  { label: "UX Research", icon: "UX" },
  { label: "Front-End", icon: "</>" },
]

/* ── Generate a canvas texture for each face ─────────────────── */

function createFaceTexture(icon: string, label: string): THREE.CanvasTexture {
  const size = 512
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!

  // Dark translucent background
  ctx.fillStyle = "rgba(15, 13, 30, 0.92)"
  ctx.fillRect(0, 0, size, size)

  // Subtle inner border
  ctx.strokeStyle = "rgba(140, 145, 247, 0.15)"
  ctx.lineWidth = 2
  const r = 24
  ctx.beginPath()
  ctx.roundRect(8, 8, size - 16, size - 16, r)
  ctx.stroke()

  // Subtle gradient overlay from top
  const grad = ctx.createLinearGradient(0, 0, 0, size)
  grad.addColorStop(0, "rgba(140, 145, 247, 0.06)")
  grad.addColorStop(0.5, "rgba(140, 145, 247, 0)")
  grad.addColorStop(1, "rgba(140, 145, 247, 0.03)")
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  // Icon text (big, centered top)
  ctx.fillStyle = "#8C91F7"
  ctx.font = "bold 96px monospace"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.shadowColor = "rgba(140, 145, 247, 0.6)"
  ctx.shadowBlur = 30
  ctx.fillText(icon, size / 2, size / 2 - 30)

  // Reset shadow
  ctx.shadowColor = "transparent"
  ctx.shadowBlur = 0

  // Label text below icon
  ctx.fillStyle = "rgba(228, 228, 228, 0.65)"
  ctx.font = "500 28px system-ui, sans-serif"
  ctx.letterSpacing = "3px"
  ctx.fillText(label.toUpperCase(), size / 2, size / 2 + 55)

  // Bottom accent line
  ctx.strokeStyle = "rgba(140, 145, 247, 0.2)"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(size * 0.2, size - 40)
  ctx.lineTo(size * 0.8, size - 40)
  ctx.stroke()

  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

/* ── Cube mesh with auto-rotate + drag ───────────────────────── */

function Cube() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { gl } = useThree()

  // Use refs for drag state to avoid stale closures
  const draggingRef = useRef(false)
  const hoveredRef = useRef(false)
  const velocityRef = useRef({ x: 0, y: 0 })
  const prevRef = useRef({ x: 0, y: 0 })

  const [, forceUpdate] = useState(0)

  // Create materials for each face
  const materials = useMemo(() => {
    return FACES.map(({ icon, label }) => {
      const tex = createFaceTexture(icon, label)
      return new THREE.MeshStandardMaterial({
        map: tex,
        transparent: true,
        opacity: 0.95,
        roughness: 0.6,
        metalness: 0.15,
        side: THREE.FrontSide,
      })
    })
  }, [])

  // Auto-rotation
  useFrame(() => {
    if (!meshRef.current) return

    if (draggingRef.current) {
      meshRef.current.rotation.y += velocityRef.current.x
      meshRef.current.rotation.x += velocityRef.current.y
    } else {
      // Decay drag velocity
      velocityRef.current.x *= 0.95
      velocityRef.current.y *= 0.95

      const autoX = hoveredRef.current ? 0.001 : 0.003
      const autoY = hoveredRef.current ? 0.0004 : 0.0012

      meshRef.current.rotation.y += autoX + velocityRef.current.x
      meshRef.current.rotation.x += autoY + velocityRef.current.y
    }
  })

  // Drag handling via canvas pointer events (ref-based, no stale closures)
  const onPointerDown = useCallback((e: PointerEvent) => {
    draggingRef.current = true
    prevRef.current = { x: e.clientX, y: e.clientY }
    gl.domElement.setPointerCapture(e.pointerId)
    gl.domElement.style.cursor = "grabbing"
  }, [gl])

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!draggingRef.current) return
    const dx = (e.clientX - prevRef.current.x) * 0.006
    const dy = (e.clientY - prevRef.current.y) * 0.006
    velocityRef.current = { x: dx, y: dy }
    prevRef.current = { x: e.clientX, y: e.clientY }
    if (meshRef.current) {
      meshRef.current.rotation.y += dx
      meshRef.current.rotation.x += dy
    }
  }, [])

  const onPointerUp = useCallback(() => {
    draggingRef.current = false
    gl.domElement.style.cursor = "grab"
  }, [gl])

  const onPointerEnter = useCallback(() => {
    hoveredRef.current = true
    gl.domElement.style.cursor = "grab"
    forceUpdate((n) => n + 1)
  }, [gl])

  const onPointerLeave = useCallback(() => {
    hoveredRef.current = false
    draggingRef.current = false
    gl.domElement.style.cursor = "default"
    forceUpdate((n) => n + 1)
  }, [gl])

  useEffect(() => {
    const el = gl.domElement
    el.addEventListener("pointerdown", onPointerDown)
    el.addEventListener("pointermove", onPointerMove)
    el.addEventListener("pointerup", onPointerUp)
    el.addEventListener("pointerleave", onPointerLeave)
    el.addEventListener("pointerenter", onPointerEnter)

    return () => {
      el.removeEventListener("pointerdown", onPointerDown)
      el.removeEventListener("pointermove", onPointerMove)
      el.removeEventListener("pointerup", onPointerUp)
      el.removeEventListener("pointerleave", onPointerLeave)
      el.removeEventListener("pointerenter", onPointerEnter)
    }
  }, [gl, onPointerDown, onPointerMove, onPointerUp, onPointerLeave, onPointerEnter])

  return (
    <>
      {/* Main cube with per-face textures */}
      <mesh ref={meshRef} material={materials}>
        <boxGeometry args={[2.6, 2.6, 2.6]} />
      </mesh>

      {/* Faint wireframe overlay for glowing edges */}
      <mesh rotation={meshRef.current?.rotation ?? new THREE.Euler()}>
        <boxGeometry args={[2.62, 2.62, 2.62]} />
        <meshBasicMaterial
          color="#8C91F7"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
    </>
  )
}

/* ── Exported wrapper ────────────────────────────────────────── */

export function SkillCube() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className="flex-1 flex items-center justify-center"
        style={{ minHeight: "420px" }}
      >
        <div
          className="w-[220px] h-[220px] rounded-2xl"
          style={{
            background: "rgba(140, 145, 247, 0.03)",
            border: "1px solid rgba(140, 145, 247, 0.08)",
          }}
        />
      </div>
    )
  }

  return (
    <div
      className="flex-1 flex items-center justify-center relative"
      style={{ minHeight: "420px" }}
    >
      {/* Ambient under-glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "280px",
          height: "100px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(140, 145, 247, 0.1) 0%, transparent 70%)",
          filter: "blur(30px)",
          bottom: "50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        style={{ width: "100%", height: "100%", minHeight: "420px" }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Soft purple ambient */}
        <ambientLight intensity={0.5} color="#8C91F7" />

        {/* Key light */}
        <directionalLight position={[4, 3, 5]} intensity={0.5} color="#d8d8e8" />

        {/* Purple rim for depth */}
        <pointLight position={[-4, -2, -4]} intensity={0.25} color="#8C91F7" distance={18} />

        <Cube />
      </Canvas>
    </div>
  )
}
