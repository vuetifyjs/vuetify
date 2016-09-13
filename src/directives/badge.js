var defaults = {
  icon: false,
  left: false,
  overlap: false
}

function directive (el, binding, bind) {
  let config = {}

  Object.assign(
    config,
    defaults,
    binding.modifiers,
    { value: binding.arg },
    binding.value || {}
  )

  if (config.overlap) el.classList.add('badge--overlap')
  if (config.icon)    el.classList.add('badge--icon')
  if (config.left)    el.classList.add('badge--left')

  if (bind) {
    el.setAttribute('data-badge', config.value)
    el.classList.add('badge')
  } else {
    el.removeAttribute('data-badge')
    el.classList.remove('badge')
  }
}

export default {
  bind (el, binding) {
    directive(el, binding, true)
  },

  updated (el, binding, v) {
    v.context.$nextTick(() => directive(el, binding, true))
  },

  componentUpdated (el, binding, v) {
    v.context.$nextTick(() => directive(el, binding, true))
  },

  unbind (el, binding) {
    directive(el, binding, false)
  }
}