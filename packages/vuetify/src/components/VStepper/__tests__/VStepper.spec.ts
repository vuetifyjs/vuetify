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

  it('should render a flat stepper', () => {
    const wrapper = mountFunction({
      propsData: {
        flat: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have the correct elevation', async () => {
    const wrapper = mountFunction()

    wrapper.setProps({ elevation: 0 })
    expect(wrapper.classes('elevation-0')).toBe(true)

    wrapper.setProps({ elevation: 12 })
    expect(wrapper.classes('elevation-12')).toBe(true)

    wrapper.setProps({ elevation: 24 })
    expect(wrapper.classes('elevation-24')).toBe(true)
  })
})
