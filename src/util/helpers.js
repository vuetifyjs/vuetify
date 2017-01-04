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
      let origin = (context.data.attrs || {}).origin || 'top center 0'

      let data = Object.assign({},
        (context.data || {}),
        {
          props: { name },
          on: {
            beforeEnter (el) {
              el.style.transformOrigin = origin
            }
          }
        }
      )

      return createElement('transition', data, context.children)
    }
  }
}

export function directiveConfig (binding, defaults = {}) {
  return Object.assign(
    defaults,
    binding.modifiers,
    { value: binding.arg },
    binding.value || {}
  )
}

export function closestParentTag (tag) {
  let parent = this.$parent

  while(parent) {
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