function load (cb, i = 0) {
  if (document.readyState === 'complete') {
    return setTimeout(cb, 0)
  }

  if (document.readyState === 'interactive' && i <= 10) {
    return setTimeout(() => load(cb, i + 1), 200)
  }

  window.addEventListener('load', cb)
}

export default load
