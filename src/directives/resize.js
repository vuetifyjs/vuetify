function inserted (el, binding) {
  let cb = binding.value
  let debounce = 200

  if (typeof binding.value !== 'function') {
    cb = binding.value.value
    debounce = binding.value.debounce
  }

  let debounceTimeout = setTimeout(cb, debounce)
  const onResize = () => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(cb, debounce)
  }

  window.addEventListener('resize', onResize, { passive: true })
  el._onResize = onResize

  onResize()
}

function unbind (el, binding) {
  window.removeEventListener('resize', el._onResize)
}

export default {
  name: 'resize',
  inserted,
  unbind
}
