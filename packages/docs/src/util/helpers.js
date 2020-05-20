// Utilities
import { preferredLanguage } from '@/router/util'

// Must be called in Vue context
export function goTo (id) {
  this.$vuetify.goTo(id).then(() => {
    if (!id) return (document.location.hash = '')

    if (history.replaceState) {
      history.replaceState(null, null, id)
    } else {
      document.location.hash = id
    }
  })
}

export function getComponent (type) {
  switch (type) {
    case 'alert': return 'doc-alert'
    case 'accessibility': return 'doc-accessibility'
    case 'api': return 'doc-api'
    case 'checklist': return 'doc-checklist'
    case 'example': return 'doc-example'
    case 'examples': return 'doc-examples'
    case 'functional': return 'doc-functional'
    case 'heading': return 'base-heading'
    case 'img': return 'doc-img'
    case 'text': return 'doc-text'
    case 'markup': return 'doc-markup'
    case 'markdown': return 'base-markdown'
    case 'parameters': return 'doc-parameters'
    case 'playground': return 'doc-playground'
    case 'section': return 'doc-section'
    case 'supplemental': return 'doc-supplemental'
    case 'tree': return 'doc-tree'
    case 'up-next': return 'doc-up-next'
    case 'usage': return 'doc-usage'
    case 'usage-new': return 'doc-usage-new'
    case 'locales': return 'doc-locales'
    case 'variable-api': return 'doc-variable-api'
    default: return type
  }
}

export function parseLink (match, text, link) {
  const isInternal = !(
    link.indexOf('http') > -1 ||
    link.indexOf('mailto') > -1
  )
  const isSamePage = link.startsWith('#')

  const attrs = isInternal ? '' : `target="_blank" rel="noopener"`
  const classes = 'v-markdown--link'
  const icon = isInternal ? 'page-next' : 'open-in-new'
  const [url = '', hash = ''] = link.split('#')

  if (isInternal && !isSamePage) {
    // Reset link
    link = `/${preferredLanguage()}`

    // Remove leading/trailing slashes
    if (url) link += `/${url.replace(/^\/|\/$/, '')}/`
    // Append hash
    if (hash) link += `#${hash}`
  } else if (isInternal && hash) {
    link = `#${hash}`
  }

  return `<a href="${link}" ${attrs} class="${classes}">${text}<i class="v-icon mdi mdi-${icon}"></i></a>`
}

export async function waitForReadystate () {
  if (
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    document.readyState !== 'complete'
  ) {
    await new Promise(resolve => {
      const cb = () => {
        window.requestAnimationFrame(resolve)
        window.removeEventListener('load', cb)
      }

      window.addEventListener('load', cb)
    })
  }
}

export function genChip (item) {
  if (item.new) return 'new'
  if (item.updated) return 'updated'
  if (item.deprecated) return 'deprecated'
  if (item.help) return 'help'
}

export function getBranch () {
  const branch = window
    ? window.location.hostname.split('.')[0]
    : 'master'

  return ['master', 'dev', 'next'].includes(branch) ? branch : 'master'
}

export function copyElementContent (el) {
  el.setAttribute('contenteditable', 'true')
  el.focus()

  document.execCommand('selectAll', false, null)
  document.execCommand('copy')

  el.removeAttribute('contenteditable')
}
