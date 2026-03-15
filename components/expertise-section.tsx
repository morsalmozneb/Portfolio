"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import dynamic from "next/dynamic"

const LaptopShowcase = dynamic(() => import("@/components/LaptopShowcase"), { ssr: false })

export function ExpertiseSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="what-i-do" ref={ref} className="relative py-10 lg:py-16">
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">

        {/* ── Header (left-aligned) ── */}
        <motion.div
          className="mb-10 lg:mb-16"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2 font-mono">
            Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E4E4E4] font-mono">
            {"What I "}
            <span
              className="text-[#8C91F7]"
              style={{ textShadow: "0 0 20px rgba(140,145,247,0.3)" }}
            >
              Do
            </span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#E4E4E4]/45 max-w-lg leading-relaxed">
            From concept to code, I design interfaces people love to use and
            build them with the tools that get the job done right.
          </p>
        </motion.div>

        {/* ── 3D Laptop (self-contained canvas texture carousel) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <LaptopShowcase />
        </motion.div>
      </div>
    </section>
  )
}
