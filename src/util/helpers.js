export function createSimpleFunctional (c, el = 'div') {
  return {
    functional: true,

    render: (h, { data, children }) => {
      data.staticClass = data.staticClass ? `${c} ${data.staticClass}` : c

      return h(el, data, children)
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

export function closest (className) {
  let parent = this.$parent

  while(parent) {
    if (!parent.$el) {
      return null
    }
    
    if (parent.$el.classList.contains(className)) {
      return parent._uid
    }

    parent = parent.$parent
  }

  return null
}