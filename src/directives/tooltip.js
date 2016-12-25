import {
  directiveConfig
} from '../util/helpers'

function directive (el, binding) {
  const config = directiveConfig(
    binding,
    { top: true }
  )

  unbind(el, binding, config)

  el.dataset.tooltip = config.html
  el.dataset['tooltipLocation'] = config.value
}

function unbind (el, binding, config) {
  el.removeAttribute('data-tooltip')
  el.removeAttribute('data-tooltip-location')
}

export default {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: unbind
}