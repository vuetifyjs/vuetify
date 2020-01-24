// Setup
import { defineComponent } from 'vue'

// Mixins
import {
  ElevationProps,
  useElevationClasses,
} from '../'

// Utilities
import { mount } from '@vue/test-utils'

describe('elevation.ts', () => {
  /* tslint:disable-next-line */
  const MockComponent = defineComponent({
    props: ElevationProps(),

    setup (props) {
      return { classes: useElevationClasses(props) }
    },
  })

  function mountFunction (options?: object) {
    return mount(MockComponent, options)
  }

  it('should have the correct class', () => {
    // const wrapper = mountFunction()

    // expect(wrapper.vm.computedElevation).toBeUndefined()
    // expect(wrapper.vm.elevationClasses).toEqual({})

    // wrapper.setProps({ elevation: 1 })
    // expect(wrapper.vm.computedElevation).toBe(1)
    // expect(wrapper.vm.elevationClasses).toEqual({
    //   'elevation-1': true,
    // })

    // wrapper.setProps({ elevation: '12' })
    // expect(wrapper.vm.computedElevation).toBe('12')
    // expect(wrapper.vm.elevationClasses).toEqual({
    //   'elevation-12': true,
    // })

    // wrapper.setProps({ elevation: 0 })
    // expect(wrapper.vm.computedElevation).toBe(0)
    // expect(wrapper.vm.elevationClasses).toEqual({
    //   'elevation-0': true,
    // })
  })
})
