export default {
  bind (el, binding, vnode) {
    el.setAttribute('data-modal', binding.arg)

    el.onclick = e => {
      e.preventDefault()
      
      vnode.context.$vuetify.bus.pub(`modal:open:${binding.arg}`)
    }
  },

  unbind (el) {
    el.removeAttribute('onclick')
    el.removeAttribute('data-modal')
  }
}
