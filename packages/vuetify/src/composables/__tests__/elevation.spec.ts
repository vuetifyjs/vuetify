// Composables
import { makeElevationProps, useElevation } from '../elevation'

// Utilities
import { describe, expect, it } from '@jest/globals'

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

  it('should only allow numeric values between 0 and 24', () => {
    const { elevation: { validator } } = makeElevationProps()
    const validValues = [1, '24']
    const invalidValues = [-1, '25', false, true]

    for (const value of validValues) {
      expect(validator(value)).toBe(true)
    }

    for (const value of invalidValues) {
      expect(validator(value)).toBe(false)
    }
  })
})
