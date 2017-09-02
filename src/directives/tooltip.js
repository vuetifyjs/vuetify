import {
  directiveConfig
} from '../util/helpers'

function directive (el, binding) {
  const config = directiveConfig(
    binding,
    {
      top: true,
      visible: true
    }
  )

  if (!config.visible || (binding.expression && !binding.value)) {
    return unbind(el)
  }

  unbind(el, binding, config)

  el.dataset.tooltip = config.html
  el.dataset['tooltipLocation'] = config.value
}

function unbind (el) {
  el.removeAttribute('data-tooltip')
  el.removeAttribute('data-tooltip-location')
}

export default {
  name: 'tooltip',
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: unbind
}
