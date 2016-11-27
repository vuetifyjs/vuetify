import {
  directiveConfig
} from '../util/helpers'

function directive (el, binding) {
  const config = directiveConfig(
    binding,
    { top: true }
  )

  el.dataset.tooltip = config.html
  el.classList.add('tooltip')
  el.classList.add(`tooltip--${config.value}`)
}

export default {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind (el, binding) {
    const config = directiveConfig(
      binding,
      { top: true }
    )
    
    el.removeAttribute('data-tooltip', config.html)
    el.classList.remove('tooltip')
    el.classList.remove(`tooltip--${config.value}`)
  }
}