export function createSimpleFunctional (c, el = 'div') {
  return {
    functional: true,

    render: (h, context) => {
      context.data.class = context.data.class || []
      context.data.class.push(c)

      return h(el, context.data, context.children)
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
    if (!parent.$options._componentTag) {
      return null
    }

    if (parent.$options._componentTag === tag) {
      return parent
    }

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

