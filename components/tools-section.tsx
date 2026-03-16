"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import MagicRings from "./magic-rings"

/* ── Tool data ────────────────────────────────────────────────────── */
const tools = [
  { abbr: "Ai",   name: "Adobe Illustrator", desc: "Vector graphics & brand illustration",   color: "#FF9A00", img: "/images/AI_Pic.png"              },
  { abbr: "Ps",   name: "Adobe Photoshop",   desc: "Photo editing & compositing",             color: "#31A8FF", img: "/images/PS_Pic.png"              },
  { abbr: "Fi",   name: "Figma",             desc: "UI/UX design & prototyping",              color: "#F24E1E", img: "/images/Figma_Pic.png"           },
  { abbr: "Id",   name: "Adobe InDesign",    desc: "Editorial & publication design",          color: "#FF3366", img: "/images/Id_Pic.png"              },
  { abbr: "Ae",   name: "After Effects",     desc: "Motion graphics & visual effects",        color: "#9999FF", img: "/images/Ae_Pic.png"              },
  { abbr: "Pr",   name: "Premiere Pro",      desc: "Video editing & colour grading",          color: "#EA77FF", img: "/images/Pr_Pic.png"              },
  { abbr: "Fr",   name: "Framer",            desc: "Interactive web & no-code publishing",    color: "#0055FF", img: "/images/Framer_Pic.png"          },
  { abbr: "CSS",  name: "CSS3",              desc: "Styling, animations & layouts",           color: "#1572B6", img: "/images/CSS_Pic.png"             },
  { abbr: "HTML", name: "HTML5",             desc: "Semantic markup & web structure",         color: "#E34F26", img: "/images/HTML5_Pic.png"           },
  { abbr: "JS",   name: "JavaScript",        desc: "Interactive UI & front-end scripting",    color: "#F7DF1E", img: "/images/JavaScript_Pic.png"      },
  { abbr: "GH",   name: "GitHub",            desc: "Version control & collaboration",         color: "#E4E4E4", img: "/images/GitHub_Pic.png"          },
  { abbr: "Re",   name: "React",             desc: "Component-based dynamic web apps",        color: "#61DAFB", img: "/images/React_Pic.png"           },
  { abbr: "MS",   name: "Microsoft Office",  desc: "Docs, data analysis & productivity",      color: "#2B8FE5", img: "/images/MicrosoftOffice_Pic.png" },
  { abbr: "VS",   name: "VS Code",           desc: "Code editing, debugging & extensions",    color: "#007ACC", img: "/images/VSC_Pic.png"             },
]

const INTERVAL_MS   = 2800  // time between auto-advances
const ANIM_DURATION = 0.45  // slide animation duration (seconds)

/* ── Main section ─────────────────────────────────────────────────── */
export function ToolsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" })
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null)

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)   // 1 = forward, -1 = backward

  /* ── Auto-advance ── */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % tools.length)
    }, INTERVAL_MS)
  }, [])

  useEffect(() => {
    if (isInView) startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isInView, startTimer])

  /* ── Manual navigation ── */
  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
    startTimer() // reset the timer on manual interaction
  }

  const goNext = () => {
    setDirection(1)
    setCurrent(prev => (prev + 1) % tools.length)
    startTimer()
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent(prev => (prev - 1 + tools.length) % tools.length)
    startTimer()
  }

  const tool = tools[current]

  /* ── Slide variants ── */
  const variants = {
    enter:   (dir: number) => ({ x: dir * 60, opacity: 0, scale: 0.94 }),
    center:  { x: 0, opacity: 1, scale: 1 },
    exit:    (dir: number) => ({ x: dir * -60, opacity: 0, scale: 0.94 }),
  }

  return (
    <section ref={sectionRef} className="relative py-10 lg:py-16 overflow-hidden">
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">

        {/* ── Section header ── */}
        <motion.div
          className="mb-10 lg:mb-14"
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

        {/* ── Carousel ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Card + arrows row */}
          <div className="flex items-center gap-6 w-full justify-center">

            {/* Prev arrow */}
            <button
              onClick={goPrev}
              aria-label="Previous tool"
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(140,145,247,0.08)",
                border:     "1px solid rgba(140,145,247,0.2)",
                color:      "#8C91F7",
                cursor:     "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(140,145,247,0.18)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(140,145,247,0.08)")}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Single card */}
            <div
              style={{
                position:   "relative",
                width:      220,
                flexShrink: 0,
                overflow:   "hidden",
              }}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={tool.abbr}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: ANIM_DURATION, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    borderRadius:   16,
                    border:         "1px solid rgba(140,145,247,0.15)",
                    background:     "rgba(10,9,20,0.85)",
                    overflow:       "hidden",
                    backdropFilter: "blur(8px)",
                    boxShadow:      "0 4px 24px rgba(0,0,0,0.35)",
                  }}
                >
                  {/* Image area with MagicRings behind */}
                  <div style={{ position: "relative", height: 220, background: "#07070e", overflow: "hidden" }}>
                    {/* MagicRings WebGL canvas */}
                    <div className="absolute inset-0">
                      <MagicRings
                        color="#fc42ff"
                        colorTwo="#42fcff"
                        ringCount={6}
                        speed={1}
                        attenuation={10}
                        lineThickness={2}
                        baseRadius={0.35}
                        radiusStep={0.1}
                        scaleRate={0.1}
                        opacity={1}
                        blur={0}
                        noiseAmount={0.1}
                        rotation={0}
                        ringGap={1.5}
                        fadeIn={0.7}
                        fadeOut={0.5}
                        followMouse={false}
                        mouseInfluence={0.2}
                        hoverScale={1.2}
                        parallax={0.05}
                        clickBurst={false}
                      />
                    </div>

                    {/* Tool image — centred on top of rings */}
                    <img
                      src={tool.img}
                      alt={tool.name}
                      draggable={false}
                      style={{
                        position:       "absolute",
                        inset:           0,
                        width:          "100%",
                        height:         "100%",
                        objectFit:      "contain",
                        objectPosition: "center",
                        padding:        "16px",
                      }}
                    />
                  </div>

                  {/* Tool name + desc */}
                  <div style={{ padding: "14px 16px 16px", borderTop: "1px solid rgba(140,145,247,0.1)", background: "rgba(10,9,20,0.95)" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#E4E4E4", marginBottom: 5, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {tool.name}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(228,228,228,0.45)", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {tool.desc}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next arrow */}
            <button
              onClick={goNext}
              aria-label="Next tool"
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(140,145,247,0.08)",
                border:     "1px solid rgba(140,145,247,0.2)",
                color:      "#8C91F7",
                cursor:     "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(140,145,247,0.18)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(140,145,247,0.08)")}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-2 items-center">
            {tools.map((t, i) => (
              <button
                key={t.abbr}
                onClick={() => goTo(i)}
                aria-label={`Go to ${t.name}`}
                style={{
                  width:        i === current ? 20 : 6,
                  height:       6,
                  borderRadius: 3,
                  background:   i === current ? "#8C91F7" : "rgba(140,145,247,0.25)",
                  border:       "none",
                  padding:      0,
                  cursor:       "pointer",
                  transition:   "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/30 select-none font-mono">
            {String(current + 1).padStart(2, "0")} / {String(tools.length).padStart(2, "0")}
          </p>
        </motion.div>

      </div>
    </section>
  )
}
