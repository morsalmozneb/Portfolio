"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  // Slower spring for the trailing pulse ring
  const trailX = useSpring(cursorX, { damping: 30, stiffness: 180, mass: 0.8 })
  const trailY = useSpring(cursorY, { damping: 30, stiffness: 180, mass: 0.8 })

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    },
    [cursorX, cursorY, isVisible]
  )

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches)
  }, [])

  useEffect(() => {
    if (isTouch) return

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseleave", () => setIsVisible(false))
    window.addEventListener("mouseenter", () => setIsVisible(true))

    const checkPointer = () => {
      const el = document.elementFromPoint(cursorX.get(), cursorY.get())
      if (el) {
        const computed = window.getComputedStyle(el)
        const isClickable =
          el.tagName === "BUTTON" ||
          el.tagName === "A" ||
          el.closest("button") !== null ||
          el.closest("a") !== null ||
          computed.cursor === "pointer" ||
          el.getAttribute("role") === "button"
        setIsPointer(isClickable)
      }
    }

    const interval = setInterval(checkPointer, 100)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      clearInterval(interval)
    }
  }, [moveCursor, cursorX, cursorY, isTouch])

  if (isTouch) return null

  return (
    <>
      {/* Pulse ring — expands and fades continuously */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(140, 145, 247, 0.5)",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isPointer ? [22, 52] : [14, 42],
          height: isPointer ? [22, 52] : [14, 42],
          opacity: isVisible ? [0.55, 0] : [0, 0],
        }}
        transition={{
          duration: isPointer ? 0.9 : 1.4,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Second pulse ring — offset phase for layered effect */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(140, 145, 247, 0.25)",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isPointer ? [22, 68] : [14, 56],
          height: isPointer ? [22, 68] : [14, 56],
          opacity: isVisible ? [0.3, 0] : [0, 0],
        }}
        transition={{
          duration: isPointer ? 0.9 : 1.4,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.35,
        }}
      />

      {/* Outer soft glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 50 : 40,
          height: isPointer ? 50 : 40,
          background: "radial-gradient(circle, rgba(140, 145, 247, 0.15) 0%, transparent 70%)",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.3s, height 0.3s, opacity 0.3s",
        }}
      />

      {/* Inner dot — pulses subtly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(200, 203, 255, 0.9) 0%, rgba(140, 145, 247, 0.6) 60%, transparent 100%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
        animate={{
          width: isPointer ? [18, 20, 18] : [10, 13, 10],
          height: isPointer ? [18, 20, 18] : [10, 13, 10],
          boxShadow: isPointer
            ? [
                "0 0 12px rgba(140,145,247,0.5), 0 0 24px rgba(140,145,247,0.25)",
                "0 0 20px rgba(140,145,247,0.8), 0 0 40px rgba(140,145,247,0.4)",
                "0 0 12px rgba(140,145,247,0.5), 0 0 24px rgba(140,145,247,0.25)",
              ]
            : [
                "0 0 8px rgba(140,145,247,0.35), 0 0 18px rgba(140,145,247,0.15)",
                "0 0 14px rgba(140,145,247,0.6), 0 0 28px rgba(140,145,247,0.25)",
                "0 0 8px rgba(140,145,247,0.35), 0 0 18px rgba(140,145,247,0.15)",
              ],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  )
}
