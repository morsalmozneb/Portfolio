const rawBasePath = import.meta.env.BASE_URL ?? "/"

export const BASE_PATH = rawBasePath.endsWith("/") ? rawBasePath : `${rawBasePath}/`
export const SITE_URL = "https://morsalmozneb.com"

export const withBase = (path: string) => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path
  return `${BASE_PATH}${cleanPath}`.replace(/\/{2,}/g, "/")
}

export const toAbsoluteUrl = (path: string) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${cleanPath}`
}

export const siteLinks = {
  linkedin: "https://www.linkedin.com/in/morsal-mozneb",
  youtube: "https://www.youtube.com/@MorsalMozneb95",
  email: "mailto:morsalehmozneb@gmail.com",
  resume: withBase("/resume/Morsal-Mozneb-Resume.pdf"),
}

export const siteMetadata = {
  defaultTitle: "Morsal Mozneb | Portfolio",
  defaultDescription:
    "Portfolio of Morsal Mozneb, a creative developer and digital designer focused on polished interfaces, interactive storytelling, and thoughtful front-end experiences.",
  ogImage: toAbsoluteUrl("/images/Morsal_Portrait.png"),
}
