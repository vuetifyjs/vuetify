export function useMarkdown () {
  const one = useOneStore()
  const route = useRoute()
  const frontmatter = useFrontmatter()
  const copied = shallowRef(false)
  const isClipboardSupported = !!navigator.clipboard

  async function copyPageAsMarkdown () {
    if (!isClipboardSupported) {
      console.error('Native Clipboard API is not supported.')
      return
    }

    if (!one.isSubscriber) {
      console.error('You must be a subscriber to use this feature.')
      return
    }

    let markdownContent = `# ${frontmatter.value?.meta.title || 'Page Title'}\\n\\n`
    markdownContent += `Source: ${window.location.origin}${route.path}\\n\\n`

    try {
      const mdPath = `/src/pages${route.path.replace(/\/$/, '')}.md`
      const response = await fetch(mdPath)
      if (response.ok) {
        const rawMd = await response.text()
        const contentWithoutFrontmatter = rawMd.replace(/---[\\s\\S]*?---/, '').trim()
        markdownContent += contentWithoutFrontmatter
      } else {
        markdownContent += 'Could not fetch page content.'
      }
    } catch (error) {
      console.error('Error fetching page content:', error)
      markdownContent += 'Error fetching page content.'
    }

    try {
      await navigator.clipboard.writeText(markdownContent)
      copied.value = true
      setTimeout(() => (copied.value = false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return {
    copyPageAsMarkdown,
    copied,
    isClipboardSupported,
  }
}
