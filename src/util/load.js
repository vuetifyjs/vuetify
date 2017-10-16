function load (cb, i = 0) {
  // Create callback collection
  if (!document._loadCallbacks) document._loadCallbacks = []

  // If DOM already loaded
  // run the callback
  if (document.readyState === 'complete') return cb()

  // Otherwise, push into array
  document._loadCallbacks.push(cb)
}

export default load
