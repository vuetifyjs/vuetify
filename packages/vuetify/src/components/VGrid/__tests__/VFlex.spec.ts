// Components
import VFlex from '../VFlex'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper
} from '@vue/test-utils'

describe('VFlex.ts', () => {
  type Instance = InstanceType<typeof VFlex>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VFlex, options)
  })

  it('should render', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
