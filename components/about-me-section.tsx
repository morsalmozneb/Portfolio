"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { SparkleButton } from "@/components/sparkle-button"

export function AboutMeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-28" ref={ref}>
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2">
            Get To Know Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E4E4E4]">
            {"About "}
            <span
              className="text-[#8C91F7]"
              style={{ textShadow: "0 0 20px rgba(140, 145, 247, 0.3)" }}
            >
              Me
            </span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {/* Left: photo */}
          <div className="w-full lg:w-[45%] flex-shrink-0">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(140, 145, 247, 0.15)",
                boxShadow: "0 0 40px rgba(140, 145, 247, 0.08), 0 20px 60px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="relative aspect-[4/3] bg-[#1a1830]">
                <Image
                  src="/images/About_Pic.jpeg"
                  alt="Morsal"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 28%" }}
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
                {/* Subtle gradient overlay at bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, transparent 50%, rgba(10, 9, 24, 0.55) 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right: text + CTA */}
          <div className="flex-1 min-w-0 lg:pt-4 flex flex-col gap-6">
            <h3 className="text-2xl md:text-3xl font-bold text-[#E4E4E4]">
              Hi, I&apos;m Morsal!
            </h3>
            <p className="text-[#E4E4E4]/60 leading-relaxed text-sm md:text-base">
              UX/UI Designer with a marketing brain and a slight obsession with
              getting the details right. IT bachelor&apos;s degree, 6+ years in
              telecom marketing, and a passion for design that eventually took
              over. Now I build brands and digital experiences that actually work.
            </p>

            {/* Accent line */}
            <div
              className="h-[1px] w-16"
              style={{ background: "linear-gradient(90deg, #8C91F7, transparent)" }}
            />

            {/* CTA to About page */}
            <SparkleButton href="/about">Learn More About Me</SparkleButton>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
