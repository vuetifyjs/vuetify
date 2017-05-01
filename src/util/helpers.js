export function createSimpleFunctional (c, el = 'div') {
  return {
    functional: true,

    render: (h, { data, children }) => {
      data.staticClass = data.staticClass ? `${c} ${data.staticClass}` : c

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

export function closestParentTag (tag) {
  let parent = this.$parent

  while (parent) {
    if (!parent.$options._componentTag) return null
    if (parent.$options._componentTag === tag) return parent

    parent = parent.$parent
  }

  return null
}

export function addOnceEventListener (el, event, cb) {
  var once = () => {
    cb()
    el.removeEventListener(event, once, false)
  }

  el.addEventListener(event, once, false)
}

export function browserTransform (el, value) {
  [
    'transform',
    'webkitTransform'
  ].forEach(i => {
    el.style[i] = value
  })
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `execAsap` is passed, trigger the function on the
// leading edge, instead of the trailing.
//
// Example:
// var calculateLayout = function () { ... }
// window.addEventListner('resize', debounce(calculateLayout, 300)
export function debounce (func, threshold, execAsap) {
  var timeout

  return function debounced () {
    var obj = this
    var args = arguments

    function delayed () {
      if (!execAsap) func.apply(obj, args)
      timeout = null
    }

    if (timeout) clearTimeout(timeout)
    else if (execAsap) func.apply(obj, args)

    timeout = setTimeout(delayed, threshold || 100)
  }
}

export function getObjectValueByPath (obj, path) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (!path || path.constructor !== String) return
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '')           // strip a leading dot
  let a = path.split('.')
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
