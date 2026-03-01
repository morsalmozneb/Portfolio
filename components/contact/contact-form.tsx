"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

export function ContactForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormState({ name: "", email: "", subject: "", message: "" })
  }

  const inputStyle = {
    background: "rgba(140, 145, 247, 0.04)",
    border: "1px solid rgba(140, 145, 247, 0.15)",
  }

  const inputClassName =
    "w-full rounded-xl px-4 py-3.5 text-base sm:text-sm text-[#E4E4E4] placeholder-[#E4E4E4]/30 outline-none transition-all duration-300 focus:border-[#8C91F7] focus:shadow-[0_0_16px_rgba(140,145,247,0.25),0_0_4px_rgba(140,145,247,0.4)]"

  return (
    <motion.form
      ref={ref}
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      {/* Name + Email row */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="text-xs tracking-[0.3em] text-[#E4E4E4]/70 uppercase font-semibold"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={formState.name}
            onChange={handleChange}
            required
            className={inputClassName}
            style={inputStyle}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="text-xs tracking-[0.3em] text-[#E4E4E4]/70 uppercase font-semibold"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Youremail@gmail.com"
            value={formState.email}
            onChange={handleChange}
            required
            className={inputClassName}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-subject"
          className="text-xs tracking-[0.3em] text-[#E4E4E4]/70 uppercase font-semibold"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="What is this about?"
          value={formState.subject}
          onChange={handleChange}
          required
          className={inputClassName}
          style={inputStyle}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-xs tracking-[0.3em] text-[#E4E4E4]/70 uppercase font-semibold"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Write your message"
          rows={5}
          maxLength={500}
          value={formState.message}
          onChange={handleChange}
          required
          className={`${inputClassName} resize-none`}
          style={inputStyle}
        />
        <div className="text-right text-[11px] tracking-[0.14em] uppercase text-[#E4E4E4]/35">
          {formState.message.length}/500
        </div>
      </div>

      {/* Submit button + success state */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <motion.button
          type="submit"
          className="inline-flex items-center justify-center w-full sm:w-auto min-w-[180px] h-[46px] px-7 rounded-lg text-sm font-medium text-[#E4E4E4] transition-all duration-300 hover:scale-105"
          style={{
            border: "1px solid rgba(140, 145, 247, 0.5)",
            background: "rgba(100, 80, 180, 0.35)",
            boxShadow:
              "0 0 18px rgba(140, 145, 247, 0.15), inset 0 0 12px rgba(140, 145, 247, 0.08)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(140, 145, 247, 0.15)"
            e.currentTarget.style.borderColor = "rgba(140, 145, 247, 0.6)"
            e.currentTarget.style.boxShadow =
              "0 0 20px rgba(140, 145, 247, 0.2)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(100, 80, 180, 0.35)"
            e.currentTarget.style.borderColor = "rgba(140, 145, 247, 0.5)"
            e.currentTarget.style.boxShadow =
              "0 0 18px rgba(140, 145, 247, 0.15), inset 0 0 12px rgba(140, 145, 247, 0.08)"
          }}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          Send Message
        </motion.button>

        {/* Success feedback */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Purple checkmark */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="flex-shrink-0"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  stroke="#8C91F7"
                  strokeWidth="1.5"
                  fill="rgba(140, 145, 247, 0.1)"
                />
                <motion.path
                  d="M6 10.5L8.5 13L14 7.5"
                  stroke="#8C91F7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
              </svg>
              <span className="text-sm text-[#8C91F7]">
                Your message has been sent!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  )
}
