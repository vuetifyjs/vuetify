// Types
import type { Point } from '../VTrendline'

/**
 * Monotone cubic Hermite interpolation (Fritsch-Carlson) converted to cubic Bezier.
 * Prevents overshoot at local extrema (e.g. consecutive equal min/max values)
 * by zeroing tangents at turning points and applying an alpha-beta constraint.
 *
 * `smooth` controls tension: 0 = straight lines, 8 (default true) = full curve.
 */
export function genMonotonePath (points: Point[], smooth: number, fill = false, height = 75) {
  if (points.length === 0) return ''

  const start = points[0]
  const end = points[points.length - 1]

  const prefix = fill
    ? `M${start.x} ${height - start.x + 2} L${start.x} ${start.y}`
    : `M${start.x} ${start.y}`

  const suffix = fill ? `L${end.x} ${height - start.x + 2} Z` : ''

  if (smooth === 0 || points.length < 3) {
    return prefix + points.slice(1).map(point => `L${point.x} ${point.y}`).join('') + suffix
  }

  const tension = Math.min(smooth / 8, 1)
  const n = points.length

  const delta: number[] = []
  for (let i = 0; i < n - 1; i++) {
    const dx = points[i + 1].x - points[i].x
    delta[i] = dx === 0 ? 0 : (points[i + 1].y - points[i].y) / dx
  }

  const tangent: number[] = new Array(n)
  tangent[0] = delta[0]
  tangent[n - 1] = delta[n - 2]

  for (let i = 1; i < n - 1; i++) {
    if (delta[i - 1] === 0 || delta[i] === 0 ||
        (delta[i - 1] > 0) !== (delta[i] > 0)) {
      tangent[i] = 0
    } else {
      tangent[i] = (delta[i - 1] + delta[i]) / 2
    }
  }

  for (let i = 0; i < n - 1; i++) {
    if (delta[i] === 0) {
      tangent[i] = 0
      tangent[i + 1] = 0
    } else {
      const alpha = tangent[i] / delta[i]
      const beta = tangent[i + 1] / delta[i]
      const squaredSum = alpha * alpha + beta * beta

      if (squaredSum > 9) {
        const tau = 3 / Math.sqrt(squaredSum)
        tangent[i] = tau * alpha * delta[i]
        tangent[i + 1] = tau * beta * delta[i]
      }
    }
  }

  const curves = points.slice(1).map((curr, index) => {
    const prev = points[index]
    const dx = curr.x - prev.x

    const controlPoint1X = prev.x + dx * tension / 3
    const controlPoint1Y = prev.y + tangent[index] * dx * tension / 3
    const controlPoint2X = curr.x - dx * tension / 3
    const controlPoint2Y = curr.y - tangent[index + 1] * dx * tension / 3

    return `C${controlPoint1X} ${controlPoint1Y} ${controlPoint2X} ${controlPoint2Y} ${curr.x} ${curr.y}`
  })

  return prefix + curves.join('') + suffix
}
