export class Box {
  x: number
  y: number
  width: number
  height: number

  constructor (args: DOMRect | {
    x: number
    y: number
    width: number
    height: number
  }) {
    const pageScale = document.body.currentCSSZoom ?? 1
    const factor = args instanceof DOMRect ? 1 + (1 - pageScale) / pageScale : 1

    const { x, y, width, height } = args

    this.x = x * factor
    this.y = y * factor
    this.width = width * factor
    this.height = height * factor
  }

  get top () { return this.y }
  get bottom () { return this.y + this.height }
  get left () { return this.x }
  get right () { return this.x + this.width }
}

export function getOverflow (a: Box, b: Box) {
  return {
    x: {
      before: Math.max(0, b.left - a.left),
      after: Math.max(0, a.right - b.right),
    },
    y: {
      before: Math.max(0, b.top - a.top),
      after: Math.max(0, a.bottom - b.bottom),
    },
  }
}

export function getTargetBox (target: HTMLElement | [x: number, y: number]): Box {
  if (Array.isArray(target)) {
    const pageScale = document.body.currentCSSZoom ?? 1
    const factor = 1 + (1 - pageScale) / pageScale

    return new Box({
      x: target[0] * factor,
      y: target[1] * factor,
      width: 0 * factor,
      height: 0 * factor,
    })
  } else {
    return new Box(target.getBoundingClientRect())
  }
}

export function getElementBox (el: HTMLElement) {
  if (el === document.documentElement) {
    if (!visualViewport) {
      return new Box({
        x: 0,
        y: 0,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      })
    } else {
      const pageScale = document.body.currentCSSZoom ?? 1
      return new Box({
        x: visualViewport.scale > 1 ? 0 : visualViewport.offsetLeft,
        y: visualViewport.scale > 1 ? 0 : visualViewport.offsetTop,
        width: visualViewport.width * visualViewport.scale / pageScale,
        height: visualViewport.height * visualViewport.scale / pageScale,
      })
    }
  } else {
    const rect = el.getBoundingClientRect()
    return new Box({
      x: rect.x,
      y: rect.y,
      width: el.clientWidth,
      height: el.clientHeight,
    })
  }
}
