// Utilities
import { flightZoom } from '../viewport'

describe('flightZoom', () => {
  it('should zoom out mid-way on long trips only', () => {
    expect(flightZoom(4, 4, 1, 0)).toBe(4)
    expect(flightZoom(4, 4, 1, 1)).toBe(4)
    expect(flightZoom(4, 4, 1, 0.5)).toBeCloseTo(3.2)
    expect(flightZoom(4, 4, 0.3, 0.5)).toBe(4)
  })

  it('should interpolate zoom in log space', () => {
    expect(flightZoom(1, 8, 0, 0.5)).toBeCloseTo(Math.SQRT2 * 2)
  })
})
