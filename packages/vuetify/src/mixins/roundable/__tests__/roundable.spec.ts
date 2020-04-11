// Mixins
import Roundable from '../'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

const Component = Roundable.extend({
  render: h => h('div'),
})

describe('rounded.ts', () => {
  type Instance = InstanceType<typeof Component>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(Component, {
        ...options,
      })
    }
  })

  it('should generate roundable classes', async () => {
    const wrapper = mountFunction()

    const states = [
      [undefined, undefined, {}],
      [true, undefined, { rounded: true }],
      [true, true, { rounded: true }],
      [undefined, true, { 'rounded-0': true }],
      ['pill', undefined, { 'rounded-pill': true }],
    ]

    for (const [rounded, tile, equal] of states) {
      wrapper.setProps({ rounded, tile })

      await wrapper.vm.$nextTick()

      expect(wrapper.vm.roundedClasses).toEqual(equal)
    }
  })
})
