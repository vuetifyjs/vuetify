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
import { waitAnimationFrame } from '../../../../test'

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

    await waitAnimationFrame()

    const item = wrapper.find(VWindowItem.options)
    // Before enter
    expect(wrapper.vm.isActive).toBeFalsy()
    expect(wrapper.vm.transitionHeight).toBeUndefined()
    item.vm.onBeforeTransition()
    expect(wrapper.vm.isActive).toBeTruthy()
    expect(wrapper.vm.transitionHeight).toBe('0px')

    // Enter
    const el = { clientHeight: 50 }
    item.vm.onEnter(el)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.transitionHeight).toBe('50px')

    // After enter
    item.vm.onAfterTransition()
    expect(wrapper.vm.transitionHeight).toBeUndefined()
    expect(wrapper.vm.isActive).toBeFalsy()

    // Canceling
    item.vm.onBeforeTransition()
    item.vm.onEnter(el)
    item.vm.onTransitionCancelled()

    expect(item.vm.inTransition).toBeFalsy()
    expect(wrapper.vm.isActive).toBeFalsy()

    // Normal path.
    item.vm.onBeforeTransition()
    expect(wrapper.vm.isActive).toBeTruthy()
    item.vm.onAfterTransition()

    expect(wrapper.vm.isActive).toBeFalsy()
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

  it('should not set initial height if no computedTransition', async () => {
    const heightChanged = jest.fn()
    const wrapper = mount(VWindow, {
      propsData: {
        transition: false,
        reverseTransition: false,
      },
      watch: {
        transitionHeight: heightChanged,
      },
      slots: {
        default: [VWindowItem],
      },
      mocks: {
        $vuetify: {
          rtl: false,
        },
      },
    })

    const item = wrapper.find(VWindowItem.options)
    expect(wrapper.vm.computedTransition).toBeFalsy()

    item.vm.onBeforeTransition()
    expect(wrapper.vm.isActive).toBeTruthy()
    expect(heightChanged).toHaveBeenCalledTimes(1)

    item.vm.onEnter(wrapper.$el)
    await waitAnimationFrame()
    expect(wrapper.vm.isActive).toBeTruthy()

    expect(heightChanged).toHaveBeenCalledTimes(1)
  })

  it('should increase and decrease transition count correctly', () => {
    const wrapper = mount(VWindow, {
      slots: {
        default: [VWindowItem, VWindowItem, VWindowItem],
      },
    })

    const items = wrapper.vm.items
    expect(items).toHaveLength(3)

    expect(wrapper.vm.transitionCount).toBe(0)
    expect(wrapper.vm.isActive).toBeFalsy()
    items[0].onBeforeTransition()
    expect(wrapper.vm.transitionCount).toBe(1)
    expect(wrapper.vm.isActive).toBeTruthy()
    items[1].onBeforeTransition()
    expect(wrapper.vm.transitionCount).toBe(2)
    expect(wrapper.vm.isActive).toBeTruthy()
    items[0].onTransitionCancelled()
    expect(wrapper.vm.transitionCount).toBe(1)
    expect(wrapper.vm.isActive).toBeTruthy()
    items[2].onBeforeTransition()
    expect(wrapper.vm.transitionCount).toBe(2)
    expect(wrapper.vm.isActive).toBeTruthy()
    items[1].onAfterTransition()
    expect(wrapper.vm.transitionCount).toBe(1)
    expect(wrapper.vm.isActive).toBeTruthy()
    items[2].onAfterTransition()
    expect(wrapper.vm.transitionCount).toBe(0)
    expect(wrapper.vm.isActive).toBeFalsy()
  })
})
