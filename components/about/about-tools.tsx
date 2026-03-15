"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

const designTools = [
  { name: "Figma", abbr: "Fg", color: "#F24E1E" },
  { name: "Illustrator", abbr: "Ai", color: "#FF9A00" },
  { name: "Photoshop", abbr: "Ps", color: "#31A8FF" },
  { name: "InDesign", abbr: "Id", color: "#FF3366" },
  { name: "After Effects", abbr: "Ae", color: "#9999FF" },
  { name: "Framer", abbr: "Fr", color: "#0055FF" },
]

const devTools = [
  { name: "HTML", abbr: "< >", color: "#E34F26" },
  { name: "CSS", abbr: "{ }", color: "#1572B6" },
  { name: "JavaScript", abbr: "JS", color: "#F7DF1E" },
  { name: "React", abbr: "Re", color: "#61DAFB" },
  { name: "Next.js", abbr: "Nx", color: "#FFFFFF" },
  { name: "Tailwind", abbr: "Tw", color: "#06B6D4" },
]

type ToolItem = { name: string; abbr: string; color: string }

function ToolCarousel({
  tools,
  isPaused,
  setIsPaused,
}: {
  tools: ToolItem[]
  isPaused: boolean
  setIsPaused: (v: boolean) => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  const advance = useCallback(() => {
    if (!isPaused) {
      setActiveIndex((i) => (i + 1) % tools.length)
    }
  }, [isPaused, tools.length])

  useEffect(() => {
    const interval = setInterval(advance, 2500)
    return () => clearInterval(interval)
  }, [advance])

  // Reset when tools change
  useEffect(() => {
    setActiveIndex(0)
  }, [tools])

  return (
    <div
      className="relative rounded-t-lg overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(15, 13, 30, 1) 0%, rgba(20, 18, 40, 1) 100%)",
        minHeight: "220px",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-center h-[220px] gap-4 px-8">
        {tools.map((tool, i) => {
          const distance = Math.abs(i - activeIndex)
          const isActive = i === activeIndex
          const isNear = distance <= 2 || distance >= tools.length - 2

          if (!isNear) return null

          let adjustedDist = distance
          if (distance > tools.length / 2) {
            adjustedDist = tools.length - distance
          }

          const scale = isActive ? 1.1 : 1 - adjustedDist * 0.15
          const opacity = isActive ? 1 : 0.4 - adjustedDist * 0.08
          const offset = (i - activeIndex) * 80
          let adjustedOffset = offset
          if (offset > (tools.length / 2) * 80)
            adjustedOffset = offset - tools.length * 80
          if (offset < -(tools.length / 2) * 80)
            adjustedOffset = offset + tools.length * 80

          return (
            <motion.button
              key={tool.name}
              className="absolute flex flex-col items-center justify-center gap-2"
              animate={{
                x: adjustedOffset,
                scale,
                opacity: Math.max(opacity, 0.15),
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => setActiveIndex(i)}
              aria-label={`Select ${tool.name}`}
            >
              <div
                className="flex items-center justify-center w-16 h-16 rounded-lg text-lg font-bold transition-all duration-300"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${tool.color}33 0%, ${tool.color}11 100%)`
                    : "rgba(40, 38, 60, 0.5)",
                  border: `1px solid ${isActive ? tool.color + "66" : "rgba(140, 145, 247, 0.1)"}`,
                  color: isActive ? tool.color : "rgba(228, 228, 228, 0.4)",
                  boxShadow: isActive ? `0 0 20px ${tool.color}22` : "none",
                }}
              >
                {tool.abbr}
              </div>
              <span
                className="text-[11px] font-medium transition-all duration-300"
                style={{
                  color: isActive
                    ? "#E4E4E4"
                    : "rgba(228, 228, 228, 0.3)",
                }}
              >
                {tool.name}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export function AboutTools() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState<"design" | "development">("design")
  const [isPaused, setIsPaused] = useState(false)

  const tools = activeTab === "design" ? designTools : devTools

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
            Skills & Expertise
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

        {/* Tablet mockup */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {/* Tablet body */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(40, 38, 60, 1) 0%, rgba(30, 28, 50, 1) 100%)",
              border: "1px solid rgba(140, 145, 247, 0.15)",
              padding: "16px",
            }}
          >
            {/* Camera notch */}
            <div className="flex justify-center mb-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "rgba(140, 145, 247, 0.2)" }}
              />
            </div>

            {/* Screen */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ToolCarousel
                  tools={tools}
                  isPaused={isPaused}
                  setIsPaused={setIsPaused}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {(["design", "development"] as const).map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative px-4 py-2 text-sm font-medium capitalize transition-colors duration-300 cursor-pointer"
                  style={{
                    color: isActive ? "#E4E4E4" : "rgba(228, 228, 228, 0.35)",
                  }}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="tools-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{
                        background: "#8C91F7",
                        boxShadow: "0 0 8px rgba(140, 145, 247, 0.5)",
                      }}
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
