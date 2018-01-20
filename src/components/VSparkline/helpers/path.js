import { checkCollinear, getDistance, moveTo } from './math'

export function genLinearPath (points) {
  const { x, y } = points.shift()

  return `M${x} ${y}` + points.map(({ x, y }) => `L${x} ${y}`).join('')
}

/**
 * From https://github.com/unsplash/react-trend/blob/master/src/helpers/DOM.helpers.js#L18
 */
export function genSmoothPath (points, radius) {
  const start = points.shift()

  return (
    `M${start.x} ${start.y}` +
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
      .join('')
  )
}
