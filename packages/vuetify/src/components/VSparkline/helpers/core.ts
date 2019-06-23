import { SparklineItem, Boundary, Point } from '../VSparkline'

function genPoints1D (
  points: SparklineItem[],
  boundary: Boundary,
  type: String,
  totalPoints: number
): Point[] {
  const { minX, minY, maxX, maxY } = boundary
  const normalisedPoints = points.map(
    item => (typeof item === 'number' ? item : item.value)
  )

  const maxValue = Math.max(...normalisedPoints) + 1
  let minValue = Math.min(...normalisedPoints)

  if (minValue) minValue -= 1
  let gridX = (maxX - minX) / (totalPoints - 1)
  if (type === 'bar') gridX = maxX / totalPoints
  const gridY = (maxY - minY) / (maxValue - minValue)

  return normalisedPoints.map((value, index) => {
    return {
      x: minX + index * gridX,
      y:
        maxY -
        (value - minValue) * gridY +
        +(index === totalPoints - 1) * 0.00001 -
        +(index === 0) * 0.00001,
      value,
    }
  })
}

export function genPoints (
  points: SparklineItem[][],
  boundary: Boundary,
  type: String,
  totalPoints: number
): Point[][] {
  return points.map(ps => genPoints1D(ps, boundary, type, totalPoints))
}
