import { Point } from '../VSparkline'
import { checkCollinear, getDistance, moveTo } from './math'

/**
 * From https://github.com/unsplash/react-trend/blob/master/src/helpers/DOM.helpers.js#L18
 */
export function genPath (points: Point[], radius: number, fill = false, height = 75) {
  const start = points.shift()!
  const end = points[points.length - 1]

  return (
    (fill ? `M${start.x} ${height} L${start.x} ${start.y}` : `M${start.x} ${start.y}`) +
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
    (fill ? `L${end.x} ${height} Z` : ''))
}
