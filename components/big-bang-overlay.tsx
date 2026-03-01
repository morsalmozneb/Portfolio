"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function BigBangOverlay({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"glow" | "expand" | "done">("glow")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("expand"), 400)
    const t2 = setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 1500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ backgroundColor: "#0a0918" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Central glow */}
          <motion.div
            className="absolute rounded-full"
            initial={{ width: 4, height: 4, opacity: 1 }}
            animate={
              phase === "expand"
                ? { width: "300vmax", height: "300vmax", opacity: 0 }
                : { width: 20, height: 20, opacity: 1 }
            }
            transition={
              phase === "expand"
                ? { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }
                : { duration: 0.4, ease: "easeOut" }
            }
            style={{
              background: "radial-gradient(circle, rgba(200, 203, 255, 1) 0%, rgba(140, 145, 247, 0.8) 30%, rgba(107, 112, 212, 0.4) 60%, transparent 80%)",
              boxShadow: "0 0 60px rgba(140, 145, 247, 0.8), 0 0 120px rgba(140, 145, 247, 0.4)",
            }}
          />
          {/* Ring burst */}
          {phase === "expand" && (
            <motion.div
              className="absolute rounded-full border-2"
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ width: "200vmax", height: "200vmax", opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              style={{ borderColor: "rgba(140, 145, 247, 0.5)" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
