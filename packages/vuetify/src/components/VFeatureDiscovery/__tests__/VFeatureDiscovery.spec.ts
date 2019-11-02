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
const { $createElement: h } = new Vue()

describe('FeatureDiscovery.ts', () => {
  type Instance = InstanceType<typeof VFeatureDiscovery>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

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

  it('should render active component', async () => {
    const wrapper = mountFunction()
    wrapper.setData({
      isActive: true,
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should deactivate', async () => {
    jest.useFakeTimers()

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
    wrapper.setData({
      isActive: true,
    })
    await wrapper.vm.$nextTick()

    wrapper.setData({
      isActive: false,
    })
    await wrapper.vm.$nextTick()

    const activator = wrapper.vm.getActivator()
    expect(activator.style.zIndex).not.toBe('')
    jest.runAllTimers()
    expect(activator.style.zIndex).toBe('')

    jest.useRealTimers()
  })

  it('should check if activator is fixed', () => {
    const activator = document.createElement('div')

    const wrapper = mountFunction({
      methods: {
        getActivator: () => activator,
      },
    })

    wrapper.vm.checkActivatorFixed()
    expect(wrapper.vm.activatorFixed).toBeFalsy()

    activator.style.position = 'fixed'
    wrapper.vm.checkActivatorFixed()
    expect(wrapper.vm.activatorFixed).toBeTruthy()
  })

  it('should render with custom z-index', () => {
    const wrapper = mountFunction({
      propsData: {
        zIndex: 25,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should measure content', () => {
    const wrapper = mountFunction({
      slots: {
        default: `<div>content</div>`,
      },
    })

    wrapper.vm.$refs.content.getBoundingClientRect = () => ({
      top: 1,
      left: 2,
      bottom: 3,
      right: 4,
      width: 5,
      height: 6,
    })
    wrapper.vm.measureContent()
    expect(wrapper.vm.dimensions.content).toMatchSnapshot()
  })

  it('should calculate backdrop size', () => {
    const wrapper = mountFunction({
      slots: {
        default: `<div>content</div>`,
      },
    })

    wrapper.vm.$refs.content.getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 120,
      height: 100,
    })
    wrapper.vm.measureContent()

    expect(wrapper.vm.measureDesktopBackdrop()).toMatchObject({
      r: 252.82528798916863,
      size: 585.6505759783372,
      x: 20,
      y: 252.03298642599555,
    })
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
    content.element.removeAttribute('disabled')
    expect(wrapper.vm.isActive).toBeTruthy()

    wrapper.setData({
      isActive: true,
    })
    wrapper.setProps({
      closeOnContentClick: false,
    })
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
    jest.spyOn(wrapper.vm, 'updateDimensions')

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

  describe('sneakPeek', () => {
    const cbs: FrameRequestCallback[] = []
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cbs.push(cb))
    const frame = () => cbs.forEach(cb => cb(performance.now()))

    it('should work', () => {
      const wrapper = mountFunction({
        slots: {
          default: `<div>content</div>`,
        },
      })
      const el = wrapper.vm.$refs.content
      el.style.display = 'none'
      const fn = jest.fn(() => expect(el.style.display).toBe('inline-block'))

      wrapper.vm.sneakPeek(fn)

      expect(requestAnimationFrame).toHaveBeenCalled()
      expect(fn).toHaveBeenCalledTimes(0)

      frame()
      expect(fn).toHaveBeenCalledTimes(1)

      expect(el.style.display).toBe('none')
    })

    it('should call callback directly if display != none', () => {
      const wrapper = mountFunction({
        slots: {
          default: `<div>content</div>`,
        },
      })
      const el = wrapper.vm.$refs.content
      el.style.display = 'block'
      const fn = jest.fn(() => expect(el.style.display).toBe('block'))

      wrapper.vm.sneakPeek(fn)

      expect(requestAnimationFrame).toHaveBeenCalled()
      expect(fn).toHaveBeenCalledTimes(0)

      frame()
      expect(fn).toHaveBeenCalledTimes(1)

      expect(el.style.display).toBe('block')
    })

    it('should call callback directly if no content', () => {
      const wrapper = mountFunction({
        methods: {
          genWrap: () => h('div'),
        },
      })

      const el = wrapper.vm.$refs.content
      expect(el).toBeUndefined()

      const fn = jest.fn()

      wrapper.vm.sneakPeek(fn)

      expect(requestAnimationFrame).toHaveBeenCalled()
      expect(fn).toHaveBeenCalledTimes(0)

      frame()
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })
})
