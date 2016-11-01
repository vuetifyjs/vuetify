import {
  directiveConfig
} from '../util/helpers'

function dropdown (e, el, config, bus) {
  e.preventDefault()

  const component = document.getElementById(config.value)
  let width = 0
  let height = 0

  if (component.clientWidth > el.clientWidth
      && component.hasAttribute('data-right')
  ) {
    width = component.clientWidth - el.clientWidth
  }

  if (config.bottom) {
    height = el.clientHeight
  }

  component.style.minWidth = `${el.clientWidth}px`
  component.style.left = `${el.offsetLeft - width}px`
  component.style.top = `${el.offsetTop + height}px`
  
  bus.pub(`dropdown:open:${config.value}`)
}

function directive (el, binding, v) {
  const config = directiveConfig(
    binding,
    {
      hover: false
    }
  )

  el.dataset.dropdown = config.value

  if (!config.hover) {
    el.onclick = e => {
      dropdown(e, el, config, v.context.$vuetify.bus)
    }
  } else {
    el.onmouseenter = e => {
      dropdown(e, el, config, v.context.$vuetify.bus)
    }
  }
}

export default {
  bind (el, binding, v) {
    directive(el, binding, v)
  },

  updated (el, binding, v) {
    directive(el, binding, v)
  },

  componentUpdated (el, binding, v) {
    directive(el, binding, v)
  },

  unbind (el) {
    el.removeAttribute('onclick')
    el.removeAttribute('onmouseenter')
    el.removeAttribute('onmouseleave')
    el.removeAttribute('data-dropdown')
  }
}