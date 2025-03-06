type Frontmatter = {
  meta: {
    nav?: string
    title: string
    description?: string
    keywords?: string[]
  }
  assets?: string[]
  backmatter?: boolean
  features?: {
    figma?: boolean
    label?: string
    report?: string
    github?: string
    spec?: string
  }
  fluid?: boolean
  related?: string[]
  toc?: TocItem[]
}

type TocItem = {
  to: string
  text: string
  level: number
}

export function useFrontmatter () {
  const router = useRouter()

  const frontmatter = shallowRef<Frontmatter>()
  let timeout = 750
  watch(router.currentRoute, route => {
    setTimeout(() => {
      frontmatter.value = (route.matched.at(-1)!.instances.default as any)?.frontmatter
      timeout = 0
    }, timeout)
  }, { immediate: true })

  return readonly(frontmatter)
}
