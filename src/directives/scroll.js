function inserted (el, binding) {
  const callback = typeof binding.value === 'function'
    ? binding.value
    : binding.value.callback
  const options = binding.value.options || { passive: true }
  let target = binding.value.target || window
  if (target === 'undefined') return

  if (target !== window) {
    target = document.querySelector(target)
  }

  target.addEventListener('scroll', callback, options)

  el._onScroll = {
    callback,
    options,
    target
  }
}

function unbind (el, binding) {
  const { callback, options, target } = el._onScroll

  target.removeEventListener('scroll', callback, options)
}

export default {
  name: 'scroll',
  inserted,
  unbind
}
