"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ParticleData {
  id: number
  startX: string
  startY: string
  size: number
  baseOpacity: number
  duration: number
  delay: number
  waypoints: { x: number; y: number }[]
  type: "star" | "drift" | "glow"
}

function AnimatedParticle({ p }: { p: ParticleData }) {
  const xs = [...p.waypoints.map((w) => w.x), 0]
  const ys = [...p.waypoints.map((w) => w.y), 0]
  const opacities = p.waypoints.map((_, i) =>
    i % 2 === 0 ? p.baseOpacity : p.baseOpacity * 0.35
  )
  opacities.push(p.baseOpacity)

  const color =
    p.type === "glow"
      ? "rgba(140, 145, 247, 0.95)"
      : "rgba(140, 145, 247, 0.8)"

  const glowSize =
    p.type === "glow" ? p.size * 6 : p.size * 3

  return (
    <motion.div
      style={{
        position: "absolute",
        left: p.startX,
        top: p.startY,
        width: p.size,
        height: p.size,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 ${glowSize}px rgba(140, 145, 247, ${p.type === "glow" ? 0.6 : 0.3})`,
        willChange: "transform",
      }}
      animate={{
        x: xs,
        y: ys,
        opacity: opacities,
        scale: p.type === "glow"
          ? p.waypoints.map((_, i) => (i % 2 === 0 ? 1.4 : 0.7)).concat(1.4)
          : p.waypoints.map((_, i) => (i % 2 === 0 ? 1.1 : 0.85)).concat(1.1),
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: p.waypoints.map((_, i) => i / p.waypoints.length).concat(1),
      }}
    />
  )
}

function buildWaypoints(count: number, spread: number) {
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * spread * 2,
    y: (Math.random() - 0.5) * spread * 2,
  }))
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<ParticleData[]>([])

  useEffect(() => {
    const list: ParticleData[] = []

    // 30 small drifting stars
    for (let i = 0; i < 30; i++) {
      list.push({
        id: i,
        startX: `${Math.random() * 100}%`,
        startY: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        baseOpacity: Math.random() * 0.35 + 0.15,
        duration: Math.random() * 18 + 14,
        delay: Math.random() * -20,
        waypoints: buildWaypoints(4, 80),
        type: "star",
      })
    }

    // 12 larger drifters that travel further
    for (let i = 30; i < 42; i++) {
      list.push({
        id: i,
        startX: `${Math.random() * 100}%`,
        startY: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 2,
        baseOpacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 22 + 20,
        delay: Math.random() * -25,
        waypoints: buildWaypoints(5, 160),
        type: "drift",
      })
    }

    // 8 glowing accent particles
    for (let i = 42; i < 50; i++) {
      list.push({
        id: i,
        startX: `${Math.random() * 100}%`,
        startY: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 2.5,
        baseOpacity: Math.random() * 0.45 + 0.2,
        duration: Math.random() * 15 + 12,
        delay: Math.random() * -15,
        waypoints: buildWaypoints(4, 110),
        type: "glow",
      })
    }

    setParticles(list)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Ambient glow — bottom */}
      <motion.div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
        animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse, rgba(140, 145, 247, 0.3) 0%, transparent 70%)" }}
      />

      {/* Ambient glow — top right */}
      <motion.div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
        animate={{ opacity: [0.07, 0.13, 0.07], scale: [1, 1.1, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{ background: "radial-gradient(circle, rgba(140, 145, 247, 0.25) 0%, transparent 60%)" }}
      />

      {/* Ambient glow — mid left, subtle */}
      <motion.div
        className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full"
        animate={{ opacity: [0.04, 0.09, 0.04], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        style={{ background: "radial-gradient(circle, rgba(140, 145, 247, 0.2) 0%, transparent 60%)" }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <AnimatedParticle key={p.id} p={p} />
      ))}
    </div>
  )
}
