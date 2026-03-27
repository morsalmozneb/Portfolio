"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { projects } from "./project-data"
import { ChevronLeft, ChevronRight } from "lucide-react"

/* ─── Responsive hook ─────────────────────────────────────────── */
function useViewport() {
  const [vw, setVw] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1200)
  useEffect(() => {
    const handler = () => setVw(window.innerWidth)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])
  return vw
}

/* ─── Responsive dimension helpers ──────────────────────────────── */
function getTabDims(vw: number) {
  if (vw < 480) return { w: Math.min(vw * 0.78, 300), h: Math.min(vw * 1.1, 420) }
  if (vw < 768) return { w: Math.min(vw * 0.65, 380), h: Math.min(vw * 0.92, 530) }
  if (vw < 1024) return { w: 380, h: 530 }
  return { w: 420, h: 580 }
}

type PosConfig = { x: number; rotateY: number; scale: number; opacity: number; zIndex: number }
type PosMap = Record<number, PosConfig>

function getPosCfg(vw: number): PosMap {
  if (vw < 640) {
    return {
       0: { x:   0, rotateY:  0, scale: 1.00, opacity: 1.00, zIndex: 10 },
       1: { x:   0, rotateY:  0, scale: 0.00, opacity: 0.00, zIndex:  0 },
      [-1]:{ x:  0, rotateY:  0, scale: 0.00, opacity: 0.00, zIndex:  0 },
       2: { x:   0, rotateY:  0, scale: 0.00, opacity: 0.00, zIndex:  0 },
      [-2]:{ x:  0, rotateY:  0, scale: 0.00, opacity: 0.00, zIndex:  0 },
    } as PosMap
  }
  if (vw < 900) {
    return {
       0: { x:    0, rotateY:   0, scale: 1.00, opacity: 1.00, zIndex: 10 },
       1: { x:  130, rotateY: -22, scale: 0.62, opacity: 0.70, zIndex:  7 },
      [-1]:{ x: -130, rotateY:  22, scale: 0.62, opacity: 0.70, zIndex:  7 },
       2: { x:  220, rotateY: -36, scale: 0.44, opacity: 0.32, zIndex:  4 },
      [-2]:{ x: -220, rotateY:  36, scale: 0.44, opacity: 0.32, zIndex:  4 },
    } as PosMap
  }
  return {
     0: { x:    0, rotateY:   0, scale: 1.00, opacity: 1.00, zIndex: 10 },
     1: { x:  195, rotateY: -26, scale: 0.68, opacity: 0.85, zIndex:  7 },
    [-1]:{ x: -195, rotateY:  26, scale: 0.68, opacity: 0.85, zIndex:  7 },
     2: { x:  315, rotateY: -42, scale: 0.48, opacity: 0.40, zIndex:  4 },
    [-2]:{ x: -315, rotateY:  42, scale: 0.48, opacity: 0.40, zIndex:  4 },
  } as PosMap
}

function getPos(i: number, current: number, total: number): number {
  let d = i - current
  if (d >  total / 2) d -= total
  if (d < -total / 2) d += total
  return d
}

function getCfg(pos: number, POS: PosMap): PosConfig {
  const c = Math.max(-2, Math.min(2, pos))
  return POS[c] ?? POS[2]
}

/* ─── Tablet mockup ───────────────────────────────────────────── */
function TabletMockup({ project, isActive, tabW, tabH }: {
  project: typeof projects[0]
  isActive: boolean
  tabW: number
  tabH: number
}) {
  return (
    <div
      style={{
        width: tabW,
        height: tabH,
        position: "relative",
        flexShrink: 0,
        userSelect: "none",
        filter: isActive
          ? "drop-shadow(0 40px 80px rgba(0,0,0,0.80)) drop-shadow(0 0 50px rgba(140,145,247,0.18))"
          : "drop-shadow(0 30px 50px rgba(0,0,0,0.60))",
        transition: "filter 0.45s ease",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.previewImage}
        alt={`${project.title} tablet mockup`}
        draggable={false}
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      />
    </div>
  )
}

/* ─── Glow platform ────────────────────────────────────────────── */
function Platform({ vw }: { vw: number }) {
  const pw = Math.min(vw * 0.85, 820)
  return (
    <div style={{ position: "relative", width: pw, height: 100, pointerEvents: "none", flexShrink: 0 }}>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: pw * 0.98, height: 100, background: "radial-gradient(ellipse 80% 100% at 50% 90%, rgba(255,255,255,0.10) 0%, transparent 72%)", filter: "blur(20px)" }} />
      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: pw * 0.72, height: 44, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.07) 55%, transparent 82%)", filter: "blur(10px)" }} />
      <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", width: pw * 0.52, height: 18, borderRadius: "50%", background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0.35) 52%, transparent 82%)", filter: "blur(8px)" }} />
      <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", width: pw * 0.42, height: 4, borderRadius: "50%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.75) 20%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.75) 80%, transparent)", boxShadow: "0 0 22px rgba(255,255,255,0.60)" }} />
    </div>
  )
}

/* ─── Dot nav (mobile) ─────────────────────────────────────────── */
function DotNav({ total, current, onGo }: { total: number; current: number; onGo: (i: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-4 pb-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onGo(i)}
          className="transition-all duration-300"
          style={{
            width: i === current ? 20 : 8,
            height: 8,
            borderRadius: 4,
            background: i === current ? "#8C91F7" : "rgba(140,145,247,0.3)",
            border: "none",
            padding: 0,
          }}
          aria-label={`Go to project ${i + 1}`}
        />
      ))}
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
  const vw = useViewport()
  const total = projects.length
  const selectedIndex = selectedProjectId
    ? projects.findIndex((p) => p.id === selectedProjectId)
    : -1
  const current = selectedIndex >= 0 ? selectedIndex : internalCurrent

  const isMobile = vw < 640

  const { w: tabW, h: tabH } = getTabDims(vw)
  const POS = getPosCfg(vw)

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

  const touchStartX = useRef<number>(0)
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? current + 1 : current - 1)
  }

  const stageHeight = tabH + (isMobile ? 20 : 40)

  return (
    <section ref={ref} className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-28 md:pb-20 overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section header */}
        <motion.div
          className="mt-4 mb-6 md:mt-8 md:mb-8"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2">Featured Work</p>
          <h1 className="page-heading">
            {"Recent "}
            <span className="text-[#8C91F7]" style={{ textShadow: "0 0 20px rgba(140,145,247,0.3)" }}>Projects</span>
          </h1>
        </motion.div>

        {/* Project label */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`label-${current}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="text-center mt-8 md:mt-16"
            style={{
              color: project.previewAccent,
              letterSpacing: "0.35em",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              textShadow: `0 0 20px ${project.previewAccent}55`,
            }}
          >
            {project.label}
          </motion.p>
        </AnimatePresence>

        {/* ── Stage ── */}
        <div
          className="relative w-full"
          style={{ height: stageHeight, marginTop: isMobile ? -12 : -40 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {isMobile ? (
            /* Mobile: single card + arrows */
            <>
              <div style={{ position: "absolute", top: 0, left: "50%", marginLeft: -(tabW / 2), zIndex: 10 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 0.92, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.92, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabletMockup project={project} isActive tabW={tabW} tabH={tabH} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <button
                onClick={() => go(current - 1)}
                className="absolute left-1 top-1/3 z-20 flex items-center justify-center w-9 h-9 rounded-full"
                style={{ background: "rgba(140,145,247,0.12)", border: "1px solid rgba(140,145,247,0.25)" }}
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 text-[#8C91F7]" />
              </button>
              <button
                onClick={() => go(current + 1)}
                className="absolute right-1 top-1/3 z-20 flex items-center justify-center w-9 h-9 rounded-full"
                style={{ background: "rgba(140,145,247,0.12)", border: "1px solid rgba(140,145,247,0.25)" }}
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 text-[#8C91F7]" />
              </button>
            </>
          ) : (
            /* Desktop/Tablet: fan carousel */
            <>
              {projects.map((p, i) => {
              const pos = getPos(i, current, total)
              if (Math.abs(pos) > 2) return null
              const cfg = getCfg(pos, POS)
              const isMain = pos === 0
              const isSide = Math.abs(pos) === 1
              return (
                <motion.div
                  key={p.id}
                  style={{
                    position: "absolute", top: -6,
                    left: "50%", marginLeft: -(tabW / 2),
                    zIndex: cfg.zIndex,
                    cursor: isMain ? "default" : "pointer",
                    transformPerspective: 1400,
                  }}
                  animate={{ x: cfg.x, rotateY: cfg.rotateY, scale: cfg.scale, opacity: cfg.opacity }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={!isMain ? () => go(i) : undefined}
                  whileHover={isSide ? { opacity: Math.min(cfg.opacity + 0.14, 1) } : undefined}
                >
                  <TabletMockup project={p} isActive={isMain} tabW={tabW} tabH={tabH} />
                </motion.div>
              )
              })}
              <button
                onClick={() => go(current - 1)}
                className="absolute left-2 top-1/3 z-20 flex items-center justify-center w-10 h-10 rounded-full"
                style={{ background: "rgba(140,145,247,0.12)", border: "1px solid rgba(140,145,247,0.25)" }}
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5 text-[#8C91F7]" />
              </button>
              <button
                onClick={() => go(current + 1)}
                className="absolute right-2 top-1/3 z-20 flex items-center justify-center w-10 h-10 rounded-full"
                style={{ background: "rgba(140,145,247,0.12)", border: "1px solid rgba(140,145,247,0.25)" }}
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5 text-[#8C91F7]" />
              </button>
            </>
          )}

          {/* Pedestal — only on non-mobile */}
          {!isMobile && (
            <div style={{ position: "absolute", bottom: 90, left: "50%", transform: "translateX(-50%)", zIndex: 1 }}>
              <Platform vw={vw} />
            </div>
          )}
        </div>

        {/* Dot nav on mobile */}
        {isMobile && <DotNav total={total} current={current} onGo={go} />}

      </div>
    </section>
  )
}
