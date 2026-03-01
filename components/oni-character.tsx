"use client"

import { useRef, useState, useEffect, useCallback } from "react"

/* ─── Helper: clamp pupil position inside eye circle ─── */
function clampPupil(
  dx: number,
  dy: number,
  maxRadius: number
): { x: number; y: number } {
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist <= maxRadius) return { x: dx, y: dy }
  return { x: (dx / dist) * maxRadius, y: (dy / dist) * maxRadius }
}

/* ─── Eye component ─── */
function Eye({
  cx,
  cy,
  eyeR = 18,
  pupilR = 8,
  pupilOffset,
  isHappy,
}: {
  cx: number
  cy: number
  eyeR?: number
  pupilR?: number
  pupilOffset: { x: number; y: number }
  isHappy: boolean
}) {
  const { x: px, y: py } = clampPupil(pupilOffset.x, pupilOffset.y, eyeR - pupilR - 2)

  return (
    <g>
      {/* Eye white */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={eyeR}
        ry={eyeR * 0.9}
        fill="#F5EDD8"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
      />

      {/* Happy: squint line (eyelid) */}
      {isHappy && (
        <path
          d={`M ${cx - eyeR} ${cy} Q ${cx} ${cy - eyeR * 1.1} ${cx + eyeR} ${cy}`}
          fill="#2A1A0E"
          clipPath={`circle(${eyeR}px at ${cx}px ${cy}px)`}
        />
      )}

      {/* Pupil */}
      {!isHappy && (
        <circle
          cx={cx + px}
          cy={cy + py}
          r={pupilR}
          fill="#1A0E05"
          style={{ transition: "cx 0.05s ease-out, cy 0.05s ease-out" }}
        />
      )}

      {/* Pupil shine */}
      {!isHappy && (
        <circle
          cx={cx + px + pupilR * 0.28}
          cy={cy + py - pupilR * 0.3}
          r={pupilR * 0.28}
          fill="rgba(255,255,255,0.7)"
        />
      )}
    </g>
  )
}

/* ─── Main Character ─── */
export function OniCharacter() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const [headTilt, setHeadTilt] = useState(0)
  const [isHappy, setIsHappy] = useState(false)
  const [mouthScale, setMouthScale] = useState(1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()

    // Character center in screen coords (approx center of face)
    const faceCx = rect.left + rect.width * 0.5
    const faceCy = rect.top + rect.height * 0.44

    const dx = e.clientX - faceCx
    const dy = e.clientY - faceCy
    const dist = Math.sqrt(dx * dx + dy * dy)

    // Pupil offset — capped at 7px movement, feels natural
    const strength = Math.min(dist / 180, 1)
    setPupilOffset({
      x: (dx / Math.max(dist, 1)) * strength * 7,
      y: (dy / Math.max(dist, 1)) * strength * 7,
    })

    // Subtle head tilt based on cursor X relative to face center
    const normX = dx / (rect.width * 0.8)
    setHeadTilt(Math.max(-6, Math.min(6, normX * 6)))
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const handleMouthClick = useCallback(() => {
    setIsHappy((h) => !h)
    // Bounce animation
    setMouthScale(1.3)
    setTimeout(() => setMouthScale(0.85), 120)
    setTimeout(() => setMouthScale(1.08), 240)
    setTimeout(() => setMouthScale(1), 360)
  }, [])

  if (!mounted) return (
    <div style={{ width: 320, height: 380 }} />
  )

  /* ── SVG dimensions & key coordinates ── */
  const W = 320
  const H = 380

  // Body
  const bodyRx = 88
  const bodyRy = 55
  const bodyCy = H * 0.78

  // Head
  const headCx = W / 2
  const headCy = H * 0.44
  const headRx = 62
  const headRy = 68

  // Afro
  const afroCx = headCx
  const afroCy = headCy - 28
  const afroR = 98

  // Eyes
  const eyeLx = headCx - 20
  const eyeRx = headCx + 22
  const eyeCy = headCy - 4

  // Horns
  const hornLx = headCx - 52
  const hornRx = headCx + 52
  const hornBaseCy = headCy - afroR * 0.38

  return (
    <div
      style={{
        position: "relative",
        width: W,
        height: H,
        cursor: "default",
        userSelect: "none",
      }}
    >
      {/* Ambient glow under character */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 200,
          height: 60,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(140,145,247,0.18) 0%, transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      <svg
        ref={svgRef}
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Afro texture gradient */}
          <radialGradient id="afroGrad" cx="45%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#3A2040" />
            <stop offset="60%" stopColor="#1E0F28" />
            <stop offset="100%" stopColor="#120A18" />
          </radialGradient>

          {/* Body gradient */}
          <radialGradient id="bodyGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#E8403A" />
            <stop offset="70%" stopColor="#C02828" />
            <stop offset="100%" stopColor="#8B1A1A" />
          </radialGradient>

          {/* Head/skin gradient */}
          <radialGradient id="headGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#E8403A" />
            <stop offset="65%" stopColor="#CC2E2E" />
            <stop offset="100%" stopColor="#A02020" />
          </radialGradient>

          {/* Afro bump clip */}
          <clipPath id="afroClip">
            <circle cx={afroCx} cy={afroCy} r={afroR + 4} />
          </clipPath>
        </defs>

        {/* ── Head tilt group ── */}
        <g
          transform={`rotate(${headTilt}, ${headCx}, ${headCy})`}
          style={{ transition: "transform 0.18s ease-out" }}
        >
          {/* ── Body (shoulders) ── */}
          <ellipse
            cx={W / 2}
            cy={bodyCy}
            rx={bodyRx}
            ry={bodyRy}
            fill="url(#bodyGrad)"
          />
          {/* Body neck shadow */}
          <ellipse
            cx={W / 2}
            cy={bodyCy - bodyRy + 10}
            rx={28}
            ry={18}
            fill="rgba(0,0,0,0.18)"
          />

          {/* ── Horns (behind afro) ── */}
          {/* Left horn */}
          <path
            d={`M ${hornLx - 8} ${hornBaseCy + 20}
               Q ${hornLx - 22} ${hornBaseCy - 36} ${hornLx + 4} ${hornBaseCy - 52}
               Q ${hornLx + 16} ${hornBaseCy - 20} ${hornLx + 12} ${hornBaseCy + 14}
               Z`}
            fill="#D4A55A"
            style={{ filter: "drop-shadow(-2px -2px 4px rgba(0,0,0,0.4))" }}
          />
          {/* Right horn */}
          <path
            d={`M ${hornRx + 8} ${hornBaseCy + 20}
               Q ${hornRx + 22} ${hornBaseCy - 36} ${hornRx - 4} ${hornBaseCy - 52}
               Q ${hornRx - 16} ${hornBaseCy - 20} ${hornRx - 12} ${hornBaseCy + 14}
               Z`}
            fill="#C8984E"
            style={{ filter: "drop-shadow(2px -2px 4px rgba(0,0,0,0.4))" }}
          />

          {/* ── Afro (big fluffy circle with bumps) ── */}
          {/* Main afro circle */}
          <circle
            cx={afroCx}
            cy={afroCy}
            r={afroR}
            fill="url(#afroGrad)"
          />

          {/* Afro texture bumps — scalloped edge */}
          {Array.from({ length: 22 }).map((_, i) => {
            const angle = (i / 22) * Math.PI * 2 - Math.PI / 2
            const bumpR = 16 + Math.sin(i * 2.3) * 3
            const bx = afroCx + Math.cos(angle) * (afroR - 4)
            const by = afroCy + Math.sin(angle) * (afroR - 4)
            return (
              <circle
                key={i}
                cx={bx}
                cy={by}
                r={bumpR}
                fill="#1E0F28"
                opacity={0.85}
              />
            )
          })}

          {/* Inner highlight on afro */}
          <ellipse
            cx={afroCx - 18}
            cy={afroCy - 30}
            rx={32}
            ry={22}
            fill="rgba(120,60,160,0.18)"
          />

          {/* ── Face / Head ── */}
          <ellipse
            cx={headCx}
            cy={headCy}
            rx={headRx}
            ry={headRy}
            fill="url(#headGrad)"
          />

          {/* Face shading — subtle shadow on lower half */}
          <ellipse
            cx={headCx}
            cy={headCy + 20}
            rx={headRx - 8}
            ry={headRy * 0.55}
            fill="rgba(0,0,0,0.1)"
          />

          {/* ── Eyes ── */}
          <Eye
            cx={eyeLx}
            cy={eyeCy}
            pupilOffset={pupilOffset}
            isHappy={isHappy}
          />
          <Eye
            cx={eyeRx}
            cy={eyeCy}
            pupilOffset={pupilOffset}
            isHappy={isHappy}
          />

          {/* ── Eyebrows (grumpy default, raised when happy) ── */}
          <g style={{ transition: "transform 0.3s ease" }}>
            {/* Left brow */}
            <path
              d={isHappy
                ? `M ${eyeLx - 16} ${eyeCy - 27} Q ${eyeLx} ${eyeCy - 34} ${eyeLx + 14} ${eyeCy - 28}`
                : `M ${eyeLx - 16} ${eyeCy - 22} Q ${eyeLx} ${eyeCy - 26} ${eyeLx + 14} ${eyeCy - 21}`
              }
              stroke="#1A0A0A"
              strokeWidth={4.5}
              strokeLinecap="round"
              style={{ transition: "d 0.3s ease" }}
            />
            {/* Right brow */}
            <path
              d={isHappy
                ? `M ${eyeRx - 14} ${eyeCy - 28} Q ${eyeRx} ${eyeCy - 34} ${eyeRx + 16} ${eyeCy - 27}`
                : `M ${eyeRx - 14} ${eyeCy - 21} Q ${eyeRx} ${eyeCy - 26} ${eyeRx + 16} ${eyeCy - 22}`
              }
              stroke="#1A0A0A"
              strokeWidth={4.5}
              strokeLinecap="round"
              style={{ transition: "d 0.3s ease" }}
            />
          </g>

          {/* ── Mouth ── */}
          <g
            onClick={handleMouthClick}
            style={{
              cursor: "pointer",
              transform: `scale(${mouthScale})`,
              transformOrigin: `${headCx}px ${headCy + 28}px`,
              transition: "transform 0.12s ease",
            }}
          >
            {isHappy ? (
              /* Big smile */
              <>
                {/* Smile fill */}
                <path
                  d={`M ${headCx - 30} ${headCy + 18}
                     Q ${headCx} ${headCy + 58} ${headCx + 30} ${headCy + 18}
                     Q ${headCx} ${headCy + 42} ${headCx - 30} ${headCy + 18}
                     Z`}
                  fill="#1A0A0A"
                />
                {/* Smile outline */}
                <path
                  d={`M ${headCx - 30} ${headCy + 18} Q ${headCx} ${headCy + 58} ${headCx + 30} ${headCy + 18}`}
                  stroke="#1A0A0A"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Cheek blush */}
                <ellipse cx={headCx - 40} cy={headCy + 22} rx={14} ry={8} fill="rgba(255,120,100,0.35)" />
                <ellipse cx={headCx + 40} cy={headCy + 22} rx={14} ry={8} fill="rgba(255,120,100,0.35)" />
                {/* Smile teeth */}
                <path
                  d={`M ${headCx - 16} ${headCy + 22} L ${headCx - 16} ${headCy + 34} L ${headCx} ${headCy + 34} L ${headCx} ${headCy + 22}`}
                  fill="white"
                  opacity={0.9}
                />
                <path
                  d={`M ${headCx} ${headCy + 22} L ${headCx} ${headCy + 34} L ${headCx + 16} ${headCy + 34} L ${headCx + 16} ${headCy + 22}`}
                  fill="white"
                  opacity={0.9}
                />
              </>
            ) : (
              /* Grumpy frown with fangs */
              <>
                {/* Mouth opening */}
                <path
                  d={`M ${headCx - 24} ${headCy + 22}
                     Q ${headCx} ${headCy + 36} ${headCx + 24} ${headCy + 22}
                     Q ${headCx} ${headCy + 46} ${headCx - 24} ${headCy + 22}
                     Z`}
                  fill="#1A0A0A"
                />
                {/* Left fang */}
                <path
                  d={`M ${headCx - 10} ${headCy + 22} L ${headCx - 6} ${headCy + 33} L ${headCx - 1} ${headCy + 22}`}
                  fill="white"
                />
                {/* Right fang */}
                <path
                  d={`M ${headCx + 1} ${headCy + 22} L ${headCx + 6} ${headCy + 33} L ${headCx + 10} ${headCy + 22}`}
                  fill="white"
                />
              </>
            )}
          </g>

          {/* ── Click hint label (fades after first click) ── */}
          {!isHappy && (
            <g opacity={0.45}>
              <text
                x={headCx}
                y={H - 8}
                textAnchor="middle"
                fill="#E4E4E4"
                fontSize={10}
                fontFamily="system-ui, sans-serif"
                letterSpacing="0.15em"
              >
                CLICK MOUTH
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  )
}
