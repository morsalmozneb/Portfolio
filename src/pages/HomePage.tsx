import { useState, useCallback, useEffect } from "react"
import { BigBangOverlay } from "@/components/big-bang-overlay"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"
import { SidebarNav, SIDEBAR_FULL, SIDEBAR_RAIL } from "@/components/sidebar-nav"
import { CustomCursor } from "@/components/custom-cursor"
import { ParticleBackground } from "@/components/particle-background"
import { HeroSection } from "@/components/hero-section"
import { AboutMeSection } from "@/components/about-me-section"
import { ProjectsSection } from "@/components/projects-section"
import { ToolsSection } from "@/components/tools-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollParallax } from "@/components/scroll-parallax"
import { GradualBlur } from "@/components/gradual-blur"
import { Seo } from "@/components/seo"

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

function HomeInner() {
  const [showContent, setShowContent] = useState(false)
  const { collapsed } = useSidebar()
  const isDesktop = useIsDesktop()
  const ml = isDesktop ? (collapsed ? `${SIDEBAR_RAIL}px` : `${SIDEBAR_FULL}px`) : "0px"

  const handleBigBangComplete = useCallback(() => {
    setShowContent(true)
  }, [])

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
      <BigBangOverlay onComplete={handleBigBangComplete} />

      {/* Scroll blur overlays — same settings as PageShell for consistency */}
      {showContent && (
        <>
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
        </>
      )}

      {showContent && (
        <>
          <Seo
            title="Morsal Mozneb | Portfolio"
            description="Explore Morsal Mozneb's portfolio, featuring interactive front-end work, creative development projects, and a polished digital design practice."
            path="/"
          />
          <SidebarNav />
          <main
            className="relative z-10 overflow-hidden"
            style={{
              marginLeft: ml,
              transition: "margin-left 400ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <HeroSection show={showContent} />

            <ScrollParallax yOffset={60} opacityRange={[0.5, 1]}>
              <AboutMeSection />
            </ScrollParallax>

            <ScrollParallax yOffset={80} opacityRange={[0.4, 1]} scaleRange={[0.97, 1]}>
              <ProjectsSection />
            </ScrollParallax>

            <ScrollParallax yOffset={0} opacityRange={[0.8, 1]}>
              <ToolsSection />
            </ScrollParallax>

            <ScrollParallax yOffset={50} xOffset={20} opacityRange={[0.5, 1]}>
              <ContactSection />
            </ScrollParallax>

            <Footer />
          </main>
        </>
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <SidebarProvider>
      <HomeInner />
    </SidebarProvider>
  )
}
