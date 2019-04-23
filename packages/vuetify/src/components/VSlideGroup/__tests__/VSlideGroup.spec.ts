// Components
import VSlideGroup from '../VSlideGroup'

// Utilities
import { ExtractVue } from '../../../util/mixins'
import {
  mount,
  shallowMount,
  Wrapper
} from '@vue/test-utils'

describe('VSlideGroup.ts', () => {
  type Instance = ExtractVue<typeof VSlideGroup>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return shallowMount(VSlideGroup, {
        methods: { setWidths: jest.fn() },
        mocks: {
          $vuetify: {
            rtl: false,
            breakpoint: {
              width: 1920
            }
          }
        },
        ...options
      })
    }
  })

  it('should conditionally have affixes, prev and next', () => {
    const wrapper = mountFunction({
      data: () => ({
        isOverflowing: true
      }),
      propsData: {
        showArrows: true
      }
    })

    expect(wrapper.vm.hasAffixes).toBe(true)
    expect(wrapper.vm.hasNext).toBe(false)
    expect(wrapper.vm.hasPrev).toBe(false)

    wrapper.setData({
      scrollOffset: 100,
      widths: {
        content: 1000,
        wrapper: 500
      }
    })

    expect(wrapper.vm.hasPrev).toBe(true)

    wrapper.setData({
      scrollOffset: -100,
      widths: {
        content: 1000,
        wrapper: 500
      }
    })

    expect(wrapper.vm.hasNext).toBe(true)
  })

  it('should be considered mobile', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.isMobile).toBe(false)

    wrapper.vm.$vuetify.breakpoint.width = 700

    expect(wrapper.vm.isMobile).toBe(true)
  })

  // TODO: Unsure what we're actually testing, willChange not found in jest 24
  it.skip('should call on touch methods', async () => {
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

  it('it should scroll from affix click', async () => {
    const onClick = jest.fn()
    const scrollTo = jest.fn()
    const setWidths = jest.fn()
    const wrapper = mountFunction({
      methods: { scrollTo, setWidths },
      propsData: {
        showArrows: true
      },
      listeners: {
        'click:prev': onClick,
        'click:next': onClick
      }
    })

    wrapper.setData({
      isOverflowing: true,
      scrollOffset: 200,
      widths: {
        content: 1000,
        wrapper: 500
      }
    })

    await wrapper.vm.$nextTick()

    const prev = wrapper.find('.v-slide-group__prev')
    const next = wrapper.find('.v-slide-group__next')

    prev.trigger('click')
    next.trigger('click')
    expect(scrollTo).toHaveBeenCalledTimes(2)
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('should accept scoped slots', () => {
    const wrapper = mount(VSlideGroup, {
      computed: {
        hasAffixes: () => true,
        hasNext: () => true,
        hasPrev: () => true
      },
      propsData: {
        showArrows: true
      },
      scopedSlots: {
        prev () {
          return this.$createElement('div', {
            staticClass: 'fizz'
          }, 'foo')
        },
        next () {
          return this.$createElement('div', {
            staticClass: 'fizz'
          }, 'bar')
        }
      }
    })

    wrapper.setData({ isOverflowing: true })

    expect(wrapper.findAll('.fizz')).toHaveLength(2)
  })

  it('should match snapshot in rtl', async () => {
    const wrapper = mountFunction({
      computed: {
        hasAffixes: () => true,
        hasNext: () => true,
        hasPrev: () => true
      },
      propsData: {
        showArrows: true
      },
      mocks: {
        $vuetify: {
          rtl: true
        }
      }
    })

    const html1 = wrapper.html()

    expect(html1).toMatchSnapshot()

    wrapper.vm.$vuetify.rtl = false

    const html2 = wrapper.html()

    expect(html1).not.toEqual(html2)
    expect(html2).toMatchSnapshot()
  })
})
