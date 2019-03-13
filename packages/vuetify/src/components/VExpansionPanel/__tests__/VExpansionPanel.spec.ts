// Components
import VExpansionPanel from '../VExpansionPanel'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'

describe('VExpansionPanel.ts', () => {
  type Instance = InstanceType<typeof VExpansionPanel>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VExpansionPanel, {
        ...options
      })
    }
  })

  it('should work', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
