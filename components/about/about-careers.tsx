"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

const careers = [
  {
    date: "2025 – 2026",
    title: "BCIT",
    company: "New Media Design & Web Development Diploma",
    description:
      "Traded KPIs for pixels. Currently focused on UX/UI design, branding, and marketing, bringing the same strategic approach I used in management into every design decision.",
  },
  {
    date: "2018 – 2025",
    title: "Freedom Mobile",
    company: "Retail Specialist → Keyholder → Team Manager",
    description:
      "Climbed from specialist to team manager, leading a team of five and overseeing daily operations, KPIs, performance reviews, inventory, and team development. This role taught me leadership, accountability, clarity, and how to execute under pressure — experience that now shapes how I collaborate and approach design work.",
  },
  {
    date: "2018",
    title: "Walmart",
    company: "Cashier → Customer Service Manager",
    description:
      "Started as a cashier and was promoted to Customer Service Manager within six months. Learned how to lead under pressure, stay organized, and communicate effectively in a fast-paced retail environment.",
  },
  {
    date: "2013 – 2017",
    title: "Shiraz University, Iran",
    company: "Bachelor's in IT",
    description:
      "Focused on computer science, programming, and systems thinking. Developed a technical mindset and mathematical foundation that helps me tackle complex design challenges with clarity.",
  },
]

function CareerRow({
  career,
  index,
  isActive,
  onToggle,
  isInView,
}: {
  career: (typeof careers)[0]
  index: number
  isActive: boolean
  onToggle: () => void
  isInView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ position: "relative" }}
    >
      {/* Top border — animates width on hover/active */}
      <div style={{ position: "relative", height: 1, overflow: "hidden", background: "rgba(140,145,247,0.08)" }}>
        <motion.div
          animate={{ scaleX: hovered || isActive ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "absolute",
            inset: 0,
            background: isActive
              ? "linear-gradient(90deg, #8C91F7, rgba(140,145,247,0.3))"
              : "linear-gradient(90deg, rgba(140,145,247,0.4), rgba(140,145,247,0.1))",
            transformOrigin: "left",
            boxShadow: isActive ? "0 0 12px rgba(140,145,247,0.5)" : "none",
          }}
        />
      </div>

      {/* Row */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "28px 0 28px 0",
          cursor: "pointer",
          display: "grid",
          gridTemplateColumns: "56px 1fr auto",
          gap: "0 20px",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Hover shimmer sweep — clipped inside its own wrapper so the button isn't cut off */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <motion.div
            animate={{ x: hovered ? "110%" : "-10%" }}
            initial={{ x: "-10%" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "30%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(140,145,247,0.04), transparent)",
            }}
          />
        </div>

        {/* Index number */}
        <motion.span
          animate={{ color: isActive ? "#8C91F7" : hovered ? "rgba(140,145,247,0.5)" : "rgba(140,145,247,0.22)" }}
          transition={{ duration: 0.25 }}
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.18em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Company name + role */}
        <div style={{ overflow: "hidden" }}>
          <motion.h3
            animate={{
              x: hovered && !isActive ? 8 : 0,
              color: isActive ? "#E4E4E4" : hovered ? "rgba(228,228,228,0.85)" : "rgba(228,228,228,0.6)",
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: 5,
            }}
          >
            {career.title}
          </motion.h3>
          <p style={{
            fontSize: 10,
            letterSpacing: "0.24em",
            color: isActive ? "rgba(140,145,247,0.85)" : "rgba(140,145,247,0.4)",
            textTransform: "uppercase",
            transition: "color 0.3s",
          }}>
            {career.company}
          </p>
        </div>

        {/* Right: date + toggle icon */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexShrink: 0 }}>
          <motion.span
            animate={{ opacity: hovered || isActive ? 1 : 0.3 }}
            transition={{ duration: 0.25 }}
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: isActive ? "#8C91F7" : "#E4E4E4",
              letterSpacing: "0.08em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {career.date}
          </motion.span>

          {/* + / × icon */}
          <div style={{ width: 28, height: 28, position: "relative", flexShrink: 0 }}>
            <motion.div
              animate={{
                rotate: isActive ? 45 : 0,
                background: isActive ? "rgba(140,145,247,0.2)" : "rgba(140,145,247,0.05)",
                borderColor: isActive ? "rgba(140,145,247,0.5)" : "rgba(140,145,247,0.15)",
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "5px",
                border: "1px solid rgba(140,145,247,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isActive ? "0 0 16px rgba(140,145,247,0.25)" : "none",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="5" y1="0" x2="5" y2="10" stroke={isActive ? "#8C91F7" : "rgba(228,228,228,0.5)"} strokeWidth="1.5" strokeLinecap="round" />
                <line x1="0" y1="5" x2="10" y2="5" stroke={isActive ? "#8C91F7" : "rgba(228,228,228,0.5)"} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expanded description */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingLeft: 76, paddingBottom: 36, paddingRight: 60 }}>
              {/* Accent line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 36 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  height: 2,
                  background: "linear-gradient(90deg, #8C91F7, rgba(140,145,247,0.2))",
                  borderRadius: 2,
                  marginBottom: 20,
                  boxShadow: "0 0 10px rgba(140,145,247,0.5)",
                }}
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                style={{
                  fontSize: 15,
                  color: "rgba(228,228,228,0.5)",
                  lineHeight: 1.85,
                  maxWidth: 560,
                }}
              >
                {career.description}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function AboutCareers() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative py-16 lg:py-28" ref={ref}>
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="mb-12 lg:mb-20"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}
        >
          <div>
            <p className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2">Careers</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#E4E4E4]">
              {"My "}
              <span className="text-[#8C91F7]" style={{ textShadow: "0 0 20px rgba(140,145,247,0.3)" }}>
                Journey
              </span>
            </h2>
          </div>

          {/* Entry count */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            style={{ fontSize: 12, fontWeight: 600, color: "rgba(140,145,247,0.3)", letterSpacing: "0.15em", marginBottom: 6 }}
          >
            {activeIndex >= 0 ? String(activeIndex + 1).padStart(2, "0") : "--"} / {String(careers.length).padStart(2, "0")}
          </motion.span>
        </motion.div>

        {/* Career list */}
        <div>
          {careers.map((career, i) => (
            <CareerRow
              key={career.date}
              career={career}
              index={i}
              isActive={i === activeIndex}
              onToggle={() => setActiveIndex(i === activeIndex ? -1 : i)}
              isInView={isInView}
            />
          ))}

          {/* Bottom border */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            style={{ height: 1, background: "rgba(140,145,247,0.08)" }}
          />
        </div>
      </div>
    </section>
  )
}
