"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence, useInView, useMotionValue, useAnimationFrame } from "framer-motion"
import Image from "next/image"
import { Briefcase, MapPin, Wrench, Heart, Sparkles, Cat } from "lucide-react"

/* ─── Data ───────────────────────────────────────────────────── */
interface OrbitNode {
  label: string
  text: string
  image: string
  fit?: "cover" | "contain"
  position?: string
  baseAngle: number
  icon: React.ReactNode
  color: string
}

const NODES: OrbitNode[] = [
  { label: "Career", text: "I'm drawn to UX design and design-driven marketing because they blend strategy, psychology, and visuals to shape how people experience products. I enjoy leading when needed, diving into research when it matters, and collaborating with people who care about building something meaningful. Tech companies especially keep me curious. I'm energized by environments where things are constantly evolving.", image: "/images/Morsal_Portrait.png", baseAngle: 0, icon: <Briefcase className="w-4 h-4"/>, color: "#C4A8FF" },
  { label: "Background", text: "I grew up in Shiraz, Iran, in a very supportive family. I studied IT at Shiraz University before moving to Canada in 2017, where I started working in telecom sales. That experience taught me how to understand people, communicate clearly, and think about the business side of decisions, all things I now bring into my design work.", image: "/images/Background_Pic.jpg", baseAngle: 60, icon: <MapPin className="w-4 h-4"/>, color: "#A8D4FF" },
  { label: "Skills", text: "I'm comfortable designing in Figma, Canva, and Adobe Illustrator, especially when it comes to clean layouts and visual storytelling. I'm also someone who communicates clearly and adapts quickly, which makes working with me pretty straightforward and hopefully enjoyable.", image: "/images/Skills_Pic.png", fit: "cover", position: "center 22%", baseAngle: 120, icon: <Wrench className="w-4 h-4"/>, color: "#FFD4A8" },
  { label: "Values", text: "Empathy is at the centre of how I design. I like bold ideas, but they always have to make sense for the user. If something looks great but confuses people, it's not doing its job.", image: "/images/Values_Pic.JPG", baseAngle: 180, icon: <Heart className="w-4 h-4"/>, color: "#FFB8C8" },
  { label: "Mindset", text: "When I face a problem, I break it down step by step, explore options, and always keep a backup plan in mind. I'm naturally curious, which probably explains why I notice design in everything, from a simple clock to an aircraft cockpit. Once you start seeing it, you can't unsee it.", image: "/images/Mindset_Pic.png", baseAngle: 240, icon: <Sparkles className="w-4 h-4"/>, color: "#A8FFD4" },
  { label: "Life", text: "When I'm not designing, I'm usually hanging out with my cat Bella, going for long drives, or geeking out about cars and motorcycles. I'm lucky to have great friends, so most of my free time is spent laughing, eating, or planning the next hangout.", image: "/images/Life_Pic.JPG", fit: "cover", position: "center 24%", baseAngle: 300, icon: <Cat className="w-4 h-4"/>, color: "#FFE4A8" },
]

const DEFAULT_PORTRAIT = "/images/Morsal_Portrait.png"
const PORTRAIT_SIZE = 200
const ORBIT_RADIUS = 175
const ORBIT_SPEED = 0.35
const ORBIT_BOX = ORBIT_RADIUS * 2 + 100

/* ─── Orbit angle hook ───────────────────────────────────────── */
function useOrbitAngle(paused: boolean) {
  const angle = useMotionValue(0)
  const lastTime = useRef<number | null>(null)
  useAnimationFrame((t) => {
    if (paused) { lastTime.current = null; return }
    if (lastTime.current === null) { lastTime.current = t; return }
    const delta = (t - lastTime.current) / 1000
    lastTime.current = t
    angle.set((angle.get() + ORBIT_SPEED * delta * 60) % 360)
  })
  return angle
}

/* ─── Info panel ──────────────────────────────────────────────── */
function InfoPanel({ node, onClose }: { node: OrbitNode; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full"
    >
      <div
        className="relative rounded-2xl px-6 py-6"
        style={{
          background: "linear-gradient(135deg, rgba(140,145,247,0.08) 0%, rgba(20,18,40,0.6) 100%)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${node.color}30`,
          boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${node.color}15`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-md cursor-pointer"
          style={{
            background: "rgba(140,145,247,0.1)",
            border: "1px solid rgba(140,145,247,0.2)",
            color: "rgba(228,228,228,0.5)",
            fontSize: "12px",
          }}
          aria-label="Close"
        >
          &times;
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center justify-center" style={{
            width: 36, height: 36, borderRadius: 8,
            background: `${node.color}1a`,
            border: `1px solid ${node.color}40`,
            color: node.color,
          }}>
            {node.icon}
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.15em]" style={{ color: node.color }}>
            {node.label}
          </span>
        </div>

        <p className="text-[14px] leading-[1.8]" style={{ color: "rgba(228,228,228,0.65)" }}>
          {node.text}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Single orbital node ────────────────────────────────────── */
function OrbitalNode({
  node, index, currentOrbitAngle, isActive,
  onHover, onLeave, onClick, isInView,
}: {
  node: OrbitNode; index: number; currentOrbitAngle: number
  isActive: boolean; onHover: () => void; onLeave: () => void
  onClick: () => void; isInView: boolean
}) {
  const trueAngle = (node.baseAngle + currentOrbitAngle) % 360
  const rad = ((trueAngle - 90) * Math.PI) / 180
  const x = Math.cos(rad) * ORBIT_RADIUS
  const y = Math.sin(rad) * ORBIT_RADIUS

  return (
    <div
      className="absolute"
      style={{
        top: `calc(50% + ${y}px)`,
        left: `calc(50% + ${x}px)`,
        transform: "translate(-50%, -50%)",
        zIndex: 20,
        opacity: isInView ? 1 : 0,
        transition: `opacity 0.5s ${0.4 + index * 0.08}s`,
      }}
    >
      {/* Glow aura */}
      <div className="absolute pointer-events-none transition-all duration-500" style={{
        width: 70, height: 70, top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        borderRadius: 14,
        background: `radial-gradient(circle, ${node.color}${isActive ? "2e" : "14"} 0%, transparent 70%)`,
        filter: `blur(${isActive ? 16 : 8}px)`,
      }}/>

      <button onMouseEnter={onHover} onMouseLeave={onLeave} onClick={onClick}
        className="relative flex flex-col items-center outline-none cursor-pointer">
        <div className="relative flex items-center justify-center transition-all duration-300" style={{
          width: 42, height: 42,
          borderRadius: 10,
          background: isActive
            ? `linear-gradient(135deg, ${node.color}35, ${node.color}12)`
            : "rgba(140,145,247,0.04)",
          border: `1px solid ${node.color}${isActive ? "70" : "25"}`,
          boxShadow: isActive
            ? `0 0 24px ${node.color}40, 0 0 48px ${node.color}18`
            : `0 0 8px ${node.color}10`,
        }}>
          <span style={{ color: isActive ? node.color : `${node.color}99` }}>
            {node.icon}
          </span>
        </div>

        <span className="mt-1.5 text-[8px] tracking-[0.2em] uppercase font-bold whitespace-nowrap transition-all duration-300"
          style={{ color: isActive ? node.color : "rgba(228,228,228,0.38)", textShadow: isActive ? `0 0 12px ${node.color}80` : "none" }}>
          {node.label}
        </span>
      </button>
    </div>
  )
}

/* ─── Hero ────────────────────────────────────────────────────── */
export function AboutHero() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const paused = hoveredIndex !== null || activeIndex !== null
  const orbitAngle = useOrbitAngle(paused || !isInView)
  const [liveAngle, setLiveAngle] = useState(0)

  useEffect(() => orbitAngle.on("change", (v) => setLiveAngle(v)), [orbitAngle])
  const handleClick = useCallback((i: number) => setActiveIndex((p) => p === i ? null : i), [])

  const activeNode = activeIndex !== null ? NODES[activeIndex] : null
  const portraitSrc = activeNode ? activeNode.image : DEFAULT_PORTRAIT
  const portraitFit = activeNode?.fit ?? "cover"
  const portraitPosition = activeNode?.position ?? "center"
  const isExpanded = activeIndex !== null

  return (
    <>
      <style>{`
        @keyframes float-portrait {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-6px); }
        }
        @keyframes slow-spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes slow-spin-rev {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(-360deg); }
        }
        @keyframes twinkle { 0%,100% { opacity: 0.15; } 50% { opacity: 0.5; } }
      `}</style>

      <section ref={ref} className="relative pt-16 md:pt-28 pb-6 overflow-visible">
        <div className="w-full max-w-[1080px] mx-auto px-6 lg:px-12">

          {/* Header text */}
          <motion.p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2 font-mono"
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            Hello, Nice To Meet You
          </motion.p>
          <motion.h1 className="page-heading mb-1"
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            Call me{" "}
            <span className="text-[#8C91F7]" style={{ textShadow: "0 0 30px rgba(140,145,247,0.45)" }}>Morsal</span>
          </motion.h1>
          <motion.p className="text-sm md:text-base text-[#E4E4E4]/45 mb-1 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            I lead teams. I solve problems. I bring ideas to life.
          </motion.p>
          <motion.p className="text-[9px] tracking-[0.35em] uppercase text-[#8C91F7]/35 mb-0"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}>
            Hover to pause orbit · Click to explore
          </motion.p>

          {/* ── Main content area ── */}
          <div className="relative mt-2" style={{ minHeight: ORBIT_BOX }}>

            {/* Orbit system — centered by default, slides left when expanded */}
            <motion.div
              className="absolute top-0"
              style={{ width: ORBIT_BOX, height: ORBIT_BOX, maxWidth: "100%" }}
              animate={{
                left: isExpanded ? "0%" : "50%",
                x: isExpanded ? "0%" : "-50%",
              }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="relative w-full h-full" style={{ isolation: "isolate" }}>

                {/* Orbit track */}
                <div className="absolute rounded-full pointer-events-none" style={{
                  width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2,
                  top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  border: "1.5px solid rgba(140,145,247,0.18)",
                  boxShadow: "0 0 30px rgba(140,145,247,0.05)",
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.9s 0.3s",
                }}/>

                {/* Outer dashed ring */}
                <div className="absolute rounded-full pointer-events-none" style={{
                  width: ORBIT_RADIUS * 2 + 40, height: ORBIT_RADIUS * 2 + 40,
                  top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  border: "1px dashed rgba(140,145,247,0.07)",
                  animation: "slow-spin 120s linear infinite",
                }}/>

                {/* Inner dashed ring */}
                <div className="absolute rounded-full pointer-events-none" style={{
                  width: ORBIT_RADIUS * 2 - 30, height: ORBIT_RADIUS * 2 - 30,
                  top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  border: "1px dashed rgba(140,145,247,0.05)",
                  animation: "slow-spin-rev 90s linear infinite",
                }}/>

                {/* Portrait */}
                <div
                  className="absolute overflow-hidden"
                  style={{
                    width: PORTRAIT_SIZE,
                    height: PORTRAIT_SIZE,
                    top: "50%",
                    left: "50%",
                    marginTop: -(PORTRAIT_SIZE / 2),
                    marginLeft: -(PORTRAIT_SIZE / 2),
                    borderRadius: 24,
                    border: activeNode
                      ? `1.5px solid ${activeNode.color}50`
                      : "1.5px solid rgba(140,145,247,0.3)",
                    boxShadow: activeNode
                      ? `0 0 50px ${activeNode.color}20, 0 24px 70px rgba(0,0,0,0.55)`
                      : "0 0 60px rgba(140,145,247,0.13), 0 24px 70px rgba(0,0,0,0.55)",
                    animation: "float-portrait 7s ease-in-out infinite",
                    zIndex: 1,
                    opacity: isInView ? 1 : 0,
                    transition: "opacity 0.8s 0.5s, border-color 0.4s, box-shadow 0.4s",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={portraitSrc}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={portraitSrc}
                        alt="Morsal portrait"
                        fill
                        sizes="200px"
                        priority
                        style={{ objectFit: portraitFit, objectPosition: portraitPosition }}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: "linear-gradient(135deg, rgba(140,145,247,0.07) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)"
                  }}/>
                </div>

                {/* Orbital nodes */}
                {NODES.map((node, i) => (
                  <OrbitalNode key={node.label} node={node} index={i}
                    currentOrbitAngle={liveAngle} isActive={activeIndex === i}
                    onHover={() => setHoveredIndex(i)} onLeave={() => setHoveredIndex(null)}
                    onClick={() => handleClick(i)} isInView={isInView} />
                ))}

                {/* Twinkle stars */}
                {[28, 75, 133, 192, 248, 305, 355].map((a, i) => {
                  const r = ORBIT_RADIUS + 18 + (i % 4) * 8
                  const rad = ((a - 90) * Math.PI) / 180
                  return (
                    <div key={`star-${i}`} className="absolute rounded-full pointer-events-none" style={{
                      width: i % 3 === 0 ? 2.5 : 1.5, height: i % 3 === 0 ? 2.5 : 1.5,
                      top: `calc(50% + ${Math.sin(rad) * r}px)`,
                      left: `calc(50% + ${Math.cos(rad) * r}px)`,
                      transform: "translate(-50%,-50%)",
                      background: "rgba(190,195,255,0.6)",
                      animation: `twinkle ${2.5 + i * 0.4}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}/>
                  )
                })}
              </div>
            </motion.div>

            {/* Info panel — right side, only visible when expanded */}
            <AnimatePresence>
              {isExpanded && activeNode && (
                <motion.div
                  className="absolute top-0 right-0 flex items-center"
                  style={{ width: `calc(100% - ${ORBIT_BOX + 40}px)`, height: ORBIT_BOX }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                >
                  <InfoPanel key={activeNode.label} node={activeNode} onClose={() => setActiveIndex(null)} />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Click-away backdrop */}
        {activeIndex !== null && (
          <div className="fixed inset-0" style={{ zIndex: -1 }} onClick={() => setActiveIndex(null)} aria-hidden />
        )}
      </section>
    </>
  )
}
