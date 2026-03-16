"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import MagicRings from "./magic-rings"

/* ── Tool data ────────────────────────────────────────────────────── */
const tools = [
  { abbr: "Ai",  name: "Adobe Illustrator", desc: "Vector graphics & brand illustration",   color: "#FF9A00", img: "/images/AI_Pic.png"              },
  { abbr: "Ps",  name: "Adobe Photoshop",   desc: "Photo editing & compositing",             color: "#31A8FF", img: "/images/PS_Pic.png"              },
  { abbr: "Fi",  name: "Figma",             desc: "UI/UX design & prototyping",              color: "#F24E1E", img: "/images/Figma_Pic.png"           },
  { abbr: "Id",  name: "Adobe InDesign",    desc: "Editorial & publication design",          color: "#FF3366", img: "/images/Id_Pic.png"              },
  { abbr: "Ae",  name: "After Effects",     desc: "Motion graphics & visual effects",        color: "#9999FF", img: "/images/Ae_Pic.png"              },
  { abbr: "Pr",  name: "Premiere Pro",      desc: "Video editing & colour grading",          color: "#EA77FF", img: "/images/Pr_Pic.png"              },
  { abbr: "Fr",  name: "Framer",            desc: "Interactive web & no-code publishing",    color: "#0055FF", img: "/images/Framer_Pic.png"          },
  { abbr: "CSS", name: "CSS3",              desc: "Styling, animations & layouts",           color: "#1572B6", img: "/images/CSS_Pic.png"             },
  { abbr: "HTML",name: "HTML5",             desc: "Semantic markup & web structure",         color: "#E34F26", img: "/images/HTML5_Pic.png"           },
  { abbr: "JS",  name: "JavaScript",        desc: "Interactive UI & front-end scripting",    color: "#F7DF1E", img: "/images/JavaScript_Pic.png"      },
  { abbr: "GH",  name: "GitHub",            desc: "Version control & collaboration",         color: "#E4E4E4", img: "/images/GitHub_Pic.png"          },
  { abbr: "Re",  name: "React",             desc: "Component-based dynamic web apps",        color: "#61DAFB", img: "/images/React_Pic.png"           },
  { abbr: "MS",  name: "Microsoft Office",  desc: "Docs, data analysis & productivity",      color: "#2B8FE5", img: "/images/MicrosoftOffice_Pic.png" },
  { abbr: "VS",  name: "VS Code",           desc: "Code editing, debugging & extensions",    color: "#007ACC", img: "/images/VSC_Pic.png"             },
]

/* ── Main section ─────────────────────────────────────────────────── */
export function ToolsSection() {
  const sectionRef     = useRef<HTMLElement>(null)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const isInView       = useInView(sectionRef, { once: true, margin: "-100px" })

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

      </div>

      {/* ── Horizontal scroll track (edge-to-edge) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        {/* Overflow wrapper — fades left/right edges */}
        <div
          ref={constraintsRef}
          className="relative"
          style={{ overflowX: "hidden" }}
        >
          {/* Left fade */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
            style={{
              width: "80px",
              background: "linear-gradient(90deg, var(--bg, #0a0913) 0%, transparent 100%)",
            }}
          />
          {/* Right fade */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
            style={{
              width: "80px",
              background: "linear-gradient(270deg, var(--bg, #0a0913) 0%, transparent 100%)",
            }}
          />

          {/* Draggable row */}
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.12}
            dragTransition={{ bounceStiffness: 280, bounceDamping: 28 }}
            className="flex gap-5 cursor-grab active:cursor-grabbing select-none"
            style={{ padding: "16px 80px 24px" }}
          >
            {tools.map((tool, i) => (
              <motion.div
                key={tool.abbr}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.04, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  flexShrink:    0,
                  width:         180,
                  borderRadius:  16,
                  border:        "1px solid rgba(140,145,247,0.15)",
                  background:    "rgba(10,9,20,0.85)",
                  overflow:      "hidden",
                  backdropFilter: "blur(8px)",
                  boxShadow:     "0 4px 24px rgba(0,0,0,0.35)",
                  position:      "relative",
                }}
              >
                {/* ── Image area with MagicRings behind ── */}
                <div
                  style={{
                    position:   "relative",
                    height:      168,
                    background: "#07070e",
                    overflow:   "hidden",
                  }}
                >
                  {/* MagicRings canvas — fills the image area */}
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

                  {/* Tool image — centred on top of the rings */}
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
                      padding:        "12px",
                    }}
                  />
                </div>

                {/* ── Tool name + desc ── */}
                <div
                  style={{
                    padding:         "12px 14px 14px",
                    borderTop:       "1px solid rgba(140,145,247,0.1)",
                    background:      "rgba(10,9,20,0.95)",
                  }}
                >
                  <div
                    style={{
                      fontWeight:   700,
                      fontSize:     13,
                      color:        "#E4E4E4",
                      marginBottom: 4,
                      lineHeight:   1.2,
                      whiteSpace:   "nowrap",
                      overflow:     "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {tool.name}
                  </div>
                  <div
                    style={{
                      fontSize:   10,
                      color:      "rgba(228,228,228,0.42)",
                      lineHeight: 1.45,
                      display:    "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow:   "hidden",
                    }}
                  >
                    {tool.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Drag hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-[9px] tracking-[0.35em] uppercase text-white/18 mt-1 select-none"
        >
          Drag to explore
        </motion.p>
      </motion.div>
    </section>
  )
}
