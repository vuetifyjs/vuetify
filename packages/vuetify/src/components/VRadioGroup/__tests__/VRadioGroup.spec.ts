// Components
import VRadioGroup from '../VRadioGroup'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'

describe('VRadioGroup.ts', () => {
  type Instance = InstanceType<typeof VRadioGroup>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VRadioGroup, {
        ...options
      })
    }
  })

  it('should match snapshot', async () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
