function directive (e, el, binding, v) {
  let cb = () => true

  if (binding.value) cb = binding.value

  if (v.context.isActive && !clickedInEl(e, el, binding.include) && cb(e)) {
    setTimeout(() => v.context.isActive = false, 0)
    // v.context.isActive = false
  }
}

function clickedInEl (e, el, include) {
  e = e || {}
  const b = el.getBoundingClientRect()
  const x = e.clientX
  const y = e.clientY
  var inEl = x >= b.left && x <= b.right && y >= b.top && y <= b.bottom
  if (!inEl && include) {
    for (const v of include) {
      if (v.$el) {
        inEl = clickedInEl(e, v.$el)
        if (inEl) return inEl
      }
    }
  }
  return inEl
}

export default {
  name: 'click-outside',

  bind (el, binding, v) {
    v.context.$vuetify.load(() => {
      const click = e => directive(e, el, binding, v)
      document.addEventListener('click', click, true)
      el._clickOutside = click
    })
  },

  unbind (el) {
    document.removeEventListener('click', el._clickOutside, true)
  }
}
