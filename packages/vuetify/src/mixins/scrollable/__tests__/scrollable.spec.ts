// Components
import Scrollable from '../'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'
import { scrollWindow } from '../../../../test'

describe('Scrollable.ts', () => {
  type Instance = InstanceType<typeof Scrollable>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    const Mock = {
      mixins: [Scrollable],
      render (h) {
        return h('div', {
          directives: [{
            name: 'scroll',
            value: this.onScroll,
          }],
        })
      },
    }
    mountFunction = (options = {}) => {
      return mount(Mock, {
        ...options,
      })
    }
  })

  it('should set isScrollingUp', async () => {
    const wrapper = mountFunction()

    await scrollWindow(1000)
    expect(wrapper.vm.isScrollingUp).toBe(false)
    await scrollWindow(0)
    expect(wrapper.vm.isScrollingUp).toBe(true)
  })

  it('should set a custom target', async () => {
    const wrapper = mountFunction({
      propsData: {
        scrollTarget: 'body',
      },
    })

    wrapper.vm.onScroll()
    expect(wrapper.vm.target).toBe(document.body)
  })

  it('should do nothing if !canScroll', async () => {
    const wrapper = mountFunction({
      data: () => ({
        currentScroll: 100,
        previousScroll: 0,
      }),
      computed: {
        canScroll () {
          return false
        },
      },
    })

    await scrollWindow(1000)

    expect(wrapper.vm.currentScroll).toBe(100)
    expect(wrapper.vm.previousScroll).toBe(0)
  })

  it('should accept a custom scrollThreshold', async () => {
    const thresholdMet = jest.fn()
    const wrapper = mountFunction({
      methods: {
        thresholdMet,
      },
      propsData: {
        scrollThreshold: 1000,
      },
    })

    await scrollWindow(900)
    await wrapper.vm.$nextTick()

    expect(thresholdMet).not.toHaveBeenCalled()

    await scrollWindow(1001)
    await wrapper.vm.$nextTick()
    expect(thresholdMet).toHaveBeenCalled()
  })

  it('should reset savedScroll when isActive state changes', () => {
    const wrapper = mountFunction({
      data: () => ({
        savedScroll: 100,
      }),
    })

    wrapper.setData({ isActive: true })

    expect(wrapper.vm.savedScroll).toBe(0)
  })

  it('should warn if target isn\'t present', async () => {
    mountFunction({
      propsData: {
        scrollTarget: '#test',
      },
    })

    expect('Unable to locate element with identifier #test').toHaveBeenTipped()
  })
})
