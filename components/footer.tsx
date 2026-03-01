"use client"

import { LinkedinIcon } from "@/components/icons/linkedin-icon"
import { EmailIcon } from "@/components/icons/email-icon"
import { YoutubeIcon } from "@/components/icons/youtube-icon"
import { ResumeIcon } from "@/components/icons/resume-icon"
import { ArrowUp } from "lucide-react"

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: <LinkedinIcon /> },
  { label: "Email", href: "mailto:morsalehmozneb@gmail.com", icon: <EmailIcon /> },
  { label: "YouTube", href: "https://youtube.com", icon: <YoutubeIcon /> },
  { label: "Resume", href: "#", icon: <ResumeIcon /> },
]

export function Footer() {
  return (
    <footer
      className="relative py-10 border-t"
      style={{
        borderColor: "rgba(140, 145, 247, 0.25)",
        borderImage:
          "linear-gradient(90deg, transparent 0%, rgba(140, 145, 247, 0.35) 30%, rgba(140, 145, 247, 0.5) 50%, rgba(140, 145, 247, 0.35) 70%, transparent 100%) 1",
        boxShadow: "0 -1px 12px rgba(140, 145, 247, 0.06)",
      }}
    >
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo + copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.svg"
              alt="Morsal Mozneb"
              className="h-[30px] w-auto relative z-10"
              draggable={false}
            />
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(140, 145, 247, 0.35) 45%, rgba(140, 145, 247, 0.5) 50%, rgba(140, 145, 247, 0.35) 55%, transparent 70%, transparent 100%)",
                animation: "logo-scan 3.5s ease-in-out infinite",
                mixBlendMode: "color-dodge",
              }}
            />
          </div>
          <p className="text-xs text-[#E4E4E4]/30">
            {"\u00A9 2026 All rights reserved."}
          </p>
        </div>

        {/* Center: back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hidden md:flex items-center gap-2 text-xs text-[#E4E4E4]/35 hover:text-[#8C91F7]/70 transition-colors duration-300 group cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          Back to top
        </button>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 cursor-pointer hover:scale-[1.12]"
              style={{
                border: "1px solid rgba(140, 145, 247, 0.15)",
                background: "rgba(140, 145, 247, 0.04)",
              }}
              aria-label={link.label}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = "rgba(140, 145, 247, 0.6)"
                el.style.boxShadow = "0 0 16px rgba(140, 145, 247, 0.25), 0 0 4px rgba(140, 145, 247, 0.15)"
                el.style.background = "rgba(140, 145, 247, 0.1)"
                const svg = el.querySelector("svg")
                if (svg) svg.style.color = "#8C91F7"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
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
          ))}
        </div>
      </div>
    </footer>
  )
}
