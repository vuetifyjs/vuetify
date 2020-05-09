import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import VSimpleCheckbox from '../VSimpleCheckbox'

describe('VSimpleCheckbox.ts', () => {
  type Instance = InstanceType<typeof VSimpleCheckbox>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VSimpleCheckbox, options)
    }
  })

  it('should pass down listeners', () => {
    const mouseleave = jest.fn()
    const wrapper = mountFunction({
      propsData: { disabled: true },
      listeners: {
        mouseleave,
      },
    })

    const element = wrapper.find('.v-simple-checkbox')

    element.trigger('mouseleave')

    expect(mouseleave).toHaveBeenCalledTimes(1)
  })
})
