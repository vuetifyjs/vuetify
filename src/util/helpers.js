export function createSimpleFunctional (c, el = 'div', name) {
  name = name || c.replace(/__/g, '-')

  return {
    name: `v-${name}`,
    functional: true,

    render: (h, { data, children }) => {
      data.staticClass = (`${c} ${data.staticClass || ''}`).trim()

      return h(el, data, children)
    }
  }
}

export function createSimpleTransition (name, origin = 'top center 0', mode) {
  return {
    name,

    functional: true,

    props: {
      origin: {
        type: String,
        default: origin
      }
    },

    render (h, context) {
      context.data = context.data || {}
      context.data.props = { name }
      context.data.on = context.data.on || {}
      if (!Object.isExtensible(context.data.on)) {
        context.data.on = { ...context.data.on }
      }

      if (mode) context.data.props.mode = mode

      context.data.on.beforeEnter = el => {
        el.style.transformOrigin = context.props.origin
        el.style.webkitTransformOrigin = context.props.origin
      }

      return h('transition', context.data, context.children)
    }
  }
}

export function createJavaScriptTransition (name, functions, css = true, mode = 'in-out') {
  return {
    name,

    functional: true,

    props: {
      css: {
        type: Boolean,
        default: css
      },
      mode: {
        type: String,
        default: mode
      }
    },

    render (h, context) {
      const data = {
        props: {
          ...context.props,
          name
        },
        on: functions
      }

      return h('transition', data, context.children)
    }
  }
}

export function directiveConfig (binding, defaults = {}) {
  return Object.assign({},
    defaults,
    binding.modifiers,
    { value: binding.arg },
    binding.value || {}
  )
}

export function addOnceEventListener (el, event, cb) {
  var once = () => {
    cb()
    el.removeEventListener(event, once, false)
  }

  el.addEventListener(event, once, false)
}

export function getNestedValue (obj, path) {
  for (let i = 0, m = path.length; i < m; i++) {
    if (obj === null || obj === undefined) {
      return
    }
    obj = obj[path[i]]
  }
  return obj;
}

export function getObjectValueByPath (obj, path) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (!path || path.constructor !== String) return
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  return getNestedValue(obj, path.split('.'))
}

export function createRange (length) {
  return [...Array.from({ length }, (v, k) => k)]
}

export function getZIndex (el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0
  var zi = document.defaultView.getComputedStyle(el).getPropertyValue('z-index')
  if (isNaN(zi)) return getZIndex(el.parentNode)

  return zi
}

const tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
}

export function escapeHTML (str) {
  return str.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag)
}

export function looseEqual(a, b) {
    if (a === b) return true
    if (typeof a !== 'object' || typeof b !== 'object') {
        // If the values aren't objects, they were already checked for equality
        return false
    }
    const props = Object.keys(a)
    if (props.length !== Object.keys(b).length) {
        // Different number of props, don't bother to check
        return false
    }
    return props.every(p => looseEqual(a[p], b[p]));
}

export function filterObjectOnKeys(obj, keys) {
  const filtered = {}

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (typeof obj[key] !== 'undefined') {
      filtered[key] = obj[key]
    }
  }

  return filtered
}

export function filterChildren (array = [], tag) {
  return array.filter(child => {
    return child.componentOptions &&
      child.componentOptions.Ctor.options.name === tag
  })
}
