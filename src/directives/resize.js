function inserted (el, binding) {
  const callback = binding.value
  const options = binding.options || { passive: true }

  el.ownerDocument.defaultView.addEventListener('resize', callback, options)
  el._onResize = {
    callback,
    options
  }

  if (!binding.modifiers || !binding.modifiers.quiet) {
    callback()
  }
}

function unbind (el) {
  const { callback, options } = el._onResize

  el.ownerDocument.defaultView.removeEventListener('resize', callback, options)
  delete el._onResize
}

export default {
  name: 'resize',
  inserted,
  unbind
}
