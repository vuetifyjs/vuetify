// @ts-nocheck
/* eslint-disable */

import { Point } from '../VSparkline'
// import { checkCollinear, getDistance, moveTo } from './math'

/**
 * From https://github.com/unsplash/react-trend/blob/master/src/helpers/DOM.helpers.js#L18
 */
export function genPath (points: Point[], radius: number, fill = false, height = 75) {
  if (points.length === 0) return ''
  const start = points.shift()!
  const end = points[points.length - 1]

  return (
    (fill ? `M${start.x} ${height - start.x + 2} L${start.x} ${start.y}` : `M${start.x} ${start.y}`) +
    points
      .map((point, index) => {
        const next = points[index + 1]
        const prev = points[index - 1] || start
        const isCollinear = next && checkCollinear(next, point, prev)

        if (!next || isCollinear) {
          return `L${point.x} ${point.y}`
        }

        const threshold = Math.min(
          getDistance(prev, point),
          getDistance(next, point)
        )
        const isTooCloseForRadius = threshold / 2 < radius
        const radiusForPoint = isTooCloseForRadius ? threshold / 2 : radius

        const before = moveTo(prev, point, radiusForPoint)
        const after = moveTo(next, point, radiusForPoint)

        return `L${before.x} ${before.y}S${point.x} ${point.y} ${after.x} ${after.y}`
      })
      .join('') +
    (fill ? `L${end.x} ${height - start.x + 2} Z` : '')
  )
}

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
    y: from.y + unitVector.y * radius,
  }
}
