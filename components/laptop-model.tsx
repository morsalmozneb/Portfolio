"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

/**
 * Loads the GLB, auto-centers it using Box3 after the scene is ready,
 * scales it to fill the viewport, then adds hover tilt + float.
 */
function LaptopModel({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { scene } = useGLTF("/models/laptop.glb")
  const outerRef = useRef<THREE.Group>(null)
  const centered = useRef(false)
  const { viewport } = useThree()

  // Auto-center + auto-scale once on first frame after load
  useEffect(() => {
    if (!scene || centered.current) return

    // Clone so we don't mutate the cached scene
    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    // Target: fill ~70% of viewport width, cap at 3.5 units
    const maxDim = Math.max(size.x, size.y, size.z)
    const targetSize = Math.min(viewport.width * 0.7, 3.5)
    const s = maxDim > 0 ? targetSize / maxDim : 1

    scene.scale.setScalar(s)
    // Re-center after scaling
    scene.position.set(-center.x * s, -center.y * s, -center.z * s)

    centered.current = true
  }, [scene, viewport])

  useFrame(() => {
    if (!outerRef.current) return
    const t = performance.now() / 1000
    const maxTilt = 0.12

    outerRef.current.rotation.x = THREE.MathUtils.lerp(
      outerRef.current.rotation.x, -mouseY * maxTilt, 0.07
    )
    outerRef.current.rotation.y = THREE.MathUtils.lerp(
      outerRef.current.rotation.y, mouseX * maxTilt, 0.07
    )
    // Float around origin (model is already centered)
    outerRef.current.position.y = Math.sin(t * 0.6) * 0.08
  })

  return (
    <group ref={outerRef} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

/** Shown while the GLB is downloading */
function LoadingBox() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.01
  })
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 0.6, 0.05]} />
      <meshStandardMaterial color="#8C91F7" />
    </mesh>
  )
}

/* ─── Exported wrapper ─── */
export function LaptopScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setMouse({
      x: Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2))),
      y: Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2))),
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto"
      style={{ height: "clamp(280px, 38vw, 440px)", maxWidth: "640px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, 3, 2]} intensity={1} />

        <Suspense fallback={<LoadingBox />}>
          <LaptopModel mouseX={mouse.x} mouseY={mouse.y} />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload("/models/laptop.glb")
