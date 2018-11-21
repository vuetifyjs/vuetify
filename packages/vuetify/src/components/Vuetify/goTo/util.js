/**
 * Helpers
 */

function isVueComponent (obj) {
  return obj != null && obj._isVue
}

function isHTMLElement (obj) {
  return obj != null && obj instanceof Element
}

/**
 * Exports
 */

export function $ (element) {
  if (isVueComponent(element)) {
    return element.$el
  } else if (typeof element === 'string') {
    const targetEl = document.querySelector(element)
    if (!targetEl) throw new TypeError(`Target element "${element}" not found.`)
    return document.querySelector(element)
  } else {
    return element
  }
}

// scrollTop: The distance from the element's top to its topmost visible content
export function scroll (container, amount) {
  container.scrollTop = amount
}

// Return element's cumulative offset from the top
export function offset (el) {
  let totalOffset = 0

  do {
    totalOffset += el.offsetTop
    el = el.offsetParent
  } while (el)

  return totalOffset
}

export function isValidTarget (target) {
  return (
    isHTMLElement(target) ||
    isVueComponent(target) ||
    typeof target === 'string' ||
    (!isNaN(parseFloat(target)) && isFinite(target))
  )
}

export function isValidContainer (container) {
  return (
    isHTMLElement(container) ||
    isVueComponent(container) ||
    typeof container === 'string'
  )
}

export function type (el) {
  return el == null ? el : el.constructor.name
}
