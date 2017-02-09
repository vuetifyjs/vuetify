function directive (e, el, binding, v) {
  let cb = () => true

  if (binding.value) {
    cb = binding.value
  }

  if ((e && e.target) &&
    (e.target !== el && !el.contains(e.target)) &&
    cb(e)
  ) {
    v.context.isActive = false
  }
}

export default {
  bind (el, binding, v) {
    const click = e => directive(e, el, binding, v)

    if (typeof window.orientation !== 'undefined') {
      document.addEventListener('touchstart', click, false)
    } else {
      document.addEventListener('click', click, false)
    }

    el._clickOutside = click
  },

  unbind (el) {
    document.removeEventListener('click', el._clickOutside, false)
  }
}
