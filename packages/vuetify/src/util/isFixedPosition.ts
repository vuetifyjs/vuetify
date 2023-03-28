export function isFixedPosition (el?: HTMLElement) {
  while (el) {
    if (window.getComputedStyle(el).position === 'fixed') {
      return true
    }
    el = el.offsetParent as HTMLElement
  }
  return false
}
