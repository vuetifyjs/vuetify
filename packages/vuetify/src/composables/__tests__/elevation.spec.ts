// Effects
import type { ElevationProps } from '../elevation'
import {
  makeElevationProps,
  useElevation,
} from '../elevation'

describe('elevation.ts', () => {
  it('should have the correct class', () => {
    const values = [
      [1, { 'elevation-1': true }],
      [undefined, {}],
      [null, {}],
      [20, { 'elevation-20': true }],
      [0, { 'elevation-0': true }],
      ['14', { 'elevation-14': true }],
    ] as const

    for (const [elevation, equal] of values) {
      const props = { elevation }
      const { elevationClasses } = useElevation(props)

      expect(elevationClasses.value).toEqual(equal)
    }

    const { elevationClasses } = useElevation({ flat: true })

    expect(elevationClasses.value).toEqual({ 'elevation-0': true })
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
