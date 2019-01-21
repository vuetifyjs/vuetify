// Libraries
import Vue from 'vue'

// Components
import VSlideGroup from '../VSlideGroup'

// Utilities
import {
  shallowMount,
  Wrapper
} from '@vue/test-utils'
import { touch } from '@/test'

describe('VSliderGroup.ts', () => {
  let mountFunction: (options?: object) => Wrapper<Vue>

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

  it('should be considered mobile', () => {
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

    const onTouch = jest.fn()
    wrapper.setMethods({
      onTouchStart: onTouch,
      onTouchMove: onTouch,
      onTouchEnd: onTouch
    })

    const groupWrapper = wrapper.find('.v-slide-group__wrapper')

    // TODO: Figure out why this doesn't work in TS
    // groupWrapper.trigger('touchmove')
    // touch(groupWrapper).start(0, 0)
    // touch(groupWrapper).end(0, 0)
    // touch(groupWrapper).move(15, 15)
    // expect(onTouch.mock.calls.length).toBe(3)
  })
})
