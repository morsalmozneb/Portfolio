"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { SparkleButton } from "@/components/sparkle-button"

/* ── Text scramble hook ───────────────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&"

function useScrambleText(target: string, trigger: boolean, delay = 0) {
  const [display, setDisplay] = useState(target)
  useEffect(() => {
    if (!trigger) return
    let frame = 0
    const totalFrames = 18
    const timeout = setTimeout(() => {
      const id = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        setDisplay(
          target
            .split("")
            .map((char, i) => {
              if (char === " ") return " "
              if (i / target.length < progress) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join("")
        )
        if (frame >= totalFrames) {
          clearInterval(id)
          setDisplay(target)
        }
      }, 40)
    }, delay)
    return () => clearTimeout(timeout)
  }, [trigger, target, delay])
  return display
}

/* ── Circuit corner ───────────────────────────────────────────────── */
function CircuitCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const isTop  = position.startsWith("t")
  const isLeft = position.endsWith("l")
  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{
        top:    isTop  ? -2 : "auto",
        bottom: !isTop ? -2 : "auto",
        left:   isLeft  ? -2 : "auto",
        right:  !isLeft ? -2 : "auto",
        width: 28, height: 28,
        borderTop:    isTop  ? "2px solid #8C91F7" : "none",
        borderBottom: !isTop ? "2px solid #8C91F7" : "none",
        borderLeft:   isLeft  ? "2px solid #8C91F7" : "none",
        borderRight:  !isLeft ? "2px solid #8C91F7" : "none",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
    />
  )
}

/* ── Main component ───────────────────────────────────────────────── */
export function AboutMeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [scanDone, setScanDone]       = useState(false)

  const titleScramble   = useScrambleText("About", isInView, 100)

  useEffect(() => {
    if (!isInView) return
    const t1 = setTimeout(() => setScanDone(true), 1800)
    return () => clearTimeout(t1)
  }, [isInView])

  return (
    <section className="relative py-10 lg:py-16" ref={ref}>
      <div className="max-w-[1080px] xl:max-w-[1280px] 2xl:max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16">

        {/* ── Header ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2 font-mono">
            Get To Know Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E4E4E4] font-mono">
            {titleScramble}{" "}
            <span className="text-[#8C91F7]" style={{ textShadow: "0 0 20px rgba(140,145,247,0.3)" }}>
              Me
            </span>
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <motion.div
          className="flex flex-col lg:flex-row gap-10 lg:gap-16 lg:items-stretch"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {/* ── Left: photo with scan effect ── */}
          <div className="w-full lg:w-[45%] flex-shrink-0">
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                border: "1px solid rgba(140,145,247,0.15)",
                boxShadow: "0 0 40px rgba(140,145,247,0.08), 0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              {isInView && (
                <>
                  <CircuitCorner position="tl" />
                  <CircuitCorner position="tr" />
                  <CircuitCorner position="bl" />
                  <CircuitCorner position="br" />
                </>
              )}

              <div className="relative aspect-[4/3] bg-[#1a1830]">
                <Image
                  src="/images/About_Pic.jpeg"
                  alt="Morsal"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 28%" }}
                  sizes="(max-width: 768px) 100vw, 45vw"
                />

                {/* Bottom gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(180deg, transparent 50%, rgba(10,9,24,0.55) 100%)" }}
                />

                {/* Scan line */}
                {isInView && !scanDone && (
                  <motion.div
                    className="absolute left-0 right-0 pointer-events-none z-10"
                    style={{
                      height: 3,
                      background: "linear-gradient(90deg, transparent, #8C91F7, #8C91F7, transparent)",
                      boxShadow: "0 0 18px 4px rgba(140,145,247,0.6)",
                    }}
                    initial={{ top: "0%", opacity: 0 }}
                    animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.6, ease: "linear", delay: 0.3 }}
                  />
                )}

                {/* Scan tint */}
                {isInView && !scanDone && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{ background: "rgba(140,145,247,0.04)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.6, delay: 0.3 }}
                  />
                )}

              </div>
            </div>
          </div>

          {/* ── Right: text + CTA ── */}
          <div className="flex-1 min-w-0 flex flex-col justify-between gap-4 lg:gap-0">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-[#E4E4E4]"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Hi, I&apos;m Morsal!
            </motion.h3>

            <motion.p
              className="text-[#E4E4E4]/60 leading-relaxed text-sm md:text-base"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              UX/UI Designer with a marketing brain and a slight obsession with
              getting the details right. IT bachelor&apos;s degree, 6+ years in
              telecom marketing, and a passion for design that eventually took
              over. Now I build brands and digital experiences that actually work.
            </motion.p>

            {/* Accent line — draws itself in */}
            <motion.div
              className="h-[1px]"
              style={{ background: "linear-gradient(90deg, #8C91F7, transparent)" }}
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: 64, opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            />

            {/* Data tags */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {["UX/UI", "Brand Strategy", "6+ yrs", "IT Graduate"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono tracking-widest px-2 py-1 rounded"
                  style={{
                    background: "rgba(140,145,247,0.07)",
                    border: "1px solid rgba(140,145,247,0.2)",
                    color: "rgba(140,145,247,0.7)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.95, duration: 0.5 }}
            >
              <SparkleButton href="/about">Learn More About Me</SparkleButton>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
