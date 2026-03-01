"use client"

import { useState, useRef, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { projects } from "./project-data"

/* ─── Tablet dimensions ────────────────────────────────────────── */
const TAB_W = 460   // main tablet width
const TAB_H = 640   // main tablet height

/* ─── 3D fan position configs ─────────────────────────────────── */
interface PosConfig {
  x: number; rotateY: number; scale: number; opacity: number; zIndex: number
}

const POS: Record<number, PosConfig> = {
   0: { x:    0, rotateY:   0, scale: 1.00, opacity: 1.00, zIndex: 10 },
   1: { x:  210, rotateY: -26, scale: 0.70, opacity: 0.85, zIndex:  7 },
  [-1]:{ x: -210, rotateY:  26, scale: 0.70, opacity: 0.85, zIndex:  7 },
   2: { x:  340, rotateY: -42, scale: 0.50, opacity: 0.42, zIndex:  4 },
  [-2]:{ x: -340, rotateY:  42, scale: 0.50, opacity: 0.42, zIndex:  4 },
}

function getPos(i: number, current: number, total: number): number {
  let d = i - current
  if (d >  total / 2) d -= total
  if (d < -total / 2) d += total
  return d
}

function getCfg(pos: number): PosConfig {
  const c = Math.max(-2, Math.min(2, pos))
  return POS[c] ?? POS[2]
}

/* ─── Tablet mockup — uses real PNG ───────────────────────────── */
function TabletMockup({ project, isActive }: {
  project: typeof projects[0]
  isActive: boolean
}) {
  return (
    <div
      style={{
        width: TAB_W,
        height: TAB_H,
        position: "relative",
        flexShrink: 0,
        userSelect: "none",
        filter: isActive
          ? [
              "drop-shadow(0 60px 100px rgba(0,0,0,0.80))",
              "drop-shadow(0 0 60px rgba(140,145,247,0.18))",
            ].join(" ")
          : "drop-shadow(0 40px 70px rgba(0,0,0,0.60))",
        transition: "filter 0.45s ease",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.previewImage}
        alt={`${project.title} tablet mockup`}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  )
}

/* ─── Glow platform / pedestal ────────────────────────────────── */
function Platform() {
  return (
    <div style={{ position: "relative", width: 980, height: 128, pointerEvents: "none", flexShrink: 0 }}>
      {/* Wide outer ambient haze */}
      <div style={{
        position: "absolute", bottom: 0,
        left: "50%", transform: "translateX(-50%)",
        width: 960, height: 120,
        background: "radial-gradient(ellipse 80% 100% at 50% 90%, rgba(255,255,255,0.11) 0%, transparent 72%)",
        filter: "blur(20px)",
      }} />
      {/* Mid ring */}
      <div style={{
        position: "absolute", bottom: 10,
        left: "50%", transform: "translateX(-50%)",
        width: 720, height: 56,
        borderRadius: "50%",
        background: "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.08) 55%, transparent 82%)",
        filter: "blur(10px)",
      }} />
      {/* Inner bright surface */}
      <div style={{
        position: "absolute", bottom: 18,
        left: "50%", transform: "translateX(-50%)",
        width: 540, height: 24,
        borderRadius: "50%",
        background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.40) 52%, transparent 82%)",
        filter: "blur(8px)",
      }} />
      {/* Sharp specular line */}
      <div style={{
        position: "absolute", bottom: 26,
        left: "50%", transform: "translateX(-50%)",
        width: 420, height: 5,
        borderRadius: "50%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.78) 20%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.78) 80%, transparent)",
        boxShadow: "0 0 26px rgba(255,255,255,0.65)",
      }} />
    </div>
  )
}

/* ─── Main export ──────────────────────────────────────────────── */
export function ProjectsHeroCarousel({
  selectedProjectId,
  onProjectChange,
}: {
  selectedProjectId?: string
  onProjectChange?: (projectId: string) => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [internalCurrent, setInternalCurrent] = useState(0)
  const [locked, setLocked] = useState(false)
  const total = projects.length
  const selectedIndex = selectedProjectId
    ? projects.findIndex((p) => p.id === selectedProjectId)
    : -1
  const current = selectedIndex >= 0 ? selectedIndex : internalCurrent

  const go = useCallback((idx: number) => {
    if (locked) return
    setLocked(true)
    const next = ((idx % total) + total) % total
    if (onProjectChange) {
      onProjectChange(projects[next].id)
    } else {
      setInternalCurrent(next)
    }
    setTimeout(() => setLocked(false), 220)
  }, [locked, onProjectChange, total])

  const project = projects[current]

  return (
    <section ref={ref} className="relative pt-28 pb-20 overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">

        {/* Section header */}
        <motion.div
          className="mt-8 mb-8"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2">
            Featured Work
          </p>
          <h1 className="page-heading">
            {"Recent "}
            <span className="text-[#8C91F7]" style={{ textShadow: "0 0 20px rgba(140,145,247,0.3)" }}>
              Projects
            </span>
          </h1>
        </motion.div>

        {/* Project label — spaced letters, animated per project */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`label-${current}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="text-center mt-16"
            style={{
              color: project.previewAccent,
              letterSpacing: "0.35em",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              fontFamily: "Inter, sans-serif",
              marginBottom: "0px",
              textShadow: `0 0 20px ${project.previewAccent}55`,
            }}
          >
            {project.label}
          </motion.p>
        </AnimatePresence>

        {/* ── Stage — no perspective here (it causes phantom layout gaps).
               Perspective is applied per-tablet via transformPerspective. ── */}
        <div className="relative w-full" style={{ height: TAB_H + 40, marginTop: -40 }}>

          {/* Tablets */}
          {projects.map((p, i) => {
            const pos = getPos(i, current, total)
            if (Math.abs(pos) > 2) return null
            const cfg = getCfg(pos)
            const isMain = pos === 0
            const isSide = Math.abs(pos) === 1

            return (
              <motion.div
                key={p.id}
                style={{
                  position: "absolute",
                  top: -6,
                  left: "50%",
                  marginLeft: -(TAB_W / 2),
                  zIndex: cfg.zIndex,
                  cursor: isMain ? "default" : "pointer",
                  transformPerspective: 1400,   /* perspective per-element — no layout side-effects */
                }}
                animate={{
                  x: cfg.x,
                  rotateY: cfg.rotateY,
                  scale: cfg.scale,
                  opacity: cfg.opacity,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                onClick={!isMain ? () => go(i) : undefined}
                whileHover={isSide ? { opacity: Math.min(cfg.opacity + 0.14, 1) } : undefined}
              >
                <TabletMockup project={p} isActive={isMain} />
              </motion.div>
            )
          })}

          {/* Pedestal — pinned to bottom of stage so it sits right under the tablets */}
          <div style={{
            position: "absolute",
            bottom: 130,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}>
            <Platform />
          </div>
        </div>

      </div>
    </section>
  )
}
