import {
  directiveConfig
} from '../util/helpers'

function directive (el, binding) {
  const config = directiveConfig(
    binding,
    {
      top: true
    }
  )

  if (bind) {
    el.dataset.tooltip = config.html
    el.classList.add('tooltip')
    el.classList.add(`tooltip--${config.value}`)
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
    el.removeAttribute('data-tooltip', config.html)
    el.classList.remove('tooltip')
    el.classList.remove(`tooltip--${config.value}`)
  }
}