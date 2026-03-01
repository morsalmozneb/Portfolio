"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollParallaxProps {
  children: React.ReactNode
  /** How far the content shifts vertically (px). Positive = start low, scrolls up. */
  yOffset?: number
  /** Extra horizontal shift (px). */
  xOffset?: number
  /** Start/end opacity. Defaults to full visible throughout. */
  opacityRange?: [number, number]
  /** Scale range. Defaults to no scale change. */
  scaleRange?: [number, number]
  /** Scroll progress range to map from. Defaults to [0, 1]. */
  scrollRange?: [number, number]
  className?: string
}

export function ScrollParallax({
  children,
  yOffset = 60,
  xOffset = 0,
  opacityRange = [0.6, 1],
  scaleRange = [1, 1],
  scrollRange = [0, 0.6],
  className = "",
}: ScrollParallaxProps) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    // "start end" = when top of element hits bottom of viewport
    // "end start" = when bottom of element hits top of viewport
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, scrollRange, [yOffset, 0])
  const x = useTransform(scrollYProgress, scrollRange, [xOffset, 0])
  const opacity = useTransform(scrollYProgress, scrollRange, opacityRange)
  const scale = useTransform(scrollYProgress, scrollRange, scaleRange)

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y, x, opacity, scale }}>
        {children}
      </motion.div>
    </div>
  )
}
