"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { SparkleButton } from "@/components/sparkle-button"

/* ── Typewriter hook ──────────────────────────────────────────────── */
function useTypewriter(text: string, trigger: boolean, speed = 55, delay = 0) {
  const [typed, setTyped] = useState("")
  useEffect(() => {
    if (!trigger) return
    let i = 0
    setTyped("")
    const timeout = setTimeout(() => {
      const id = setInterval(() => {
        i++
        setTyped(text.slice(0, i))
        if (i >= text.length) clearInterval(id)
      }, speed)
      return () => clearInterval(id)
    }, delay)
    return () => clearTimeout(timeout)
  }, [trigger, text, speed, delay])
  return typed
}

/* ── Radar ring ───────────────────────────────────────────────────── */
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

/* ── Main component ───────────────────────────────────────────────── */
export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showStatus, setShowStatus] = useState(false)

  const statusText = useTypewriter("TRANSMISSION READY — AWAITING INPUT", isInView, 50, 800)

  useEffect(() => {
    if (!isInView) return
    const t = setTimeout(() => setShowStatus(true), 400)
    return () => clearTimeout(t)
  }, [isInView])

  return (
    <section id="contact" className="relative py-16 lg:py-28 overflow-hidden" ref={ref}>

      {/* Radar rings */}
      {isInView && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <RadarRing delay={0} />
          <RadarRing delay={1.1} />
          <RadarRing delay={2.2} />
        </div>
      )}

      <div className="max-w-[1080px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Typewriter status line */}
        {showStatus && (
          <motion.div
            className="mb-6 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[10px] tracking-[0.2em] text-[#8C91F7]/50 uppercase">
              {statusText}
            </span>
            <motion.span
              className="inline-block w-[5px] h-[10px] ml-0.5 align-middle"
              style={{ background: "#8C91F7" }}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2 font-mono">
            Connect
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E4E4E4]">
            {"Let's "}
            <span className="text-[#8C91F7]" style={{ textShadow: "0 0 20px rgba(140,145,247,0.3)" }}>
              Create
            </span>
            {" Together"}
          </h2>
        </motion.div>

        <div className="mt-10">
          <div className="space-y-0.5 mb-8">
            {[
              "I'd love to hear from you! Whether you have a project in mind, want to",
              "collaborate, or just want to say hi, let's connect.",
            ].map((line, i) => (
              <motion.p
                key={i}
                className="text-[#E4E4E4]/60 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Signal strength bars */}
          <motion.div
            className="flex items-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="flex items-end gap-[3px] h-4">
              {[3, 5, 7, 9, 11].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[3px] rounded-sm"
                  style={{ height: h, background: i < 4 ? "#8C91F7" : "rgba(140,145,247,0.2)" }}
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ delay: 0.9 + i * 0.08, duration: 0.3 }}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono tracking-widest text-[#8C91F7]/50 uppercase">
              Signal Strong
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <SparkleButton href="/contact">Get In Touch</SparkleButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
