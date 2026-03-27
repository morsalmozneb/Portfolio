import { Link } from "react-router-dom"
import { PageShell } from "@/components/page-shell"
import { Footer } from "@/components/footer"
import { Seo } from "@/components/seo"

export default function NotFoundPage() {
  return (
    <PageShell>
      <Seo
        title="Page Not Found | Morsal Mozneb"
        description="The page you requested could not be found. Return to Morsal Mozneb's portfolio homepage to continue browsing."
        path="/404"
      />

      <section className="min-h-[72vh] px-6 py-24 lg:px-12 lg:py-32">
        <div
          className="mx-auto flex max-w-[760px] flex-col items-start gap-6 rounded-[2rem] p-8 md:p-12"
          style={{
            background: "linear-gradient(145deg, rgba(140,145,247,0.1), rgba(13,12,30,0.58))",
            border: "1px solid rgba(140,145,247,0.18)",
            boxShadow: "0 24px 54px rgba(0,0,0,0.28)",
          }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-[#8C91F7]">Error 404</p>
          <h1 className="text-4xl font-semibold tracking-tight text-[#E4E4E4] md:text-6xl">
            This route does not exist.
          </h1>
          <p className="max-w-[56ch] text-base leading-relaxed text-[#E4E4E4]/65 md:text-lg">
            The page may have moved, the URL may be incorrect, or the link may be outdated. Use the button below to return to the portfolio homepage.
          </p>
          <Link
            to="/"
            className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #7b80e7 0%, #9ca0ff 100%)",
              color: "#080814",
              boxShadow: "0 12px 30px rgba(140,145,247,0.22)",
            }}
          >
            Back to home
          </Link>
        </div>
      </section>

      <Footer />
    </PageShell>
  )
}
