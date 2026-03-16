"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import MagicRings from "./magic-rings"

const tools = [
  { abbr: "Ai",   name: "Adobe Illustrator", img: "/images/AI_Pic.png"              },
  { abbr: "Ps",   name: "Adobe Photoshop",   img: "/images/Photoshop_Pic.png"       },
  { abbr: "Fi",   name: "Figma",             img: "/images/Figma_Pic.png"           },
  { abbr: "Id",   name: "Adobe InDesign",    img: "/images/Id_Pic.png"              },
  { abbr: "Ae",   name: "After Effects",     img: "/images/Ae_Pic.png"              },
  { abbr: "Pr",   name: "Premiere Pro",      img: "/images/Pr_Pic.png"              },
  { abbr: "Fr",   name: "Framer",            img: "/images/Framer_Pic.png"          },
  { abbr: "CSS",  name: "CSS3",              img: "/images/CSS_Pic.png"             },
  { abbr: "HTML", name: "HTML5",             img: "/images/HTML5_Pic.png"           },
  { abbr: "JS",   name: "JavaScript",        img: "/images/JavaScript_Pic.png"      },
  { abbr: "GH",   name: "GitHub",            img: "/images/GitHub_Pic.png"          },
  { abbr: "Re",   name: "React",             img: "/images/React_Pic.png"           },
  { abbr: "MS",   name: "Microsoft Office",  img: "/images/MicrosoftOffice_Pic.png" },
  { abbr: "VS",   name: "VS Code",           img: "/images/VSC_Pic.png"             },
]

const INTERVAL_MS = 3000

export function ToolsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" })
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const [current, setCurrent]     = useState(0)
  const [direction, setDirection] = useState(1)

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

  const goTo   = (idx: number) => { setDirection(idx > current ? 1 : -1); setCurrent(idx); startTimer() }
  const goNext = () => { setDirection(1);  setCurrent(p => (p + 1) % tools.length); startTimer() }
  const goPrev = () => { setDirection(-1); setCurrent(p => (p - 1 + tools.length) % tools.length); startTimer() }

  const tool = tools[current]

  const imgVariants = {
    enter:  (d: number) => ({ x: d * 70, opacity: 0, scale: 0.85 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   (d: number) => ({ x: d * -70, opacity: 0, scale: 0.85 }),
  }

  return (
    <section ref={sectionRef} className="relative py-10 lg:py-16">
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">

        {/* Header */}
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

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-10 w-full justify-center">

            {/* Prev */}
            <button onClick={goPrev} aria-label="Previous"
              style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(140,145,247,0.08)", border: "1px solid rgba(140,145,247,0.2)", color: "#8C91F7", cursor: "pointer", position: "relative", zIndex: 2 }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(140,145,247,0.18)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(140,145,247,0.08)")}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Stage: rings bleed freely, image floats on top */}
            <div style={{ position: "relative", width: 280, height: 280, flexShrink: 0 }}>

              {/* MagicRings — oversized, centred, bleeds out freely */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 580, height: 580,
                pointerEvents: "none",
                zIndex: 0,
              }}>
                <MagicRings
                  color="#fc42ff"
                  colorTwo="#8C91F7"
                  ringCount={7}
                  speed={0.9}
                  attenuation={8}
                  lineThickness={2.5}
                  baseRadius={0.32}
                  radiusStep={0.09}
                  scaleRate={0.12}
                  opacity={1}
                  noiseAmount={0.08}
                  rotation={0}
                  ringGap={1.5}
                  fadeIn={0.6}
                  fadeOut={0.5}
                  followMouse={false}
                  parallax={0.04}
                />
              </div>

              {/* Floating image — transparent bg, glows, bobs up and down */}
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={tool.abbr}
                  custom={direction}
                  variants={imgVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ position: "absolute", inset: 0, zIndex: 1 }}
                >
                  {/* Continuous float bob */}
                  <motion.img
                    src={tool.img}
                    alt={tool.name}
                    draggable={false}
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width:          "100%",
                      height:         "100%",
                      objectFit:      "contain",
                      objectPosition: "center",
                      filter:         "drop-shadow(0 0 18px rgba(252,66,255,0.7)) drop-shadow(0 6px 30px rgba(140,145,247,0.5))",
                      userSelect:     "none",
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next */}
            <button onClick={goNext} aria-label="Next"
              style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(140,145,247,0.08)", border: "1px solid rgba(140,145,247,0.2)", color: "#8C91F7", cursor: "pointer", position: "relative", zIndex: 2 }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(140,145,247,0.18)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(140,145,247,0.08)")}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Tool name */}
          <AnimatePresence mode="wait">
            <motion.p
              key={tool.abbr + "-name"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              style={{ color: "#E4E4E4", fontWeight: 600, fontSize: 15, letterSpacing: "0.08em", fontFamily: "monospace", textShadow: "0 0 18px rgba(140,145,247,0.4)" }}
            >
              {tool.name}
            </motion.p>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex gap-2 items-center">
            {tools.map((t, i) => (
              <button key={t.abbr} onClick={() => goTo(i)} aria-label={t.name}
                style={{ width: i === current ? 20 : 6, height: 6, borderRadius: 3, background: i === current ? "#8C91F7" : "rgba(140,145,247,0.25)", border: "none", padding: 0, cursor: "pointer", transition: "all 0.3s ease" }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
