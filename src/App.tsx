import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ProjectsPage from "./pages/ProjectsPage"
import ContactPage from "./pages/ContactPage"

const PAGE_TITLES: Record<string, string> = {
  "/": "Morsal Mozneb | Portfolio",
  "/about": "About | Morsal Mozneb",
  "/projects": "Projects | Morsal Mozneb",
  "/contact": "Contact | Morsal Mozneb",
}

function TitleManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = PAGE_TITLES[pathname] ?? "Morsal Mozneb | Portfolio"
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <TitleManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
