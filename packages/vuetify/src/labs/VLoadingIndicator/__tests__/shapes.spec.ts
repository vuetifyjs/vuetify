// Utilities
import { MORPH_INTERVAL, morphPath, shapes, spring } from '../shapes'

describe('VLoadingIndicator shapes', () => {
  it('should normalize every shape to fit the unit circle', () => {
    expect(shapes.map(s => Math.max(...s))).toEqual(shapes.map(() => 1))
  })

  it('should settle the spring before the next morph starts', () => {
    expect(spring(0)).toBe(0)
    expect(spring(MORPH_INTERVAL / 1000)).toBeCloseTo(1, 2)
  })

  it('should continue each morph from the shape the previous one ended on', () => {
    const before = morphPath(MORPH_INTERVAL - 0.001)
    const after = morphPath(MORPH_INTERVAL)
    const points = (path: string) => path.match(/-?\d+\.\d+/g)!.map(Number)

    points(before).forEach((value, i) => expect(value).toBeCloseTo(points(after)[i], 1))
  })
})
