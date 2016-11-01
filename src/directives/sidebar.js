import {
  directiveConfig
} from '../util/helpers'

function directive (el, binding, v) {
  const config = directiveConfig(binding)

  el.dataset.sidebar = config.value

  el.onclick = e => {
    e.preventDefault()
    
    v.context.$vuetify.bus.pub(`sidebar:toggle:${config.value}`)
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
    el.removeAttribute('data-sidebar')
    el.removeAttribute('onclick')
  }
}