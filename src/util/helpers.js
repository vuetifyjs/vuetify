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

export function getObjectValueByPath (obj, path) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (!path || path.constructor !== String) return
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  const a = path.split('.')
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i]
    if (obj instanceof Object && k in obj) {
      obj = obj[k]
    } else {
      return
    }
  }
  return obj
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
