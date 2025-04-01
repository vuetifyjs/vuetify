/*
 * Credits: Alexander Milevski https://github.com/w8r/svg-arc-corners
 */

type Point = [x: number, y: number]

function pointOnArc (center: Point, radius: number, angle: number) {
  const radians = (angle - 90) * Math.PI / 180.0
  return [center[0] + radius * Math.cos(radians), center[1] + radius * Math.sin(radians)]
}

function drawCircle ([x, y]: Point, r: number, width: number) {
  const innerRadius = r - width
  return [
    'M', x - r, y,
    'A', r, r, 0, 1, 0, x + r, y,
    'A', r, r, 0, 1, 0, x - r, y,
    'M', x - innerRadius, y,
    'A', innerRadius, innerRadius, 0, 1, 0, x + innerRadius, y,
    'A', innerRadius, innerRadius, 0, 1, 0, x - innerRadius, y,
    'Z',
  ]
}

export function roundedArc (center: Point, radius: number, startAngle: number, endAngle: number, width: number, rounding: number): string {
  if (Math.abs(endAngle - startAngle) === 360) {
    return drawCircle(center, radius, width).join(' ')
  }

  const innerR = radius - width
  const circumference = Math.abs(endAngle - startAngle)
  rounding = Math.min(width / 2, rounding)

  if (360 * (rounding / (Math.PI * (radius - width))) > Math.abs(startAngle - endAngle)) {
    rounding = circumference / 360 * innerR * Math.PI
  }

  // inner and outer radiuses
  const innerR2 = innerR + rounding
  const outerRadius = radius - rounding

  // butts corner points
  const oStart = pointOnArc(center, outerRadius, startAngle)
  const oEnd = pointOnArc(center, outerRadius, endAngle)

  const iStart = pointOnArc(center, innerR2, startAngle)
  const iEnd = pointOnArc(center, innerR2, endAngle)

  const iSection = 360 * (rounding / (2 * Math.PI * innerR))
  const oSection = 360 * (rounding / (2 * Math.PI * radius))

  // arcs endpoints
  const iArcStart = pointOnArc(center, innerR, startAngle + iSection)
  const iArcEnd = pointOnArc(center, innerR, endAngle - iSection)

  const oArcStart = pointOnArc(center, radius, startAngle + oSection)
  const oArcEnd = pointOnArc(center, radius, endAngle - oSection)

  const arcSweep1 = circumference > 180 + 2 * oSection ? 1 : 0
  const arcSweep2 = circumference > 180 + 2 * iSection ? 1 : 0

  return [
    // begin path
    'M', oStart[0], oStart[1],
    // outer start corner
    'A', rounding, rounding, 0, 0, 1, oArcStart[0], oArcStart[1],
    // outer main arc
    'A', radius, radius, 0, arcSweep1, 1, oArcEnd[0], oArcEnd[1],
    // outer end corner
    'A', rounding, rounding, 0, 0, 1, oEnd[0], oEnd[1],
    // end butt
    'L', iEnd[0], iEnd[1],
    // inner end corner
    'A', rounding, rounding, 0, 0, 1, iArcEnd[0], iArcEnd[1],
    // inner arc
    'A', innerR, innerR, 0, arcSweep2, 0, iArcStart[0], iArcStart[1],
    // inner start corner
    'A', rounding, rounding, 0, 0, 1, iStart[0], iStart[1], 'Z', // end path
  ]
    .join(' ')
}
