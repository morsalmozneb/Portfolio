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

/* ── Keyboard component ───────────────────────────────────────────── */
function Keyboard() {
  // rows: [key count, left-modifier width multiplier, right-modifier width multiplier]
  const rows: [number, number, number][] = [
    [12, 1, 2.0],   // numbers row + backspace
    [12, 1.5, 1.5], // QWERTY row
    [11, 1.9, 2.0], // ASDF row
    [10, 2.4, 2.4], // ZXCV row
  ]

  return (
    <div style={{ padding: "14px 20px 0", display: "flex", flexDirection: "column", gap: 4 }}>
      {/* ── Function / ESC row ── */}
      <div style={{ display: "flex", gap: 3, marginBottom: 2 }}>
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            style={{
              flex: i === 0 ? 1.2 : 1,
              height: 14,
              background: "linear-gradient(180deg, #252527 0%, #1c1c1e 100%)",
              borderRadius: 2,
              boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 1px 3px rgba(0,0,0,0.7)",
            }}
          />
        ))}
      </div>

      {/* ── Main key rows ── */}
      {rows.map(([count, lw, rw], ri) => (
        <div key={ri} style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: count }, (_, ki) => {
            const isFirst = ki === 0
            const isLast  = ki === count - 1
            const flex    = isFirst ? lw : isLast ? rw : 1
            return (
              <div
                key={ki}
                style={{
                  flex,
                  height: 22,
                  background: "linear-gradient(180deg, #272729 0%, #1e1e20 100%)",
                  borderRadius: 4,
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.07) inset, 0 -1px 0 rgba(0,0,0,0.4) inset, 0 2px 5px rgba(0,0,0,0.65)",
                }}
              />
            )
          })}
        </div>
      ))}

      {/* ── Space bar row ── */}
      <div style={{ display: "flex", gap: 3 }}>
        {[1.2, 1, 5.5, 1, 1, 1, 1.2].map((flex, i) => (
          <div
            key={i}
            style={{
              flex,
              height: 22,
              background: "linear-gradient(180deg, #272729 0%, #1e1e20 100%)",
              borderRadius: 4,
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.07) inset, 0 -1px 0 rgba(0,0,0,0.4) inset, 0 2px 5px rgba(0,0,0,0.65)",
            }}
          />
        ))}
      </div>

      {/* ── Trackpad ── */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 12 }}>
        <div
          style={{
            width: "42%",
            height: 72,
            background: "linear-gradient(180deg, #2e2e30 0%, #262628 100%)",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.05)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.5) inset, 0 1px 0 rgba(255,255,255,0.04) inset",
          }}
        />
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

  // -110° = closed flat against base, 8° = open / leaning back
  const rawLid = useTransform(scrollYProgress, [0, 1], [-110, 8])
  const lidAngle = useSpring(rawLid, { stiffness: 46, damping: 21, restDelta: 0.001 })

  // Screen content fades in once lid passes ~-55° (halfway open)
  const rawScreen = useTransform(lidAngle, [-110, -55, 8], [0, 0, 1])
  const screenOpacity = useSpring(rawScreen, { stiffness: 80, damping: 22 })

  // Scroll hint fades out as soon as the user starts scrolling into section
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
    <section ref={sectionRef} className="relative py-16 lg:py-28">
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2">Tools &amp; Software</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E4E4E4]">
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
           *  perspectiveOrigin "50% 38%" = viewer is slightly above the laptop.
           *
           *  Layout (top → bottom in DOM / normal flow):
           *    1. Screen lid  — motion.div, rotateX driven by scroll, origin: center bottom
           *    2. Hinge strip — static thin bar
           *    3. Keyboard base — rotateX(62deg), origin: center top, keyboard keys inside
           *    4. Foot / shadow
           *
           *  Both the screen and the base share the same pivot line (the boundary
           *  between their divs), so they always appear to hinge from the same point.
           */}
          <div
            style={{
              perspective:       "1300px",
              perspectiveOrigin: "50% 38%",
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
                height: "clamp(180px, 28vw, 330px)",
                border:   "11px solid #2a2a2c",
                borderBottom: "none",
                borderRadius: "14px 14px 0 0",
                background:   "#08070f",
                overflow:     "hidden",
                boxShadow:
                  "0 -3px 0 rgba(255,255,255,0.05) inset, " +
                  "0 -24px 60px rgba(140,145,247,0.06)",
                position: "relative",
              }}
            >
              {/* Lid inner gloss on top bezel */}
              <div
                style={{
                  position:   "absolute",
                  inset:       0,
                  borderRadius: "4px 4px 0 0",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, transparent 14%)",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              />

              {/* Camera dot */}
              <div
                style={{
                  position:  "absolute",
                  top: 7, left: "50%",
                  transform: "translateX(-50%)",
                  width: 6, height: 6,
                  borderRadius: "50%",
                  background: "#1e1e20",
                  border: "1px solid rgba(255,255,255,0.08)",
                  zIndex: 11,
                }}
              />

              {/* Screen content — fades in as lid opens */}
              <motion.div
                style={{ opacity: screenOpacity }}
                className="relative w-full h-full"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {/* Ambient colour glow */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 50% 30%, ${tool.color}1e 0%, transparent 65%)`,
                  }}
                />

                {/* Subtle dot grid */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(140,145,247,0.18) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    opacity: 0.35,
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
                  >
                    {/* Icon badge */}
                    <div
                      className="flex items-center justify-center rounded-[18px] font-black text-3xl select-none"
                      style={{
                        width: 92, height: 92,
                        background: tool.bg,
                        border:     `1.5px solid ${tool.color}55`,
                        color:      tool.color,
                        boxShadow:  `0 0 36px ${tool.color}22, 0 0 8px ${tool.color}18`,
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
                        style={{ color: "rgba(228,228,228,0.48)" }}
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
                  className="absolute top-3 right-3 text-[9px] tracking-widest select-none"
                  style={{ color: "rgba(228,228,228,0.18)" }}
                >
                  {String(current + 1).padStart(2, "0")}&thinsp;/&thinsp;
                  {String(tools.length).padStart(2, "0")}
                </div>
              </motion.div>
            </motion.div>

            {/* ── [2] Hinge strip ── */}
            <div
              style={{
                height:     6,
                background: "linear-gradient(180deg, #404042 0%, #2a2a2c 100%)",
                boxShadow:  "0 2px 8px rgba(0,0,0,0.6)",
              }}
            />

            {/* ── [3] Keyboard base — tilted back to simulate lying flat ── */}
            {/*
             *  rotateX(62deg) with transformOrigin "center top":
             *    • The top edge (hinge) stays fixed
             *    • The bottom edge swings toward the viewer
             *    • Combined with perspective from above, this gives the
             *      classic "laptop on a desk" foreshortened keyboard look.
             */}
            <div
              style={{
                width:           "103%",
                marginLeft:      "-1.5%",
                height: "clamp(120px, 18vw, 220px)",
                transform:       "rotateX(62deg)",
                transformOrigin: "center top",
                background:      "linear-gradient(180deg, #3a3a3c 0%, #2e2e30 50%, #282828 100%)",
                borderRadius:    "0 0 14px 14px",
                overflow:        "hidden",
                boxShadow:
                  "0 24px 70px rgba(0,0,0,0.75), " +
                  "0 1px 0 rgba(255,255,255,0.06) inset, " +
                  "0 -1px 0 rgba(0,0,0,0.5) inset",
              }}
            >
              <Keyboard />
            </div>

            {/* ── [4] Foot shelf ── */}
            <div
              style={{
                height:      5,
                margin:      "0 20px",
                background:  "linear-gradient(180deg, #242426 0%, #1a1a1c 100%)",
                borderRadius: "0 0 8px 8px",
                boxShadow:   "0 3px 10px rgba(0,0,0,0.5)",
              }}
            />

            {/* ── [5] Ground shadow ── */}
            <div
              style={{
                height:     18,
                background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
                filter:     "blur(10px)",
                marginTop:   2,
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
