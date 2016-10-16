function directive (el, binding) {
  const config = Object.assign(
    {
      icon: false,
      left: false,
      overlap: false
    },
    binding.modifiers,
    { 
      value: binding.arg
    },
    binding.value || {}
  )

  if (config.overlap) el.classList.add('badge--overlap')
  if (config.icon)    el.classList.add('badge--icon')
  if (config.left)    el.classList.add('badge--left')

  el.setAttribute('data-badge', config.value)
  el.classList.add('badge')
}

export default {
  bind: (el, binding) => {
    directive(el, binding)
  },

  updated: (el, binding) => {
    directive(el, binding)
  },

  componentUpdated: (el, binding) => {
    directive(el, binding)
  },

  unbind: (el) => {
    el.removeAttribute('data-badge')
    el.classList.remove('badge')
  }
}