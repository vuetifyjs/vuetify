export function createSimpleFunctional (c, el = 'div') {
  return {
    functional: true,

    render: (h, { data, children }) => {
      data.staticClass = data.staticClass ? `${c} ${data.staticClass || ''}` : c

      return h(el, data, children)
    }
  }
}

export function createSimpleTransition (name) {
  return {
    functional: true,

    render (h, context) {
      const origin = (context.data.attrs || context.data.props || {}).origin || 'top center 0'
      context.data = context.data || {}
      context.data.props = { name }
      context.data.on = context.data.on || {}

      context.data.on.beforeEnter = el => {
        el.style.transformOrigin = origin
        el.style.webkitTransformOrigin = origin
      }

      return h('transition', context.data, context.children)
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
  path = path.replace(/^\./, '')           // strip a leading dot
  const a = path.split('.')
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i]
    if (obj.constructor === Object && k in obj) {
      obj = obj[k]
    } else {
      return
    }
  }
  return obj
}
