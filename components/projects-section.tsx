"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { projects as allProjects } from "@/components/projects/project-data"
import { SparkleButton } from "@/components/sparkle-button"

/* ── Glitch text component ────────────────────────────────────────── */
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&"

function GlitchText({ text, trigger }: { text: string; trigger: boolean }) {
  const [display, setDisplay] = useState(text)
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    if (!trigger) return
    let iter = 0
    const total = 20
    setGlitching(true)
    const id = setInterval(() => {
      iter++
      const progress = iter / total
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (i / text.length < progress) return char
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join("")
      )
      if (iter >= total) {
        clearInterval(id)
        setDisplay(text)
        setGlitching(false)
      }
    }, 45)
    return () => clearInterval(id)
  }, [trigger, text])

  return (
    <span
      className="relative inline-block"
      style={{
        textShadow: glitching
          ? "2px 0 rgba(255,0,80,0.6), -2px 0 rgba(0,200,255,0.6)"
          : "0 0 20px rgba(140,145,247,0.3)",
        transition: "text-shadow 0.1s",
      }}
    >
      {display}
    </span>
  )
}

/* ── Loading bar ──────────────────────────────────────────────────── */
function LoadingBar({ trigger }: { trigger: boolean }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!trigger) return
    let p = 0
    const id = setInterval(() => {
      p += Math.random() * 12 + 4
      if (p >= 100) {
        p = 100
        clearInterval(id)
        setTimeout(() => setDone(true), 400)
      }
      setProgress(p)
    }, 60)
    return () => clearInterval(id)
  }, [trigger])

  if (done) return null

  return (
    <motion.div
      className="w-full mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: trigger ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-1.5">
        <span className="text-[9px] font-mono tracking-[0.3em] text-[#8C91F7]/60 uppercase">
          Loading Projects
        </span>
        <span className="text-[9px] font-mono text-[#8C91F7]/40">
          {Math.round(progress)}%
        </span>
      </div>
      <div
        className="h-[2px] w-full rounded-full overflow-hidden"
        style={{ background: "rgba(140,145,247,0.1)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #8C91F7, #a8acff)",
            boxShadow: "0 0 8px rgba(140,145,247,0.8)",
            width: `${progress}%`,
          }}
          transition={{ duration: 0.06 }}
        />
      </div>
    </motion.div>
  )
}

/* ── 3D Tilt Card Wrapper ────────────────────────────────────── */

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)")
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovering, setHovering] = useState(false)

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rY = ((x - cx) / cx) * 8
    const rX = -((y - cy) / cy) * 8
    setTransform(`rotateX(${rX}deg) rotateY(${rY}deg)`)
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }, [])

  return (
    <div
      ref={cardRef}
      style={{ perspective: "800px" }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false)
        setTransform("rotateX(0deg) rotateY(0deg)")
        setGlowPos({ x: 50, y: 50 })
      }}
    >
      <div
        style={{
          transform: hovering ? transform : "rotateX(0deg) rotateY(0deg)",
          transition: hovering ? "transform 0.1s ease-out" : "transform 0.5s ease",
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {children}
        {/* Specular highlight */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(140, 145, 247, ${hovering ? 0.08 : 0}) 0%, transparent 50%)`,
            transition: hovering ? "none" : "background 0.5s ease",
          }}
        />
      </div>
    </div>
  )
}


export function ProjectsSection() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const wheelLocked = useRef(false)
  const touchStartX = useRef(0)

  const next = useCallback(() => setCurrent((c) => (c + 1) % allProjects.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + allProjects.length) % allProjects.length), [])

  // Non-passive wheel listener so we can preventDefault and capture trackpad horizontal swipe
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return
      e.preventDefault()
      if (wheelLocked.current) return
      wheelLocked.current = true
      if (e.deltaX > 10) next()
      else if (e.deltaX < -10) prev()
      setTimeout(() => { wheelLocked.current = false }, 350)
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [next, prev])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
  }, [next, prev])

  const project = allProjects[current]

  return (
    <section id="projects" className="relative py-16 lg:py-28" ref={ref}>
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">

        {/* Loading bar */}
        <LoadingBar trigger={isInView} />

        {/* Section header */}
        <div className="flex items-end justify-between mb-8 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2 font-mono">
              Featured Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#E4E4E4] text-balance font-mono">
              {"Recent "}
              <GlitchText text="Projects" trigger={isInView} />
            </h2>
          </motion.div>

          {/* Nav arrows */}
          <motion.div
            className="hidden sm:flex gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <button
              onClick={prev}
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:scale-110"
              style={{
                border: "1px solid rgba(140, 145, 247, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(140, 145, 247, 0.6)"
                e.currentTarget.style.boxShadow = "0 0 15px rgba(140, 145, 247, 0.15)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(140, 145, 247, 0.3)"
                e.currentTarget.style.boxShadow = "none"
              }}
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5 text-[#E4E4E4]/70" />
            </button>
            <button
              onClick={next}
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:scale-110"
              style={{
                border: "1px solid rgba(140, 145, 247, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(140, 145, 247, 0.6)"
                e.currentTarget.style.boxShadow = "0 0 15px rgba(140, 145, 247, 0.15)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(140, 145, 247, 0.3)"
                e.currentTarget.style.boxShadow = "none"
              }}
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5 text-[#E4E4E4]/70" />
            </button>
          </motion.div>
        </div>

        {/* Project label — above the card */}
        <motion.div
          key={`label-${current}`}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-3"
        >
          <span
            className="text-[10px] tracking-[0.35em] uppercase font-bold px-3 py-1"
            style={{
              borderRadius: "5px",
              color: project.previewAccent,
              background: `${project.previewAccent}18`,
              border: `1px solid ${project.previewAccent}35`,
            }}
          >
            {project.label}
          </span>
        </motion.div>

        {/* Project card — full-bleed image with overlay content */}
        <div ref={cardRef}>
        <TiltCard>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative rounded-2xl overflow-hidden group"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              minHeight: "460px",
              border: `1px solid ${project.previewAccent}30`,
              boxShadow: `0 0 60px ${project.previewAccent}18, 0 30px 80px rgba(0,0,0,0.5)`,
              cursor: "grab",
            }}
          >
            {/* Full-bleed background image */}
            {project.cardImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.cardImage}
                alt={project.title}
                className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            ) : (
              <div className="absolute inset-0" style={{ background: project.previewBg }} />
            )}

            {/* Dark gradient overlay — heavier at bottom for readability */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  to bottom,
                  rgba(8,8,20,0.15) 0%,
                  rgba(8,8,20,0.25) 40%,
                  rgba(8,8,20,0.75) 70%,
                  rgba(8,8,20,0.95) 100%
                )`,
              }}
            />

            {/* Accent glow in top-left corner */}
            <div
              className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 0% 0%, ${project.previewAccent}22 0%, transparent 70%)`,
              }}
            />


            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex flex-col gap-2 max-w-lg">
                <h3 className="text-2xl md:text-3xl font-bold text-[#E4E4E4]">{project.title}</h3>
                <p className="text-sm text-[#E4E4E4]/70 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* CTA button */}
              <SparkleButton href={`/projects/${project.slug}`} className="shrink-0">
                View Case Study
              </SparkleButton>
            </div>
          </motion.div>
        </TiltCard>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {allProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300 rounded-full hover:scale-125"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background:
                  i === current
                    ? "#8C91F7"
                    : "rgba(140, 145, 247, 0.2)",
                boxShadow:
                  i === current
                    ? "0 0 12px rgba(140, 145, 247, 0.4)"
                    : "none",
              }}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
