function load (cb, i = 0) {
  if (!document._loadCallbacks) {
    document._loadCallbacks = []
  }

  if (document.readyState === 'complete') {
    return cb()
  }

  document._loadCallbacks.push(cb)
}

export default load
