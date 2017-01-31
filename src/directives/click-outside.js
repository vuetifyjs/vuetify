function click (e, el, binding, v) {
  if ((e && e.target)
    && (binding.value && binding.value(e))
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
    document.removeEventListener('click', e => click(e, el, binding, v), false)
  }
}
