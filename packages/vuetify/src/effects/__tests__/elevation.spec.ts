// Effects
import {
  elevationProps,
  ElevationProps,
  useElevationClasses,
} from '../elevation'

describe('elevation.ts', () => {
  it('should have the correct class', () => {
    const values: [ElevationProps['elevation'], Record<string, boolean>][] = [
      [1, { 'elevation-1': true }],
      [undefined, {}],
      [null, {}],
      [20, { 'elevation-20': true }],
      [0, { 'elevation-0': true }],
      ['14', { 'elevation-14': true }],
    ]

    for (const [elevation, equal] of values) {
      const props = { elevation }
      const { elevationClasses } = useElevationClasses(props)
      const expects = Object.keys(equal).length > 0 ? { class: equal } : equal

      expect(elevationClasses.value).toEqual(expects)
    }

    const { elevationClasses } = useElevationClasses({ flat: true })

    expect(elevationClasses.value).toEqual({ class: { 'elevation-0': true } })
  })

  it('should generate and return elevation props', () => {
    expect(elevationProps().elevation.default).toBeUndefined()
    expect(elevationProps({ elevation: 2 }).elevation.default).toBe(2)
    expect(elevationProps({ elevation: '22' }).elevation.default).toBe('22')
  })

  it('should only allow numeric values between 0 and 24', () => {
    const { elevation: { validator } } = elevationProps()
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
