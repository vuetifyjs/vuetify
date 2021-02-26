// Composables
import { makeElevationProps, useElevation } from '../elevation'

describe('elevation.ts', () => {
  it('should have the correct class', () => {
    const values = [
      [{ elevation: 1 }, 'elevation-1'],
      [{ elevation: undefined }, undefined],
      [{ elevation: null }, undefined],
      [{ elevation: 20 }, 'elevation-20'],
      [{ elevation: 0 }, 'elevation-0'],
      [{ elevation: '14' }, 'elevation-14'],
      [{ flat: true }, 'foo--flat'],
    ] as const

    for (const [props, equal] of values) {
      const { elevationClasses } = useElevation(props, 'foo')

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
