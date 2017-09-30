function load (cb, i = 0) {
  if (!document._loadCallbacks) {
    document._loadCallbacks = []
  }

  document._loadCallbacks.push(cb)
}

export default load
