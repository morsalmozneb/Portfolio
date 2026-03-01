"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Spline from "@splinetool/react-spline"
import { useCallback } from "react"

const SCENE_URL = "https://prod.spline.design/xhjycszMq28VqFIz/scene.splinecode"

export function SplineFace() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.5 })
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.5 })

  const rotateX = useTransform(smoothY, [-20, 20], [10, -10])
  const rotateY = useTransform(smoothX, [-24, 24], [-14, 14])

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    pointerX.set(nx * 48)
    pointerY.set(ny * 40)
  }, [pointerX, pointerY])

  const handleLeave = useCallback(() => {
    pointerX.set(0)
    pointerY.set(0)
  }, [pointerX, pointerY])

  // Reach into the WebGL context after Spline loads and set the clear-colour
  // alpha to 0 so the white background becomes fully transparent.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLoad = useCallback((spline: any) => {
    const canvas = spline?.canvas as HTMLCanvasElement | undefined
    if (!canvas) return

    // Remove any CSS background
    canvas.style.background = "transparent"
    canvas.style.backgroundColor = "transparent"

    // Force the WebGL clear colour to transparent
    const gl =
      (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ??
      (canvas.getContext("webgl") as WebGLRenderingContext | null)
    if (gl) gl.clearColor(0, 0, 0, 0)
  }, [])

  return (
    <div
      className="relative w-[320px] h-[360px] md:w-[400px] md:h-[440px]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: "900px" }}
    >
      {/* Ambient glow behind the 3D scene */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(140,145,247,0.38) 0%, rgba(120,88,220,0.18) 45%, rgba(120,88,220,0) 76%)",
          filter: "blur(18px)",
          zIndex: 0,
        }}
      />

      {/* Rotating ring decoration */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(146, 160, 255, 0.2)",
          boxShadow: "0 0 34px rgba(138, 152, 255, 0.2), inset 0 0 40px rgba(120,88,220,0.12)",
          zIndex: 0,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      />

      {/* Spline scene — no overflow-hidden so 3D depth isn't clipped */}
      <motion.div
        className="spline-wrap absolute inset-0"
        animate={{
          y: [0, -7, 0],
          rotate: [0, 0.8, 0, -0.8, 0],
          filter: ["brightness(1)", "brightness(1.08)", "brightness(1)"],
        }}
        transition={{ duration: 8.5, ease: "easeInOut", repeat: Infinity }}
        style={{
          x: smoothX,
          y: smoothY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          zIndex: 1,
        }}
      >
        <Spline scene={SCENE_URL} onLoad={handleLoad} />
      </motion.div>
    </div>
  )
}
