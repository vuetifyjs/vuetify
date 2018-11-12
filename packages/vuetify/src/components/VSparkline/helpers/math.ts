import { Point } from '../VSparkline'

function int (value: string | number): number {
  return parseInt(value, 10)
}

/**
 * https://en.wikipedia.org/wiki/Collinearity
 * x=(x1+x2)/2
 * y=(y1+y2)/2
 */
export function checkCollinear (p0: Point, p1: Point, p2: Point): boolean {
  return int(p0.x + p2.x) === int(2 * p1.x) && int(p0.y + p2.y) === int(2 * p1.y)
}

export function getDistance (p1: Point, p2: Point): number {
  return Math.sqrt(
    Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
  )
}

export function moveTo (to: Point, from: Point, radius: number) {
  const vector = { x: to.x - from.x, y: to.y - from.y }
  const length = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y))
  const unitVector = { x: vector.x / length, y: vector.y / length }

  return {
    x: from.x + unitVector.x * radius,
    y: from.y + unitVector.y * radius
  }
}
