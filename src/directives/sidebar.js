function init (el, binding, vnode) {
  el.setAttribute('data-sidebar', binding.arg)

  el.onclick = e => {
    e.preventDefault()
    
    vnode.context.$vuetify.bus.pub(`sidebar:toggle:${binding.arg}`)
  }
}

function unbind (el) {
  el.removeAttribute('onclick')
}

export default {
  bind (el, binding, vnode) {
    vnode.context.$vuetify.load.call(vnode.context, () => init(el, binding, vnode))
  },

  updated (el) {
    unbind(el)
  },

  componentUpdated (el, binding, vnode) {
    vnode.context.$vuetify.load.call(vnode.context, () => init(el, binding, vnode))
  },

  unbind (el) {
    unbind(el)
  }
}