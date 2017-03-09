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

    render (createElement, context) {
      const origin = (context.data.attrs || context.data.props || {}).origin || 'top center 0'
      const data = context.data || {}

      data.props = { name }
      data.on = data.on || {}
      data.on.beforeEnter = (el) => {
        el.style.transformOrigin = origin
        el.style.webkitTransformOrigin = origin
      }

      return createElement('transition', data, context.children)
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
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing. Adapted from Underscore.js.
//
// Example:
// var lazyLayout = debounce(calculateLayout, 300);
// windowResize(lazyLayout);
export function debounce (func, wait, immediate) {
  var timeout, result

  var later = function (context, args) {
    timeout = null
    if (args) result = func.apply(context, args)
  }

  var debounced = function (...args) {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(later, wait)
      if (callNow) result = func.apply(this, args)
    } else {
      timeout = delay(later, wait, this, args)
    }

    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied. Adapted from Underscore.js.
export function delay (func, wait, ...args) {
  return setTimeout(function () {
    return func.apply(null, args)
  }, wait)
}
