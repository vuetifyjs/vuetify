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

    let markdownContent = `# ${frontmatter.value?.meta.title || 'Page Title'}\n\n`
    markdownContent += `Source: ${window.location.origin}${route.path}\n\n`

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
        let processedMd = rawMd

        // Remove paired <ApiInline>...</ApiInline> and <ExamplesUsage>...</ExamplesUsage> tags completely
        processedMd = processedMd
          .replace(/<ApiInline[\s\S]*?>([\s\S]*?<\/ApiInline>)?/g, '')
          .replace(/<ExamplesUsage[\s\S]*?>([\s\S]*?<\/ExamplesUsage>)?/g, '')

        // Replace every <ExamplesExample ...> tag with the raw Vue source of its file
        if (processedMd.includes('<ExamplesExample')) {
          const tagRegex = /<ExamplesExample\b([^>]*?)>(?:[\s\S]*?<\/ExamplesExample>)|<ExamplesExample\b([^>]*?)\/>/g
          const matches = [...processedMd.matchAll(tagRegex)]

          for (const m of matches) {
            const attrs = m[1] ?? m[2] ?? ''
            const fileMatch = attrs.match(/\bfile\s*=\s*"([^"]+)"/)
            if (!fileMatch) {
              // Remove tag if no file attribute
              processedMd = processedMd.replace(m[0], '')
              continue
            }

            const filePath = fileMatch[1].replace(/\\+/g, '/').replace(/\/$/, '')
            const pathExamples = `packages/docs/src/examples/${filePath}.vue`

            try {
              const responseExamples = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: 'vuetifyjs',
                repo: 'vuetify',
                path: pathExamples,
                ref: branch,
              })

              if (responseExamples.data && 'content' in responseExamples.data) {
                const rawVue = atob(responseExamples.data.content)
                // Replace whole tag with fenced code block of the example source
                processedMd = processedMd.replace(m[0], `\n\`\`\`vue\n${rawVue}\n\`\`\`\n`)
              } else {
                // If fetch fails, strip the tag to avoid leaving placeholders
                processedMd = processedMd.replace(m[0], '')
              }
            } catch (e) {
              console.error('Error fetching example file', filePath, e)
              processedMd = processedMd.replace(m[0], '')
            }
          }
        }

        const contentWithoutFrontmatter = processedMd.replace(/---[\s\S]*?---/, '').trim()
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
