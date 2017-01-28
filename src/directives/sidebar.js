function directive (el, binding, v) {
  el.dataset.sidebar = binding.arg

  el.onclick = e => {
    e.preventDefault()
    e.stopPropagation()

    v.context.$vuetify().event('component toggle', {
      active: true,
      component: 'sidebar',
      id: binding.arg
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
