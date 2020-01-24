import { reactive } from 'vue'

// Effects
import {
  ElevationProps,
  useElevationClasses,
} from '../'

describe('elevation.ts', () => {
  it('should have the correct class', () => {
    const props = reactive<ElevationProps>({})
    expect(useElevationClasses(props).value).toEqual({})

    props.elevation = 1
    expect(useElevationClasses(props).value).toEqual({ 'elevation-1': true })

    delete props.elevation
    expect(useElevationClasses(props).value).toEqual({})

    props.elevation = 20
    expect(useElevationClasses(props).value).toEqual({ 'elevation-20': true })

    props.elevation = 0
    expect(useElevationClasses(props).value).toEqual({})
  })
})
