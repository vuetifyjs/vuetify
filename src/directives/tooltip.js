var defaults = {
  top: true
}

function directive (el, binding, bind = true) {
  let config = {}

  Object.assign(
    config,
    defaults,
    binding.modifiers,
    { value: binding.arg },
    binding.value || {}
  )

  if (bind) {
    el.setAttribute('data-tooltip', config.html)
    el.classList.add('tooltip')
    el.classList.add(`tooltip--${config.value}`)
  } else {
    el.removeAttribute('data-tooltip', config.html)
    el.classList.remove('tooltip')
    el.classList.remove(`tooltip--${config.value}`)
  }
}

export default {
  bind (el, binding) {
    directive(el, binding)
  },

  updated (el, binding, v) {
    directive(el, binding)
  },

  componentUpdated (el, binding) {
    directive(el, binding)
  },

  unbind (el, binding) {
    directive(el, binding, false)
  }
}