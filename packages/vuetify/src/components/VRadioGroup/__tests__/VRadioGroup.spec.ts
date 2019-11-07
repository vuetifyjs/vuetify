// Components
import VRadio from '../VRadio'
import VRadioGroup from '../VRadioGroup'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VRadioGroup.ts', () => {
  type Instance = InstanceType<typeof VRadioGroup>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VRadioGroup, options)
    }
  })

  it('should match snapshot', async () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match dense snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        dense: true,
      },
      slots: {
        default: [VRadio],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
