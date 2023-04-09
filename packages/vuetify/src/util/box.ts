export class Box {
  x: number
  y: number
  width: number
  height: number

  constructor ({ x, y, width, height }: {
    x: number
    y: number
    width: number
    height: number
  }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
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
