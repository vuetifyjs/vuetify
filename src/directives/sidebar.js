function directive (el, binding, v) {
  el.dataset.sidebar = binding.arg

  el.onclick = e => {
    e.stopPropagation()
    
    v.context.$store.commit('vuetify/SIDEBAR_TOGGLE', {
      id: binding.arg,
      active: true
    })
  }
}

export default {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind (el) {
    el.removeAttribute('onclick')
    el.removeAttribute('data-sidebar')
  }
}