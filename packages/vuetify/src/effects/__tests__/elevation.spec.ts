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

      expect(elevationClasses.value).toEqual(equal)
    }
  })

  it('should generate and return elevation props', () => {
    expect(elevationProps().elevation.default).toBeUndefined()
    expect(elevationProps({ elevation: 2 }).elevation.default).toBe(2)
    expect(elevationProps({ elevation: '22' }).elevation.default).toBe('22')
  })
})
