// Libraries
import Vue from 'vue'

// Components
import VBottomNavigation from '../VBottomNavigation'
import VBtn from '../../VBtn/VBtn'

// Utilities
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'

function createBtn (val = null) {
  const options = {
    attrs: {},
    props: { text: true },
  }
  if (val) options.attrs = { value: val }

  return Vue.component('test', {
    render (h) {
      return h(VBtn, options)
    },
  })
}

describe('VBottomNavigation.ts', () => {
  type Instance = InstanceType<typeof VBottomNavigation>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options: MountOptions<Instance> = {}) => {
      return mount(VBottomNavigation, {
        mocks: {
          $vuetify: {
            application: {
              bottom: 0,
              register: () => {},
              unregister: () => {},
            },
          },
        },
        ...options,
      })
    }
  })

  it('should be visible with a true value', async () => {
    const wrapper = mountFunction({
      propsData: { inputValue: true },
      slots: {
        default: [VBtn, VBtn],
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.styles).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ inputValue: false })

    expect(wrapper.vm.styles).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should update application when height or inputValue changes', () => {
    const wrapper = mountFunction({
      propsData: {
        app: true,
      },
      slots: {
        default: [VBtn, VBtn],
      },
    })

    const spy = jest.spyOn(wrapper.vm, 'updateApplication')

    wrapper.setProps({ height: 80 })

    expect(spy).toHaveBeenCalled()

    wrapper.setProps({ inputValue: false })

    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should fire an event and activate/deactivate when reached threshold', async () => {
    const updateInputValue = jest.fn()
    const wrapper = mountFunction()
    wrapper.vm.$on('update:input-value', updateInputValue)

    expect(updateInputValue).not.toHaveBeenCalled()

    // Scrolling down
    wrapper.vm.currentScroll = 1000
    wrapper.vm.previousScroll = 900
    wrapper.vm.isScrollingUp = false

    wrapper.vm.thresholdMet()
    expect(updateInputValue).toHaveBeenCalled()
    expect(wrapper.vm.isActive).toBeTruthy()

    // Scrolling down
    wrapper.vm.currentScroll = 900
    wrapper.vm.previousScroll = 1000
    wrapper.vm.isScrollingUp = true

    wrapper.vm.thresholdMet()
    expect(updateInputValue).toHaveBeenCalled()
    expect(wrapper.vm.isActive).toBeFalsy()
  })

  it('should fire change event when updated', () => {
    const change = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        app: true,
      },
      slots: {
        default: [VBtn, VBtn],
      },
      listeners: {
        change,
      },
    })

    expect(change).not.toHaveBeenCalled()

    wrapper.find('button').trigger('click')

    expect(change).toHaveBeenCalled()
  })
})
