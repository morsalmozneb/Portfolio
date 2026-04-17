"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { EmailIcon } from "@/components/icons/email-icon"
import { LinkedinIcon } from "@/components/icons/linkedin-icon"
import { ResumeIcon } from "@/components/icons/resume-icon"
import { Clock, MapPin } from "lucide-react"
import { siteLinks } from "@/lib/site"

const contactLinks = [
  {
    icon: <EmailIcon className="w-5 h-5" />,
    label: "EMAIL",
    detail: "morsalehmozneb@gmail.com",
    href: "mailto:morsalehmozneb@gmail.com",
    floatAnimation: "contact-float-1",
  },
  {
    icon: <LinkedinIcon className="w-5 h-5" />,
    label: "LINKEDIN",
    detail: "Connect with me",
    href: siteLinks.linkedin,
    external: true,
    floatAnimation: "contact-float-2",
  },
  {
    icon: <ResumeIcon className="w-5 h-5" />,
    label: "RESUME",
    detail: "Download CV",
    href: siteLinks.resume,
    external: true,
    floatAnimation: "contact-float-3",
  },
]

const statusItems = [
  {
    type: "availability" as const,
    text: "Available for projects",
  },
  {
    icon: <Clock className="w-4 h-4 text-[#E4E4E4]/50" />,
    text: "Quick Response",
  },
  {
    icon: <MapPin className="w-4 h-4 text-[#E4E4E4]/50" />,
    text: "Vancouver, BC",
  },
]

export function ContactInfo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden glass-card rounded-2xl p-6 flex h-full flex-col gap-5"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <motion.div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(140,145,247,0.35) 0%, rgba(140,145,247,0) 70%)",
          filter: "blur(8px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Contact links with floating icons */}
      {contactLinks.map((item, i) => (
        <motion.a
          key={i}
          href={item.href}
          {...(item.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="flex items-center gap-4 group/link py-1.5 transition-all duration-300"
          initial={{ opacity: 0, x: 16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 + i * 0.09, duration: 0.45 }}
          whileHover={{ x: 4 }}
        >
          {/* Icon container with float animation + hover pause */}
          <span
            className="contact-icon-float flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 group-hover/link:border-[rgba(140,145,247,0.5)] group-hover/link:shadow-[0_0_12px_rgba(140,145,247,0.15)]"
            style={{
              border: "1px solid rgba(140, 145, 247, 0.15)",
              background: "rgba(140, 145, 247, 0.04)",
              animation: `${item.floatAnimation} ${3 + i * 0.7}s ease-in-out infinite`,
            }}
          >
            <span className="text-[#E4E4E4]/50 group-hover/link:text-[#8C91F7] transition-colors duration-300">
              {item.icon}
            </span>
          </span>
          <div className="flex flex-col">
            <span className="text-xs tracking-[0.2em] text-[#E4E4E4]/70 uppercase font-semibold">
              {item.label}
            </span>
            <span className="text-sm text-[#E4E4E4]/50 group-hover/link:text-[#E4E4E4]/80 transition-colors duration-300">
              {item.detail}
            </span>
          </div>
        </motion.a>
      ))}

      {/* Divider */}
      <div
        className="w-full h-px"
        style={{ background: "rgba(140, 145, 247, 0.1)" }}
      />

      {/* Status items */}
      <div className="flex flex-col gap-4">
        {statusItems.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {"type" in item && item.type === "availability" ? (
              /* Pulsing green availability dot */
              <span className="relative flex items-center justify-center w-4 h-4">
                {/* Pulse ring */}
                <span
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: "#4ADE80",
                    animation: "availability-pulse 2s ease-in-out infinite",
                  }}
                />
                {/* Solid core */}
                <span
                  className="relative w-2.5 h-2.5 rounded-full"
                  style={{
                    background: "#4ADE80",
                    boxShadow: "0 0 8px rgba(74, 222, 128, 0.5)",
                  }}
                />
              </span>
            ) : (
              item.icon
            )}
            <span className="text-sm text-[#E4E4E4]/60">{item.text}</span>
          </div>
        ))}
      </div>

      <div
        className="mt-2 rounded-xl p-3"
        style={{
          border: "1px solid rgba(140,145,247,0.18)",
          background: "rgba(140,145,247,0.05)",
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#E4E4E4]/45 mb-2">
          Response rhythm
        </p>
        <div className="h-1.5 rounded-full bg-[#0f1024] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #6F74D8 0%, #8C91F7 100%)" }}
            initial={{ width: "24%" }}
            animate={{ width: ["24%", "68%", "52%", "76%", "24%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  )
}
