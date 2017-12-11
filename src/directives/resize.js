function inserted (el, binding) {
  let callback = binding.value
  let debounce = 200
  let callOnLoad = true

  if (typeof binding.value !== 'function') {
    callback = binding.value.value
    debounce = binding.value.debounce || debounce
    callOnLoad = binding.value.quiet != null ? false : callOnLoad
  }

  let debounceTimeout = null
  const onResize = () => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(callback, debounce)
  }

  window.addEventListener('resize', onResize, { passive: true })
  el._onResize = onResize

  callOnLoad && onResize()
}

function unbind (el, binding) {
  window.removeEventListener('resize', el._onResize)
}

export default {
  name: 'resize',
  inserted,
  unbind
}
