// Utilities
import { circularWavePath, hasWave, linearWavePath } from '../waves'

function endpoints (d: string) {
  return d.split(/[MC]/).slice(1).map(segment => segment.trim().split(' ').slice(-2).map(Number))
}

describe('waves', () => {
  it('should flatten the wave at the ends of the range', () => {
    expect([10, 11, 94, 95].map(hasWave)).toEqual([false, true, true, false])
  })

  it('should pass through the sine peaks', () => {
    expect(endpoints(linearWavePath(0, 40, 5, 3, 40))).toEqual([[0, 5], [10, 8], [20, 5], [30, 2], [40, 5]])
  })

  it('should keep the same commands when flat', () => {
    const wavy = linearWavePath(0, 55, 5, 3, 20)
    const flat = linearWavePath(0, 55, 5, 0, 20)
    expect(flat.match(/C/g)).toHaveLength(wavy.match(/C/g)!.length)
    expect(endpoints(flat).every(([, y]) => y === 5)).toBe(true)
  })

  it('should draw one extra wave around the circle', () => {
    const points = endpoints(circularWavePath(50, 20, 2, 5))
    const radii = points.map(([x, y]) => Math.hypot(x - 50, y - 50))
    expect(points).toHaveLength(1 + 6 * 4)
    expect(Math.max(...radii)).toBeCloseTo(22)
    expect(Math.min(...radii)).toBeCloseTo(18)
  })
})
