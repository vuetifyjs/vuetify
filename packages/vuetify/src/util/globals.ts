function checkForEventListenerPassiveSupport (supported = false): boolean {
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: () => (supported = true),
    })

    window.addEventListener('check', opts, opts)
    window.removeEventListener('check', opts, opts)
  } catch (e) { /**/ }

  return supported
}

const IN_BROWSER = typeof window !== 'undefined'
const INTERSECTION_OBSERVER_SUPPORTED = IN_BROWSER && 'IntersectionObserver' in window
const MUTATION_OBSERVER_SUPPORTED = IN_BROWSER && 'MutationObserver' in window
const PASSIVE_SUPPORTED = IN_BROWSER ? checkForEventListenerPassiveSupport() : false

export {
  IN_BROWSER,
  INTERSECTION_OBSERVER_SUPPORTED,
  MUTATION_OBSERVER_SUPPORTED,
  PASSIVE_SUPPORTED,
}
