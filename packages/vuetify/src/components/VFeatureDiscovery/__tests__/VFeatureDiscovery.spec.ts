// Components
import VFeatureDiscovery from '../VFeatureDiscovery'

// Services
import { Theme } from '../../../services/theme'

// Utilities
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'

// Libraries
import Vue from 'vue'

describe('FeatureDiscovery.ts', () => {
  type Instance = InstanceType<typeof VFeatureDiscovery>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {} as MountOptions<Instance>) => {
      return mount(VFeatureDiscovery, {
        mocks: {
          $vuetify: {
            theme: new Theme(),
          },
        },
        ...options,
      })
    }
  })

  it('should render', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with activator and activate', () => {
    const { $createElement: h } = new Vue()
    const wrapper = mountFunction({
      scopedSlots: {
        activator: ({ on }) => h('button', {
          attrs: {
            id: 'foo',
          },
          on,
        }),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    expect(wrapper.vm.isActive).toBeFalsy()
    wrapper.find('#foo').trigger('click')
    expect(wrapper.vm.isActive).toBeTruthy()
  })

  it('should render flat component', () => {
    const wrapper = mountFunction({
      propsData: {
        flat: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component w/o ripple', () => {
    const wrapper = mountFunction({
      propsData: {
        noRipple: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should close on esc', () => {
    const wrapper = mountFunction()
    wrapper.setData({
      isActive: true,
    })

    wrapper.trigger('keydown.esc')
    expect(wrapper.vm.isActive).toBeFalsy()
  })

  it('should close on content click', () => {
    const wrapper = mountFunction()
    const content = wrapper.find('.v-feature-discovery__content')

    wrapper.setData({
      isActive: true,
    })
    content.trigger('click')
    expect(wrapper.vm.isActive).toBeFalsy()

    wrapper.setData({
      isActive: true,
    })
    content.element.setAttribute('disabled', 'disabled')
    content.trigger('click')
    expect(wrapper.vm.isActive).toBeTruthy()
  })

  it('should change color', () => {
    const wrapper = mountFunction({
      propsData: {
        color: 'red darken-2',
        highlightColor: 'warning lighten-1',
        textColor: '#fefefe',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should update dimensions twice on resize', () => {
    jest.useFakeTimers()

    const wrapper = mountFunction()
    wrapper.setData({
      isActive: true,
    })
    wrapper.vm.updateDimensions = jest.fn()

    wrapper.vm.onResize()
    jest.runAllTimers()
    expect(wrapper.vm.updateDimensions).toHaveBeenCalledTimes(2)

    jest.useRealTimers()
  })

  it('should get left offset', () => {
    const wrapper = mountFunction()

    ;(window as any).pageXOffset = 10
    expect(wrapper.vm.getOffsetLeft()).toBe(10)

    ;(window as any).pageXOffset = 0
    document.documentElement.scrollLeft = 10
    expect(wrapper.vm.getOffsetLeft()).toBe(10)

    wrapper.vm.hasWindow = false
    expect(wrapper.vm.getOffsetLeft()).toBe(0)
  })

  it('should get top offset', () => {
    const wrapper = mountFunction()

    ;(window as any).pageYOffset = 10
    expect(wrapper.vm.getOffsetTop()).toBe(10)

    ;(window as any).pageYOffset = 0
    document.documentElement.scrollTop = 10
    expect(wrapper.vm.getOffsetTop()).toBe(10)

    wrapper.vm.hasWindow = false
    expect(wrapper.vm.getOffsetTop()).toBe(0)
  })
})
