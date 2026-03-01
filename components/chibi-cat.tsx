"use client"

import { useRef, useState, useEffect, useCallback } from "react"

/* ─── Expression types ─── */
type Expression = "neutral" | "happy" | "surprised"
const CYCLE: Expression[] = ["neutral", "happy", "surprised"]

/* ─── Lerp ─── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function clampPupil(dx: number, dy: number, max: number): [number, number] {
  const d = Math.hypot(dx, dy)
  if (d <= max) return [dx, dy]
  return [(dx / d) * max, (dy / d) * max]
}

/* ════════════════════════════════════════════════════════════════
   ChibiCat — pure SVG interactive character
   • Eyes follow cursor
   • Head tilts with mouse X
   • Idle float animation
   • Click mouth to cycle: neutral → happy → surprised → neutral
════════════════════════════════════════════════════════════════ */
export function ChibiCat() {
  const svgRef       = useRef<SVGSVGElement>(null)
  const rafRef       = useRef<number>(0)
  const t0Ref        = useRef<number | null>(null)

  /* Lerped state (via refs, updated in rAF) */
  const tiltRef      = useRef(0)
  const tiltTRef     = useRef(0)
  const plxRef       = useRef(0), plyRef  = useRef(0)
  const plxTRef      = useRef(0), plyTRef = useRef(0)
  const prxRef       = useRef(0), pryRef  = useRef(0)
  const prxTRef      = useRef(0), pryTRef = useRef(0)
  const bounceRef    = useRef(0)

  /* SVG element refs */
  const tiltGRef     = useRef<SVGGElement>(null)
  const floatGRef    = useRef<SVGGElement>(null)
  const eyeLpRef     = useRef<SVGCircleElement>(null)
  const eyeLs1Ref    = useRef<SVGCircleElement>(null)
  const eyeLs2Ref    = useRef<SVGCircleElement>(null)
  const eyeLirisRef  = useRef<SVGCircleElement>(null)
  const eyeRpRef     = useRef<SVGCircleElement>(null)
  const eyeRs1Ref    = useRef<SVGCircleElement>(null)
  const eyeRs2Ref    = useRef<SVGCircleElement>(null)
  const eyeRirisRef  = useRef<SVGCircleElement>(null)
  const squintLRef   = useRef<SVGPathElement>(null)
  const squintRRef   = useRef<SVGPathElement>(null)
  const mouthNRef    = useRef<SVGGElement>(null)
  const mouthHRef    = useRef<SVGGElement>(null)
  const mouthSRef    = useRef<SVGGElement>(null)
  const blushLRef    = useRef<SVGEllipseElement>(null)
  const blushRRef    = useRef<SVGEllipseElement>(null)
  const whiskersRef  = useRef<SVGGElement>(null)
  const sp1Ref       = useRef<SVGGElement>(null)
  const sp2Ref       = useRef<SVGGElement>(null)
  const sp3Ref       = useRef<SVGGElement>(null)

  const [exprIdx,    setExprIdx]    = useState(0)
  const [hint,       setHint]       = useState("CLICK MOUTH ✦")
  const [mounted,    setMounted]    = useState(false)

  useEffect(() => { setMounted(true) }, [])

  /* ── Mouse move ── */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!svgRef.current) return
    const rect   = svgRef.current.getBoundingClientRect()
    const scaleX = 300 / rect.width
    const scaleY = 340 / rect.height
    const mx = (e.clientX - rect.left) * scaleX
    const my = (e.clientY - rect.top)  * scaleY

    const dLx = mx - 108, dLy = my - 174
    const dRx = mx - 192, dRy = my - 174
    const dLd = Math.hypot(dLx, dLy) || 1
    const dRd = Math.hypot(dRx, dRy) || 1
    const sL  = Math.min(dLd / 160, 1)
    const sR  = Math.min(dRd / 160, 1)

    ;[plxTRef.current, plyTRef.current] = clampPupil((dLx / dLd) * sL * 8, (dLy / dLd) * sL * 8, 8)
    ;[prxTRef.current, pryTRef.current] = clampPupil((dRx / dRd) * sR * 8, (dRy / dRd) * sR * 8, 8)

    const normX = ((e.clientX - rect.left) - rect.width * 0.5) / (rect.width * 0.7)
    tiltTRef.current = Math.max(-7, Math.min(7, normX * 7))

    if (whiskersRef.current) {
      whiskersRef.current.setAttribute("transform", `skewY(${(normX * 4).toFixed(1)})`)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  /* ── Expression apply ── */
  const applyExpression = useCallback((expr: Expression) => {
    const show = (el: SVGElement | null)   => { if (el) el.style.display = "block" }
    const hide = (el: SVGElement | null)   => { if (el) el.style.display = "none" }
    const setR = (el: SVGCircleElement | null, r: string) => { if (el) el.setAttribute("r", r) }

    hide(mouthNRef.current); hide(mouthHRef.current); hide(mouthSRef.current)
    hide(squintLRef.current); hide(squintRRef.current)

    if (expr === "neutral") {
      show(mouthNRef.current)
      blushLRef.current?.setAttribute("fill", "rgba(190,120,200,0.22)")
      blushRRef.current?.setAttribute("fill", "rgba(190,120,200,0.22)")
      show(eyeLpRef.current); show(eyeRpRef.current)
      show(eyeLs1Ref.current); show(eyeRs1Ref.current)
      show(eyeLs2Ref.current); show(eyeRs2Ref.current)
      setR(eyeLpRef.current, "11"); setR(eyeRpRef.current, "11")
      setHint("CLICK MOUTH ✦")
    } else if (expr === "happy") {
      show(mouthHRef.current)
      show(squintLRef.current); show(squintRRef.current)
      blushLRef.current?.setAttribute("fill", "rgba(220,130,200,0.48)")
      blushRRef.current?.setAttribute("fill", "rgba(220,130,200,0.48)")
      hide(eyeLpRef.current); hide(eyeRpRef.current)
      hide(eyeLs1Ref.current); hide(eyeRs1Ref.current)
      hide(eyeLs2Ref.current); hide(eyeRs2Ref.current)
      setHint("CLICK AGAIN ✦")
    } else {
      show(mouthSRef.current)
      blushLRef.current?.setAttribute("fill", "rgba(190,120,200,0.16)")
      blushRRef.current?.setAttribute("fill", "rgba(190,120,200,0.16)")
      show(eyeLpRef.current); show(eyeRpRef.current)
      show(eyeLs1Ref.current); show(eyeRs1Ref.current)
      show(eyeLs2Ref.current); show(eyeRs2Ref.current)
      setR(eyeLpRef.current, "7"); setR(eyeRpRef.current, "7")
      setHint("CLICK AGAIN ✦")
    }
  }, [])

  /* ── Click mouth ── */
  const handleMouthClick = useCallback(() => {
    setExprIdx(prev => {
      const next = (prev + 1) % CYCLE.length
      applyExpression(CYCLE[next])
      bounceRef.current = -20
      return next
    })
  }, [applyExpression])

  /* ── rAF loop ── */
  useEffect(() => {
    if (!mounted) return

    const sparkles = [
      { ref: sp1Ref, period: 2.1, offset: 0,   base: "translate(50,140)"   },
      { ref: sp2Ref, period: 2.7, offset: 0.8,  base: "translate(255,160)"  },
      { ref: sp3Ref, period: 3.3, offset: 1.5,  base: "translate(60,260)"   },
    ]

    const tick = (ts: number) => {
      if (!t0Ref.current) t0Ref.current = ts
      const elapsed = (ts - t0Ref.current) / 1000

      tiltRef.current  = lerp(tiltRef.current,  tiltTRef.current,  0.09)
      plxRef.current   = lerp(plxRef.current,   plxTRef.current,   0.13)
      plyRef.current   = lerp(plyRef.current,   plyTRef.current,   0.13)
      prxRef.current   = lerp(prxRef.current,   prxTRef.current,   0.13)
      pryRef.current   = lerp(pryRef.current,   pryTRef.current,   0.13)
      bounceRef.current = lerp(bounceRef.current, 0, 0.1)

      const floatY = Math.sin(elapsed * 1.75) * 12 + bounceRef.current

      if (floatGRef.current)
        floatGRef.current.setAttribute("transform", `translate(0,${floatY.toFixed(2)})`)

      if (tiltGRef.current)
        tiltGRef.current.setAttribute("transform", `rotate(${tiltRef.current.toFixed(3)},150,165)`)

      /* Pupils L */
      const lx = 108 + plxRef.current, ly = 174 + plyRef.current
      eyeLpRef.current?.setAttribute("cx", lx.toFixed(2))
      eyeLpRef.current?.setAttribute("cy", ly.toFixed(2))
      eyeLs1Ref.current?.setAttribute("cx", (lx+3.8).toFixed(2))
      eyeLs1Ref.current?.setAttribute("cy", (ly-4).toFixed(2))
      eyeLs2Ref.current?.setAttribute("cx", (lx-3.5).toFixed(2))
      eyeLs2Ref.current?.setAttribute("cy", (ly+3.5).toFixed(2))
      eyeLirisRef.current?.setAttribute("cx", lx.toFixed(2))
      eyeLirisRef.current?.setAttribute("cy", ly.toFixed(2))

      /* Pupils R */
      const rx = 192 + prxRef.current, ry = 174 + pryRef.current
      eyeRpRef.current?.setAttribute("cx", rx.toFixed(2))
      eyeRpRef.current?.setAttribute("cy", ry.toFixed(2))
      eyeRs1Ref.current?.setAttribute("cx", (rx+3.8).toFixed(2))
      eyeRs1Ref.current?.setAttribute("cy", (ry-4).toFixed(2))
      eyeRs2Ref.current?.setAttribute("cx", (rx-3.5).toFixed(2))
      eyeRs2Ref.current?.setAttribute("cy", (ry+3.5).toFixed(2))
      eyeRirisRef.current?.setAttribute("cx", rx.toFixed(2))
      eyeRirisRef.current?.setAttribute("cy", ry.toFixed(2))

      /* Sparkles */
      sparkles.forEach(({ ref, period, offset, base }) => {
        if (!ref.current) return
        const s = 0.6 + Math.sin((elapsed + offset) * (Math.PI * 2 / period)) * 0.4
        const o = 0.3 + Math.sin((elapsed + offset) * (Math.PI * 2 / period)) * 0.25
        ref.current.setAttribute("transform", `${base} scale(${s.toFixed(3)})`)
        ref.current.setAttribute("opacity", Math.max(0.05, o).toFixed(3))
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [mounted])

  if (!mounted) return <div style={{ width: 300, height: 340 }} />

  return (
    <div style={{ position: "relative", width: 300, height: 340, userSelect: "none" }}>
      {/* Ground glow */}
      <div style={{
        position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
        width: 180, height: 28,
        background: "radial-gradient(ellipse, rgba(140,145,247,0.22) 0%, transparent 70%)",
        filter: "blur(14px)", borderRadius: "50%", pointerEvents: "none",
      }}/>

      <svg ref={svgRef} width={300} height={340} viewBox="0 0 300 340"
        style={{ overflow: "visible", display: "block" }}>
        <defs>
          <radialGradient id="cc-bodyG" cx="38%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#7B6FD8"/>
            <stop offset="55%"  stopColor="#4A3FA0"/>
            <stop offset="100%" stopColor="#2A2260"/>
          </radialGradient>
          <radialGradient id="cc-headG" cx="38%" cy="32%" r="62%">
            <stop offset="0%"   stopColor="#8C80E8"/>
            <stop offset="50%"  stopColor="#5548B8"/>
            <stop offset="100%" stopColor="#2E2870"/>
          </radialGradient>
          <radialGradient id="cc-bellyG" cx="50%" cy="40%" r="55%">
            <stop offset="0%"  stopColor="#C8C0FF"/>
            <stop offset="100%" stopColor="#9890E0"/>
          </radialGradient>
          <radialGradient id="cc-earG" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#D4A0E8"/>
            <stop offset="100%" stopColor="#A070C8"/>
          </radialGradient>
          <radialGradient id="cc-eyeWG" cx="38%" cy="35%" r="58%">
            <stop offset="0%"  stopColor="#F0EAFF"/>
            <stop offset="100%" stopColor="#D8D0F8"/>
          </radialGradient>
          <radialGradient id="cc-tailG" cx="50%" cy="0%" r="100%">
            <stop offset="0%"  stopColor="#6A5FC8"/>
            <stop offset="100%" stopColor="#3A3490"/>
          </radialGradient>
          <filter id="cc-shadow">
            <feDropShadow dx="0" dy="8" stdDeviation="12"
              floodColor="rgba(30,20,80,0.55)"/>
          </filter>
          <clipPath id="cc-eyeLClip"><ellipse cx="108" cy="174" rx="22" ry="20"/></clipPath>
          <clipPath id="cc-eyeRClip"><ellipse cx="192" cy="174" rx="22" ry="20"/></clipPath>
        </defs>

        <g ref={floatGRef}>
          <g ref={tiltGRef} filter="url(#cc-shadow)">

            {/* ── Tail ── */}
            <path d="M 210 290 Q 270 270 275 230 Q 278 200 255 195 Q 238 192 234 210 Q 230 228 245 235 Q 258 240 252 255 Q 242 272 220 278 Z"
              fill="url(#cc-tailG)" opacity={0.9}/>
            <ellipse cx="255" cy="196" rx="12" ry="10" fill="#9890E0" opacity={0.7}/>

            {/* ── Body ── */}
            <ellipse cx="150" cy="272" rx="82" ry="65" fill="url(#cc-bodyG)"/>
            <ellipse cx="150" cy="278" rx="44" ry="38" fill="url(#cc-bellyG)" opacity={0.85}/>

            {/* ── Paws ── */}
            <ellipse cx="100" cy="320" rx="26" ry="18" fill="#5548B8"/>
            <ellipse cx="100" cy="318" rx="20" ry="13" fill="#7068D0"/>
            {[[-7,5],[0,3],[7,5]].map(([dx,dy],i) => (
              <line key={i} x1={100+dx} y1={313} x2={100+dx+dx*0.3} y2={324}
                stroke="rgba(40,30,90,0.4)" strokeWidth={1.5} strokeLinecap="round"/>
            ))}
            <ellipse cx="200" cy="320" rx="26" ry="18" fill="#5548B8"/>
            <ellipse cx="200" cy="318" rx="20" ry="13" fill="#7068D0"/>
            {[[-7,5],[0,3],[7,5]].map(([dx,dy],i) => (
              <line key={i} x1={200+dx} y1={313} x2={200+dx+dx*0.3} y2={324}
                stroke="rgba(40,30,90,0.4)" strokeWidth={1.5} strokeLinecap="round"/>
            ))}

            {/* ── Ears ── */}
            <path d="M 72 108 L 58 58 L 108 88 Z" fill="#4A3FA0"/>
            <path d="M 76 106 L 66 72 L 102 92 Z" fill="url(#cc-earG)" opacity={0.8}/>
            <path d="M 228 108 L 242 58 L 192 88 Z" fill="#4A3FA0"/>
            <path d="M 224 106 L 234 72 L 198 92 Z" fill="url(#cc-earG)" opacity={0.8}/>

            {/* ── Head ── */}
            <ellipse cx="150" cy="165" rx="90" ry="86" fill="url(#cc-headG)"/>
            <ellipse cx="130" cy="118" rx="38" ry="22"
              fill="rgba(180,170,255,0.12)" transform="rotate(-18,130,118)"/>

            {/* Forehead mark */}
            <path d="M 150 106 L 158 116 L 150 124 L 142 116 Z"
              fill="rgba(200,190,255,0.25)" stroke="rgba(200,190,255,0.4)" strokeWidth={0.5}/>

            {/* ── Eyes ── */}
            <ellipse cx="108" cy="174" rx="22" ry="20" fill="url(#cc-eyeWG)"/>
            <ellipse cx="192" cy="174" rx="22" ry="20" fill="url(#cc-eyeWG)"/>

            <circle ref={eyeLpRef}   cx={108} cy={174} r={11} fill="#1A1240"/>
            <circle ref={eyeLs1Ref}  cx={112} cy={170} r={4}  fill="rgba(255,255,255,0.75)"/>
            <circle ref={eyeLs2Ref}  cx={104} cy={178} r={2}  fill="rgba(255,255,255,0.35)"/>
            <circle ref={eyeLirisRef} cx={108} cy={174} r={11} fill="none"
              stroke="rgba(140,145,247,0.5)" strokeWidth={1.5}/>

            <circle ref={eyeRpRef}   cx={192} cy={174} r={11} fill="#1A1240"/>
            <circle ref={eyeRs1Ref}  cx={196} cy={170} r={4}  fill="rgba(255,255,255,0.75)"/>
            <circle ref={eyeRs2Ref}  cx={188} cy={178} r={2}  fill="rgba(255,255,255,0.35)"/>
            <circle ref={eyeRirisRef} cx={192} cy={174} r={11} fill="none"
              stroke="rgba(140,145,247,0.5)" strokeWidth={1.5}/>

            {/* Squints */}
            <path ref={squintLRef}
              d="M 86 174 Q 108 155 130 174"
              fill="#2A1A5E" clipPath="url(#cc-eyeLClip)" style={{ display: "none" }}/>
            <path ref={squintRRef}
              d="M 170 174 Q 192 155 214 174"
              fill="#2A1A5E" clipPath="url(#cc-eyeRClip)" style={{ display: "none" }}/>

            {/* Eyelashes */}
            <g stroke="#2A1A5E" strokeWidth={1.8} strokeLinecap="round" opacity={0.7}>
              <line x1={88}  y1={157} x2={84}  y2={150}/>
              <line x1={96}  y1={155} x2={94}  y2={147}/>
              <line x1={105} y1={154} x2={104} y2={146}/>
              <line x1={172} y1={155} x2={172} y2={147}/>
              <line x1={181} y1={154} x2={182} y2={146}/>
              <line x1={190} y1={155} x2={192} y2={147}/>
              <line x1={200} y1={157} x2={203} y2={150}/>
            </g>

            {/* Nose */}
            <path d="M 145 196 L 150 202 L 155 196 Q 150 192 145 196 Z" fill="#D4A0C8"/>
            <line x1={150} y1={202} x2={150} y2={208}
              stroke="rgba(80,50,100,0.4)" strokeWidth={1.5} strokeLinecap="round"/>

            {/* Whiskers */}
            <g ref={whiskersRef} stroke="rgba(220,210,255,0.55)" strokeWidth={1.2} strokeLinecap="round">
              <line x1={80}  y1={200} x2={135} y2={205}/>
              <line x1={78}  y1={208} x2={133} y2={209}/>
              <line x1={80}  y1={216} x2={134} y2={213}/>
              <line x1={220} y1={200} x2={165} y2={205}/>
              <line x1={222} y1={208} x2={167} y2={209}/>
              <line x1={220} y1={216} x2={166} y2={213}/>
            </g>

            {/* Blush */}
            <ellipse ref={blushLRef} cx={90}  cy={194} rx={16} ry={9} fill="rgba(190,120,200,0.22)"/>
            <ellipse ref={blushRRef} cx={210} cy={194} rx={16} ry={9} fill="rgba(190,120,200,0.22)"/>

            {/* ── Mouth (clickable) ── */}
            <g onClick={handleMouthClick} style={{ cursor: "pointer" }}>
              <g ref={mouthNRef}>
                <path d="M 140 215 Q 150 222 160 215"
                  stroke="#8060A0" strokeWidth={2.5} fill="none" strokeLinecap="round"/>
              </g>
              <g ref={mouthHRef} style={{ display: "none" }}>
                <path d="M 128 213 Q 150 238 172 213 Q 150 228 128 213 Z" fill="#1A1040"/>
                <path d="M 128 213 Q 150 238 172 213"
                  stroke="#4A3A80" strokeWidth={2} fill="none" strokeLinecap="round"/>
                <path d="M 137 215 L 137 225 L 150 225 L 150 215" fill="white" opacity={0.88}/>
                <path d="M 150 215 L 150 225 L 163 225 L 163 215" fill="white" opacity={0.88}/>
                <ellipse cx={90}  cy={210} rx={18} ry={10} fill="rgba(200,120,180,0.28)"/>
                <ellipse cx={210} cy={210} rx={18} ry={10} fill="rgba(200,120,180,0.28)"/>
              </g>
              <g ref={mouthSRef} style={{ display: "none" }}>
                <ellipse cx={150} cy={222} rx={14} ry={10} fill="#1A1040"/>
                <ellipse cx={150} cy={220} rx={10} ry={7}  fill="#2A1860"/>
              </g>
            </g>

            {/* Star on forehead */}
            <g transform="translate(150,105) scale(0.7)" opacity={0.55}>
              <path d="M0,-9 L2,-3 L8,-3 L3,1 L5,7 L0,3 L-5,7 L-3,1 L-8,-3 L-2,-3 Z"
                fill="#C8C0FF"/>
            </g>

            {/* Sparkles */}
            <g ref={sp1Ref} transform="translate(50,140)"  opacity={0.4}>
              <path d="M0,-5 L1,-1 L5,0 L1,1 L0,5 L-1,1 L-5,0 L-1,-1 Z" fill="#A0A8FF"/>
            </g>
            <g ref={sp2Ref} transform="translate(255,160)" opacity={0.35}>
              <path d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z" fill="#C8A0FF"/>
            </g>
            <g ref={sp3Ref} transform="translate(60,260)"  opacity={0.3}>
              <path d="M0,-3.5 L1,-1 L3.5,0 L1,1 L0,3.5 L-1,1 L-3.5,0 L-1,-1 Z" fill="#9898F8"/>
            </g>

          </g>
        </g>
      </svg>

      {/* Hint */}
      <div style={{
        position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)",
        fontSize: 9.5, letterSpacing: "0.18em", color: "rgba(228,228,228,0.38)",
        pointerEvents: "none", whiteSpace: "nowrap",
        animation: "availability-pulse 3s ease-in-out infinite",
      }}>
        {hint}
      </div>
    </div>
  )
}
