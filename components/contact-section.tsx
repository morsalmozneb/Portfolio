"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { SparkleButton } from "@/components/sparkle-button"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="relative py-16 lg:py-28" ref={ref}>
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2">
            Connect
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E4E4E4]">
            {"Let's "}
            <span
              className="text-[#8C91F7]"
              style={{ textShadow: "0 0 20px rgba(140, 145, 247, 0.3)" }}
            >
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
