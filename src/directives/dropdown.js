var defaults = {
  hover: false
}
function dropdown (el, config) {
  const component = document.getElementById(config.value)
  let width = 0

  if (component.clientWidth > el.clientWidth
      && component.hasAttribute('data-right')
    ) {
    width = component.clientWidth - el.clientWidth - 1
  }

  component.style.minWidth = `${el.clientWidth}px`
  component.style.left = `${el.offsetLeft - width}px`
  component.style.top = `${el.offsetTop}px`
}

function directive (el, binding, v) {
  let config = {}

  Object.assign(
    config,
    defaults,
    binding.modifiers,
    { value: binding.arg },
    binding.value || {}
  )

  el.setAttribute('data-dropdown', config.value)

  if (!config.hover) {
    el.onclick = e => {
      e.preventDefault()
      
      v.context.$vuetify.bus.pub(`dropdown:open:${config.value}`)
      dropdown(el, config)
    }
  } else {
    el.onmouseenter = () => {
      v.context.$vuetify.bus.pub(`dropdown:open:${config.value}`)    
      dropdown(el, config)
    }
  }
}

export default {
  bind (el, binding, v) {
    v.context.$vuetify.load.call(
      v.context,
      () => directive(el, binding, v)
    )
  },

  updated (el, binding, v) {
    v.context.$vuetify.load.call(
      v.context,
      () => directive(el, binding, v)
    )
  },

  componentUpdated (el, binding, v) {
    v.context.$vuetify.load.call(
      v.context,
      () => directive(el, binding, v)
    )
  },

  unbind (el) {
    el.removeAttribute('onclick')
    el.removeAttribute('onmouseenter')
    el.removeAttribute('onmouseleave')
    el.removeAttribute('data-dropdown')
  }
}