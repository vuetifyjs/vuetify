import * as easingPatterns from '../easing-patterns'

describe('easing-patterns.ts', () => {
  it('should work', () => {
    expect(easingPatterns.linear(5)).toBe(5)
    expect(easingPatterns.easeInQuad(5)).toBe(25)
    expect(easingPatterns.easeOutQuad(5)).toBe(-15)
    expect(easingPatterns.easeInOutQuad(5)).toBe(-31)
    expect(easingPatterns.easeInOutQuad(0.1)).toBe(0.020000000000000004)
    expect(easingPatterns.easeInCubic(5)).toBe(125)
    expect(easingPatterns.easeOutCubic(5)).toBe(65)
    expect(easingPatterns.easeInOutCubic(5)).toBe(257)
    expect(easingPatterns.easeInOutCubic(0.1)).toBe(0.004000000000000001)
    expect(easingPatterns.easeInQuart(5)).toBe(625)
    expect(easingPatterns.easeOutQuart(5)).toBe(-255)
    expect(easingPatterns.easeInOutQuart(5)).toBe(-2047)
    expect(easingPatterns.easeInOutQuart(0.1)).toBe(0.0008000000000000003)
    expect(easingPatterns.easeInQuint(5)).toBe(3125)
    expect(easingPatterns.easeOutQuint(5)).toBe(1025)
    expect(easingPatterns.easeInOutQuint(5)).toBe(16385)
    expect(easingPatterns.easeInOutQuint(0.1)).toBeCloseTo(0.00016, 5)
  })
})
