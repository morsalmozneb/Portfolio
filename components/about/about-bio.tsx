"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const bioLines = [
  "Hi, I'm Morsal!!!",
  "",
  "UX/UI Designer with a marketing brain and a slight obsession with getting the details right. IT bachelor's degree, 6+ years in telecom marketing, and a passion for design that eventually took over. Now I build brands and digital experiences that actually work.",
  "",
  "I care about clarity. Whether it's a landing page, a mobile app, or a campaign rollout, I focus on making things intuitive, accessible, and visually engaging. I lead with curiosity, collaborate with empathy, and never lose sight of the end user.",
  "",
  "My toolkit spans Figma, Adobe Creative Suite, Framer, and front-end basics like HTML, CSS, and JavaScript. I'm just as comfortable running a design sprint as I am fine-tuning spacing in a prototype.",
  "",
  "Outside of work, I'm usually hanging out with my cat Bella, who keeps me grounded.",
]

export function AboutBio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-16 lg:py-28" ref={ref}>
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          {bioLines.map((line, i) => {
            if (line === "") {
              return <div key={i} className="h-4" />
            }

            return (
              <motion.p
                key={i}
                className="text-[#E4E4E4]/60 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                {line}
              </motion.p>
            )
          })}
        </div>
      </div>
    </section>
  )
}
