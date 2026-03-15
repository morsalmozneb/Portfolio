"use client"

import React, { useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { projects } from "./project-data"

/* ─── Section definitions ──────────────────────────────────────── */
const SECTIONS = [
  { id: "overview", label: "Project Overview" },
  { id: "process",  label: "Process"          },
  { id: "resp",     label: "Responsibilities" },
  { id: "tools",    label: "Tools Used"       },
]

/* ─── Staggered word reveal ────────────────────────────────────── */
function StaggerText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ")
  return (
    <>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.016, duration: 0.32, ease: "easeOut" }}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {w}
        </motion.span>
      ))}
    </>
  )
}

/* ─── Tool tag ─────────────────────────────────────────────────── */
function ToolTag({ name, index }: { name: string; index: number }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, scale: 0.7, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, type: "spring", stiffness: 260, damping: 22 }}
      style={{
        padding: "8px 16px",
        borderRadius: 8,
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        cursor: "default",
        border: hov ? "1px solid rgba(140,145,247,0.6)" : "1px solid rgba(140,145,247,0.2)",
        background: hov ? "rgba(140,145,247,0.12)" : "rgba(140,145,247,0.04)",
        color: hov ? "#E4E4E4" : "rgba(228,228,228,0.55)",
        boxShadow: hov ? "0 0 20px rgba(140,145,247,0.2)" : "none",
        transition: "all 0.22s ease",
      }}
    >
      {name}
    </motion.div>
  )
}

/* ─── Content panels ────────────────────────────────────────────── */
function ContentOverview({ project }: { project: typeof projects[0] }) {
  const words = project.overview.split(" ")
  return (
    <motion.div key="overview"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ fontSize: "5rem", lineHeight: 0.6, color: "rgba(140,145,247,0.1)", fontWeight: 900, marginBottom: 20, userSelect: "none", fontFamily: "serif" }}>"</div>
      <p style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", lineHeight: 2.1, color: "rgba(228,228,228,0.65)", maxWidth: 560 }}>
        {words.map((w, i) => (
          <motion.span key={i}
            initial={{ opacity: 0, y: -22, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: i * 0.025, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "inline-block", marginRight: "0.3em", transformOrigin: "top center" }}
          >{w}</motion.span>
        ))}
      </p>
    </motion.div>
  )
}

function ContentProcess({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div key="process"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ display: "flex", flexDirection: "column", gap: 0 }}
    >
      {project.process.map((para, i) => {
        const fromLeft = i % 2 === 0
        return (
          <motion.div key={i}
            initial={{ opacity: 0, x: fromLeft ? -60 : 60, skewX: fromLeft ? -4 : 4 }}
            animate={{ opacity: 1, x: 0, skewX: 0 }}
            transition={{ delay: i * 0.1, duration: 0.55, type: "spring", stiffness: 180, damping: 22 }}
            style={{ display: "flex", gap: 16, paddingBottom: 22, alignItems: "flex-start" }}
          >
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.15, type: "spring", stiffness: 300 }}
                style={{ width: 7, height: 7, borderRadius: "50%", background: "#8C91F7", boxShadow: "0 0 12px rgba(140,145,247,0.7)", marginTop: 7 }}
              />
              {i < project.process.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                  style={{ width: 1, flex: 1, minHeight: 16, background: "linear-gradient(180deg, rgba(140,145,247,0.35), transparent)", transformOrigin: "top", marginTop: 4 }}
                />
              )}
            </div>
            <p style={{ fontSize: "0.84rem", lineHeight: 1.85, color: "rgba(228,228,228,0.58)", margin: 0, paddingTop: 2 }}>{para}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function ContentResp({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div key="resp"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      {project.responsibilities.map((r, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 18 }}
            transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
            style={{ height: 1.5, background: "rgba(140,145,247,0.55)", boxShadow: "0 0 6px rgba(140,145,247,0.4)", marginTop: 9, flexShrink: 0 }}
          />
          <p style={{ fontSize: "0.84rem", lineHeight: 1.8, color: "rgba(228,228,228,0.6)", margin: 0 }}>{r}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

function ContentTools({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div key="tools"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(140,145,247,0.35)", marginBottom: 22 }}
      >
        Technologies &amp; software used
      </motion.p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {project.tools.map((t, i) => (
          <motion.div key={t.name}
            initial={{ opacity: 0, scale: 0, rotate: (i % 2 === 0 ? -15 : 15) }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5, type: "spring", stiffness: 250, damping: 18 }}
          >
            <ToolTag name={t.name} index={i} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Mobile accordion tabs ─────────────────────────────────────── */
function MobileNav({ sections, active, onSelect }: {
  sections: typeof SECTIONS
  active: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex overflow-x-auto gap-2 pb-2 mb-6 scrollbar-none" style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}>
      {sections.map((sec) => (
        <button
          key={sec.id}
          onClick={() => onSelect(sec.id)}
          className="flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-200"
          style={{
            background: active === sec.id ? "rgba(140,145,247,0.18)" : "rgba(140,145,247,0.05)",
            border: active === sec.id ? "1px solid rgba(140,145,247,0.5)" : "1px solid rgba(140,145,247,0.12)",
            color: active === sec.id ? "#E4E4E4" : "rgba(228,228,228,0.4)",
            boxShadow: active === sec.id ? "0 0 14px rgba(140,145,247,0.15)" : "none",
          }}
        >
          {sec.label}
        </button>
      ))}
    </div>
  )
}

/* ─── Nav item (desktop sidebar) ───────────────────────────────── */
function NavItem({ section, index, isActive, isInView, onClick }: {
  section: typeof SECTIONS[0]; index: number; isActive: boolean
  isInView: boolean; onClick: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        background: "none", border: "none", cursor: "pointer",
        padding: "14px 0", width: "100%", position: "relative",
      }}
    >
      <motion.div
        animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)",
          width: 3, height: 28, background: "#8C91F7", borderRadius: 2,
          transformOrigin: "center", boxShadow: "0 0 12px rgba(140,145,247,0.8)",
        }}
      />
      <motion.div
        animate={{
          scale: isActive ? 1 : (hov ? 0.85 : 0.6),
          background: isActive ? "#8C91F7" : (hov ? "rgba(140,145,247,0.5)" : "rgba(140,145,247,0.2)"),
          boxShadow: isActive ? "0 0 10px rgba(140,145,247,0.8)" : "none",
        }}
        transition={{ duration: 0.3 }}
        style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0 }}
      />
      <motion.span
        animate={{
          color: isActive ? "#E4E4E4" : (hov ? "rgba(228,228,228,0.65)" : "rgba(228,228,228,0.28)"),
          x: isActive ? 3 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", textAlign: "left" }}
      >
        {section.label}
      </motion.span>
    </motion.button>
  )
}

/* ─── Main export ──────────────────────────────────────────────── */
export function ProjectDetail({ selectedProjectId }: { selectedProjectId?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const project = projects.find((p) => p.id === selectedProjectId) ?? projects[0]
  const [active, setActive] = useState("overview")

  const contentMap: Record<string, React.ReactNode> = {
    overview: <ContentOverview project={project} />,
    process:  <ContentProcess  project={project} />,
    resp:     <ContentResp     project={project} />,
    tools:    <ContentTools    project={project} />,
  }

  return (
    <section className="relative py-12 md:py-16 overflow-hidden" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-14"
        >
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(140,145,247,0.5)", marginBottom: 10 }}>
            {project.label}
          </p>
          <h2 style={{ fontSize: "clamp(1.7rem, 4.5vw, 3.2rem)", fontWeight: 800, color: "#E4E4E4", lineHeight: 1.1 }}>
            {project.title}
          </h2>
        </motion.div>

        {/* Mobile: horizontal tab pills */}
        <div className="block md:hidden">
          <MobileNav sections={SECTIONS} active={active} onSelect={setActive} />
          <AnimatePresence mode="wait">
            <div key={active}>
              {contentMap[active]}
            </div>
          </AnimatePresence>
        </div>

        {/* Desktop: two-column layout */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: "180px 1fr", gap: "0 48px", alignItems: "start" }}>

          {/* LEFT: vertical nav */}
          <div style={{ position: "sticky", top: 32, paddingLeft: 20 }}>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute", left: 20 + 3, top: 28, bottom: 28,
                width: 1,
                background: "linear-gradient(180deg, rgba(140,145,247,0.15) 0%, rgba(140,145,247,0.05) 100%)",
                transformOrigin: "top",
              }}
            />
            {SECTIONS.map((sec, i) => (
              <NavItem
                key={sec.id}
                section={sec}
                index={i}
                isActive={active === sec.id}
                isInView={inView}
                onClick={() => setActive(sec.id)}
              />
            ))}
          </div>

          {/* RIGHT: content */}
          <div style={{ minHeight: 280, paddingTop: 8, paddingBottom: 32, position: "relative" }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: 1,
                background: "linear-gradient(90deg, rgba(140,145,247,0.5), rgba(140,145,247,0.05) 80%, transparent)",
                transformOrigin: "left", marginBottom: 36,
              }}
            />
            <AnimatePresence mode="wait">
              <div key={active}>
                {contentMap[active]}
              </div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
