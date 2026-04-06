// Types
import type { Point } from '../VTrendline'

/**
 * Catmull-Rom spline converted to cubic Bezier.
 * Unlike the previous corner-rounding approach, this passes through every
 * data point, so markers placed at point positions are always on the line.
 *
 * `smooth` controls tension: 0 = straight lines, 8 (default true) = full curve.
 */
export function genPath (points: Point[], smooth: number, fill = false, height = 75) {
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

  const curves = points.slice(1).map((curr, index) => {
    const prev = points[index]
    const prevPrev = points[Math.max(0, index - 1)]
    const next = points[Math.min(points.length - 1, index + 2)]

    const controlPoint1X = prev.x + (curr.x - prevPrev.x) * tension / 6
    const controlPoint1Y = prev.y + (curr.y - prevPrev.y) * tension / 6
    const controlPoint2X = curr.x - (next.x - prev.x) * tension / 6
    const controlPoint2Y = curr.y - (next.y - prev.y) * tension / 6

    return `C${controlPoint1X} ${controlPoint1Y} ${controlPoint2X} ${controlPoint2Y} ${curr.x} ${curr.y}`
  })

  return prefix + curves.join('') + suffix
}
