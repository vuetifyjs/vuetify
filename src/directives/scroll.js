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

  const cb = () => {
    const windowOffset = window.pageYOffset ||
      document.documentElement.scrollTop

    callback(windowOffset)
  }

  target.addEventListener('scroll', cb, options)

  el._onScroll = {
    cb,
    options,
    target
  }
}

function unbind (el, binding) {
  const { cb, options, target } = el._onScroll

  target.removeEventListener('scroll', cb, options)
}

export default {
  name: 'scroll',
  inserted,
  unbind
}
