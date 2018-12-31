import { SparklineItem, Boundary, Point } from '../VSparkline'

export function genPoints (points: SparklineItem[], boundary: Boundary): Point[] {
  const { minX, minY, maxX, maxY } = boundary
  const normalisedPoints = points.map(item => (typeof item === 'number' ? item : item.value))
  const minValue = Math.min(...normalisedPoints) - 0.001
  const gridX = (maxX - minX) / (normalisedPoints.length + 0.001)
  const gridY = (maxY - minY) / (Math.max(...normalisedPoints) + 0.001 - minValue)

  return normalisedPoints.map((value, index) => {
    return {
      x: index * gridX + minX,
      y:
        maxY -
        (value - minValue) * gridY +
        +(index === normalisedPoints.length - 1) * 0.00001 -
        +(index === 0) * 0.00001,
      value
    }
  })
}
