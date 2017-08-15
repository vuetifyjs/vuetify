function directive (e, binding, v) {
  const cb = binding.value || (() => {
    v.context.isActive = false
  })

  if (e.keyCode === 27 && v.context.isActive && cb(e) !== false) {
    e.stopImmediatePropagation()
  }
}

export default {
  bind (el, binding, v) {
    v.context.$vuetify.load(() => {
      const esc = e => directive(e, binding, v)
      document.body.addEventListener('keydown', esc, false)
      el._escHandler = esc
    })
  },

  unbind (el) {
    document.body.removeEventListener('keydown', el._escHandler, false)
  }
}
