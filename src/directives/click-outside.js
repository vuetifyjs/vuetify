function click (e, el, binding, v) {
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

function directive (el, binding, v) {
  document.addEventListener('click', e => click(e, el, binding, v), false)
}

export default {
  bind: directive,
  unbind (e, binding, v) {
    document.removeEventListener('click')
  }
}
