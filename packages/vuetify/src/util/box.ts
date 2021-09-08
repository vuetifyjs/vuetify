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
