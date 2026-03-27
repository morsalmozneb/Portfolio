import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { PageShell } from "@/components/page-shell"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { Footer } from "@/components/footer"
import { Seo } from "@/components/seo"

function ContactHeader() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref}>
      <motion.p
        className="text-xs tracking-[0.4em] text-[#8C91F7] uppercase mb-2 font-mono"
        initial={{ opacity: 0, x: -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        Get In Touch
      </motion.p>
      <motion.h1
        className="page-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {"Let\u2019s "}
        <span
          className="text-[#8C91F7]"
          style={{ textShadow: "0 0 20px rgba(140, 145, 247, 0.3)" }}
        >
          Work
        </span>
        {" Together"}
      </motion.h1>
      <motion.p
        className="mt-4 max-w-xl text-[#E4E4E4]/55 text-base leading-relaxed"
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        Pitch an idea, ask a question, or send a collaboration note. I reply quickly and keep communication clear.
      </motion.p>
    </div>
  )
}

export default function ContactPage() {
  return (
    <PageShell>
      <Seo
        title="Contact | Morsal Mozneb"
        description="Contact Morsal Mozneb for collaboration, project inquiries, freelance work, or questions about past portfolio projects."
        path="/contact"
      />
      <section className="relative overflow-hidden pt-10 pb-10 lg:py-16">
        <motion.div
          className="pointer-events-none absolute -top-24 left-[10%] h-72 w-72 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(140,145,247,0.22) 0%, rgba(140,145,247,0) 70%)",
            filter: "blur(18px)",
          }}
          animate={{ y: [0, 26, 0], x: [0, -18, 0], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-[-120px] right-[-40px] h-[26rem] w-[26rem] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(108,82,220,0.2) 0%, rgba(108,82,220,0) 70%)",
            filter: "blur(20px)",
          }}
          animate={{ y: [0, -30, 0], x: [0, 20, 0], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 12.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-[1080px] mx-auto px-6 lg:px-12">
          <ContactHeader />

          <div className="mt-10 lg:mt-14 flex flex-col lg:flex-row gap-10 lg:gap-14 items-start lg:items-stretch">
            <div
              className="relative flex-1 min-w-0 rounded-3xl p-5 md:p-6"
              style={{
                background: "linear-gradient(145deg, rgba(140,145,247,0.08), rgba(13,12,30,0.55))",
                border: "1px solid rgba(140,145,247,0.18)",
                boxShadow: "0 20px 42px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(140,145,247,0.12) 0%, rgba(140,145,247,0) 42%, rgba(140,145,247,0.08) 100%)",
                }}
              />
              <ContactForm />
            </div>
            <div className="w-full lg:w-[300px] flex-shrink-0">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  )
}
