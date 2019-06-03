// Components
import VExpansionPanels from '../VExpansionPanels'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VExpansionPanels.ts', () => {
  type Instance = InstanceType<typeof VExpansionPanels>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VExpansionPanels, {
        ...options,
      })
    }
  })

  it('should work', () => {
    const wrapper = mountFunction({
      propsData: { value: 0 },
    })

    const item = {
      isActive: false,
      nextIsActive: false,
      value: undefined,
    } as any

    wrapper.vm.updateItem(item, 0)

    expect(item.isActive).toBe(true)
    expect(item.nextIsActive).toBe(false)

    wrapper.setProps({ value: 1 })
    wrapper.vm.updateItem(item, 0)

    expect(item.isActive).toBe(false)
    expect(item.nextIsActive).toBe(true)
  })
})
