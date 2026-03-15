"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion"

/* ── Tool data ────────────────────────────────────────────────────── */
const tools = [
  { abbr: "Ai",  name: "Adobe Illustrator", desc: "Vector graphics, logos & brand illustration",    color: "#FF9A00", bg: "rgba(255,154,0,0.14)"     },
  { abbr: "Ps",  name: "Adobe Photoshop",   desc: "Photo editing, retouching & compositing",        color: "#31A8FF", bg: "rgba(49,168,255,0.14)"    },
  { abbr: "Fi",  name: "Figma",             desc: "UI/UX design, prototyping & design systems",     color: "#F24E1E", bg: "rgba(242,78,30,0.14)"     },
  { abbr: "Id",  name: "Adobe InDesign",    desc: "Print layouts, editorial & publication design",  color: "#FF3366", bg: "rgba(255,51,102,0.14)"    },
  { abbr: "Ae",  name: "After Effects",     desc: "Motion graphics, animation & visual effects",    color: "#9999FF", bg: "rgba(153,153,255,0.14)"   },
  { abbr: "Pr",  name: "Premiere Pro",      desc: "Video editing, colour grading & production",     color: "#EA77FF", bg: "rgba(234,119,255,0.14)"   },
  { abbr: "Fr",  name: "Framer",            desc: "Interactive web design & no-code publishing",    color: "#0055FF", bg: "rgba(0,85,255,0.14)"      },
  { abbr: "{ }", name: "CSS3",              desc: "Styling, animations & responsive layouts",       color: "#1572B6", bg: "rgba(21,114,182,0.14)"    },
  { abbr: "</>", name: "HTML5",             desc: "Semantic markup & accessible web structure",     color: "#E34F26", bg: "rgba(227,79,38,0.14)"     },
  { abbr: "JS",  name: "JavaScript",        desc: "Interactive UI logic & front-end scripting",     color: "#F7DF1E", bg: "rgba(247,223,30,0.14)"    },
  { abbr: "GH",  name: "GitHub",            desc: "Version control, collaboration & code review",   color: "#E4E4E4", bg: "rgba(228,228,228,0.08)"   },
  { abbr: "Re",  name: "React",             desc: "Component-based UI for dynamic web apps",        color: "#61DAFB", bg: "rgba(97,218,251,0.14)"    },
  { abbr: "W",   name: "Microsoft Word",    desc: "Documentation, proposals & content writing",     color: "#2B8FE5", bg: "rgba(43,143,229,0.14)"    },
  { abbr: "Ex",  name: "Microsoft Excel",   desc: "Data analysis, reporting & project tracking",    color: "#21A366", bg: "rgba(33,163,102,0.14)"    },
]

/* ── Slide animation variants ─────────────────────────────────────── */
const eIn  = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
const eOut = [0.55, 0.06, 0.68, 0.19] as [number, number, number, number]
const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 240 : -240, opacity: 0, scale: 0.9 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.48, ease: eIn } },
  exit:   (d: number) => ({ x: d > 0 ? -240 : 240, opacity: 0, scale: 0.9, transition: { duration: 0.32, ease: eOut } }),
}

/* ── Individual key component ─────────────────────────────────────── */
function Key({ flex = 1, label = "", fnKey = false }: { flex?: number; label?: string; fnKey?: boolean }) {
  if (fnKey) {
    return (
      <div
        style={{
          flex,
          height: 13,
          background: "linear-gradient(168deg, #272729 0%, #1e1e20 100%)",
          borderRadius: "2px 2px 1.5px 1.5px",
          border: "0.5px solid rgba(255,255,255,0.03)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.05) inset, " +
            "0 -1px 0 rgba(0,0,0,0.5) inset, " +
            "0 1.5px 3px rgba(0,0,0,0.7)",
        }}
      />
    )
  }
  return (
    <div
      style={{
        flex,
        height: 20,
        background: "linear-gradient(168deg, #2e2e30 0%, #272729 50%, #222224 100%)",
        borderRadius: "3.5px 3.5px 2px 2px",
        border: "0.5px solid rgba(255,255,255,0.04)",
        boxShadow:
          "0 1.5px 0 rgba(255,255,255,0.07) inset, " +
          "0 -2px 0 rgba(0,0,0,0.55) inset, " +
          "1px 0 0 rgba(255,255,255,0.02) inset, " +
          "-1px 0 0 rgba(255,255,255,0.02) inset, " +
          "0 3px 5px rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Keyboard backlight bleed through key gap */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 1,
          background: "rgba(140,145,247,0.1)",
          filter: "blur(0.8px)",
        }}
      />
      {label && (
        <span
          style={{
            fontSize: 4.5,
            color: "rgba(255,255,255,0.2)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            zIndex: 1,
            position: "relative",
            lineHeight: 1,
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

/* ── Keyboard component ───────────────────────────────────────────── */
function Keyboard() {
  // Each row: array of [label, flex?]
  const rows: Array<Array<[string, number?]>> = [
    [["1"],["2"],["3"],["4"],["5"],["6"],["7"],["8"],["9"],["0"],["-"],["="],["⌫",2.1]],
    [["⇥",1.6],["Q"],["W"],["E"],["R"],["T"],["Y"],["U"],["I"],["O"],["P"],["["],["\\",1.8]],
    [["⇪",1.9],["A"],["S"],["D"],["F"],["G"],["H"],["J"],["K"],["L"],[";"],["'"],["↵",2.3]],
    [["⇧",2.4],["Z"],["X"],["C"],["V"],["B"],["N"],["M"],[","],["."],["/"],[" ⇧",2.4]],
  ]

  const spaceRow: Array<[string, number]> = [
    ["fn",1.2],["⌃",1.1],["⌥",1.2],["⌘",1.3],["",5.8],["⌘",1.3],["⌥",1.2],["◁",1.0],["△▽",1.0],["▷",1.0],
  ]

  return (
    <div
      style={{
        padding: "8px 12px 0",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        position: "relative",
      }}
    >
      {/* Keyboard backlight ambient — very subtle purple glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 65%, rgba(140,145,247,0.042) 0%, transparent 62%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Fn / media key row */}
      <div style={{ display: "flex", gap: 2, position: "relative", zIndex: 1 }}>
        {Array.from({ length: 14 }, (_, i) => (
          <Key key={i} flex={i === 0 ? 1.3 : i === 13 ? 1.9 : 1} fnKey />
        ))}
      </div>

      {/* Main key rows */}
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: 2, position: "relative", zIndex: 1 }}>
          {row.map(([label, flex], ki) => (
            <Key key={ki} flex={flex ?? 1} label={label.trim()} />
          ))}
        </div>
      ))}

      {/* Bottom modifier + spacebar row */}
      <div style={{ display: "flex", gap: 2, position: "relative", zIndex: 1 }}>
        {spaceRow.map(([label, flex], i) => (
          <div
            key={i}
            style={{
              flex,
              height: 20,
              background:
                i === 4
                  ? "linear-gradient(168deg, #313133 0%, #2a2a2c 50%, #252527 100%)"
                  : "linear-gradient(168deg, #2e2e30 0%, #272729 50%, #222224 100%)",
              borderRadius: "3.5px 3.5px 2px 2px",
              border: "0.5px solid rgba(255,255,255,0.04)",
              boxShadow:
                "0 1.5px 0 rgba(255,255,255,0.07) inset, " +
                "0 -2px 0 rgba(0,0,0,0.55) inset, " +
                "0 3px 5px rgba(0,0,0,0.75)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 2,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {i === 4 ? (
              /* Spacebar — wider backlight bleed */
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "22%",
                  height: 1,
                  background: "rgba(140,145,247,0.16)",
                  filter: "blur(1.5px)",
                }}
              />
            ) : label ? (
              <>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    height: 1,
                    background: "rgba(140,145,247,0.1)",
                    filter: "blur(0.8px)",
                  }}
                />
                <span
                  style={{
                    fontSize: 3.8,
                    color: "rgba(255,255,255,0.2)",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    zIndex: 1,
                    position: "relative",
                  }}
                >
                  {label}
                </span>
              </>
            ) : null}
          </div>
        ))}
      </div>

      {/* Trackpad */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
        <div
          style={{
            width: "40%",
            height: 62,
            background:
              "linear-gradient(170deg, #343436 0%, #2d2d2f 30%, #282828 100%)",
            borderRadius: 10,
            border: "0.5px solid rgba(255,255,255,0.055)",
            boxShadow:
              "0 0 0 1px rgba(0,0,0,0.65) inset, " +
              "0 1.5px 0 rgba(255,255,255,0.055) inset, " +
              "0 2px 8px rgba(0,0,0,0.5)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glass sheen highlight at top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "40%",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.036) 0%, transparent 100%)",
              borderRadius: "10px 10px 0 0",
            }}
          />
          {/* Subtle finger-rest indicator */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 20,
              height: 20,
              borderRadius: "50%",
              border: "0.5px solid rgba(255,255,255,0.035)",
            }}
          />
        </div>
      </div>
    </div>
  )
}

/* ── Main section ─────────────────────────────────────────────────── */
export function ToolsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" })

  /* ── Scroll-driven lid ───────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset: ["start 0.9", "start 0.1"],
  })

  // -110° = closed flat, 8° = open / leaning back
  const rawLid    = useTransform(scrollYProgress, [0, 1], [-110, 8])
  const lidAngle  = useSpring(rawLid, { stiffness: 46, damping: 21, restDelta: 0.001 })

  // Screen content fades in once lid passes ~-55° (halfway open)
  const rawScreen     = useTransform(lidAngle, [-110, -55, 8], [0, 0, 1])
  const screenOpacity = useSpring(rawScreen, { stiffness: 80, damping: 22 })

  // Scroll hint fades out as soon as the user starts scrolling
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  /* ── Tool carousel ───────────────────────────────────────────── */
  const [current,   setCurrent]   = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused,    setPaused]    = useState(false)

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir); setCurrent(next)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused) goTo((current + 1) % tools.length, 1)
    }, 2800)
    return () => clearInterval(id)
  }, [paused, current, goTo])

  const tool = tools[current]

  return (
    <section ref={sectionRef} className="relative py-10 lg:py-16">
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2 font-mono">Tools &amp; Software</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E4E4E4] font-mono">
            {"What I "}
            <span className="text-[#8C91F7]" style={{ textShadow: "0 0 20px rgba(140,145,247,0.3)" }}>Use</span>
          </h2>
        </motion.div>

        {/* ── Laptop wrapper ── */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/*
           *  3D perspective container.
           *  Layout (top to bottom):
           *    1. Screen lid      — motion.div, rotateX driven by scroll, origin: center bottom
           *    2. Hinge assembly  — twin barrel caps + bridge strip
           *    3. Keyboard base   — rotateX(62deg), speaker grilles + keyboard + trackpad
           *    4. Foot shelf
           *    5. Ground shadow
           */}
          <div
            style={{
              perspective:       "1400px",
              perspectiveOrigin: "50% 36%",
              width:    "100%",
              maxWidth: 700,
            }}
          >

            {/* ── [1] Screen lid — scroll-animated ── */}
            <motion.div
              style={{
                rotateX:         lidAngle,
                transformOrigin: "center bottom",
                width:    "100%",
                height: "clamp(200px, 30vw, 360px)",
                borderRadius: "16px 16px 3px 3px",
                position: "relative",
                // Space-gray aluminum exterior shell
                background:
                  "linear-gradient(175deg, #474748 0%, #3d3d3f 22%, #343436 58%, #2c2c2e 100%)",
                boxShadow:
                  "0 2px 0 rgba(255,255,255,0.21) inset, " +
                  "2px 0 0 rgba(255,255,255,0.07) inset, " +
                  "-2px 0 0 rgba(255,255,255,0.07) inset, " +
                  "0 -1px 0 rgba(0,0,0,0.38) inset, " +
                  "0 -18px 55px rgba(140,145,247,0.08), " +
                  "0 8px 36px rgba(0,0,0,0.6)",
              }}
            >

              {/* ── Inner screen glass recess ── */}
              <div
                style={{
                  position:     "absolute",
                  // top/sides = bezel width; bottom = thin chin
                  inset:        "11px 13px 5px 13px",
                  borderRadius: "6px 6px 3px 3px",
                  background:   "#07070e",
                  boxShadow:
                    "0 0 0 1px rgba(0,0,0,0.95) inset, " +
                    "0 2px 14px rgba(0,0,0,0.9) inset, " +
                    "0 0 0 0.5px rgba(255,255,255,0.035)",
                  overflow: "hidden",
                }}
              >
                {/* Screen glass glare — subtle top-left diagonal streak */}
                <div
                  style={{
                    position:      "absolute",
                    inset:          0,
                    background:
                      "linear-gradient(148deg, rgba(255,255,255,0.024) 0%, transparent 36%)",
                    pointerEvents: "none",
                    zIndex:        30,
                  }}
                />

                {/* ── Screen content fades in as lid opens ── */}
                <motion.div
                  style={{ opacity: screenOpacity }}
                  className="relative w-full h-full"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  {/* macOS-style menu bar */}
                  <div
                    style={{
                      position:     "absolute",
                      top: 0, left: 0, right: 0,
                      height:       18,
                      background:
                        "linear-gradient(180deg, rgba(18,16,28,0.97) 0%, rgba(13,12,22,0.94) 100%)",
                      borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                      display:      "flex",
                      alignItems:   "center",
                      justifyContent: "space-between",
                      padding:      "0 8px",
                      zIndex:       25,
                    }}
                  >
                    {/* Traffic-light dots */}
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
                        <div
                          key={i}
                          style={{
                            width:        5,
                            height:       5,
                            borderRadius: "50%",
                            background:   c,
                            opacity:      0.7,
                            boxShadow:    `0 0 4px ${c}88`,
                          }}
                        />
                      ))}
                    </div>
                    {/* Window title placeholder */}
                    <div
                      style={{
                        width:        56,
                        height:       4,
                        borderRadius: 2,
                        background:   "rgba(255,255,255,0.09)",
                      }}
                    />
                    {/* Right-side icons */}
                    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                      {[18, 13, 10].map((w, i) => (
                        <div
                          key={i}
                          style={{
                            width:        w,
                            height:       3,
                            borderRadius: 1.5,
                            background:   "rgba(255,255,255,0.11)",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Ambient colour glow (below menu bar) */}
                  <div
                    className="absolute pointer-events-none transition-all duration-700"
                    style={{
                      top: 18, left: 0, right: 0, bottom: 0,
                      background: `radial-gradient(ellipse at 50% 55%, ${tool.color}1c 0%, transparent 66%)`,
                    }}
                  />

                  {/* Subtle dot grid (below menu bar) */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: 18, left: 0, right: 0, bottom: 0,
                      backgroundImage:
                        "radial-gradient(circle, rgba(140,145,247,0.18) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                      opacity: 0.28,
                    }}
                  />

                  {/* ── Tool slide ── */}
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={current}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8"
                      style={{ top: 18 }}
                    >
                      {/* Icon badge */}
                      <div
                        className="flex items-center justify-center rounded-[18px] font-black text-3xl select-none"
                        style={{
                          width:      88,
                          height:     88,
                          background: tool.bg,
                          border:     `1.5px solid ${tool.color}55`,
                          color:      tool.color,
                          boxShadow:
                            `0 0 40px ${tool.color}20, ` +
                            `0 0 8px ${tool.color}18, ` +
                            `0 0 0 4px ${tool.color}08`,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {tool.abbr}
                      </div>

                      {/* Name + description */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-1.5" style={{ color: "#E4E4E4" }}>
                          {tool.name}
                        </h3>
                        <p
                          className="text-sm leading-relaxed max-w-[260px] mx-auto"
                          style={{ color: "rgba(228,228,228,0.45)" }}
                        >
                          {tool.desc}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Invisible prev / next click zones */}
                  <button
                    className="absolute left-0 top-0 h-full w-1/4 cursor-w-resize focus:outline-none"
                    aria-label="Previous tool"
                    onClick={() => goTo((current - 1 + tools.length) % tools.length, -1)}
                  />
                  <button
                    className="absolute right-0 top-0 h-full w-1/4 cursor-e-resize focus:outline-none"
                    aria-label="Next tool"
                    onClick={() => goTo((current + 1) % tools.length, 1)}
                  />

                  {/* Progress dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {tools.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i, i > current ? 1 : -1)}
                        aria-label={`Go to ${tools[i].name}`}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width:      i === current ? 20 : 5,
                          height:     5,
                          background: i === current ? tool.color : "rgba(228,228,228,0.15)",
                          boxShadow:  i === current ? `0 0 10px ${tool.color}55` : "none",
                        }}
                      />
                    ))}
                  </div>

                  {/* Counter */}
                  <div
                    className="absolute right-3 text-[9px] tracking-widest select-none"
                    style={{ top: 22, color: "rgba(228,228,228,0.18)" }}
                  >
                    {String(current + 1).padStart(2, "0")}&thinsp;/&thinsp;
                    {String(tools.length).padStart(2, "0")}
                  </div>
                </motion.div>
              </div>

              {/* ── Camera housing (centered on top bezel) ── */}
              <div
                style={{
                  position:  "absolute",
                  top:       4,
                  left:      "50%",
                  transform: "translateX(-50%)",
                  display:   "flex",
                  alignItems: "center",
                  gap:       4,
                }}
              >
                {/* Camera lens ring */}
                <div
                  style={{
                    width:        7,
                    height:       7,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 35% 32%, #282a2e 0%, #121214 55%, #0a0a0c 100%)",
                    border:    "0.5px solid rgba(255,255,255,0.07)",
                    boxShadow:
                      "0 0 0 1.5px rgba(0,0,0,0.75), " +
                      "0 0 0 2.5px rgba(255,255,255,0.03), " +
                      "inset 0 1px 0 rgba(255,255,255,0.07)",
                  }}
                />
                {/* Active indicator LED */}
                <div
                  style={{
                    width:        3,
                    height:       3,
                    borderRadius: "50%",
                    background:   "rgba(0, 210, 85, 0.68)",
                    boxShadow:    "0 0 5px rgba(0, 210, 85, 0.5)",
                  }}
                />
              </div>

              {/* Bottom rim highlight where lid meets hinge */}
              <div
                style={{
                  position:   "absolute",
                  bottom:      0,
                  left:       "10%",
                  right:      "10%",
                  height:      1,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.09) 25%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.09) 75%, transparent 100%)",
                }}
              />
            </motion.div>

            {/* ── [2] Hinge assembly — twin barrel caps + bridge ── */}
            <div style={{ position: "relative", height: 11 }}>
              {/* Hinge bridge (full-width backing) */}
              <div
                style={{
                  position:   "absolute",
                  inset:      "2px 0 0 0",
                  background:
                    "linear-gradient(180deg, #494949 0%, #3b3b3d 40%, #2e2e30 100%)",
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.1) inset, " +
                    "0 4px 12px rgba(0,0,0,0.75)",
                }}
              />
              {/* Left hinge barrel */}
              <div
                style={{
                  position:     "absolute",
                  left:         "5.5%",
                  top:           0,
                  width:        "13%",
                  height:       11,
                  borderRadius: "0 0 8px 8px",
                  background:
                    "linear-gradient(180deg, #545456 0%, #424244 45%, #343436 100%)",
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.15) inset, " +
                    "1px 0 0 rgba(255,255,255,0.06) inset, " +
                    "-1px 0 0 rgba(255,255,255,0.06) inset, " +
                    "0 3px 7px rgba(0,0,0,0.65)",
                }}
              />
              {/* Right hinge barrel */}
              <div
                style={{
                  position:     "absolute",
                  right:        "5.5%",
                  top:           0,
                  width:        "13%",
                  height:       11,
                  borderRadius: "0 0 8px 8px",
                  background:
                    "linear-gradient(180deg, #545456 0%, #424244 45%, #343436 100%)",
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.15) inset, " +
                    "1px 0 0 rgba(255,255,255,0.06) inset, " +
                    "-1px 0 0 rgba(255,255,255,0.06) inset, " +
                    "0 3px 7px rgba(0,0,0,0.65)",
                }}
              />
            </div>

            {/* ── [3] Keyboard base — tilted back to simulate lying flat ── */}
            <div
              style={{
                width:           "103%",
                marginLeft:      "-1.5%",
                height: "clamp(120px, 18vw, 220px)",
                transform:       "rotateX(62deg)",
                transformOrigin: "center top",
                background:
                  "linear-gradient(175deg, #414143 0%, #383839 20%, #303032 55%, #2a2a2c 100%)",
                borderRadius:    "0 0 16px 16px",
                overflow:        "hidden",
                boxShadow:
                  "0 26px 75px rgba(0,0,0,0.82), " +
                  "0 1px 0 rgba(255,255,255,0.07) inset, " +
                  "0 -1px 0 rgba(0,0,0,0.5) inset, " +
                  "2px 0 0 rgba(255,255,255,0.04) inset, " +
                  "-2px 0 0 rgba(255,255,255,0.04) inset",
                position: "relative",
              }}
            >
              {/* Left speaker grille */}
              <div
                style={{
                  position:       "absolute",
                  left:            10,
                  top:            "10%",
                  width:           30,
                  height:         "58%",
                  display:        "flex",
                  flexDirection:  "column",
                  justifyContent: "space-around",
                }}
              >
                {Array.from({ length: 9 }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      height:     1,
                      borderRadius: 1,
                      background: "rgba(0,0,0,0.55)",
                      boxShadow:  "0 0.5px 0 rgba(255,255,255,0.055)",
                    }}
                  />
                ))}
              </div>

              {/* Right speaker grille */}
              <div
                style={{
                  position:       "absolute",
                  right:           10,
                  top:            "10%",
                  width:           30,
                  height:         "58%",
                  display:        "flex",
                  flexDirection:  "column",
                  justifyContent: "space-around",
                }}
              >
                {Array.from({ length: 9 }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      height:     1,
                      borderRadius: 1,
                      background: "rgba(0,0,0,0.55)",
                      boxShadow:  "0 0.5px 0 rgba(255,255,255,0.055)",
                    }}
                  />
                ))}
              </div>

              <Keyboard />
            </div>

            {/* ── [4] Foot shelf ── */}
            <div
              style={{
                height:       6,
                margin:       "0 26px",
                background:
                  "linear-gradient(180deg, #242426 0%, #1c1c1e 100%)",
                borderRadius: "0 0 10px 10px",
                boxShadow:
                  "0 4px 14px rgba(0,0,0,0.62), " +
                  "0 1px 0 rgba(255,255,255,0.04) inset",
              }}
            />

            {/* ── [5] Ground shadow ── */}
            <div
              style={{
                height:     22,
                background: "radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)",
                filter:     "blur(12px)",
                marginTop:   3,
              }}
            />
          </div>

          {/* ── Scroll hint ── */}
          <motion.p
            style={{ opacity: hintOpacity }}
            className="text-[9px] tracking-[0.35em] uppercase text-white/20 mt-2 select-none"
          >
            Scroll to open
          </motion.p>
        </motion.div>

        {/* ── Tool pill shortcuts ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {tools.map((t, i) => (
            <button
              key={t.name}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-300"
              style={{
                background: i === current ? `${t.color}22` : "rgba(228,228,228,0.04)",
                border:     `1px solid ${i === current ? t.color + "55" : "rgba(228,228,228,0.1)"}`,
                color:      i === current ? t.color : "rgba(228,228,228,0.35)",
                boxShadow:  i === current ? `0 0 12px ${t.color}22` : "none",
              }}
            >
              {t.abbr}
            </button>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
