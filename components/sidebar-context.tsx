"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { HomeIcon }     from "@/components/icons/home-icon"
import { ProjectsIcon } from "@/components/icons/projects-icon"
import { AboutIcon }    from "@/components/icons/about-icon"
import { ContactIcon }  from "@/components/icons/contact-icon"

/* ─── Context ───────────────────────────────────────────────────── */
interface SidebarContextValue {
  collapsed: boolean
  toggle: () => void
  isMobile: boolean
}

const STORAGE_KEY = "sidebar-collapsed"

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  toggle: () => {},
  isMobile: false,
})

/* ─── Mobile bottom nav items ───────────────────────────────────── */
const NAV_ITEMS = [
  { href: "/",         label: "Home",     Icon: HomeIcon     },
  { href: "/projects", label: "Projects", Icon: ProjectsIcon },
  { href: "/about",    label: "About",    Icon: AboutIcon    },
  { href: "/contact",  label: "Contact",  Icon: ContactIcon  },
]

/* ─── Mobile bottom navigation ─────────────────────────────────── */
function MobileBottomNav() {
  const location = useLocation()

  return (
    <nav
      className="sidebar-mobile-nav"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        height: "calc(60px + env(safe-area-inset-bottom, 0px))",
        background: "rgba(8, 6, 18, 0.95)",
        borderTop: "1px solid rgba(140,145,247,0.18)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const isActive = href === "/" ? location.pathname === "/" : location.pathname.startsWith(href)
        return (
          <Link
            key={href}
            to={href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              flex: 1,
              padding: "8px 4px",
              textDecoration: "none",
              position: "relative",
            }}
          >
            {isActive && (
              <motion.div
                layoutId="mobile-nav-indicator"
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 20,
                  height: 2,
                  borderRadius: "0 0 2px 2px",
                  background: "#8C91F7",
                  boxShadow: "0 2px 10px rgba(140,145,247,0.7)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              style={{
                width: 22,
                height: 22,
                color: isActive ? "#8C91F7" : "rgba(228,228,228,0.38)",
                transition: "color 0.2s ease",
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.03em",
                color: isActive ? "#8C91F7" : "rgba(228,228,228,0.32)",
                transition: "color 0.2s ease",
              }}
            >
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

/* ─── Provider ──────────────────────────────────────────────────── */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) setCollapsed(stored === "true")
    } catch {
      // localStorage unavailable
    }
  }, [])

  // Add/remove class on body for global CSS targeting
  useEffect(() => {
    document.body.setAttribute("data-mobile", isMobile ? "true" : "false")
    return () => document.body.removeAttribute("data-mobile")
  }, [isMobile])

  const toggle = useCallback(() => {
    setCollapsed((c) => {
      const next = !c
      try { localStorage.setItem(STORAGE_KEY, String(next)) } catch { /* ignore */ }
      return next
    })
  }, [])

  return (
    <SidebarContext.Provider value={{ collapsed, toggle, isMobile }}>
      {children}
      {/* Mobile bottom nav — shows only on small screens via CSS */}
      <div className="mobile-nav-wrapper">
        <MobileBottomNav />
      </div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}
