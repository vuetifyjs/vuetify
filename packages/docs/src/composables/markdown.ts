export function useMarkdown () {
  const route = useRoute()
  const frontmatter = useFrontmatter()
  const copied = ref(false) // Manually manage copied state
  const isClipboardSupported = !!navigator.clipboard // Check for native clipboard support

  // TODO: This isn't working
  async function copyPageAsMarkdown () {
    if (!isClipboardSupported) {
      console.error('Native Clipboard API is not supported.')
      return
    }

    let markdownContent = `# ${frontmatter.value?.meta.title || 'Page Title'}\\n\\n`
    markdownContent += `Source: ${window.location.origin}${route.path}\\n\\n`

    try {
      const mdPath = `/src/pages${route.path.replace(/\/$/,'')}.md`
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
      setTimeout(() => { copied.value = false }, 2000) // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err)
      // You might want to inform the user that copying failed
    }
  }

  return {
    copyPageAsMarkdown,
    copied,
    isClipboardSupported,
  }
}
