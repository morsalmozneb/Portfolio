"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Eye, EyeOff } from "lucide-react"
import { HomeIcon } from "@/components/icons/home-icon"
import { ProjectsIcon } from "@/components/icons/projects-icon"
import { AboutIcon } from "@/components/icons/about-icon"
import { ContactIcon } from "@/components/icons/contact-icon"
import { LinkedinIcon } from "@/components/icons/linkedin-icon"
import { EmailIcon } from "@/components/icons/email-icon"
import { YoutubeIcon } from "@/components/icons/youtube-icon"
import { ResumeIcon } from "@/components/icons/resume-icon"
import { useSidebar } from "@/components/sidebar-context"
import { siteLinks } from "@/lib/site"

const SIDEBAR_FULL = 260
const SIDEBAR_RAIL = 64

const navLinks = [
  { label: "Home", href: "/", scrollTo: "#home", icon: <HomeIcon /> },
  { label: "Projects", href: "/projects", scrollTo: null, icon: <ProjectsIcon /> },
  { label: "About", href: "/about", scrollTo: null, icon: <AboutIcon /> },
  { label: "Contact", href: "/contact", scrollTo: null, icon: <ContactIcon /> },
]

const socialLinks = [
  { label: "LinkedIn", href: siteLinks.linkedin, icon: <LinkedinIcon /> },
  { label: "Email", href: siteLinks.email, icon: <EmailIcon /> },
  { label: "YouTube", href: siteLinks.youtube, icon: <YoutubeIcon /> },
  { label: "Resume", href: siteLinks.resume, icon: <ResumeIcon /> },
]

export { SIDEBAR_FULL, SIDEBAR_RAIL }

export function SidebarNav() {
  const pathname = usePathname()
  const { collapsed, toggle } = useSidebar()
  const [active, setActive] = useState(() => {
    if (pathname === "/about") return "About"
    if (pathname === "/contact") return "Contact"
    if (pathname === "/projects") return "Projects"
    return "Home"
  })
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoOpacity, setLogoOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Fade from 1 at top to 0 after 120px of scroll
      const opacity = Math.max(0, 1 - scrollY / 120)
      setLogoOpacity(opacity)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (pathname === "/about") { setActive("About"); return }
    if (pathname === "/contact") { setActive("Contact"); return }
    if (pathname === "/projects") { setActive("Projects"); return }

    if (pathname === "/") {
      setActive("Home")
    }
  }, [pathname])

  const handleClick = (link: (typeof navLinks)[0]) => {
    setActive(link.label)
    setMobileOpen(false)
    if (pathname === "/" && link.scrollTo) {
      const el = document.querySelector(link.scrollTo)
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return }
    }
  }

  const isPageLink = (href: string) =>
    href === "/about" || href === "/contact" || href === "/projects" ||
    (pathname !== "/" && href.startsWith("/"))

  return (
    <>
      {/* Mobile top logo */}
      <Link href="/" className="fixed top-4 left-4 z-[100] lg:hidden" style={{ opacity: logoOpacity, pointerEvents: logoOpacity < 0.1 ? "none" : "auto", transition: "opacity 380ms ease" }} onClick={(e) => { if (pathname === "/") { e.preventDefault(); const el = document.querySelector("#home"); if (el) el.scrollIntoView({ behavior: "smooth" }); } }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.svg"
          alt="Morsal Mozneb"
          className="h-7 w-auto"
          draggable={false}
        />
      </Link>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 right-4 z-[100] lg:hidden flex items-center justify-center w-11 h-11 rounded-xl cursor-pointer"
        style={{
          background: "rgba(140, 145, 247, 0.2)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(140, 145, 247, 0.28)",
        }}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? (
          <X className="w-5 h-5 text-[#E4E4E4]" />
        ) : (
          <Menu className="w-5 h-5 text-[#E4E4E4]" />
        )}
      </button>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[89] bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/*
       * Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂ Persistent logo (desktop only) Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
       * Sits at the exact same fixed coordinates as the logo inside the
       * full sidebar (top: 32px  Ã¢ÂÂ¡ py-8 / left: 24px Ã¢ÂÂ¡ px-5 + px-1).
       * Fades IN when the sidebar collapses so the logo never disappears.
       * The sidebar's own logo fades OUT with the panel, creating a
       * seamless handoff Ã¢ÂÂ same size, same position, zero clipping.
       */}
      <div
        className="hidden lg:block fixed pointer-events-none"
        style={{
          top: "32px",
          left: "24px",
          zIndex: 92,
          opacity: collapsed ? logoOpacity : 0,
          transition: "opacity 380ms ease",
        }}
      >
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.svg"
            alt="Morsal Mozneb"
            className="h-[36px] w-auto relative z-10"
            draggable={false}
          />
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(140, 145, 247, 0.35) 45%, rgba(140, 145, 247, 0.5) 50%, rgba(140, 145, 247, 0.35) 55%, transparent 70%, transparent 100%)",
              animation: "logo-scan 3.5s ease-in-out infinite",
              mixBlendMode: "color-dodge",
            }}
          />
        </div>
      </div>

      {/* Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂ Collapsed Icon Rail (desktop only) Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
      <div
        className="hidden lg:flex fixed top-0 left-0 z-[91] h-screen flex-col items-center py-8"
        style={{
          width: `${SIDEBAR_RAIL}px`,
          opacity: collapsed ? 1 : 0,
          pointerEvents: collapsed ? "auto" : "none",
          transition: "opacity 350ms ease",
        }}
      >
        {/* Spacer so eye toggle clears the logo above it */}
        <div className="h-[36px] mb-8" aria-hidden="true" />

        {/* Eye toggle - top of rail, matches social icon style */}
        <button
          onClick={toggle}
          className="mb-10 flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer hover:scale-[1.12]"
          style={{
            background: "rgba(140, 145, 247, 0.04)",
            border: "1px solid rgba(140, 145, 247, 0.15)",
            transition: "all 300ms ease",
          }}
          aria-label="Show sidebar"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(140, 145, 247, 0.6)"
            e.currentTarget.style.boxShadow = "0 0 16px rgba(140, 145, 247, 0.25), 0 0 4px rgba(140, 145, 247, 0.15)"
            e.currentTarget.style.background = "rgba(140, 145, 247, 0.1)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(140, 145, 247, 0.15)"
            e.currentTarget.style.boxShadow = "none"
            e.currentTarget.style.background = "rgba(140, 145, 247, 0.04)"
          }}
        >
          <EyeOff className="w-4 h-4 text-[#E4E4E4]/50 transition-colors duration-300" />
        </button>

        {/* Navigation icons */}
        <nav className="flex flex-col items-center gap-5" aria-label="Icon navigation">
          {navLinks.map((link) => {
            const isActive = active === link.label
            const linkProps = {
              href: link.href,
              onClick: (e: React.MouseEvent) => {
                if (pathname === "/" && link.scrollTo) e.preventDefault()
                handleClick(link)
              },
              className: "group relative flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-all duration-300",
              "aria-label": link.label,
            }

            return (
              <Link key={link.label} {...linkProps}>
                <span
                  className={`transition-colors duration-300 ${
                    isActive
                      ? "text-[#8C91F7]"
                      : "text-[#E4E4E4]/40 group-hover:text-[#8C91F7]"
                  }`}
                >
                  {link.icon}
                </span>

                {/* Active underline indicator */}
                {isActive && (
                  <motion.div
                    layoutId="rail-underline"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2"
                    style={{
                      width: "20px",
                      height: "2px",
                      borderRadius: "1px",
                      background: "#8C91F7",
                      boxShadow: "0 0 8px rgba(140, 145, 247, 0.5), 0 0 16px rgba(140, 145, 247, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Tooltip */}
                <span
                  className="absolute left-full ml-3 rounded-md px-2.5 py-1 whitespace-nowrap pointer-events-none opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-250 ease-out"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "#E4E4E4",
                    background: "rgba(20, 16, 42, 0.95)",
                    border: "1px solid rgba(140, 145, 247, 0.2)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂ Full Sidebar Panel (desktop + mobile) Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
      <motion.aside
        className={`fixed top-0 left-0 z-[90] h-screen w-[86vw] max-w-[320px] lg:w-auto flex flex-col justify-between py-24 lg:py-8 px-5 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          width: `min(86vw, ${SIDEBAR_FULL}px)`,
          background:
            "linear-gradient(180deg, rgba(16, 10, 36, 0.98) 0%, rgba(22, 14, 48, 0.97) 20%, rgba(36, 22, 68, 0.95) 45%, rgba(22, 14, 48, 0.97) 65%, rgba(10, 7, 22, 0.99) 100%)",
          backdropFilter: "blur(40px)",
          borderRight: "1px solid rgba(140, 145, 247, 0.18)",
          boxShadow:
            "4px 0 40px rgba(0, 0, 0, 0.5), inset 0 0 80px rgba(140, 145, 247, 0.04)",
        }}
        initial={false}
        animate={{
          x: mobileOpen ? 0 : (collapsed ? -SIDEBAR_FULL : 0),
          opacity: mobileOpen ? 1 : (collapsed ? 0 : 1),
        }}
        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Top section: logo + nav */}
        <div>
          {/* Logo */}
          <div className="mb-12 px-1 hidden lg:block">
            <Link href="/" onClick={(e) => { if (pathname === "/") { e.preventDefault(); const el = document.querySelector("#home"); if (el) el.scrollIntoView({ behavior: "smooth" }); } }}>
              <div className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo.svg"
                  alt="Morsal Mozneb"
                  className="h-[36px] w-auto relative z-10"
                  draggable={false}
                />
                <div
                  className="absolute inset-0 z-20 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(140, 145, 247, 0.35) 45%, rgba(140, 145, 247, 0.5) 50%, rgba(140, 145, 247, 0.35) 55%, transparent 70%, transparent 100%)",
                    animation: "logo-scan 3.5s ease-in-out infinite",
                    mixBlendMode: "color-dodge",
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Eye toggle - sits on the right edge/border of the sidebar */}
          <button
            onClick={toggle}
            className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer hover:scale-[1.12] absolute"
            style={{
              top: "32px",
              right: "-20px",
              background: "rgba(10, 9, 24, 0.95)",
              border: "1px solid rgba(140, 145, 247, 0.15)",
              transition: "all 300ms ease",
              zIndex: 10,
            }}
            aria-label="Hide sidebar"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(140, 145, 247, 0.6)"
              e.currentTarget.style.boxShadow = "0 0 16px rgba(140, 145, 247, 0.25), 0 0 4px rgba(140, 145, 247, 0.15)"
              e.currentTarget.style.background = "rgba(140, 145, 247, 0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(140, 145, 247, 0.15)"
              e.currentTarget.style.boxShadow = "none"
              e.currentTarget.style.background = "rgba(10, 9, 24, 0.95)"
            }}
          >
            <Eye className="w-4 h-4 text-[#E4E4E4]/50 transition-colors duration-300" />
          </button>

          {/* Nav links */}
          <nav className="flex flex-col gap-1.5" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active_ = active === link.label

              const content = (
                <>
                  {/* Active indicator bar */}
                  {active_ && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2"
                      style={{
                        width: "4px",
                        height: "28px",
                        borderRadius: "0 4px 4px 0",
                        background: "#8C91F7",
                        boxShadow: "0 0 12px rgba(140, 145, 247, 0.6), 0 0 24px rgba(140, 145, 247, 0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Active pill background */}
                  {active_ && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: "linear-gradient(135deg, rgba(140, 145, 247, 0.15) 0%, rgba(140, 145, 247, 0.05) 100%)",
                        border: "1px solid rgba(140, 145, 247, 0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <span
                    className={`relative z-10 flex-shrink-0 transition-colors duration-300 ${
                      active_ ? "text-[#8C91F7]" : "text-[#E4E4E4]/50 group-hover:text-[#8C91F7]"
                    }`}
                  >
                    {link.icon}
                  </span>

                  {/* Label */}
                  <span
                    className={`relative z-10 transition-colors duration-300 text-base lg:text-[18px] font-bold tracking-[0.04em] ${
                      active_ ? "text-[#E4E4E4]" : "text-[#E4E4E4]/50"
                    }`}
                  >
                    <span className="group-hover:text-[#E4E4E4] transition-colors duration-300">
                      {link.label}
                    </span>
                  </span>

                  {/* Hover shimmer */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
                    <div
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(140, 145, 247, 0.1), transparent)",
                      }}
                    />
                  </div>
                </>
              )

              const className_ =
                "group relative flex items-center gap-4 px-5 py-3.5 rounded-lg text-left transition-all duration-300 cursor-pointer"

              if (isPageLink(link.href)) {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => handleClick(link)}
                    className={className_}
                    style={{
                      background: active_
                        ? "linear-gradient(135deg, rgba(140, 145, 247, 0.18) 0%, rgba(140, 145, 247, 0.06) 100%)"
                        : "transparent",
                    }}
                  >
                    {content}
                  </Link>
                )
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (pathname === "/" && link.scrollTo) e.preventDefault()
                    handleClick(link)
                  }}
                  className={className_}
                  style={{
                    background: active_
                      ? "linear-gradient(135deg, rgba(140, 145, 247, 0.18) 0%, rgba(140, 145, 247, 0.06) 100%)"
                      : "transparent",
                  }}
                >
                  {content}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Social links */}
        <div className="px-1">
          <p
            className="uppercase mb-8"
            style={{
              fontSize: "13px",
              letterSpacing: "0.25em",
              color: "rgba(228, 228, 228, 0.65)",
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Connect
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <div key={link.label} className="group/social relative flex flex-col items-center">
                <span
                  className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-md px-2.5 py-1 whitespace-nowrap pointer-events-none opacity-0 translate-y-1 group-hover/social:opacity-100 group-hover/social:translate-y-0 transition-all duration-300 ease-out"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "#E4E4E4",
                    background: "rgba(20, 16, 42, 0.95)",
                    border: "1px solid rgba(140, 145, 247, 0.2)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {link.label}
                </span>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 cursor-pointer group-hover/social:scale-[1.12]"
                  style={{
                    border: "1px solid rgba(140, 145, 247, 0.15)",
                    background: "rgba(140, 145, 247, 0.04)",
                  }}
                  aria-label={link.label}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "rgba(140, 145, 247, 0.6)"
                    el.style.boxShadow = "0 0 16px rgba(140, 145, 247, 0.25), 0 0 4px rgba(140, 145, 247, 0.15)"
                    el.style.background = "rgba(140, 145, 247, 0.1)"
                    const svg = el.querySelector("svg")
                    if (svg) svg.style.color = "#8C91F7"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "rgba(140, 145, 247, 0.15)"
                    el.style.boxShadow = "none"
                    el.style.background = "rgba(140, 145, 247, 0.04)"
                    const svg = el.querySelector("svg")
                    if (svg) svg.style.color = "rgba(228, 228, 228, 0.5)"
                  }}
                >
                  <span className="text-[#E4E4E4]/50 transition-colors duration-300">
                    {link.icon}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>
    </>
  )
}
