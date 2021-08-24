export function getScrollParent (el?: HTMLElement) {
  while (el) {
    if (hasScrollbar(el)) return el
    el = el.parentElement!
  }

  return document.scrollingElement as HTMLElement
}

export function getScrollParents (el?: HTMLElement) {
  const elements: HTMLElement[] = []
  while (el) {
    if (hasScrollbar(el)) elements.push(el)
    el = el.parentElement!
  }

  return elements
}

function hasScrollbar (el?: HTMLElement) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

  const style = window.getComputedStyle(el)
  return style.overflowY === 'scroll' || (style.overflowY === 'auto' && el.scrollHeight > el.clientHeight)
}
