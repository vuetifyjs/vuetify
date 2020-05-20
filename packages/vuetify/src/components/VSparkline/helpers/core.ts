import { Point, Boundary, Bar } from '../VSparkline'

export function genPoints (
  values: number[],
  boundary: Boundary
): Point[] {
  const { minX, maxX, minY, maxY } = boundary
  const totalValues = values.length
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)

  const gridX = (maxX - minX) / (totalValues - 1)
  const gridY = (maxY - minY) / ((maxValue - minValue) || 1)

  return values.map((value, index) => {
    return {
      x: minX + index * gridX,
      y:
        maxY -
        (value - minValue) * gridY +
        +(index === totalValues - 1) * 0.00001 -
        +(index === 0) * 0.00001,
      value,
    }
  })
}

export function genBars (
  values: number[],
  boundary: Boundary
): Bar[] {
  const { minX, maxX, minY, maxY } = boundary
  const totalValues = values.length
  let maxValue = Math.max(...values)
  let minValue = Math.min(...values)

  if (minValue > 0) minValue = 0
  if (maxValue < 0) maxValue = 0

  const gridX = maxX / totalValues
  const gridY = (maxY - minY) / ((maxValue - minValue) || 1)
  const horizonY = maxY - Math.abs(minValue * gridY)

  return values.map((value, index) => {
    const height = Math.abs(gridY * value)

    return {
      x: minX + index * gridX,
      y: horizonY - height +
        +(value < 0) * height,
      height,
      value,
    }
  })
}
