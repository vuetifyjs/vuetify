import octokit from '@/plugins/octokit'

export function useMarkdown () {
  const one = useOneStore()
  const route = useRoute()
  const frontmatter = useFrontmatter()
  const copied = shallowRef(false)
  const isClipboardSupported = !!navigator.clipboard

  const branch = getBranch()

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
      const path = `packages/docs/src/pages${route.path.replace(/\/$/, '')}.md`

      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'vuetifyjs',
        repo: 'vuetify',
        path,
        ref: branch,
      })

      if (response.data && 'content' in response.data) {
        const rawMd = atob(response.data.content)
        const contentWithoutFrontmatter = rawMd.replace(/---[\\s\\S]*?---/, '').trim()
        markdownContent += contentWithoutFrontmatter
      } else {
        markdownContent += 'Could not fetch page content.'
      }
    } catch (error) {
      console.error('Error fetching page content from GitHub:', error)
      markdownContent += 'Error fetching page content.'
    }

    try {
      navigator.clipboard.writeText(markdownContent)
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
