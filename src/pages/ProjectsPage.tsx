import { useState } from "react"
import { PageShell } from "@/components/page-shell"
import { ProjectsHeroCarousel } from "@/components/projects/projects-hero-carousel"
import { PhonePrototypeSection } from "@/components/projects/phone-prototype-section"
import { ProjectDetail } from "@/components/projects/project-detail"
import { projects } from "@/components/projects/project-data"
import { AboutConnect } from "@/components/about/about-connect"
import { Footer } from "@/components/footer"
import { Seo } from "@/components/seo"

export default function ProjectsPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id ?? "")

  return (
    <PageShell>
      <Seo
        title="Projects | Morsal Mozneb"
        description="Browse selected portfolio projects by Morsal Mozneb, including web experiences, interface explorations, and case-study driven design work."
        path="/projects"
      />
      <ProjectsHeroCarousel
        selectedProjectId={selectedProjectId}
        onProjectChange={setSelectedProjectId}
      />
      <PhonePrototypeSection selectedProjectId={selectedProjectId} />
      <ProjectDetail selectedProjectId={selectedProjectId} />
      <AboutConnect />
      <Footer />
    </PageShell>
  )
}
