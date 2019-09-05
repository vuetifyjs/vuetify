// Components
import VExpansionPanelHeader from '../VExpansionPanelHeader'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VExpansionPanelHeader', () => {
  type Instance = InstanceType<typeof VExpansionPanelHeader>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VExpansionPanelHeader, {
        provide: {
          expansionPanel: {
            registerHeader: () => {},
            unregisterHeader: () => {},
          },
        },
        ...options,
      })
    }
  })

  // Ensure that the focus background only occurs
  // from a tab focus
  it('should react to mousedown and mouseup', () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.hasMousedown).toBe(false)
    wrapper.trigger('mousedown')
    expect(wrapper.vm.hasMousedown).toBe(true)
    wrapper.trigger('mouseup')
    expect(wrapper.vm.hasMousedown).toBe(false)
  })
})
