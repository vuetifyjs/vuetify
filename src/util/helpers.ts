export function createSimpleFunctional (c, el = 'div', name) {
  name = name || c.replace(/__/g, '-')

  // TODO: remove after close
  // https://github.com/vuetifyjs/vuetify/issues/1561
  name = name.split('-')[0] === 'v' ? name : `v-${name}`

  return {
    name: name,
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

export function getNestedValue (obj, path, fallback) {
  const last = path.length - 1

  if (last < 0) return obj === undefined ? fallback : obj

  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback
    }
    obj = obj[path[i]]
  }

  if (obj == null) return fallback

  return obj[path[last]] === undefined ? fallback : obj[path[last]]
}

export function deepEqual (a, b) {
  if (a === b) return true

  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false
  }

  const props = Object.keys(a)

  if (props.length !== Object.keys(b).length) {
    // Different number of props, don't bother to check
    return false
  }

  return props.every(p => deepEqual(a[p], b[p]))
}

export function getObjectValueByPath (obj, path, fallback) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (!path || path.constructor !== String) return fallback
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  return getNestedValue(obj, path.split('.'), fallback)
}

export function getPropertyFromItem (item, property, fallback) {
  if (property == null) return item === undefined ? fallback : item

  if (item !== Object(item)) return fallback === undefined ? item : fallback

  if (property.constructor === String) return getObjectValueByPath(item, property, fallback)

  if (Array.isArray(property)) return getNestedValue(item, property, fallback)

  if (typeof property !== 'function') return fallback

  const value = property(item, fallback)

  return typeof value === 'undefined' ? fallback : value
}

export function createRange (length) {
  return [...Array.from({ length }, (v, k) => k)]
}

export function getZIndex (el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0

  const index = window.getComputedStyle(el).getPropertyValue('z-index')

  if (isNaN(index)) return getZIndex(el.parentNode)
  return index
}

const tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
}

export function escapeHTML (str) {
  return str.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag)
}

export function filterObjectOnKeys (obj, keys) {
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

export function convertToUnit (str, unit = 'px') {
  return isNaN(str) ? str : `${Number(str)}${unit}`
}

export function kebabCase (str) {
  return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

// KeyboardEvent.keyCode aliases
export const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34
})
