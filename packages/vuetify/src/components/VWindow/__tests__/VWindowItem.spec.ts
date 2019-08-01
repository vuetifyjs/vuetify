// Libraries
import Vue from 'vue'

// Plugins
import Router from 'vue-router'

// Components
import VWindow from '../VWindow'
import VWindowItem from '../VWindowItem'

// Utilities
import {
  createLocalVue,
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'

describe('VWindowItem.ts', () => {
  type Instance = InstanceType<typeof VWindowItem>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  let router: Router
  let localVue: typeof Vue

  beforeEach(() => {
    router = new Router()
    localVue = createLocalVue()
    localVue.use(Router)

    mountFunction = (options = {}) => {
      return mount(VWindowItem, {
        localVue,
        router,
        ...options,
      })
    }
  })

  // eslint-disable-next-line max-statements
  it('should transition content', async () => {
    const wrapper = mount(VWindow, {
      slots: {
        default: [VWindowItem],
      },
      mocks: {
        $vuetify: {
          rtl: false,
        },
      },
    })

    await new Promise(resolve => window.requestAnimationFrame(resolve))

    const item = wrapper.find(VWindowItem.options)
    // Before enter
    expect(wrapper.vm.isActive).toBeFalsy()
    item.vm.onBeforeEnter()
    expect(wrapper.vm.isActive).toBeTruthy()

    // Enter
    const el = document.createElement('div')
    expect(wrapper.vm.internalHeight).toBeUndefined()
    item.vm.onEnter(el)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalHeight).toBe('0px')

    // After enter
    item.vm.onAfterEnter()
    await new Promise(resolve => window.requestAnimationFrame(resolve))
    expect(wrapper.vm.internalHeight).toBeUndefined()
    expect(wrapper.vm.isActive).toBeFalsy()

    // Leave
    item.vm.onBeforeLeave(el)
    expect(wrapper.vm.internalHeight).toBe('0px')

    // Canceling
    item.vm.onBeforeEnter()
    item.vm.onEnter(el, () => {})
    item.vm.onEnterCancelled()

    expect(item.vm.wasCancelled).toBeTruthy()
    expect(wrapper.vm.isActive).toBeTruthy()

    item.vm.onAfterEnter()

    await new Promise(resolve => window.requestAnimationFrame(resolve))

    expect(wrapper.vm.isActive).toBeTruthy()
  })

  it('should use custom transition', () => {
    const wrapper = mountFunction({
      propsData: {
        transition: 'foo',
        reverseTransition: 'bar',
      },
      data: () => ({
        windowGroup: {
          internalReverse: false,
          register: () => {},
          unregister: () => {},
        },
      }),
    })

    expect(wrapper.vm.computedTransition).toBe('foo')

    wrapper.setProps({ transition: false })
    expect(wrapper.vm.computedTransition).toBe('')

    wrapper.vm.windowGroup.internalReverse = true
    expect(wrapper.vm.computedTransition).toBe('bar')

    wrapper.setProps({ reverseTransition: false })
    expect(wrapper.vm.computedTransition).toBe('')
  })

  it('should only call done when the transition is on the window-item', () => {
    const done = jest.fn()

    const wrapper = mountFunction({
      data: () => ({
        done,
        windowGroup: {
          internalReverse: false,
          register: () => {},
          unregister: () => {},
        },
      }),
    })

    // Incorrect property
    wrapper.vm.onTransitionEnd({
      propertyName: 'border-color',
    })

    expect(done).not.toHaveBeenCalled()

    // Incorrect target
    wrapper.vm.onTransitionEnd({
      propertyName: 'transform',
      target: document.createElement('div'),
    })

    expect(done).not.toHaveBeenCalled()

    // Should work
    wrapper.vm.onTransitionEnd({
      propertyName: 'transform',
      target: wrapper.vm.$el,
    })

    expect(done).toHaveBeenCalledTimes(1)
  })

  it('should immediately call done when no transition', async () => {
    const done = jest.fn()

    const wrapper = mountFunction({
      propsData: {
        transition: false,
        reverseTransition: false,
      },
      data: () => ({
        windowGroup: {
          internalHeight: 0,
          register: () => {},
          unregister: () => {},
        },
      }),
    })

    expect(wrapper.vm.computedTransition).toBeFalsy()

    wrapper.vm.onEnter(wrapper.$el, done)

    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(done).toHaveBeenCalled()
  })
})
