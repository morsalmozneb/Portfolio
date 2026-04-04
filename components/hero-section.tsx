"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { SparkleButton } from "@/components/sparkle-button"
import { HalftonePortrait } from "@/components/halftone-portrait"

const bodyLines = [
  "I build things people are proud to share,",
  "somewhere between brand strategy and pixel-perfect design,",
  "with a lot of heart in between.",
  "I speak fluent Figma, think in systems,",
  "and get genuinely excited about the details most people skip.",
  "Every project is a chance to make something",
  "that looks as good as it works.",
]

const heroEase = [0.16, 1, 0.3, 1] as const

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
}

const riseIn = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: heroEase },
  },
}

function TypewriterLines({
  lines,
  startDelay = 0,
}: {
  lines: string[]
  startDelay?: number
}) {
  const [started, setStarted] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  useEffect(() => {
    if (!started || done) return
    if (lineIndex >= lines.length) {
      setDone(true)
      return
    }
    const line = lines[lineIndex]
    if (charIndex < line.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 8)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setLineIndex((l) => l + 1)
      setCharIndex(0)
    }, 25)
    return () => clearTimeout(t)
  }, [started, done, lineIndex, charIndex, lines])

  return (
    <div className="space-y-0.5">
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typewriter-cursor {
          display: inline-block;
          width: 2px;
          height: 0.85em;
          background: #8C91F7;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: cursor-blink 0.9s step-end infinite;
        }
      `}</style>

      {lines.map((line, i) => {
        if (i < lineIndex) {
          return (
            <p key={i} className="text-[#E4E4E4]/65 text-base md:text-lg leading-relaxed">
              {line}
              {done && i === lines.length - 1 && <span className="typewriter-cursor" />}
            </p>
          )
        }
        if (i === lineIndex && started && !done) {
          return (
            <p key={i} className="text-[#E4E4E4]/65 text-base md:text-lg leading-relaxed">
              {line.slice(0, charIndex)}
              <span className="typewriter-cursor" />
            </p>
          )
        }
        return null
      })}
    </div>
  )
}

export function HeroSection({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <section id="home" className="relative min-h-screen flex items-start overflow-hidden">
      {/* Ambient motion layers for depth */}
      <motion.div
        className="pointer-events-none absolute -top-24 left-[8%] h-64 w-64 rounded-full hidden md:block"
        style={{
          background: "radial-gradient(circle, rgba(140,145,247,0.18) 0%, rgba(140,145,247,0) 70%)",
          filter: "blur(18px)",
        }}
        animate={{ y: [0, -14, 0], scale: [1, 1.06, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[-120px] right-[-40px] h-72 w-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(120,90,210,0.16) 0%, rgba(120,90,210,0) 70%)",
          filter: "blur(22px)",
        }}
        animate={{ y: [0, 18, 0], scale: [1, 1.08, 1], opacity: [0.24, 0.4, 0.24] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="w-full max-w-[1080px] mx-auto px-6 lg:px-12 pt-20 md:pt-14 lg:pt-12 pb-16 lg:pb-20">
        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* ── Text (left column) ── */}
          <div className="flex-1 space-y-6 w-full">
            {/* Availability badge */}
            <motion.div
              variants={riseIn}
              className="inline-flex items-center gap-2 px-4 py-1.5"
              style={{
                borderRadius: "10px",
                background: "rgba(74, 222, 128, 0.07)",
                border: "1px solid rgba(74, 222, 128, 0.2)",
                boxShadow: "0 0 24px rgba(74, 222, 128, 0.08)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#4ADE80",
                  boxShadow: "0 0 8px rgba(74, 222, 128, 0.6)",
                  animation: "availability-pulse 2s ease-in-out infinite",
                }}
              />
              <span className="text-xs font-medium text-[#4ADE80]/80 tracking-wide">
                Available for new projects
              </span>
            </motion.div>

            <motion.h1 className="page-heading whitespace-nowrap" variants={riseIn}>
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, x: -26 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.55, ease: heroEase }}
              >
                {"Hi, I'm"}
              </motion.span>
              {" "}
              <motion.span
                className="inline-block text-[#8C91F7]"
                style={{ textShadow: "0 0 20px rgba(140, 145, 247, 0.4)" }}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.47, duration: 0.62, ease: heroEase }}
              >
                Morsal
              </motion.span>
            </motion.h1>

            <TypewriterLines lines={bodyLines} startDelay={1200} />

            <motion.div
              className="flex flex-col sm:flex-row sm:flex-wrap gap-4 pt-4 w-full sm:w-auto"
              variants={riseIn}
            >
              <SparkleButton href="/projects" className="w-full sm:w-auto justify-center">View Projects</SparkleButton>
              <SparkleButton href="mailto:morsalehmozneb@gmail.com" external className="w-full sm:w-auto justify-center">Email Me</SparkleButton>
            </motion.div>
          </div>

          {/* ── Halftone Portrait (right column) ── */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center w-full max-w-[260px] sm:max-w-[340px] lg:max-w-none mx-auto lg:mx-0 overflow-hidden"
            initial={{ opacity: 0, x: 60, scale: 0.88, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.42, duration: 0.95, ease: heroEase }}
          >
            <HalftonePortrait />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
