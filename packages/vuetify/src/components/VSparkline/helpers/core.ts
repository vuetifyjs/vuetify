import { SparklineItem, Boundary, Point } from '../VSparkline'

export function genPoints (points: SparklineItem[], boundary: Boundary): Point[] {
  const { minX, minY, maxX, maxY } = boundary
  const normalisedPoints = points.map(item => (typeof item === 'number' ? item : item.value))
  const maxValue = Math.max(...normalisedPoints) + 1
  let minValue = Math.min(...normalisedPoints)

  if (minValue) minValue -= 1

  const gridX = (maxX - minX) / (normalisedPoints.length - 1)
  const gridY = (maxY - minY) / (maxValue - minValue)

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
