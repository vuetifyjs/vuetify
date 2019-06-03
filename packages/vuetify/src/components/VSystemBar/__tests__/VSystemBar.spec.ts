// Libraries
import Vue from 'vue'

// Components
import VSystemBar from '../VSystemBar'

// Utilities
import {
  createLocalVue,
  mount,
  Wrapper,
} from '@vue/test-utils'

describe('VSystemBar.ts', () => {
  type Instance = InstanceType<typeof VSystemBar>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VSystemBar, {
        mocks: {
          $vuetify: {
            application: {
              register: () => {},
              unregister: () => {},
            },
          },
        },
        ...options,
      })
    }
  })

  it('should return the correct height', () => {
    const wrapper = mountFunction({
      propsData: {
        app: true,
        height: 56,
      },
    })

    expect(wrapper.vm.computedHeight).toBe(56)

    wrapper.setProps({ height: '48' })
    expect(wrapper.vm.computedHeight).toBe(48)

    wrapper.setProps({ height: 'auto' })
    expect(wrapper.vm.computedHeight).toBe('auto')

    wrapper.setProps({ height: undefined })
    expect(wrapper.vm.computedHeight).toBe(24)

    wrapper.setProps({ window: true })
    expect(wrapper.vm.computedHeight).toBe(32)
  })
})
