// Components
import VSlideGroup from '../VSlideGroup'

// Utilities
import { resizeWindow } from '../../../../test'
import { ExtractVue } from '../../../util/mixins'
import {
  mount,
  shallowMount,
  Wrapper
} from '@vue/test-utils'

describe('VSliderGroup.ts', () => {
  type Instance = ExtractVue<typeof VSlideGroup>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return shallowMount(VSlideGroup, {
        ...options,
        mocks: {
          $vuetify: {
            breakpoint: {
              width: 1920
            }
          }
        }
      })
    }
  })

  it('should conditionally have affixes, prepend and append', () => {
    const wrapper = mountFunction({
      data: () => ({
        isOverflowing: true
      }),
      propsData: {
        showArrows: true
      }
    })

    expect(wrapper.vm.hasAffixes).toBe(true)
    expect(wrapper.vm.hasAppend).toBe(false)
    expect(wrapper.vm.hasPrepend).toBe(false)

    wrapper.setData({ scrollOffset: 100 })

    expect(wrapper.vm.hasPrepend).toBe(true)

    wrapper.setData({ scrollOffset: -100 })

    expect(wrapper.vm.hasAppend).toBe(true)
  })

  it('should be considered mobile', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.isMobile).toBe(false)

    wrapper.vm.$vuetify.breakpoint.width = 700

    expect(wrapper.vm.isMobile).toBe(true)
  })

  it('should call on touch methods', async () => {
    const wrapper = mountFunction({
      data: () => ({
        isOverflowing: true
      })
    })

    expect(wrapper.vm.scrollOffset).toBe(0)

    const touchstartEvent = {
      touchstartX: 10,
      touchmoveX: 0
    }

    wrapper.vm.onTouchStart(touchstartEvent)

    expect(wrapper.vm.startX).toBe(10)
    expect(wrapper.vm.$refs.content.style.transition).toBe('none')
    expect(wrapper.vm.$refs.content.style.willChange).toBe('transform')

    const touchmoveEvent = {
      touchstartX: 10,
      touchmoveX: 100
    }
    wrapper.vm.onTouchMove(touchmoveEvent)

    expect(wrapper.vm.scrollOffset).toBe(-90)

    wrapper.vm.onTouchEnd()

    expect(wrapper.vm.scrollOffset).toBe(0)

    wrapper.setData({
      scrollOffset: 90,
      isOverflowing: true
    })

    wrapper.vm.onTouchEnd()
    expect(wrapper.vm.scrollOffset).toBe(0)

    // TODO: Figure out why this doesn't work in TS + vue-test-utils
    // groupWrapper.trigger('touchmove')
    // touch(groupWrapper).start(0, 0)
    // touch(groupWrapper).end(0, 0)
    // touch(groupWrapper).move(15, 15)
    // expect(onTouch.mock.calls.length).toBe(3)
  })

  it('should invoke method only if overflowing', () => {
    const wrapper = mountFunction()
    const fn = jest.fn()
    const event = {
      touchstartX: 0,
      touchmoveX: 0
    }

    wrapper.vm.overflowCheck(event, fn)
    expect(fn).not.toHaveBeenCalled()

    wrapper.setData({ isOverflowing: true })
    wrapper.vm.overflowCheck(event, fn)
    expect(fn).toHaveBeenCalled()
  })

  it('it should scroll from affix click', () => {
    const onClick = jest.fn()
    const scrollTo = jest.fn()
    const wrapper = mount(VSlideGroup, {
      data: () => ({
        isOverflowing: true,
        scrollOffset: 200,
        widths: {
          content: 1920,
          wrapper: 1000
        }
      }),
      methods: { scrollTo },
      propsData: {
        showArrows: true
      },
      listeners: {
        'click:prepend': onClick,
        'click:append': onClick
      }
    })

    const prepend = wrapper.find('.v-slide-group__prepend')
    const append = wrapper.find('.v-slide-group__append')

    prepend.trigger('click')
    append.trigger('click')
    expect(scrollTo).toHaveBeenCalledTimes(2)
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('should accept scoped slots', () => {
    const wrapper = mount(VSlideGroup, {
      data: () => ({
        isOverflowing: true,
        scrollOffset: 200,
        widths: {
          content: 1920,
          wrapper: 1000
        }
      }),
      propsData: {
        showArrows: true
      },
      scopedSlots: {
        prepend () {
          return this.$createElement('div', {
            staticClass: 'fizz'
          }, 'foo')
        },
        append () {
          return this.$createElement('div', {
            staticClass: 'fizz'
          }, 'bar')
        }
      }
    })

    const affixes = wrapper.findAll('.fizz')
    const foo = affixes.at(0)
    const bar = affixes.at(1)
  })
})
