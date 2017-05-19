function directive (e, el, binding, v) {
  let cb = () => true

  if (binding.value) cb = binding.value

  if ((e && e.target) &&
    (e.target !== el && !el.contains(e.target)) &&
    cb(e)
  ) {
    v.context.isActive = false
  }
}

export default {
  bind (el, binding, v) {
    v.context.$vuetify.load(() => {
      const click = e => directive(e, el, binding, v)
      document.querySelector('[data-app]').addEventListener('click', click, false)
      el._clickOutside = click
    })
  },

  unbind (el) {
    document.querySelector('[data-app]').removeEventListener('click', el._clickOutside, false)
  }
}
