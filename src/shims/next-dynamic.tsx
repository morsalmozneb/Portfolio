import { lazy, Suspense, type ComponentType, type ReactElement } from "react"

type Loader<TProps> = () => Promise<{ default: ComponentType<TProps> }>

type DynamicOptions = {
  ssr?: boolean
  loading?: () => ReactElement | null
}

export default function dynamic<TProps = Record<string, never>>(
  loader: Loader<TProps>,
  options?: DynamicOptions
) {
  const LazyComponent = lazy(loader)
  const Loading = options?.loading

  return function DynamicComponent(props: TProps) {
    return (
      <Suspense fallback={Loading ? <Loading /> : null}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}
