export function createSimpleFunctional (c, el = 'div') {
  return {
    functional: true,

    render: (h, { data, children }) => {
      data.staticClass = data.staticClass ? ` ${c}` : c

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