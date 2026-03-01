"use client"

import { useState, useEffect } from "react"

interface SparkleButtonProps {
  href: string
  children: React.ReactNode
  variant?: "outline" | "filled"
  external?: boolean
  className?: string
}

interface SparkleParticle {
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function generateParticles(): SparkleParticle[] {
  return Array.from({ length: 10 }, () => {
    const edge = Math.floor(rand(0, 4))
    let x: number, y: number
    switch (edge) {
      case 0:
        x = rand(5, 95)
        y = rand(-15, 10)
        break
      case 1:
        x = rand(5, 95)
        y = rand(90, 115)
        break
      case 2:
        x = rand(-15, 10)
        y = rand(5, 95)
        break
      default:
        x = rand(90, 115)
        y = rand(5, 95)
        break
    }
    return {
      x,
      y,
      size: rand(4, 10),
      duration: rand(2, 4),
      delay: rand(0, 3),
    }
  })
}

export function SparkleButton({
  href,
  children,
  variant = "outline",
  external = false,
  className = "",
}: SparkleButtonProps) {
  const isOutline = variant === "outline"
  const [particles, setParticles] = useState<SparkleParticle[]>([])

  useEffect(() => {
    setParticles(generateParticles())
  }, [])

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`sparkle-btn inline-flex items-center justify-center min-w-[160px] h-[46px] px-7 rounded-lg text-sm font-medium text-[#E4E4E4] transition-all duration-300 hover:scale-105 ${className}`}
      style={{
        border: `1px solid rgba(140, 145, 247, ${isOutline ? "0.3" : "0.5"})`,
        background: isOutline ? "transparent" : "rgba(100, 80, 180, 0.35)",
        boxShadow: isOutline ? "none" : "0 0 18px rgba(140, 145, 247, 0.15), inset 0 0 12px rgba(140, 145, 247, 0.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(140, 145, 247, 0.15)"
        e.currentTarget.style.borderColor = "rgba(140, 145, 247, 0.6)"
        e.currentTarget.style.boxShadow = "0 0 20px rgba(140, 145, 247, 0.2)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isOutline
          ? "transparent"
          : "rgba(100, 80, 180, 0.35)"
        e.currentTarget.style.borderColor = `rgba(140, 145, 247, ${isOutline ? "0.3" : "0.5"})`
        e.currentTarget.style.boxShadow = isOutline
          ? "none"
          : "0 0 18px rgba(140, 145, 247, 0.15), inset 0 0 12px rgba(140, 145, 247, 0.08)"
      }}
    >
      {/* Button text */}
      <span className="relative z-10">{children}</span>

      {/* Sparkle particles - tightly positioned around button edges */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="sparkle-particle"
          aria-hidden="true"
          style={{
            "--x": p.x,
            "--y": p.y,
            "--size": `${p.size}px`,
            "--duration": p.duration,
            "--delay": p.delay,
          } as React.CSSProperties}
        >
          <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.5 0L9.08 5.92L15 7.5L9.08 9.08L7.5 15L5.92 9.08L0 7.5L5.92 5.92L7.5 0Z"
              fill="currentColor"
            />
          </svg>
        </span>
      ))}

      {/* Glint sweep */}
      <span className="sparkle-glint" aria-hidden="true" />
    </a>
  )
}
