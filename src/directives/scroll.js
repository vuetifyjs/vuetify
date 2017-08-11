function inserted (el, binding) {
  const options = binding.value.options || { passive: true }
  let target = binding.value.target || window
  if (target === 'undefined') return

  if (target !== window) {
    target = document.querySelector(target)
  }

  target.addEventListener('scroll', binding.value.callback, options)

  el._onScroll = {
    target,
    options
  }
}

function unbind (el, binding) {
  const { target, options } = el._onScroll

  target.removeEventListener('scroll', binding.callback, options)
}

export default {
  inserted,
  unbind
}
