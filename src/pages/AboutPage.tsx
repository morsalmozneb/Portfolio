import { PageShell } from "@/components/page-shell"
import { AboutHero } from "@/components/about/about-hero"
import { AboutBio } from "@/components/about/about-bio"
import { AboutStats } from "@/components/about/about-stats"
import { AboutCareers } from "@/components/about/about-careers"
import { AboutTools } from "@/components/about/about-tools"
import { AboutConnect } from "@/components/about/about-connect"
import { Footer } from "@/components/footer"
import { Seo } from "@/components/seo"

export default function AboutPage() {
  return (
    <PageShell>
      <Seo
        title="About | Morsal Mozneb"
        description="Learn more about Morsal Mozneb's background, values, creative process, and the tools used to build thoughtful digital experiences."
        path="/about"
      />
      <AboutHero />
      <AboutBio />
      <AboutStats />
      <AboutCareers />
      <AboutTools />
      <AboutConnect />
      <Footer />
    </PageShell>
  )
}
