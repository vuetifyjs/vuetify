export const standardEasing = 'cubic-bezier(0.4, 0, 0.2, 1)'
export const deceleratedEasing = 'cubic-bezier(0.0, 0, 0.2, 1)' // Entering
export const acceleratedEasing = 'cubic-bezier(0.4, 0, 1, 1)' // Leaving

export const standardEasingFn = CubicBezier(0.4, 0, 0.2, 1)
export const deceleratedEasingFn = CubicBezier(0.0, 0, 0.2, 1) // Entering
export const acceleratedEasingFn = CubicBezier(0.4, 0, 1, 1) // Leaving

const epsilon = 1e-5 // Precision
// From https://github.com/thednp/CubicBezier, based on webkit
export function CubicBezier (p1x: number, p1y: number, p2x: number, p2y: number) {
  // pre-calculate the polynomial coefficients
  // First and last control points are implied to be (0,0) and (1.0, 1.0)
  const cx = 3.0 * p1x
  const bx = 3.0 * (p2x - p1x) - cx
  const ax = 1.0 - cx - bx

  const cy = 3.0 * p1y
  const by = 3.0 * (p2y - p1y) - cy
  const ay = 1.0 - cy - by

  function sampleCurveX (t: number) {
    return ((ax * t + bx) * t + cx) * t
  }

  function sampleCurveY (t: number) {
    return ((ay * t + by) * t + cy) * t
  }

  function sampleCurveDerivativeX (t: number) {
    return (3.0 * ax * t + 2.0 * bx) * t + cx
  }

  function solveCurveX (x: number) {
    let t0
    let t1
    let t2
    let x2
    let d2
    let i

    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 32; i += 1) {
      x2 = sampleCurveX(t2) - x
      if (Math.abs(x2) < epsilon) return t2
      d2 = sampleCurveDerivativeX(t2)
      if (Math.abs(d2) < epsilon) break
      t2 -= x2 / d2
    }

    // No solution found - use bi-section
    t0 = 0.0
    t1 = 1.0
    t2 = x

    if (t2 < t0) return t0
    if (t2 > t1) return t1

    while (t0 < t1) {
      x2 = sampleCurveX(t2)
      if (Math.abs(x2 - x) < epsilon) return t2
      if (x > x2) t0 = t2
      else t1 = t2

      t2 = (t1 - t0) * 0.5 + t0
    }

    // Give up
    return t2
  }

  return (t: number) => sampleCurveY(solveCurveX(t))
}
