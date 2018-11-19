export function camel (str) {
  const camel = (str || '').replace(/-([^-])/g, g => g[1].toUpperCase())

  return capitalize(camel)
}

export function camelActual (str) {
  return (str || '').replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

export function kebab (str) {
  return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function capitalize (str) {
  str = str || ''

  return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`
}

export function randomNumber (min, max) {
  return Math.floor(Math.random() * max) + min
}

export function randomString (length = 5) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

// Must be called in Vue context
export function goTo (id) {
  this.$vuetify.goTo(id).then(() => {
    if (!id) {
      return (document.location.hash = '')
    }

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
    case 'api': return 'doc-api'
    case 'checklist': return 'doc-checklist'
    case 'example': return 'doc-example'
    case 'examples': return 'doc-examples'
    case 'heading': return 'doc-heading'
    case 'img': return 'doc-img'
    case 'text': return 'doc-text'
    case 'markup': return 'doc-markup'
    case 'markdown': return 'doc-markdown'
    case 'parameters': return 'doc-parameters'
    case 'section': return 'doc-section'
    case 'supplemental': return 'doc-supplemental'
    case 'tree': return 'doc-tree'
    case 'usage': return 'doc-usage'
    default: return type
  }
}

export function parseLink (match, text, link) {
  let attrs = ''
  let linkClass = 'markdown--link'
  let icon = ''

  // External link
  if (link.indexOf('http') > -1) {
    attrs = `target="_blank" rel="noopener"`
    icon = 'open-in-new'
    linkClass += ' markdown--external'
  // Same page internal link
  } else if (link.charAt(0) === '#') {
    linkClass += ' markdown--same-internal'
    icon = 'pound'
  // Different page internal link
  } else {
    linkClass += ' markdown--internal'
    icon = 'page-next'
  }

  return `<a href="${link}" ${attrs} class="${linkClass}">${text}<i class="v-icon mdi mdi-${icon}"></i></a>`
}
