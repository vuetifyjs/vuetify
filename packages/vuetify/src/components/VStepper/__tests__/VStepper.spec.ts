// Components
import VStepper from '../VStepper'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VStepper.ts', () => {
  type Instance = InstanceType<typeof VStepper>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VStepper, {
        ...options,
      })
    }
  })

  // https://github.com/vuetifyjs/vuetify/issues/10096
  it('should accept 0 as a step value', () => {
    const wrapper = mountFunction({
      propsData: { value: 0 },
    })

    expect(wrapper.vm.internalValue).toBe(0)
  })
})
