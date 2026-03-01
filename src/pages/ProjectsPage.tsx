import { useState } from "react"
import { PageShell } from "@/components/page-shell"
import { ProjectsHeroCarousel } from "@/components/projects/projects-hero-carousel"
import { PhonePrototypeSection } from "@/components/projects/phone-prototype-section"
import { ProjectDetail } from "@/components/projects/project-detail"
import { projects } from "@/components/projects/project-data"
import { Footer } from "@/components/footer"

export default function ProjectsPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id ?? "")

  return (
    <PageShell>
      <ProjectsHeroCarousel
        selectedProjectId={selectedProjectId}
        onProjectChange={setSelectedProjectId}
      />
      <PhonePrototypeSection selectedProjectId={selectedProjectId} />
      <ProjectDetail selectedProjectId={selectedProjectId} />
      <Footer />
    </PageShell>
  )
}
