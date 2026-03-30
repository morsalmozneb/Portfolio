"use client"

import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SidebarNav, SIDEBAR_FULL, SIDEBAR_RAIL } from "@/components/sidebar-nav"
import { CustomCursor } from "@/components/custom-cursor"
import { ParticleBackground } from "@/components/particle-background"
import { GradualBlur } from "@/components/gradual-blur"
import { useState, useEffect, type ReactNode } from "react"

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)")
    setIsDesktop(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])
  return isDesktop
}

function ShellInner({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar()
  const isDesktop = useIsDesktop()

  const ml = isDesktop ? (collapsed ? `${SIDEBAR_RAIL}px` : `${SIDEBAR_FULL}px`) : "0px"

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0918 0%, #0f0d1e 30%, #110f24 60%, #0a0918 100%)",
      }}
    >
      <CustomCursor />
      <ParticleBackground />
      <SidebarNav />

      {/* Scroll blur overlays — fixed to viewport, consistent across all pages */}
      <GradualBlur
        position="top"
        height="7rem"
        strength={2.5}
        divCount={8}
        curve="ease-out"
        target="page"
        zIndex={50}
        style={{ pointerEvents: "none" }}
      />
      <GradualBlur
        position="bottom"
        height="7rem"
        strength={2.5}
        divCount={8}
        curve="ease-out"
        target="page"
        zIndex={50}
        style={{ pointerEvents: "none" }}
      />

      <main
        className="relative z-10"
        style={{
          marginLeft: ml,
          transition: "margin-left 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {children}
      </main>
    </div>
  )
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <ShellInner>{children}</ShellInner>
    </SidebarProvider>
  )
}
