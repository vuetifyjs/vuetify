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

let click

export default {
  bind (el, binding, v) {
    click = e => directive(e, el, binding, v)
    document.addEventListener('click', click, false)
  },
  unbind (el, binding, v) {
    document.removeEventListener('click', click, false)
  }
}
