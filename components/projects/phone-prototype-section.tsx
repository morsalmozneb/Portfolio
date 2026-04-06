"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { projects } from "./project-data"

type ActiveDevice = "phone" | "tablet" | "laptop"

/* 📱📱📱 Shared iframe with loading spinner 📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱 */
function ProtoIframe({
  src,
  accent,
  designSize,
  zoom = 1,
}: {
  src: string
  accent: string
  designSize?: { width: number; height: number }
  zoom?: number
}) {
  const [loaded, setLoaded] = useState(false)
  const [interactive, setInteractive] = useState(false)
  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      onMouseLeave={() => setInteractive(false)}
    >
      {!loaded && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(135deg, #0d0b1e 0%, ${accent}15 50%, #0d0b1e 100%)`,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            border: `2px solid ${accent}40`, borderTopColor: accent,
            animation: "spin 0.8s linear infinite",
          }} />
        </div>
      )}
      {loaded && !interactive && (
        <button
          type="button"
          onClick={() => setInteractive(true)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
            paddingBottom: 18,
            background: "linear-gradient(180deg, rgba(8,8,12,0) 60%, rgba(8,8,12,0.55) 100%)",
            color: "rgba(228,228,228,0.9)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            border: "none",
            cursor: "pointer",
          }}
        >
          Click to interact
        </button>
      )}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <iframe
          key={src}
          src={src}
          style={{
            width: designSize ? `${designSize.width}px` : `${100 / zoom}%`,
            height: designSize ? `${designSize.height}px` : `${100 / zoom}%`,
            border: "none",
            display: "block",
            position: "absolute",
            top: 0,
            left: designSize ? "50%" : 0,
            transform: designSize
              ? `translateX(-50%) scale(${zoom})`
              : zoom !== 1
              ? `scale(${zoom})`
              : undefined,
            transformOrigin: designSize ? "center top" : "top left",
            pointerEvents: interactive ? "auto" : "none",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
          allow="fullscreen"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          title="Interactive prototype"
        />
      </div>
    </div>
  )
}

/* 📱📱📱 iPhone SE frame 📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱 */
const PH = { SCR_W: 256, SCR_H: 455, BZL_SIDE: 11, BZL_TOP: 42, BZL_BOT: 56, R: 34 }

function PhoneFrame({
  src,
  accent,
  zoom,
}: {
  src: string
  accent: string
  zoom?: number
}) {
  const fw = PH.SCR_W + PH.BZL_SIDE * 2
  const fh = PH.SCR_H + PH.BZL_TOP + PH.BZL_BOT
  return (
    <div style={{
      position: "relative", width: fw, height: fh,
    }}>
      {/* Body */}
      <div style={{ position: "absolute", inset: 0, borderRadius: PH.R, background: "linear-gradient(160deg, #2c2c2e 0%, #1c1c1e 55%, #111113 100%)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.5)" }} />
      {/* Power */}
      <div style={{ position: "absolute", right: -3, top: "30%", width: 3, height: 64, borderRadius: "0 3px 3px 0", background: "linear-gradient(180deg, #3a3a3e, #282828)", boxShadow: "2px 0 4px rgba(0,0,0,0.5)" }} />
      {/* Silent */}
      <div style={{ position: "absolute", left: -3, top: "18%", width: 3, height: 30, borderRadius: "3px 0 0 3px", background: "linear-gradient(180deg, #3a3a3e, #282828)", boxShadow: "-2px 0 4px rgba(0,0,0,0.5)" }} />
      {/* Vol+ */}
      <div style={{ position: "absolute", left: -3, top: "27%", width: 3, height: 52, borderRadius: "3px 0 0 3px", background: "linear-gradient(180deg, #3a3a3e, #282828)", boxShadow: "-2px 0 4px rgba(0,0,0,0.5)" }} />
      {/* Vol- */}
      <div style={{ position: "absolute", left: -3, top: "37%", width: 3, height: 52, borderRadius: "3px 0 0 3px", background: "linear-gradient(180deg, #3a3a3e, #282828)", boxShadow: "-2px 0 4px rgba(0,0,0,0.5)" }} />
      {/* Top bezel */}
      <div style={{ position: "absolute", top: 0, left: PH.BZL_SIDE, right: PH.BZL_SIDE, height: PH.BZL_TOP, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#080808", boxShadow: "0 0 0 1px rgba(255,255,255,0.07)" }} />
        <div style={{ width: 54, height: 4, borderRadius: 3, background: "#080808", boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }} />
      </div>
      {/* Screen */}
      <div style={{ position: "absolute", top: PH.BZL_TOP, left: PH.BZL_SIDE, width: PH.SCR_W, height: PH.SCR_H, overflow: "hidden", background: "#000", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}>
        <ProtoIframe src={src} accent={accent} zoom={zoom} />
      </div>
      {/* Home button */}
      <div style={{ position: "absolute", bottom: 0, left: PH.BZL_SIDE, right: PH.BZL_SIDE, height: PH.BZL_BOT, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#111", boxShadow: "0 0 0 2px rgba(255,255,255,0.10), inset 0 1px 2px rgba(255,255,255,0.08), inset 0 -1px 3px rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #222, #0c0c0c)", boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }} />
        </div>
      </div>
      {/* Sheen */}
      <div style={{ position: "absolute", inset: 0, borderRadius: PH.R, background: "linear-gradient(155deg, rgba(255,255,255,0.06) 0%, transparent 28%)", pointerEvents: "none" }} />
    </div>
  )
}

/* 📱📱📱 iPad Pro frame 📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱 */
const TB = { SCR_W: 384, SCR_H: 512, BZL_SIDE: 13, BZL_TOP: 22, BZL_BOT: 22, R: 21 }

function TabletFrame({ src, accent }: { src: string; accent: string }) {
  const fw = TB.SCR_W + TB.BZL_SIDE * 2
  const fh = TB.SCR_H + TB.BZL_TOP + TB.BZL_BOT
  return (
    <div style={{
      position: "relative", width: fw, height: fh,
    }}>
      {/* Body */}
      <div style={{ position: "absolute", inset: 0, borderRadius: TB.R, background: "linear-gradient(160deg, #2c2c2e 0%, #1c1c1e 55%, #111113 100%)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.5)" }} />
      {/* Power button (top-right on iPad Pro) */}
      <div style={{ position: "absolute", top: -3, right: "20%", height: 3, width: 50, borderRadius: "3px 3px 0 0", background: "linear-gradient(90deg, #3a3a3e, #282828)", boxShadow: "0 -2px 4px rgba(0,0,0,0.5)" }} />
      {/* Vol buttons (right side) */}
      <div style={{ position: "absolute", right: -3, top: "28%", width: 3, height: 44, borderRadius: "0 3px 3px 0", background: "linear-gradient(180deg, #3a3a3e, #282828)", boxShadow: "2px 0 4px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", right: -3, top: "38%", width: 3, height: 44, borderRadius: "0 3px 3px 0", background: "linear-gradient(180deg, #3a3a3e, #282828)", boxShadow: "2px 0 4px rgba(0,0,0,0.5)" }} />
      {/* Camera dot */}
      <div style={{ position: "absolute", top: 0, left: TB.BZL_SIDE, right: TB.BZL_SIDE, height: TB.BZL_TOP, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#080808", boxShadow: "0 0 0 1px rgba(255,255,255,0.07)" }} />
      </div>
      {/* Screen */}
      <div style={{ position: "absolute", top: TB.BZL_TOP, left: TB.BZL_SIDE, width: TB.SCR_W, height: TB.SCR_H, overflow: "hidden", background: "#000", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}>
        <ProtoIframe src={src} accent={accent} />
      </div>
      {/* Sheen */}
      <div style={{ position: "absolute", inset: 0, borderRadius: TB.R, background: "linear-gradient(155deg, rgba(255,255,255,0.06) 0%, transparent 28%)", pointerEvents: "none" }} />
    </div>
  )
}

/* 📱📱📱 MacBook frame 📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱 */
const LT = { SCR_W: 420, SCR_H: 262, BZL_SIDE: 14, BZL_TOP: 22, BZL_BOT: 10, R: 8 }

function LaptopFrame({ src, accent }: { src: string; accent: string }) {
  const lidW = LT.SCR_W + LT.BZL_SIDE * 2
  const lidH = LT.SCR_H + LT.BZL_TOP + LT.BZL_BOT
  const baseW = lidW + 40
  return (
    <div style={{
      position: "relative", width: baseW,
    }}>
      {/* Lid */}
      <div style={{ position: "relative", width: lidW, height: lidH, margin: "0 auto", borderRadius: `${LT.R}px ${LT.R}px 3px 3px`, background: "linear-gradient(160deg, #2c2c2e 0%, #1c1c1e 55%, #111113 100%)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 1px 0 rgba(255,255,255,0.16)" }}>
        {/* Camera dot */}
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 7, height: 7, borderRadius: "50%", background: "#080808", boxShadow: "0 0 0 1px rgba(255,255,255,0.07)" }} />
        {/* Screen */}
        <div style={{ position: "absolute", top: LT.BZL_TOP, left: LT.BZL_SIDE, width: LT.SCR_W, height: LT.SCR_H, overflow: "hidden", background: "#000", borderRadius: 2, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}>
          <ProtoIframe src={src} accent={accent} />
        </div>
        {/* Sheen */}
        <div style={{ position: "absolute", inset: 0, borderRadius: `${LT.R}px ${LT.R}px 3px 3px`, background: "linear-gradient(155deg, rgba(255,255,255,0.06) 0%, transparent 28%)", pointerEvents: "none" }} />
      </div>
      {/* Base */}
      <div style={{ width: "100%", height: 20, background: "linear-gradient(180deg, #252527 0%, #1a1a1c 100%)", borderRadius: "0 0 8px 8px", boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.07), 0 6px 16px rgba(0,0,0,0.5)" }} />
      {/* Trackpad notch */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 64, height: 5, background: "#1e1e20", borderRadius: "0 0 4px 4px" }} />
    </div>
  )
}

/* 📱📱📱 Device tab icons 📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱 */
const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill="currentColor"/>
  </svg>
)
const TabletIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill="currentColor"/>
  </svg>
)
const LaptopIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="13" rx="2"/><path d="M2 19h20"/>
  </svg>
)

/* 📱📱📱 Device natural sizes (px) 📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱 */
const DEVICE_SIZE: Record<ActiveDevice, { w: number; h: number }> = {
  phone: { w: PH.SCR_W + PH.BZL_SIDE * 2, h: PH.SCR_H + PH.BZL_TOP + PH.BZL_BOT },
  tablet: { w: TB.SCR_W + TB.BZL_SIDE * 2, h: TB.SCR_H + TB.BZL_TOP + TB.BZL_BOT },
  laptop: { w: LT.SCR_W + LT.BZL_SIDE * 2 + 40, h: LT.SCR_H + LT.BZL_TOP + LT.BZL_BOT + 20 },
}

/* 📱📱📱 Auto-scaling stage 📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱 */
function ScaledDeviceStage({
  active, project, isInView, tabs, setActive,
}: {
  active: ActiveDevice
  project: (typeof projects)[0]
  isInView: boolean
  tabs: { id: ActiveDevice; label: string; Icon: () => JSX.Element }[]
  setActive: (id: ActiveDevice) => void
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const BUTTONS_H = 46 + 16 + 16 // button height + gap + buffer

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => {
      const { w, h } = DEVICE_SIZE[active]
      const availW = el.clientWidth - 32
      const availH = el.clientHeight - BUTTONS_H
      if (availW <= 0 || availH <= 0) return // skip until layout is ready
      const s = Math.min(1, availW / w, availH / h)
      setScale(Math.max(0.3, s))
    }
    // Measure immediately, then again once layout settles
    measure()
    const t = setTimeout(measure, 50)
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => { clearTimeout(t); ro.disconnect() }
  }, [active])

  const { w: natW, h: natH } = DEVICE_SIZE[active]
  const scaledW = natW * scale
  const scaledH = natH * scale

  return (
    <motion.div
      ref={stageRef}
      className="flex-1 flex flex-col items-center justify-center gap-4"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Device frame */}
      <div style={{ width: scaledW, height: scaledH, flexShrink: 0, overflow: "hidden" }}>
        <div style={{
          width: natW,
          height: natH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}>
          <AnimatePresence mode="wait">
            {active === "phone" && project.mobileProtoUrl && (
              <motion.div key="phone"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <PhoneFrame
                  src={project.mobileProtoUrl}
                  accent={project.previewAccent}
                  zoom={project.phoneProtoZoom}
                />
              </motion.div>
            )}
            {active === "tablet" && project.tabletProtoUrl && (
              <motion.div key="tablet"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <TabletFrame src={project.tabletProtoUrl} accent={project.previewAccent} />
              </motion.div>
            )}
            {active === "laptop" && project.desktopProtoUrl && (
              <motion.div key="laptop"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <LaptopFrame src={project.desktopProtoUrl} accent={project.previewAccent} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Device switcher buttons – SparkleButton style with sparkle particles */}
      <div className="flex flex-wrap gap-2 justify-center w-full">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id
          return (
            <motion.button
              key={id}
              onClick={() => setActive(id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="sparkle-btn"
              style={{
                position: "relative", overflow: "hidden",
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
                height: 46, padding: "0 20px",
                borderRadius: "12px",
                fontSize: "0.75rem", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                background: isActive ? "rgba(100,80,180,0.35)" : "transparent",
                color: isActive ? "#E4E4E4" : "rgba(228,228,228,0.45)",
                border: isActive ? "1px solid rgba(140,145,247,0.5)" : "1px solid rgba(140,145,247,0.2)",
                boxShadow: isActive ? "0 0 18px rgba(140,145,247,0.15), inset 0 0 12px rgba(140,145,247,0.08)" : "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.background = "rgba(140,145,247,0.15)"
                el.style.borderColor = "rgba(140,145,247,0.6)"
                el.style.boxShadow = "0 0 20px rgba(140,145,247,0.2)"
                el.style.color = "#E4E4E4"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = isActive ? "rgba(100,80,180,0.35)" : "transparent"
                el.style.borderColor = isActive ? "rgba(140,145,247,0.5)" : "rgba(140,145,247,0.2)"
                el.style.boxShadow = isActive ? "0 0 18px rgba(140,145,247,0.15), inset 0 0 12px rgba(140,145,247,0.08)" : "none"
                el.style.color = isActive ? "#E4E4E4" : "rgba(228,228,228,0.45)"
              }}
            >
              {/* Button content */}
              <span className="relative z-10 inline-flex items-center gap-[7px]">
                <Icon />
                {label}
              </span>

              {/* Sparkle particles */}
              {[
                { x: 10, y: -10, s: 6, d: 2.4, dl: 0.2 },
                { x: 50, y: -12, s: 8, d: 3.1, dl: 1.1 },
                { x: 88, y: -8, s: 5, d: 2.7, dl: 0.6 },
                { x: -8, y: 30, s: 7, d: 3.4, dl: 1.8 },
                { x: 108,y: 60, s: 6, d: 2.2, dl: 0.4 },
                { x: 20, y: 108, s: 8, d: 2.9, dl: 1.4 },
                { x: 70, y: 112, s: 5, d: 3.6, dl: 0.9 },
                { x: -10,y: 75, s: 7, d: 2.5, dl: 2.1 },
                { x: 95, y: 20, s: 6, d: 3.2, dl: 0.7 },
                { x: 40, y: -14, s: 5, d: 2.8, dl: 1.6 },
              ].map((p, i) => (
                <span
                  key={i}
                  className="sparkle-particle"
                  aria-hidden="true"
                  style={{
                    "--x": p.x, "--y": p.y,
                    "--size": `${p.s}px`,
                    "--duration": p.d,
                    "--delay": p.dl,
                  } as React.CSSProperties}
                >
                  <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 0L9.08 5.92L15 7.5L9.08 9.08L7.5 15L5.92 9.08L0 7.5L5.92 5.92L7.5 0Z" fill="currentColor" />
                  </svg>
                </span>
              ))}

              {/* Glint sweep */}
              <span className="sparkle-glint" aria-hidden="true" />
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

/* 📱📱📱 Section 📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱📱 */
export function PhonePrototypeSection({
  selectedProjectId,
}: {
  selectedProjectId?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [active, setActive] = useState<ActiveDevice>("phone")

  const project =
    projects.find((p) => p.id === selectedProjectId) ??
    projects.find((p) => p.mobileProtoUrl || p.tabletProtoUrl || p.desktopProtoUrl)

  const tabs = project
    ? [
        { id: "phone" as ActiveDevice, label: "Mobile", Icon: PhoneIcon, url: project.mobileProtoUrl },
        { id: "tablet" as ActiveDevice, label: "Tablet", Icon: TabletIcon, url: project.tabletProtoUrl },
        { id: "laptop" as ActiveDevice, label: "Desktop", Icon: LaptopIcon, url: project.desktopProtoUrl },
      ].filter((t) => !!t.url)
    : []

  useEffect(() => {
    if (tabs.length > 0 && !tabs.some((t) => t.id === active)) {
      setActive(tabs[0].id)
    }
  }, [active, tabs])

  if (!project || tabs.length === 0) return null

  return (
    <section ref={ref} className="relative overflow-hidden" style={{
      height: "100svh",
      display: "flex",
      flexDirection: "column",
      paddingTop: 28,
      paddingBottom: 24,
    }}>
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${project.previewAccent}08 0%, transparent 70%)`,
      }} />

      <div className="max-w-[1200px] w-full mx-auto px-6 lg:px-12 flex flex-col flex-1">

        {/* Header – compact, left-aligned */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-1 font-mono">Interactive Demo</p>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, lineHeight: 1.1, color: "#E4E4E4", fontFamily: "var(--font-mono)" }}>
            {"Try it "}
            <span style={{ color: "#8C91F7", textShadow: "0 0 20px rgba(140,145,247,0.3)" }}>
              Yourself
            </span>
          </h2>
        </motion.div>

        {/* Device + buttons below – centred, fills remaining height */}
        <ScaledDeviceStage active={active} project={project} isInView={isInView} tabs={tabs} setActive={setActive} />

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}
