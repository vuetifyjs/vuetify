function inserted (el, binding) {
  const callback = binding.value
  const options = binding.options || { passive: true }

  window.addEventListener('resize', callback, options)
  el._onResize = {
    callback,
    options
  }

  if (!binding.modifiers || !binding.modifiers.quiet) {
    callback()
  }
}

function unbind (el, binding) {
  const { callback, options } = el._onResize

  window.removeEventListener('resize', callback, options)
  delete el._onResize
}

export default {
  name: 'resize',
  inserted,
  unbind
}
