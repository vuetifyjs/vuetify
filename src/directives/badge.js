import {
  directiveConfig
} from '../util/helpers'

function directive (el, binding) {
  const config = directiveConfig(
    binding,
    {
      icon: false,
      left: false,
      overlap: false
    }
  )

  if (config.overlap) el.classList.add('badge--overlap')
  if (config.icon)    el.classList.add('badge--icon')
  if (config.left)    el.classList.add('badge--left')

  el.dataset.badge = config.value
  el.classList.add('badge')
}

export default {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: (el) => {
    el.removeAttribute('data-badge')
    el.classList.remove('badge')
  }
}