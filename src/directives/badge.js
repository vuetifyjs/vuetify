import {
  directiveConfig
} from '../util/helpers'

function directive (el, binding) {
  const config = directiveConfig(
    binding,
    {
      icon: false,
      left: false,
      bottom: false,
      overlap: false,
      visible: true
    }
  )

  if (!config.visible || (binding.expression && !binding.value)) {
    return unbind(el)
  }

  if (config.overlap) el.classList.add('badge--overlap')
  if (config.icon) el.classList.add('badge--icon')
  if (config.left) el.classList.add('badge--left')
  if (config.bottom) el.classList.add('badge--bottom')

  el.dataset.badge = config.value
  el.classList.add('badge')
}

function unbind (el) {
  el.removeAttribute('data-badge')
  el.classList.remove('badge')
}

export default {
  name: 'badge',
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: unbind
}
