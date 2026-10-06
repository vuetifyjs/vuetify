// Utilities
import { wavePath, waveStretch } from '../waves'

function endpoints (d: string) {
  return d.split(/[ML]/).slice(1).map(segment => segment.trim().split(' ').map(Number))
}

describe('waves', () => {
  it('should pass through the sine peaks', () => {
    expect(endpoints(wavePath(40, 3, 40)).filter((_, index) => index % 4 === 0))
      .toEqual([[0, 0], [10, 3], [20, 0], [30, -3], [40, 0]])
  })

  it('should end exactly at the width', () => {
    expect(endpoints(wavePath(55, 3, 40)).at(-1)![0]).toBe(55)
  })

  it('should match the measured curve length', () => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', wavePath(400, 3, 40))
    expect(path.getTotalLength() / 400).toBeCloseTo(waveStretch(3, 40), 4)
    expect(waveStretch(0, 40)).toBe(1)
  })

  it('should end a stretched dash where it was meant to on a long track', () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1700
    canvas.height = 20
    const context = canvas.getContext('2d')!
    context.translate(0, 10)
    context.lineWidth = 2
    context.setLineDash([1600 * waveStretch(3, 40), 100000])
    context.stroke(new Path2D(wavePath(1700, 3, 40)))

    const alpha = (x: number) => Math.max(...context.getImageData(x, 0, 1, 20).data.filter((_, index) => index % 4 === 3))
    expect(alpha(1598)).toBeGreaterThan(127)
    expect(alpha(1601)).toBeLessThanOrEqual(127)
  })
})
