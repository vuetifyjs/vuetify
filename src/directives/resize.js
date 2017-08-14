function inserted (el, binding) {
  const debounce = cb => setTimeout(cb, 50)
  const onResize = () => {
    clearTimeout(debounce)
    debounce(binding.value)
  }

  window.addEventListener('resize', onResize, { passive: true })
  el._onResize = onResize

  onResize()
}

function unbind (el, binding) {
  window.removeEventListener('resize', el._onResize)
}

export default {
  inserted,
  unbind
}
