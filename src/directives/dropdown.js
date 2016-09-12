function dropdown (context, el, binding) {
  const component = document.getElementById(binding.arg)
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

function init (el, binding, vnode) {
  const params = binding.value || {}

  el.setAttribute('data-dropdown', binding.arg)

  if (!params.hover) {
    el.onclick = e => {
      e.preventDefault()
      
      vnode.context.$vuetify.bus.pub(`dropdown:open:${binding.arg}`)
      dropdown(vnode.context, el, binding)
    }
  } else {
    el.onmouseenter = () => {
      vnode.context.$vuetify.bus.pub(`dropdown:open:${binding.arg}`)
      dropdown(vnode.context, el, binding)
    }
  }
}

export default {
  bind (el, binding, vnode) {
    vnode.context.$vuetify.load.call(vnode.context, () => init(el, binding, vnode))
  },

  unbind (el, binding) {
    el.removeAttribute('onclick')
    el.removeAttribute('onmouseenter')
    el.removeAttribute('onmouseleave')
    el.removeAttribute('data-dropdown')
  }
}