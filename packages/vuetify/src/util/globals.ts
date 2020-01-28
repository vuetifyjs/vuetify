export function supportsPassiveEvents (supported = false): boolean {
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: () => (supported = true),
    })

    window.addEventListener('check', opts, opts)
    window.removeEventListener('check', opts, opts)
  } catch (e) { /**/ }

  return supported
}

export const IN_BROWSER = typeof window !== 'undefined'
export const INTERSECTION_OBSERVER_SUPPORTED = !!(IN_BROWSER && 'IntersectionObserver' in window)
export const MUTATION_OBSERVER_SUPPORTED = !!(IN_BROWSER && 'MutationObserver' in window)
export const PASSIVE_SUPPORTED = !!(IN_BROWSER && supportsPassiveEvents())
