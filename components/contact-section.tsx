"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { SparkleButton } from "@/components/sparkle-button"

/* — Typewriter hook ————————————————————————————————————————————————— */
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

/* — Main component ————————————————————————————————————————————————— */
export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const lines = [
    "I'd love to hear from you! Whether you have a project in mind, want to",
    "collaborate, or just want to say hi, let's connect.",
  ]

  return (
    <section id="contact" className="relative py-10 lg:py-16 overflow-hidden" ref={ref}>

      <div className="max-w-[1080px] xl:max-w-[1280px] 2xl:max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2 font-mono">
            Connect
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E4E4E4] font-mono">
            {"Let's "}
            <span
              className="text-[#8C91F7]"
              style={{ textShadow: "0 0 20px rgba(140,145,247,0.3)" }}
            >
              Create
            </span>
            {" Together"}
          </h2>
        </motion.div>

        <div className="mt-10">
          <div className="space-y-0.5 mb-8">
            {lines.map((line, idx) => (
              <motion.p
                key={idx}
                className="text-[#E4E4E4]/60 text-sm md:text-base leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + idx * 0.12, duration: 0.5 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

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
