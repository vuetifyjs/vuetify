// Composables
import { makeElevationProps, useElevation } from '../elevation'

// Utilities

// Utilities

describe('elevation.ts', () => {
  it('should have the correct class', () => {
    const values = [
      [1, ['elevation-1']],
      [undefined, []],
      [null, []],
      [20, ['elevation-20']],
      [0, ['elevation-0']],
      ['14', ['elevation-14']],
    ] as const

    for (const [elevation, equal] of values) {
      const props = { elevation }
      const { elevationClasses } = useElevation(props)

      expect(elevationClasses.value).toEqual(equal)
    }
  })

  it('should only allow numeric values at least 0 and no upper limit', () => {
    const { elevation: { validator } } = makeElevationProps()
    const validValues = [1, '5', 24]
    const invalidValues = [-1, '-6.2', false, true] as any

    for (const value of validValues) {
      expect(validator(value)).toBe(true)
    }

    for (const value of invalidValues) {
      expect(validator(value)).toBe(false)
    }
  })
})
