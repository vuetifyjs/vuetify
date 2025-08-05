export function getScrollParent (el?: HTMLElement, includeHidden = false) {
  while (el) {
    if (includeHidden ? isPotentiallyScrollable(el) : hasScrollbar(el)) return el
    el = el.parentElement!
  }

  return document.scrollingElement as HTMLElement
}

export function getScrollParents (el?: Element | null, stopAt?: Element | null) {
  const elements: HTMLElement[] = []

  if (stopAt && el && !stopAt.contains(el)) return elements

  while (el) {
    if (hasScrollbar(el)) elements.push(el as HTMLElement)
    if (el === stopAt) break
    el = el.parentElement!
  }

  return elements
}

export function hasScrollbar (el?: Element | null) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

  const style = window.getComputedStyle(el)
  const hasVerticalScrollbar = style.overflowY === 'scroll' || (style.overflowY === 'auto' && el.scrollHeight > el.clientHeight)
  const hasHorizontalScrollbar = style.overflowX === 'scroll' || (style.overflowX === 'auto' && el.scrollWidth > el.clientWidth)
  return hasVerticalScrollbar || hasHorizontalScrollbar
}

function isPotentiallyScrollable (el?: Element | null) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

  const style = window.getComputedStyle(el)
  return ['scroll', 'auto'].includes(style.overflowY)
}
