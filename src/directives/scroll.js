function inserted (el, binding) {
  const callback = binding.value
  const options = binding.options || { passive: true }
  let target = binding.arg || window
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
  if (!el._onScroll) return

  const { callback, options, target } = el._onScroll

  target.removeEventListener('scroll', callback, options)
  delete el._onScroll
}

export default {
  name: 'scroll',
  inserted,
  unbind
}
