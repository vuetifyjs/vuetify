function checkForEventListenerPassiveSupport (supported = false): boolean {
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: () => (supported = true),
    })

    window.addEventListener('check', opts, opts)
    window.removeEventListener('check', opts, opts)
  } catch (e) {
    console.warn('The current browser does not support the passive option.')
    console.warn(e)
  }

  return supported
}

const IN_BROWSER = typeof window !== 'undefined'
const PASSIVE_SUPPORTED = IN_BROWSER ? checkForEventListenerPassiveSupport() : false

export {
  IN_BROWSER,
  PASSIVE_SUPPORTED,
}
