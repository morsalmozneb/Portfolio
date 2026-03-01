import type { CSSProperties, ImgHTMLAttributes } from "react"

type NextImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string
  alt: string
  fill?: boolean
  sizes?: string
  priority?: boolean
}

export default function Image({ fill, style, ...props }: NextImageProps) {
  const mergedStyle: CSSProperties = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...style,
      }
    : { ...style }

  return <img {...props} style={mergedStyle} />
}
