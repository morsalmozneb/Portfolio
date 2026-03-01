import { PageShell } from "@/components/page-shell"
import { AboutHero } from "@/components/about/about-hero"
import { AboutBio } from "@/components/about/about-bio"
import { AboutStats } from "@/components/about/about-stats"
import { AboutCareers } from "@/components/about/about-careers"
import { AboutTools } from "@/components/about/about-tools"
import { AboutConnect } from "@/components/about/about-connect"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <PageShell>
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
