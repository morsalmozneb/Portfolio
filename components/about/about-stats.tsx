"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"

/* ── Data ───────────────────────────────────────────────────── */

const stats = [
  { value: 6,  suffix: "+", label: "Years Experience",   note: "telecom & design"   },
  { value: 15, suffix: "+", label: "Tools Mastered",     note: "design & dev stack"  },
  { value: 10, suffix: "+", label: "Projects Completed", note: "branding · UX · web" },
  { value: 8,  suffix: "+", label: "Years as Pet Owner", note: "yes, this counts"    },
]

function CountUp({ target, started }: { target: number; started: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let c = 0
    const step = 1400 / target
    const iv = setInterval(() => { c++; setCount(c); if (c >= target) clearInterval(iv) }, step)
    return () => clearInterval(iv)
  }, [started, target])
  return <>{count}</>
}

/* ── Tile ───────────────────────────────────────────────────── */

function StatTile({ stat, index, isInView }: {
  stat: typeof stats[0]; index: number; isInView: boolean
}) {
  const tileRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 120, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 120, damping: 20 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10])
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tileRef.current) return
    const r = tileRef.current.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); setHovered(false) }

  // All cards enter from bottom, staggered
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 + 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: 800, flex: 1, minWidth: 0 }}
    >
      <motion.div
        ref={tileRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", height: "100%" }}
      >
        <motion.div
          animate={{
            background: hovered
              ? "linear-gradient(135deg, rgba(140,145,247,0.1) 0%, rgba(10,8,24,0.95) 100%)"
              : "linear-gradient(135deg, rgba(140,145,247,0.04) 0%, rgba(8,6,18,0.98) 100%)",
            boxShadow: hovered
              ? "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(140,145,247,0.25), 0 0 40px rgba(140,145,247,0.08)"
              : "0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(140,145,247,0.1)",
          }}
          transition={{ duration: 0.4 }}
          style={{
            borderRadius: 14,
            padding: "28px 24px 24px",
            position: "relative",
            overflow: "hidden",
            cursor: "default",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {/* Shimmer on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute", inset: 0, borderRadius: 14, pointerEvents: "none",
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
            }}
          />

          {/* Top dot accent */}
          <div style={{ marginBottom: 16 }}>
            <motion.div
              animate={{ scale: hovered ? [1, 1.4, 1] : 1 }}
              transition={{ duration: 0.6 }}
              style={{
                width: 5, height: 5, borderRadius: "50%", background: "#8C91F7",
                boxShadow: hovered ? "0 0 10px rgba(140,145,247,1)" : "0 0 5px rgba(140,145,247,0.4)",
              }}
            />
          </div>

          {/* Number */}
          <motion.p
            animate={{
              color: hovered ? "#ffffff" : "#8C91F7",
              textShadow: hovered
                ? "0 0 40px rgba(140,145,247,1), 0 0 80px rgba(140,145,247,0.4)"
                : "0 0 20px rgba(140,145,247,0.3)",
              scale: hovered ? 1.04 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: "clamp(2.4rem, 3.5vw, 3.2rem)",
              fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em",
              fontVariantNumeric: "tabular-nums",
              marginBottom: 14,
            }}
          >
            <CountUp target={stat.value} started={isInView} />{stat.suffix}
          </motion.p>

          {/* Label + note */}
          <div>
            <motion.p
              animate={{ color: hovered ? "rgba(228,228,228,0.9)" : "rgba(228,228,228,0.55)" }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.02em", marginBottom: 4 }}
            >
              {stat.label}
            </motion.p>
            <p style={{ fontSize: 9, color: "rgba(140,145,247,0.4)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              {stat.note}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ── Section ─────────────────────────────────────────────────── */

export function AboutStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative py-12" ref={ref}>
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">
        <div style={{ display: "flex", gap: 12 }}>
          {stats.map((stat, i) => (
            <StatTile key={stat.label} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
