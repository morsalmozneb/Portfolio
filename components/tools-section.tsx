"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import MagicRings from "./magic-rings"

const tools = [
  { abbr: "Ai",   name: "Adobe Illustrator", desc: "Vector graphics & brand illustration",          img: "/images/AI_Pic.png"              },
  { abbr: "Ps",   name: "Adobe Photoshop",   desc: "Photo editing, compositing & retouching",       img: "/images/Photoshop_Pic.png"       },
  { abbr: "Fi",   name: "Figma",             desc: "UI/UX design & interactive prototyping",        img: "/images/Figma_Pic.png"           },
  { abbr: "Id",   name: "Adobe InDesign",    desc: "Editorial layout & print design",               img: "/images/Id_Pic.png"              },
  { abbr: "Ae",   name: "After Effects",     desc: "Motion graphics & visual effects",              img: "/images/Ae_Pic.png"              },
  { abbr: "Pr",   name: "Premiere Pro",      desc: "Video editing & colour grading",                img: "/images/Pr_Pic.png"              },
  { abbr: "Fr",   name: "Framer",            desc: "Interactive web & no-code publishing",          img: "/images/Framer_Pic.png"          },
  { abbr: "CSS",  name: "CSS3",              desc: "Styling, animations & responsive layouts",      img: "/images/CSS_Pic.png"             },
  { abbr: "HTML", name: "HTML5",             desc: "Semantic markup & web structure",               img: "/images/HTML5_Pic.png"           },
  { abbr: "JS",   name: "JavaScript",        desc: "Interactive UI & front-end responsive scripting", img: "/images/JavaScript_Pic.png"   },
  { abbr: "GH",   name: "GitHub",            desc: "Version control & team collaboration",          img: "/images/GitHub_Pic.png"          },
  { abbr: "Re",   name: "React",             desc: "Component-based dynamic web apps",              img: "/images/React_Pic.png"           },
  { abbr: "MS",   name: "Microsoft Office",  desc: "Docs, spreadsheets & presentations",            img: "/images/MicrosoftOffice_Pic.png" },
  { abbr: "VS",   name: "VS Code",           desc: "Code editing, debugging & extensions",          img: "/images/VSC_Pic.png"             },
]

const INTERVAL_MS = 3000

function RadarRing({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        border: "1px solid rgba(140,145,247,0.35)",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      initial={{ width: 0, height: 0, opacity: 0.8 }}
      animate={{ width: 600, height: 600, opacity: 0 }}
      transition={{
        duration: 3.5, delay,
        repeat: Infinity, ease: "easeOut", repeatDelay: 0.5,
      }}
    />
  )
}

export function ToolsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" })
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const [current,   setCurrent]   = useState(0)
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

  const goTo = (idx: number) => { setDirection(idx > current ? 1 : -1); setCurrent(idx); startTimer() }
  const goPrev = () => { setDirection(-1); setCurrent(prev => (prev - 1 + tools.length) % tools.length); startTimer() }
  const goNext = () => { setDirection(1);  setCurrent(prev => (prev + 1) % tools.length); startTimer() }

  const tool = tools[current]

  return (
    <section ref={sectionRef} className="relative py-10 lg:py-16">
      <div className="max-w-[1080px] xl:max-w-[1280px] 2xl:max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="flex flex-col items-center gap-6"
        >
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 340, height: 340, flexShrink: 0 }}>

            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 780, height: 780,
              pointerEvents: "none",
              zIndex: 0,
              borderRadius: "50%",
              overflow: "hidden",
            }}>
              <MagicRings
                color="#b47cff"
                colorTwo="#8C91F7"
                ringCount={7}
                speed={0.9}
                attenuation={8}
                lineThickness={2.5}
                baseRadius={0.28}
                radiusStep={0.11}
                scaleRate={0.12}
                opacity={0.22}
                noiseAmount={0.08}
                rotation={0}
                ringGap={1.5}
                fadeIn={0.6}
                fadeOut={0.5}
                followMouse={false}
                parallax={0.04}
              />
            </div>

            {isInView && (
              <>
                <RadarRing delay={0} />
                <RadarRing delay={1.1} />
                <RadarRing delay={2.2} />
              </>
            )}

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={tool.abbr}
                style={{
                  position: "relative",
                  zIndex: 1,
                  lineHeight: 0,
                  maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 45%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 45%, transparent 100%)",
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.img
                  src={tool.img}
                  alt={tool.name}
                  draggable={false}
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: 300,
                    height: 300,
                    objectFit: "contain",
                    display: "block",
                    filter: "drop-shadow(0 0 22px rgba(140,145,247,0.8)) drop-shadow(0 8px 32px rgba(99,102,241,0.4))",
                    userSelect: "none",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tool.abbr + "-text"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-2 text-center"
              style={{ maxWidth: 320 }}
            >
              <p style={{ color: "#E4E4E4", fontWeight: 700, fontSize: 16, letterSpacing: "0.08em", fontFamily: "monospace" }}>
                {tool.name}
              </p>
              <p style={{ color: "rgba(228,228,228,0.45)", fontSize: 12, letterSpacing: "0.04em", lineHeight: 1.6 }}>
                {tool.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4 pt-1">
            <button
              onClick={goPrev}
              aria-label="Previous tool"
              className="group"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(140,145,247,0.08)",
                border: "1px solid rgba(140,145,247,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
                transition: "background 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(140,145,247,0.18)"
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(140,145,247,0.5)"
                ;(e.currentTarget as HTMLButtonElement).style.transform = "translateX(-2px)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(140,145,247,0.08)"
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(140,145,247,0.25)"
                ;(e.currentTarget as HTMLButtonElement).style.transform = "translateX(0)"
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 2L4 7l5 5" stroke="#8C91F7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-2 items-center">
              {tools.map((t, i) => (
                <button key={t.abbr} onClick={() => goTo(i)} aria-label={t.name}
                  style={{ width: i === current ? 20 : 6, height: 6, borderRadius: 3, background: i === current ? "#8C91F7" : "rgba(140,145,247,0.25)", transition: "all 0.3s ease", border: "none", cursor: "pointer", padding: 0 }}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              aria-label="Next tool"
              className="group"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(140,145,247,0.08)",
                border: "1px solid rgba(140,145,247,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
                transition: "background 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(140,145,247,0.18)"
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(140,145,247,0.5)"
                ;(e.currentTarget as HTMLButtonElement).style.transform = "translateX(2px)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(140,145,247,0.08)"
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(140,145,247,0.25)"
                ;(e.currentTarget as HTMLButtonElement).style.transform = "translateX(0)"
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 2l5 5-5 5" stroke="#8C91F7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  )
}
