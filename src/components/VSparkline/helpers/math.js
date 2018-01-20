function int (value) {
  return parseInt(value, 10)
}

/**
 * https://en.wikipedia.org/wiki/Collinearity
 * x=(x1+x2)/2
 * y=(y1+y2)/2
 */
export function checkCollinear (p0, p1, p2) {
  return int(p0.x + p2.x) === int(2 * p1.x) && int(p0.y + p2.y) === int(2 * p1.y)
}

export function getDistance (p1, p2) {
  return Math.sqrt(
    Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
  )
}

export function moveTo (to, from, radius) {
  const vector = { x: to.x - from.x, y: to.y - from.y }
  const length = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y))
  const unitVector = { x: vector.x / length, y: vector.y / length }

  return {
    x: from.x + unitVector.x * radius,
    y: from.y + unitVector.y * radius
  }
}
