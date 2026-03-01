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
      "A comprehensive digital experience for a Persian restaurant, designed to bring authentic flavours and cultural identity to life through intuitive ordering and seamless navigation.",
    process: [
      "This project followed a structured design process: research, brand development, wireframing, and prototyping.",
      "I began by exploring how Persian restaurants present themselves visually and experientially, then created a custom style guide that captured the essence of Persian cuisine: rich, vibrant, and inviting.",
      "Desktop wireframes came first, which I then refined and adapted for mobile and tablet. The final prototype, built entirely in Figma, brings the brand to life across all screen sizes.",
    ],
    responsibilities: [
      "As a solo project, I handled every aspect of the design process: brand identity development, UX research, wireframing, UI design, and prototyping.",
      "My work spanned logo creation, colour and typography systems, responsive layout design, and interactive prototype development in Figma.",
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
      "A bold, purpose-driven website for a martial arts academy. Designed to communicate strength, discipline, and community while making it easy for new students to explore classes and book trials.",
    process: [
      "Began with stakeholder interviews and a review of competitor martial arts sites to understand positioning.",
      "Developed a strong visual identity centred on power and trust: dark backgrounds, red accents, and structured typographic hierarchy.",
    ],
    responsibilities: [
      "Full brand direction, web UI design, and responsive layout across desktop and mobile.",
      "Designed custom icon set and section layouts optimised for conversions.",
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
