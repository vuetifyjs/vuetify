const callbacks = []

window.addEventListener('load', handler)

function handler () {
  for (const cb of callbacks) {
    cb()
  }
  callbacks.length = 0
  window.removeEventListener('load', handler)
}

function load (cb, i = 0) {
  if (document.readyState === 'complete') {
    return setTimeout(cb, 0)
  }

  if (document.readyState === 'interactive' && i <= 10) {
    return setTimeout(() => load(cb, i + 1), 200)
  }

  callbacks.push(cb)
}

export default load
