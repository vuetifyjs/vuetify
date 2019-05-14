import Vue from 'vue'

// Return target's cumulative offset from the top
export function getOffset (target: any): number {
  if (typeof target === 'number') {
    return target
  }

  let el = $(target)
  if (!el) {
    throw typeof target === 'string'
      ? new Error(`Target element "${target}" not found.`)
      : new TypeError(`Target must be a Number/Selector/HTMLElement/VueComponent, received ${type(target)} instead.`)
  }

  let totalOffset = 0
  while (el) {
    totalOffset += el.offsetTop
    el = el.offsetParent as HTMLElement
  }

  return totalOffset
}

export function getContainer (container: any): HTMLElement {
  const el = $(container)

  if (el) return el

  throw typeof container === 'string'
    ? new Error(`Container element "${container}" not found.`)
    : new TypeError(`Container must be a Selector/HTMLElement/VueComponent, received ${type(container)} instead.`)
}

function type (el: any) {
  return el == null ? el : el.constructor.name
}

function $ (el: any): HTMLElement | null {
  if (typeof el === 'string') {
    return document.querySelector<HTMLElement>(el)
  } else if (el && el._isVue) {
    return (el as Vue).$el as HTMLElement
  } else if (el instanceof HTMLElement) {
    return el
  } else {
    return null
  }
}
