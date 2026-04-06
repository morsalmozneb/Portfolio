"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

const designTools = [
  { name: "Figma",         abbr: "Fg",  color: "#F24E1E", img: "/images/Figma_Pic.png",          desc: "UI/UX design & interactive prototyping" },
  { name: "Illustrator",   abbr: "Ai",  color: "#FF9A00", img: "/images/AI_Pic.png",             desc: "Vector graphics & brand illustration" },
  { name: "Photoshop",     abbr: "Ps",  color: "#31A8FF", img: "/images/Photoshop_Pic.png",      desc: "Photo editing & compositing" },
  { name: "InDesign",      abbr: "Id",  color: "#FF3366", img: "/images/Id_Pic.png",             desc: "Editorial layout & print design" },
  { name: "After Effects", abbr: "Ae",  color: "#9999FF", img: "/images/Ae_Pic.png",             desc: "Motion graphics & visual effects" },
  { name: "Framer",        abbr: "Fr",  color: "#0055FF", img: "/images/Framer_Pic.png",         desc: "Interactive web & no-code publishing" },
]

const devTools = [
  { name: "HTML5",       abbr: "< >", color: "#E34F26", img: "/images/HTML5_Pic.png",        desc: "Semantic markup & web structure" },
  { name: "CSS3",        abbr: "{ }", color: "#1572B6", img: "/images/CSS_Pic.png",          desc: "Styling, animations & responsive layouts" },
  { name: "JavaScript",  abbr: "JS",  color: "#F7DF1E", img: "/images/JavaScript_Pic.png",   desc: "Interactive UI & front-end scripting" },
  { name: "React",       abbr: "Re",  color: "#61DAFB", img: "/images/React_Pic.png",        desc: "Component-based dynamic web apps" },
  { name: "GitHub",      abbr: "GH",  color: "#CCCCCC", img: "/images/GitHub_Pic.png",       desc: "Version control & team collaboration" },
  { name: "VS Code",     abbr: "VS",  color: "#007ACC", img: "/images/VSC_Pic.png",          desc: "Code editing, debugging & extensions" },
]

type ToolItem = { name: string; abbr: string; color: string; img: string; desc: string }

export function AboutTools() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState<"design" | "development">("design")
  const [selected, setSelected] = useState(0)

  const tools: ToolItem[] = activeTab === "design" ? designTools : devTools
  const activeTool = tools[selected] ?? tools[0]

  useEffect(() => {
    setSelected(0)
  }, [activeTab])

  return (
    <section className="relative py-10 lg:py-16" ref={ref}>
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="mb-10 lg:mb-16"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2 font-mono">
            Skills &amp; Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E4E4E4] text-balance font-mono">
            {"Tools I "}
            <span
              className="text-[#8C91F7]"
              style={{ textShadow: "0 0 20px rgba(140, 145, 247, 0.3)" }}
            >
              Use
            </span>
            {" Regularly"}
          </h2>
        </motion.div>

        {/* Tablet + tabs */}
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {/* Tablet frame */}
          <div
            className="relative rounded-[28px] p-[2px]"
            style={{
              background:
                "linear-gradient(145deg, rgba(140,145,247,0.45) 0%, rgba(60,58,110,0.18) 50%, rgba(140,145,247,0.2) 100%)",
              boxShadow:
                "0 0 70px rgba(140,145,247,0.08), 0 28px 64px rgba(0,0,0,0.5)",
            }}
          >
            {/* Tablet body */}
            <div
              className="rounded-[27px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(26,24,48,1) 0%, rgba(18,16,38,1) 100%)",
              }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-5 pt-4 pb-1">
                <div className="flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(140,145,247,0.3)" }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(140,145,247,0.18)" }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(140,145,247,0.08)" }} />
                </div>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "rgba(28,26,50,1)",
                    boxShadow: "inset 0 0 4px rgba(0,0,0,0.8), 0 0 6px rgba(140,145,247,0.25)",
                    border: "1px solid rgba(140,145,247,0.2)",
                  }}
                />
                <span className="text-[9px] font-mono tracking-[0.3em] uppercase" style={{ color: "rgba(140,145,247,0.35)" }}>
                  {activeTab === "design" ? "Design" : "Dev"}
                </span>
              </div>

              {/* App icon grid */}
              <div className="px-7 pt-5 pb-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.22 }}
                    className="grid grid-cols-3 gap-x-4 gap-y-5"
                  >
                    {tools.map((tool, i) => {
                      const isSelected = i === selected
                      return (
                        <motion.button
                          key={tool.name}
                          onClick={() => setSelected(i)}
                          className="flex flex-col items-center gap-2 cursor-pointer"
                          whileTap={{ scale: 0.9 }}
                          aria-label={tool.name}
                        >
                          <div
                            className="relative flex items-center justify-center rounded-2xl transition-all duration-300"
                            style={{
                              width: 68,
                              height: 68,
                              background: isSelected
                                ? `radial-gradient(circle at 40% 35%, ${tool.color}28 0%, rgba(18,16,38,0.95) 100%)`
                                : "rgba(28,26,52,0.85)",
                              border: `1.5px solid ${isSelected ? tool.color + "60" : "rgba(140,145,247,0.08)"}`,
                              boxShadow: isSelected
                                ? `0 0 18px ${tool.color}30, 0 4px 16px rgba(0,0,0,0.4)`
                                : "0 2px 8px rgba(0,0,0,0.3)",
                            }}
                          >
                            <img
                              src={tool.img}
                              alt={tool.name}
                              draggable={false}
                              style={{
                                width: 46,
                                height: 46,
                                objectFit: "contain",
                                filter: isSelected
                                  ? `drop-shadow(0 0 7px ${tool.color}99)`
                                  : "brightness(0.55) saturate(0.5)",
                                transition: "filter 0.35s ease",
                              }}
                            />
                            {isSelected && (
                              <motion.div
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                style={{ border: `1px solid ${tool.color}50` }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              />
                            )}
                          </div>
                          <span
                            className="text-[10px] font-medium text-center leading-tight"
                            style={{
                              color: isSelected ? "#E4E4E4" : "rgba(228,228,228,0.28)",
                              transition: "color 0.3s",
                              maxWidth: 72,
                            }}
                          >
                            {tool.name}
                          </span>
                        </motion.button>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Info bar */}
              <div className="mx-5 mb-4 mt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTool.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${activeTool.color}18 0%, rgba(22,20,44,0.9) 100%)`,
                      border: `1px solid ${activeTool.color}30`,
                    }}
                  >
                    <img
                      src={activeTool.img}
                      alt={activeTool.name}
                      style={{
                        width: 26,
                        height: 26,
                        objectFit: "contain",
                        filter: `drop-shadow(0 0 6px ${activeTool.color}77)`,
                        flexShrink: 0,
                      }}
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold font-mono truncate" style={{ color: "#E4E4E4" }}>
                        {activeTool.name}
                      </p>
                      <p className="text-[10px] leading-relaxed" style={{ color: "rgba(228,228,228,0.42)" }}>
                        {activeTool.desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Home bar */}
              <div className="flex justify-center pb-4 pt-1">
                <div className="w-20 h-[3px] rounded-full" style={{ background: "rgba(140,145,247,0.18)" }} />
              </div>
            </div>
          </div>

          {/* Tabs below tablet */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {(["design", "development"] as const).map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative px-4 py-2 text-sm font-medium capitalize transition-colors duration-300 cursor-pointer"
                  style={{ color: isActive ? "#E4E4E4" : "rgba(228, 228, 228, 0.35)" }}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="about-tools-tab"
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ background: "#8C91F7", boxShadow: "0 0 8px rgba(140, 145, 247, 0.5)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
