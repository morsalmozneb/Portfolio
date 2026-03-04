export type DeviceType = "phone" | "laptop" | "tablet"

export interface DeviceMockup {
  type: DeviceType
  figmaEmbedUrl: string
  isPrimary: boolean
}

export interface Tool {
  name: string
  icon: string
}

export interface Project {
  id: string
  slug: string
  label: string
  title: string
  overview: string
  process: string[]
  responsibilities: string[]
  devices: DeviceMockup[]
  tools: Tool[]
  /** Gradient for the tablet preview screen */
  previewBg: string
  /** Accent colour for text/glow inside the tablet */
  previewAccent: string
  /** Path to the tablet mockup PNG (relative to /public) */
  previewImage: string
  /** Path to the home/card image (relative to /public) */
  cardImage?: string
  /** Figma prototype embed URL for the mobile phone mockup (optional) */
  mobileProtoUrl?: string
  /** Figma prototype embed URL for the tablet mockup (optional) */
  tabletProtoUrl?: string
  /** Figma prototype embed URL for the desktop/laptop mockup (optional) */
  desktopProtoUrl?: string
  /** Optional per-project zoom for phone iframe rendering */
  phoneProtoZoom?: number
}

export const projects: Project[] = [
  {
    id: "saffron-flame",
    slug: "saffron-flame",
    label: "SAFFRON FLAME PROJECT",
    title: "Saffron Flame Restaurant",
    overview:
      "Saffron Flame is a comprehensive multi-platform digital experience designed from the ground up for a traditional Persian restaurant. The project tasked me with creating a full brand identity and designing both a website and a mobile app — each thoughtfully adapted across three distinct layout formats: desktop, tablet, and mobile. The goal was to build a digital presence that felt as warm, rich, and culturally authentic as the dining experience itself, giving users an immersive first impression before they even walk through the door. Every design decision, from colour to typography to layout structure, was made with the restaurant's Persian heritage and its target clientele at the forefront.",
    process: [
      "The project began with extensive visual and cultural research into how Persian restaurants present themselves both locally and internationally. I studied existing restaurant branding, traditional Persian art motifs, and the visual language of high-end dining experiences to understand what elements communicate authenticity, warmth, and sophistication. This research phase was critical in shaping the design direction and ensuring the final product felt genuinely rooted in culture rather than surface-level.",
      "From there, I moved into brand identity development, starting with logo design. I explored multiple concepts — experimenting with typography, iconography, and layout — before refining the direction into a mark that felt both timeless and modern. The logo needed to work across digital formats, from small mobile screens to full-width desktop headers, so scalability and legibility were key considerations throughout the refinement process.",
      "One of the most intentional parts of this project was the colour palette. I wanted the palette to feel authentic to Persian restaurant culture, not just aesthetically pleasing. Through research and iteration, I developed a palette built around three core colours: a deep burgundy red, a warm traditional green, and a rich golden yellow. These colours carry deep cultural significance — they appear prominently in Persian architecture, textiles, ceramics, and food presentation, and are widely associated with warmth, hospitality, and abundance in Persian culture. I presented multiple palette variations to classmates and peers, gathered honest feedback on their cultural resonance and visual appeal, and used that input to finalise the combination that best captured the spirit of the brand.",
      "With the brand foundation solidified, I moved into layout and wireframing. I began with the desktop version, carefully planning each page's structure, information hierarchy, and user flow — from the landing page through the menu, reservation flow, and about section. Once the desktop layouts were refined and approved, I systematically adapted every screen for tablet and then mobile, rethinking layout proportions, navigation patterns, and content prioritisation for each breakpoint. The final deliverable was a fully interactive, multi-device Figma prototype that demonstrated the complete user experience across all three platforms.",
    ],
    responsibilities: [
      "As the sole designer on this project, I owned every phase of the design process from start to finish. This included conducting visual and cultural research, developing the full brand identity, designing and refining the logo, building the colour and typography systems, and creating all page layouts across desktop, tablet, and mobile. There was no team to delegate to — every decision, from the broadest brand direction to the smallest UI detail, was made and executed independently.",
      "On the UX side, I managed the full workflow: initial concept exploration, low-fidelity wireframing to map out structure and flow, iterative refinement based on feedback, high-fidelity UI design, and final interactive prototyping in Figma. I approached every screen not as an isolated design but as part of a cohesive system — ensuring that spacing, colour usage, typography, and component behaviour remained consistent and intentional across every page and every device format.",
      "I also served as my own creative director throughout the project — setting the visual tone, making judgement calls on design trade-offs, and ensuring the final prototype communicated both professional quality and genuine cultural identity. Presenting the work to peers for critique and incorporating that feedback into the final design was a key part of my process, helping me validate decisions and strengthen the overall result.",
    ],
    devices: [
      {
        type: "phone",
        figmaEmbedUrl:
          "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2Fplaceholder-phone",
        isPrimary: true,
      },
      {
        type: "laptop",
        figmaEmbedUrl:
          "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2Fplaceholder-laptop",
        isPrimary: false,
      },
      {
        type: "tablet",
        figmaEmbedUrl:
          "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2Fplaceholder-tablet",
        isPrimary: false,
      },
    ],
    tools: [
      { name: "Figma", icon: "figma" },
      { name: "Canva", icon: "canva" },
      { name: "Photoshop", icon: "photoshop" },
    ],
    previewBg: "linear-gradient(160deg, #6B001E 0%, #3D000F 55%, #190008 100%)",
    previewAccent: "#D4A84B",
    previewImage: "/images/Saffron_Flame_Tablet.png",
    cardImage: "/images/Saffron_Home.png",
    mobileProtoUrl: "https://embed.figma.com/proto/fXwzPVgMMwtavaYn0SGS5g/Mobile-Web?node-id=72-402&starting-point-node-id=72-402&embed-host=share&scaling=min-zoom&content-scaling=fixed&show-proto-sidebar=0&hide-ui=1",
    tabletProtoUrl: "https://embed.figma.com/proto/fXwzPVgMMwtavaYn0SGS5g/Mobile-Web?page-id=1%3A2&node-id=109-1467&viewport=143%2C251%2C0.08&t=rAQIJ8Fr6lPfKkPg-1&scaling=min-zoom&content-scaling=fixed&embed-host=share&hide-ui=1&show-proto-sidebar=0",
    desktopProtoUrl: "https://embed.figma.com/proto/fXwzPVgMMwtavaYn0SGS5g/Mobile-Web?page-id=121-164&node-id=156-429&embed-host=share&scaling=scale-down-width&show-proto-sidebar=0&hide-ui=1",
  },
  {
    id: "micdrop",
    slug: "micdrop",
    label: "MICDROP PROJECT",
    title: "MicDrop — Music Events",
    overview:
      "A mobile-first app for discovering and booking local music events. Designed for music lovers who want a seamless, visually immersive experience from discovery to checkout.",
    process: [
      "Started with competitive research across ticketing apps and music platforms, identifying key pain points around discovery and booking flow.",
      "Built user flows and low-fidelity wireframes, then translated them into a high-contrast dark-theme UI with bold typography and fluid micro-interactions.",
    ],
    responsibilities: [
      "End-to-end UX/UI design including information architecture, wireframing, visual design, and Figma prototyping.",
      "Designed the brand identity, colour system, and component library from scratch.",
    ],
    devices: [
      {
        type: "phone",
        figmaEmbedUrl:
          "https://embed.figma.com/proto/0ZnAbQMl8gv6Ad7aDe03dL/Project-Management?page-id=244%3A111&node-id=244-158&scaling=scale-down&content-scaling=fixed&starting-point-node-id=244%3A158&embed-host=share&hide-ui=1&show-proto-sidebar=0",
        isPrimary: true,
      },
      {
        type: "laptop",
        figmaEmbedUrl:
          "https://embed.figma.com/proto/0ZnAbQMl8gv6Ad7aDe03dL/Project-Management?page-id=279%3A249&node-id=460-146&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=460%3A146&embed-host=share&hide-ui=1&show-proto-sidebar=0",
        isPrimary: false,
      },
    ],
    tools: [
      { name: "Figma", icon: "figma" },
      { name: "Illustrator", icon: "illustrator" },
      { name: "After Effects", icon: "after-effects" },
    ],
    previewBg: "linear-gradient(160deg, #1a0d2e 0%, #2d1060 50%, #0d0818 100%)",
    previewAccent: "#CC44FF",
    previewImage: "/images/MicDrop_Tablet.png",
    cardImage: "/images/MicDrop_Home.png",
    phoneProtoZoom: 1.08,
    mobileProtoUrl:
      "https://embed.figma.com/proto/0ZnAbQMl8gv6Ad7aDe03dL/Project-Management?page-id=244%3A111&node-id=244%3A158&p=f&scaling=scale-down&content-scaling=fixed&starting-point-node-id=244%3A158&embed-host=share&hide-ui=1&show-proto-sidebar=0",
    desktopProtoUrl:
      "https://embed.figma.com/proto/0ZnAbQMl8gv6Ad7aDe03dL/Project-Management?page-id=279%3A249&node-id=460-146&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=460%3A146&embed-host=share&hide-ui=1&show-proto-sidebar=0",
  },
  {
    id: "leaders-taekwondo",
    slug: "leaders-taekwondo",
    label: "LEADERS TAEKWONDO PROJECT",
    title: "Leaders Taekwondo",
    overview:
      "Leaders Taekwondo is a real-world client project — a full brand recreation and professional website design for a local taekwondo academy owned by a personal contact. The client came to me with a clear need: their existing brand felt outdated and their online presence wasn't doing justice to the quality of their academy. They needed a complete redesign that would attract new students, communicate the discipline and strength of the sport, clearly present class schedules and membership options, and give the gym a professional digital identity that could compete with other martial arts studios in the area. This project gave me the experience of working directly with a real client, navigating briefs, feedback cycles, and real-world constraints — all while delivering a polished, purposeful design.",
    process: [
      "The project kicked off with a detailed client briefing. The gym owner walked me through their vision for the brand, their current pain points, and what they wanted prospective students to feel when landing on the site. One of the first decisions made together was the colour direction: white, red, and black — a palette that aligned perfectly with traditional martial arts identity, communicated power and precision, and gave the design a bold, high-contrast foundation to build on. With the colour direction locked in from the client side, I had a clear visual framework to begin shaping the rest of the brand around.",
      "Before touching any layouts, I conducted thorough competitor research — reviewing the websites of other taekwondo gyms, karate academies, and martial arts studios operating in the surrounding area. I analysed their site structures, how they presented class information, what calls-to-action they used, how they handled membership pricing, and where they fell short in terms of clarity and visual quality. This research gave me a strong understanding of industry conventions and helped me identify specific opportunities to make Leaders Taekwondo stand out — both in terms of aesthetic strength and ease of use for prospective students.",
      "A distinctive part of this project was the approach to photography. Rather than relying on generic stock images that would make the site feel impersonal, I generated all visuals used throughout the website using AI image generation tools. Every image was carefully prompted and selected to feel custom, on-brand, and consistent in tone — reflecting the discipline, athleticism, and energy of taekwondo practice. This gave the site a cohesive visual identity that felt purpose-built for the academy rather than assembled from a stock library.",
      "The site was designed around the key pages the client specifically requested: a Schedule page, structured to give both current members and prospective students an immediate, scannable view of available class times, session types, and skill levels; and a Membership page, built to clearly communicate pricing tiers, what each membership includes, and how to get started — with conversion in mind at every step. Additional pages including the homepage, about section, and contact page were also fully designed to support the overall experience and brand narrative.",
    ],
    responsibilities: [
      "I took complete ownership of this project from the initial brief through to the final high-fidelity prototype. My responsibilities spanned brand strategy and visual identity direction, AI-assisted custom image generation, full information architecture planning, UI design across all key pages, and responsive layout design optimised for desktop viewing with consideration for other devices.",
      "Throughout the project, I maintained a close working relationship with the client — presenting design concepts at key milestones, walking through rationale for design decisions, collecting structured feedback, and iterating across multiple rounds of revision to ensure the final result genuinely reflected the client's vision while also meeting the needs of their target audience.",
      "This project also required me to navigate the realities of working with a real client outside of an academic setting — including managing timelines, adapting to shifting priorities, and communicating design decisions in a way that was clear and approachable to someone without a design background. The design is complete and has been well-received by the client. The next phase — domain setup, hosting configuration, and live deployment — is actively being coordinated, with the site on track to launch by the end of July.",
    ],
    devices: [
      {
        type: "laptop",
        figmaEmbedUrl:
          "https://embed.figma.com/proto/B09jkYh8eFHt1zEB6WpZsf/Revised_-Prototype?page-id=0%3A1&node-id=1-347&scaling=scale-down-width&content-scaling=fixed&embed-host=share&hide-ui=1&show-proto-sidebar=0",
        isPrimary: true,
      },
    ],
    desktopProtoUrl:
      "https://embed.figma.com/proto/B09jkYh8eFHt1zEB6WpZsf/Revised_-Prototype?page-id=0%3A1&node-id=1-347&scaling=scale-down-width&content-scaling=fixed&embed-host=share&hide-ui=1&show-proto-sidebar=0",
    tools: [
      { name: "Figma", icon: "figma" },
      { name: "Photoshop", icon: "photoshop" },
      { name: "Illustrator", icon: "illustrator" },
    ],
    previewBg: "linear-gradient(160deg, #0d0d0d 0%, #1a0000 55%, #0d0d0d 100%)",
    previewAccent: "#C0392B",
    previewImage: "/images/Leaders_Taekwondo_Tablet.png",
    cardImage: "/images/Leaders_Home.png",
  },
]
