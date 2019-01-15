import Vue from 'vue'

/**
 * Helpers
 */

function isVueComponent (obj: any): boolean {
  return obj != null && !!obj._isVue
}

function isHTMLElement (obj: any): boolean {
  return obj != null && obj instanceof Element
}

/**
 * Exports
 */

export function $ (element: any): HTMLElement {
  if (isVueComponent(element)) {
    return (element as Vue).$el as HTMLElement
  } else if (typeof element === 'string') {
    const targetEl = document.querySelector(element) as HTMLElement | null
    if (!targetEl) throw new TypeError(`Target element "${element}" not found.`)
    return targetEl
  } else {
    return element
  }
}

// scrollTop: The distance from the element's top to its topmost visible content
export function scroll (container: Element, amount: number) {
  container.scrollTop = amount
}

// Return element's cumulative offset from the top
export function offset (el: HTMLElement | null): number {
  let totalOffset = 0

  while (el) {
    totalOffset += el.offsetTop
    el = el.offsetParent as HTMLElement
  }

  return totalOffset
}

export function isValidTarget (target: any) {
  return (
    isHTMLElement(target) ||
    isVueComponent(target) ||
    typeof target === 'string' ||
    (!isNaN(parseFloat(target)) && isFinite(target))
  )
}

export function isValidContainer (container: any) {
  return (
    isHTMLElement(container) ||
    isVueComponent(container) ||
    typeof container === 'string'
  )
}

export function type (el: any) {
  return el == null ? el : el.constructor.name
}
