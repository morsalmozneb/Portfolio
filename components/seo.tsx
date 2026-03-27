import { useEffect } from "react"
import { siteMetadata, toAbsoluteUrl, withBase } from "@/lib/site"

type SeoProps = {
  title: string
  description: string
  path: string
  image?: string
}

function upsertMeta(
  selector: string,
  attributeName: "name" | "property",
  attributeValue: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement("meta")
    element.setAttribute(attributeName, attributeValue)
    document.head.appendChild(element)
  }

  element.content = content
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement("link")
    element.rel = rel
    document.head.appendChild(element)
  }

  element.href = href
}

export function Seo({ title, description, path, image = siteMetadata.ogImage }: SeoProps) {
  useEffect(() => {
    const canonicalUrl = toAbsoluteUrl(path)

    document.title = title

    upsertMeta('meta[name="description"]', "name", "description", description)
    upsertMeta('meta[property="og:title"]', "property", "og:title", title)
    upsertMeta('meta[property="og:description"]', "property", "og:description", description)
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website")
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl)
    upsertMeta('meta[property="og:image"]', "property", "og:image", image)
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image")
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title)
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description)
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", image)
    upsertLink("canonical", canonicalUrl)
    upsertLink("icon", withBase("/icon.svg"))
  }, [description, image, path, title])

  return null
}
