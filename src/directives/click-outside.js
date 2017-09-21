function directive (e, el, binding, v) {
  let cb = () => true

  if (binding.value) cb = binding.value

  if (v.context.isActive &&
    (e && e.target) &&
    (e.target !== el && !el.contains(e.target)) &&
    cb(e)
  ) {
    v.context.isActive = false
  }
}

export default {
  name: 'click-outside',

  bind (el, binding, v) {
    v.context.$vuetify.load(() => {
      const outside = document.querySelector('[data-app]')
      const click = e => directive(e, el, binding, v)
      outside && outside.addEventListener('click', click, false)
      el._clickOutside = click
    })
  },

  unbind (el) {
    const outside = document.querySelector('[data-app]')
    outside && outside.removeEventListener('click', el._clickOutside, false)
  }
}
