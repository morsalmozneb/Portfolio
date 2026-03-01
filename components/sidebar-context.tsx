"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

interface SidebarContextValue {
  collapsed: boolean
  toggle: () => void
}

const STORAGE_KEY = "sidebar-collapsed"

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  toggle: () => {},
})

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Start with false (open) as default; will sync from localStorage on mount
  const [collapsed, setCollapsed] = useState(false)

  // Hydrate from localStorage once on mount (client-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        setCollapsed(stored === "true")
      }
    } catch {
      // localStorage unavailable – ignore
    }
  }, [])

  const toggle = useCallback(() => {
    setCollapsed((c) => {
      const next = !c
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  return (
    <SidebarContext.Provider value={{ collapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}
