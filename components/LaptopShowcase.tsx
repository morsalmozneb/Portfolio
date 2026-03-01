"use client"

import {
  Suspense,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & TYPES
// ─────────────────────────────────────────────────────────────────────────────

const OPEN_ANGLE = -1.85   // ~106° in radians (lid open)
const CLOSED_ANGLE = 0.05  // nearly flat closed
const ANIM_DURATION = 0.9  // seconds for lid animation

const SLIDES = [
  {
    name: "Figma",
    descriptor: "UI / UX Design",
    color: "#F24E1E",
    icon: "figma",
  },
  {
    name: "Adobe Illustrator",
    descriptor: "Vector Graphics",
    color: "#FF9A00",
    icon: "ai",
  },
  {
    name: "Adobe Photoshop",
    descriptor: "Photo Editing",
    color: "#31A8FF",
    icon: "ps",
  },
  {
    name: "After Effects",
    descriptor: "Motion Design",
    color: "#9999FF",
    icon: "ae",
  },
  {
    name: "VS Code",
    descriptor: "Front-End Coding",
    color: "#007ACC",
    icon: "vsc",
  },
]

const CAROUSEL_INTERVAL = 2500

// ─────────────────────────────────────────────────────────────────────────────
// EASING
// ─────────────────────────────────────────────────────────────────────────────

/** Smooth spring-like easing: overshoot then settle */
function easeSpring(t: number): number {
  const c4 = (2 * Math.PI) / 3
  if (t === 0) return 0
  if (t === 1) return 1
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
}

// ─────────────────────────────────────────────────────────────────────────────
// MATERIALS (memoized outside components to avoid re-creation)
// ─────────────────────────────────────────────────────────────────────────────

function createAluminumMaterial(color = "#b0b8c8") {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: 0.85,
    roughness: 0.25,
    envMapIntensity: 0.6,
  })
}

function createScreenBezzelMaterial() {
  return new THREE.MeshStandardMaterial({
    color: "#1a1c22",
    metalness: 0.3,
    roughness: 0.8,
  })
}

function createKeyboardMaterial() {
  return new THREE.MeshStandardMaterial({
    color: "#22242c",
    metalness: 0.1,
    roughness: 0.9,
  })
}

function createHingeMaterial() {
  return new THREE.MeshStandardMaterial({
    color: "#888fa0",
    metalness: 0.95,
    roughness: 0.15,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN TEXTURE (drawn on a canvas, rendered as texture)
// ─────────────────────────────────────────────────────────────────────────────

interface SlideState {
  index: number
  progress: number // 0→1 fade-in
}

function useScreenTexture(activeIndex: number, glowIntensity: number) {
  const textureRef = useRef<THREE.CanvasTexture | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animRef = useRef<SlideState>({ index: activeIndex, progress: 1 })
  const prevIndexRef = useRef(activeIndex)
  const transitionRef = useRef<{ from: number; to: number; t: number } | null>(null)

  useEffect(() => {
    const c = document.createElement("canvas")
    c.width = 512
    c.height = 320
    canvasRef.current = c
    textureRef.current = new THREE.CanvasTexture(c)
    return () => {
      textureRef.current?.dispose()
    }
  }, [])

  // Trigger transition when slide changes
  useEffect(() => {
    if (activeIndex !== prevIndexRef.current) {
      transitionRef.current = {
        from: prevIndexRef.current,
        to: activeIndex,
        t: 0,
      }
      prevIndexRef.current = activeIndex
    }
  }, [activeIndex])

  const draw = useCallback(
    (deltaTime: number) => {
      const canvas = canvasRef.current
      const texture = textureRef.current
      if (!canvas || !texture) return

      const ctx = canvas.getContext("2d")!
      const W = canvas.width
      const H = canvas.height

      // Advance transition
      if (transitionRef.current) {
        transitionRef.current.t = Math.min(
          1,
          transitionRef.current.t + deltaTime / 0.45
        )
        if (transitionRef.current.t >= 1) transitionRef.current = null
      }

      // Clear
      ctx.clearRect(0, 0, W, H)

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, 0, H)
      bg.addColorStop(0, "#070810")
      bg.addColorStop(1, "#0d0f1a")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // Glow vignette from center
      const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.6)
      const gi = 0.06 + glowIntensity * 0.12
      glow.addColorStop(0, `rgba(100,110,255,${gi})`)
      glow.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)

      // Draw slide function
      const drawSlide = (
        idx: number,
        alpha: number,
        offsetY: number
      ) => {
        const slide = SLIDES[idx]
        ctx.globalAlpha = alpha

        // Center content
        const cx = W / 2
        const cy = H / 2 + offsetY

        // Icon background circle
        ctx.save()
        ctx.translate(cx, cy - 48)
        drawIcon(ctx, slide.icon, slide.color, 44)
        ctx.restore()

        // Tool name
        ctx.fillStyle = "#e8eaf0"
        ctx.font = "bold 28px -apple-system, system-ui, sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(slide.name, cx, cy + 22)

        // Descriptor
        ctx.fillStyle = `${slide.color}cc`
        ctx.font = "500 13px -apple-system, system-ui, sans-serif"
        ctx.letterSpacing = "0.15em"
        ctx.fillText(slide.descriptor.toUpperCase(), cx, cy + 52)
        ctx.letterSpacing = "0"

        ctx.globalAlpha = 1
      }

      if (transitionRef.current) {
        const { from, to, t } = transitionRef.current
        const easedT = easeSpring(Math.min(t, 1))
        // Old slide fades out + moves up
        drawSlide(from, 1 - easedT, -easedT * 18)
        // New slide fades in + comes from below
        drawSlide(to, easedT, (1 - easedT) * 18)
      } else {
        drawSlide(activeIndex, 1, 0)
      }

      // Progress dots
      const dotCount = SLIDES.length
      const dotSpacing = 14
      const dotStartX = W / 2 - ((dotCount - 1) * dotSpacing) / 2
      SLIDES.forEach((s, i) => {
        ctx.beginPath()
        const isActive = i === activeIndex
        const w = isActive ? 20 : 6
        const h = 5
        ctx.roundRect(
          dotStartX + i * dotSpacing - w / 2,
          H - 28,
          w,
          h,
          3
        )
        ctx.fillStyle = isActive ? s.color : "rgba(255,255,255,0.2)"
        ctx.fill()
      })

      // Subtle scanlines
      ctx.globalAlpha = 0.025
      for (let y = 0; y < H; y += 3) {
        ctx.fillStyle = "#000"
        ctx.fillRect(0, y, W, 1)
      }
      ctx.globalAlpha = 1

      // Corner indicators
      const cornerSize = 10
      const cornerPad = 12
      ctx.strokeStyle = "rgba(255,255,255,0.12)"
      ctx.lineWidth = 1.5
      ;[
        [cornerPad, cornerPad],
        [W - cornerPad, cornerPad],
        [cornerPad, H - cornerPad],
        [W - cornerPad, H - cornerPad],
      ].forEach(([x, y], i) => {
        const sx = i % 2 === 0 ? 1 : -1
        const sy = i < 2 ? 1 : -1
        ctx.beginPath()
        ctx.moveTo(x, y + sy * cornerSize)
        ctx.lineTo(x, y)
        ctx.lineTo(x + sx * cornerSize, y)
        ctx.stroke()
      })

      texture.needsUpdate = true
    },
    [activeIndex, glowIntensity]
  )

  return { textureRef, draw }
}

// ─────────────────────────────────────────────────────────────────────────────
// ICON DRAWING
// ─────────────────────────────────────────────────────────────────────────────

function drawIcon(
  ctx: CanvasRenderingContext2D,
  icon: string,
  color: string,
  size: number
) {
  const s = size

  switch (icon) {
    case "figma": {
      // Simplified Figma logo
      const s3 = s / 3
      const r = s3 / 2
      // Top-left: red
      ctx.beginPath()
      ctx.moveTo(-s3, -s3 * 2)
      ctx.lineTo(0, -s3 * 2)
      ctx.arcTo(s3, -s3 * 2, s3, -s3, r)
      ctx.arcTo(s3, 0, 0, 0, r)
      ctx.lineTo(-s3, 0)
      ctx.arcTo(-s3, -s3 * 2, 0, -s3 * 2, r)
      ctx.closePath()
      ctx.fillStyle = "#F24E1E"
      ctx.fill()
      // Top-right: orange  
      ctx.beginPath()
      ctx.arc(s3 / 2, -s3 * 1.5, r, 0, Math.PI * 2)
      ctx.fillStyle = "#FF7262"
      ctx.fill()
      // Mid-right: blue circle
      ctx.beginPath()
      ctx.arc(s3 / 2, 0, r, 0, Math.PI * 2)
      ctx.fillStyle = "#1ABCFE"
      ctx.fill()
      // Bottom-left: green
      ctx.beginPath()
      ctx.moveTo(-s3, 0)
      ctx.lineTo(0, 0)
      ctx.lineTo(0, s3)
      ctx.arcTo(0, s3 * 2, -s3, s3 * 2, r)
      ctx.arcTo(-s3, s3 * 2, -s3, s3, r)
      ctx.closePath()
      ctx.fillStyle = "#0ACF83"
      ctx.fill()
      // Mid-left: purple
      ctx.beginPath()
      ctx.moveTo(-s3, -s3)
      ctx.lineTo(0, -s3)
      ctx.lineTo(0, s3)
      ctx.lineTo(-s3, s3)
      ctx.arcTo(-s3, -s3, 0, -s3, r)
      ctx.fillStyle = "#A259FF"
      ctx.fill()
      break
    }
    case "ai": {
      ctx.fillStyle = "#330000"
      ctx.beginPath()
      ctx.roundRect(-s / 2, -s / 2, s, s, 10)
      ctx.fill()
      ctx.fillStyle = "#FF9A00"
      ctx.font = `bold ${s * 0.48}px serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("Ai", 0, 2)
      break
    }
    case "ps": {
      ctx.fillStyle = "#001E36"
      ctx.beginPath()
      ctx.roundRect(-s / 2, -s / 2, s, s, 10)
      ctx.fill()
      ctx.fillStyle = "#31A8FF"
      ctx.font = `bold ${s * 0.48}px serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("Ps", 0, 2)
      break
    }
    case "ae": {
      ctx.fillStyle = "#00005B"
      ctx.beginPath()
      ctx.roundRect(-s / 2, -s / 2, s, s, 10)
      ctx.fill()
      ctx.fillStyle = "#9999FF"
      ctx.font = `bold ${s * 0.48}px serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("Ae", 0, 2)
      break
    }
    case "vsc": {
      ctx.fillStyle = "#1E1E1E"
      ctx.beginPath()
      ctx.roundRect(-s / 2, -s / 2, s, s, 10)
      ctx.fill()
      ctx.strokeStyle = "#007ACC"
      ctx.lineWidth = s * 0.1
      ctx.lineJoin = "round"
      ctx.lineCap = "round"
      const v = s * 0.28
      ctx.beginPath()
      ctx.moveTo(v * 0.6, -v)
      ctx.lineTo(-v * 0.8, 0)
      ctx.lineTo(v * 0.6, v)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(v * 0.6, -v)
      ctx.lineTo(v, -v * 1.4)
      ctx.lineTo(v, v * 1.4)
      ctx.lineTo(v * 0.6, v)
      ctx.stroke()
      break
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// LAPTOP GEOMETRY COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface LaptopProps {
  isOpen: boolean
  isAnimating: boolean
  onAnimationComplete: () => void
  mouseX: number
  mouseY: number
  activeSlide: number
  isHovered: boolean
}

const Laptop = memo(function Laptop({
  isOpen,
  isAnimating,
  onAnimationComplete,
  mouseX,
  mouseY,
  activeSlide,
  isHovered,
}: LaptopProps) {
  // Main group ref (whole laptop)
  const laptopRef = useRef<THREE.Group>(null)
  // Lid group ref (rotates around hinge)
  const lidRef = useRef<THREE.Group>(null)
  // Screen mesh ref (for glow)
  const screenMeshRef = useRef<THREE.Mesh>(null)

  // Animation state
  const animState = useRef({
    t: 0,
    fromAngle: OPEN_ANGLE,
    toAngle: OPEN_ANGLE,
    running: false,
    floatOffset: Math.random() * Math.PI * 2,
  })

  // Initialize lid angle
  useEffect(() => {
    if (lidRef.current) {
      lidRef.current.rotation.x = OPEN_ANGLE
    }
    animState.current.fromAngle = OPEN_ANGLE
    animState.current.toAngle = OPEN_ANGLE
  }, [])

  // Trigger animation when open/close state changes
  useEffect(() => {
    const a = animState.current
    const currentAngle = lidRef.current?.rotation.x ?? OPEN_ANGLE
    a.fromAngle = currentAngle
    a.toAngle = isOpen ? OPEN_ANGLE : CLOSED_ANGLE
    a.t = 0
    a.running = true
  }, [isOpen])

  // Materials (memoized)
  const aluminumMat = useMemo(() => createAluminumMaterial(), [])
  const aluminumDarkMat = useMemo(() => createAluminumMaterial("#9aa0b0"), [])
  const bezzelMat = useMemo(() => createScreenBezzelMaterial(), [])
  const keyboardMat = useMemo(() => createKeyboardMaterial(), [])
  const hingeMat = useMemo(() => createHingeMaterial(), [])

  const screenEmissiveMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#050810",
        emissive: "#1a2060",
        emissiveIntensity: 0.4,
        roughness: 0.1,
        metalness: 0.0,
      }),
    []
  )

  const trackpadMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#9ea4b4",
        metalness: 0.7,
        roughness: 0.3,
      }),
    []
  )

  // Screen texture
  const glowIntensity = isHovered ? 1 : 0
  const { textureRef, draw } = useScreenTexture(activeSlide, glowIntensity)

  const screenTextureMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 1,
      }),
    []
  )

  // Geometries (memoized)
  const baseGeo = useMemo(() => new THREE.BoxGeometry(2.8, 0.12, 1.9), [])
  const lidGeo = useMemo(() => new THREE.BoxGeometry(2.8, 0.09, 1.9), [])
  const bezzelGeo = useMemo(() => new THREE.BoxGeometry(2.6, 1.72, 0.04), [])
  const screenGeo = useMemo(() => new THREE.BoxGeometry(2.4, 1.54, 0.01), [])
  const keyDeckGeo = useMemo(() => new THREE.BoxGeometry(2.6, 0.01, 1.7), [])
  const trackpadGeo = useMemo(() => new THREE.BoxGeometry(0.8, 0.005, 0.52), [])
  const hingeGeo = useMemo(() => new THREE.CylinderGeometry(0.045, 0.045, 0.5, 12), [])
  const logoGeo = useMemo(() => new THREE.BoxGeometry(0.15, 0.15, 0.005), [])
  const shadowGeo = useMemo(() => new THREE.PlaneGeometry(4, 3), [])

  const shadowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#000000",
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
    []
  )

  const logoMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#cccccc",
        transparent: true,
        opacity: 0.6,
      }),
    []
  )

  // Key geometry (one key, instanced)
  const keyGeo = useMemo(() => new THREE.BoxGeometry(0.13, 0.012, 0.11), [])
  const keyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1e2028",
        roughness: 0.7,
        metalness: 0.05,
      }),
    []
  )

  // Build key positions
  const keyPositions = useMemo(() => {
    const positions: [number, number, number][] = []
    const rows = [
      { count: 13, z: -0.5 },
      { count: 13, z: -0.35 },
      { count: 12, z: -0.2 },
      { count: 11, z: -0.05 },
      { count: 7, z: 0.12 },
    ]
    rows.forEach(({ count, z }) => {
      const totalW = count * 0.16
      for (let i = 0; i < count; i++) {
        positions.push([
          -totalW / 2 + i * 0.16 + 0.08,
          0.011,
          z,
        ])
      }
    })
    return positions
  }, [])

  useFrame((state, delta) => {
    const a = animState.current
    const laptop = laptopRef.current
    const lid = lidRef.current
    const screen = screenMeshRef.current
    if (!laptop || !lid) return

    // ── Lid animation ──
    if (a.running) {
      a.t = Math.min(1, a.t + delta / ANIM_DURATION)
      const easedT = easeSpring(a.t)
      lid.rotation.x = a.fromAngle + (a.toAngle - a.fromAngle) * easedT
      if (a.t >= 1) {
        a.running = false
        onAnimationComplete()
      }
    }

    // ── Floating animation ──
    const elapsed = state.clock.elapsedTime + a.floatOffset
    laptop.position.y = Math.sin(elapsed * 0.5) * 0.04 - 0.04

    // ── Mouse tilt ──
    const targetRX = mouseY * 0.1
    const targetRY = mouseX * 0.14
    laptop.rotation.x = THREE.MathUtils.lerp(laptop.rotation.x, targetRX, 0.06)
    laptop.rotation.y = THREE.MathUtils.lerp(laptop.rotation.y, targetRY, 0.06)

    // ── Screen glow pulse ──
    if (screen && screenEmissiveMat) {
      const pulse = Math.sin(elapsed * 1.2) * 0.05
      const baseIntensity = isHovered ? 0.65 : 0.35
      screenEmissiveMat.emissiveIntensity = baseIntensity + pulse
    }

    // ── Update screen texture ──
    draw(delta)

    // Apply texture to screen material
    if (textureRef.current && screenTextureMat.map !== textureRef.current) {
      screenTextureMat.map = textureRef.current
      screenTextureMat.needsUpdate = true
    }
  })

  return (
    <group ref={laptopRef}>
      {/* ── Shadow plane ── */}
      <mesh
        geometry={shadowGeo}
        material={shadowMat}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.32, 0.1]}
        receiveShadow={false}
      />

      {/* ── BASE ── */}
      <group position={[0, 0, 0]}>
        {/* Main base body */}
        <mesh geometry={baseGeo} material={aluminumMat} castShadow position={[0, 0, 0]} />
        {/* Base bottom (slightly darker) */}
        <mesh geometry={baseGeo} material={aluminumDarkMat} position={[0, -0.002, 0]} scale={[0.99, 0.98, 0.99]} />
        {/* Keyboard deck recessed area */}
        <mesh geometry={keyDeckGeo} material={keyboardMat} position={[0, 0.063, -0.06]} />
        {/* Trackpad */}
        <mesh geometry={trackpadGeo} material={trackpadMat} position={[0, 0.063, 0.62]} />
        {/* Keys */}
        {keyPositions.map((pos, i) => (
          <mesh
            key={i}
            geometry={keyGeo}
            material={keyMat}
            position={[pos[0], pos[1], pos[2] - 0.06]}
          />
        ))}
        {/* Speaker grills (decorative lines) */}
        {[-1.15, 1.15].map((x, i) => (
          <group key={i} position={[x, 0.062, -0.3]}>
            {[0, 0.04, 0.08, 0.12, 0.16].map((z, j) => (
              <mesh key={j} position={[0, 0, z]}>
                <boxGeometry args={[0.12, 0.003, 0.012]} />
                <meshStandardMaterial color="#1a1c20" roughness={1} />
              </mesh>
            ))}
          </group>
        ))}
        {/* Hinge barrels */}
        {[-0.6, 0.6].map((x, i) => (
          <mesh
            key={i}
            geometry={hingeGeo}
            material={hingeMat}
            position={[x, 0.09, -0.94]}
            rotation={[0, 0, Math.PI / 2]}
          />
        ))}
      </group>

      {/* ── LID (rotates around hinge) ── */}
      {/* Pivot is at back edge of base: z = -0.95, y = 0.09 */}
      <group
        ref={lidRef}
        position={[0, 0.09, -0.94]}
        rotation={[OPEN_ANGLE, 0, 0]}
      >
        {/* Lid outer shell */}
        <mesh
          geometry={lidGeo}
          material={aluminumMat}
          position={[0, 0, -0.95]}
          castShadow
        />
        {/* Bezzel (inner frame of screen) */}
        <mesh
          geometry={bezzelGeo}
          material={bezzelMat}
          position={[0, 0.02, -0.97]}
        />
        {/* Screen emissive backing */}
        <mesh
          ref={screenMeshRef}
          geometry={screenGeo}
          material={screenEmissiveMat}
          position={[0, 0.02, -0.97]}
        />
        {/* Screen content texture */}
        <mesh
          geometry={screenGeo}
          material={screenTextureMat}
          position={[0, 0.02, -0.965]}
        />
        {/* Screen glass reflection highlight */}
        <mesh position={[0, 0.55, -0.962]}>
          <planeGeometry args={[2.3, 0.06]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.04} />
        </mesh>
        {/* Apple logo on back of lid */}
        <mesh
          geometry={logoGeo}
          material={logoMat}
          position={[0, -0.01, -0.924]}
          rotation={[0, Math.PI, 0]}
        />
        {/* Webcam dot */}
        <mesh position={[0, 0.82, -0.965]}>
          <circleGeometry args={[0.018, 12]} />
          <meshStandardMaterial color="#111113" roughness={0.5} />
        </mesh>
        {/* Webcam inner */}
        <mesh position={[0, 0.82, -0.964]}>
          <circleGeometry args={[0.008, 8]} />
          <meshBasicMaterial color="#2244ff" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  )
})

// ─────────────────────────────────────────────────────────────────────────────
// SCENE SETUP (lights, orbit, etc.)
// ─────────────────────────────────────────────────────────────────────────────

interface SceneProps {
  isOpen: boolean
  isAnimating: boolean
  onAnimationComplete: () => void
  mouseX: number
  mouseY: number
  activeSlide: number
  isHovered: boolean
}

function Scene({
  isOpen,
  isAnimating,
  onAnimationComplete,
  mouseX,
  mouseY,
  activeSlide,
  isHovered,
}: SceneProps) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 1.2, 4.5)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.6} color="#d0d8f0" />
      {/* Key light */}
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.8}
        color="#ffffff"
        castShadow
      />
      {/* Rim light */}
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.4}
        color="#6080ff"
      />
      {/* Under-fill */}
      <pointLight position={[0, -2, 3]} intensity={0.3} color="#3050a0" />
      {/* Screen bounce */}
      <pointLight
        position={[0, 0.8, 2.5]}
        intensity={isHovered ? 0.5 : 0.25}
        color="#4060ff"
        distance={4}
      />

      <Suspense fallback={null}>
        <Laptop
          isOpen={isOpen}
          isAnimating={isAnimating}
          onAnimationComplete={onAnimationComplete}
          mouseX={mouseX}
          mouseY={mouseY}
          activeSlide={activeSlide}
          isHovered={isHovered}
        />
      </Suspense>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function LaptopShowcase() {
  const [isOpen, setIsOpen] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Carousel auto-advance
  useEffect(() => {
    carouselRef.current = setInterval(() => {
      setActiveSlide((i) => (i + 1) % SLIDES.length)
    }, CAROUSEL_INTERVAL)
    return () => {
      if (carouselRef.current) clearInterval(carouselRef.current)
    }
  }, [])

  const handleClick = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsOpen((prev) => !prev)
  }, [isAnimating])

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setMouse({
        x: Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2))),
        y: Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2))),
      })
    },
    []
  )

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Canvas */}
      <div
        ref={containerRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setMouse({ x: 0, y: 0 })
          setIsHovered(false)
        }}
        onMouseEnter={() => setIsHovered(true)}
        style={{
          width: "100%",
          maxWidth: "720px",
          height: "clamp(320px, 45vw, 520px)",
          cursor: isAnimating ? "wait" : "pointer",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          shadows
          style={{ background: "transparent" }}
        >
          <Scene
            isOpen={isOpen}
            isAnimating={isAnimating}
            onAnimationComplete={handleAnimationComplete}
            mouseX={mouse.x}
            mouseY={mouse.y}
            activeSlide={activeSlide}
            isHovered={isHovered}
          />
        </Canvas>

        {/* Click hint overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "rgba(180,185,210,0.55)",
            textTransform: "uppercase",
            pointerEvents: "none",
            fontWeight: 500,
          }}
        >
          {isAnimating ? "animating…" : `click to ${isOpen ? "close" : "open"}`}
        </div>
      </div>

      {/* Slide indicator below canvas */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {SLIDES.map((slide, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveSlide(i)
              // Reset interval on manual click
              if (carouselRef.current) clearInterval(carouselRef.current)
              carouselRef.current = setInterval(() => {
                setActiveSlide((idx) => (idx + 1) % SLIDES.length)
              }, CAROUSEL_INTERVAL)
            }}
            style={{
              background:
                i === activeSlide ? slide.color : "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: "3px",
              height: "5px",
              width: i === activeSlide ? "20px" : "6px",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
            aria-label={`Show ${slide.name}`}
          />
        ))}
      </div>

      {/* Tool name below */}
      <div
        style={{
          fontSize: "13px",
          letterSpacing: "0.1em",
          color: SLIDES[activeSlide].color,
          textTransform: "uppercase",
          fontWeight: 600,
          height: "18px",
          transition: "color 0.3s ease",
        }}
      >
        {SLIDES[activeSlide].name}
      </div>
    </div>
  )
}
