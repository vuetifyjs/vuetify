// Components
import VSlideGroup from '../VSlideGroup'

// Services
import { Breakpoint } from '../../../services/breakpoint'
import { preset } from '../../../presets/default'

// Utilities
import { ExtractVue } from '../../../util/mixins'
import {
  shallowMount,
  Wrapper,
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
            breakpoint: new Breakpoint(preset),
          },
        },
        ...options,
      })
    }
  })

  it('should conditionally have affixes, prev and next', () => {
    const wrapper = mountFunction({
      data: () => ({
        isOverflowing: true,
      }),
      propsData: {
        showArrows: true,
      },
    })

    expect(wrapper.vm.hasAffixes).toBe(true)
    expect(wrapper.vm.hasNext).toBe(false)
    expect(wrapper.vm.hasPrev).toBe(false)

    wrapper.setData({
      scrollOffset: 100,
      widths: {
        content: 1000,
        wrapper: 500,
      },
    })

    expect(wrapper.vm.hasPrev).toBe(true)

    wrapper.setData({
      scrollOffset: -100,
      widths: {
        content: 1000,
        wrapper: 500,
      },
    })

    expect(wrapper.vm.hasNext).toBe(true)
  })

  it('should compute newOffset for active element', async () => {
    const { calculateNewOffset } = mountFunction().vm
    let currentOffset = 0
    const testOffsetAndUpdate = (direction: 'prev' | 'next', rtl: boolean, expectedOffset: number) => {
      currentOffset = calculateNewOffset(direction, {
        content: 1000,
        wrapper: 400,
      }, rtl, currentOffset)

      expect(currentOffset).toBe(expectedOffset)
    }

    testOffsetAndUpdate('next', false, 400)
    testOffsetAndUpdate('next', false, 600)
    testOffsetAndUpdate('next', false, 600)
    testOffsetAndUpdate('prev', false, 200)
    testOffsetAndUpdate('prev', false, 0)
    testOffsetAndUpdate('prev', false, 0)
    // RTL
    currentOffset = 0
    testOffsetAndUpdate('next', true, -400)
    testOffsetAndUpdate('next', true, -600)
    testOffsetAndUpdate('next', true, -600)
    testOffsetAndUpdate('prev', true, -200)
    testOffsetAndUpdate('prev', true, -0)
    testOffsetAndUpdate('prev', true, -0)
  })

  it('should compute updatedOffset for active element', async () => {
    const { calculateUpdatedOffset } = mountFunction().vm
    const testOffset = (offsetLeft: number, rtl: boolean, expectedOffset: number) => {
      const offset = calculateUpdatedOffset({
        offsetLeft,
        clientWidth: 20,
      } as HTMLElement, {
        content: 1000,
        wrapper: 500,
      }, rtl, 0)

      expect(offset).toBe(expectedOffset)
    }

    testOffset(10, false, 0)
    testOffset(400, false, 0)
    testOffset(600, false, 128)
    testOffset(960, false, 488)
    // RTL
    testOffset(10, true, -498)
    testOffset(400, true, -108)
    testOffset(600, true, 0)
    testOffset(960, true, 0)
  })

  it('should compute centeredOffset for active element', async () => {
    const { calculateCenteredOffset } = mountFunction().vm
    const testOffset = (offsetLeft: number, rtl: boolean, expectedOffset: number) => {
      const offset = calculateCenteredOffset({
        offsetLeft,
        clientWidth: 20,
      } as HTMLElement, {
        content: 1000,
        wrapper: 500,
      }, rtl)

      expect(offset).toBe(expectedOffset)
    }

    testOffset(10, false, 0)
    testOffset(400, false, 160)
    testOffset(600, false, 360)
    testOffset(960, false, 500)
    // RTL
    testOffset(10, true, -500)
    testOffset(400, true, -340)
    testOffset(600, true, -140)
    testOffset(960, true, -0)
  })

  // TODO: Unsure what we're actually testing, willChange not found in jest 24
  it.skip('should call on touch methods', async () => {
    const wrapper = mountFunction({
      data: () => ({
        isOverflowing: true,
      }),
    })

    expect(wrapper.vm.scrollOffset).toBe(0)

    const touchstartEvent = {
      touchstartX: 10,
      touchmoveX: 0,
    }

    wrapper.vm.onTouchStart(touchstartEvent)

    expect(wrapper.vm.startX).toBe(10)
    expect(wrapper.vm.$refs.content.style.transition).toBe('none')
    expect(wrapper.vm.$refs.content.style.willChange).toBe('transform')

    const touchmoveEvent = {
      touchstartX: 10,
      touchmoveX: 100,
    }
    wrapper.vm.onTouchMove(touchmoveEvent)

    expect(wrapper.vm.scrollOffset).toBe(-90)

    wrapper.vm.onTouchEnd()

    expect(wrapper.vm.scrollOffset).toBe(0)

    wrapper.setData({
      scrollOffset: 90,
      isOverflowing: true,
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
      touchmoveX: 0,
      stopPropagation: () => {},
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
        showArrows: true,
      },
      listeners: {
        'click:prev': onClick,
        'click:next': onClick,
      },
    })

    wrapper.setData({
      isOverflowing: true,
      scrollOffset: 200,
      widths: {
        content: 1000,
        wrapper: 500,
      },
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
    const wrapper = mountFunction({
      computed: {
        hasAffixes: () => true,
        hasNext: () => true,
        hasPrev: () => true,
      },
      propsData: {
        showArrows: true,
      },
      scopedSlots: {
        prev () {
          return this.$createElement('div', {
            staticClass: 'fizz',
          }, 'foo')
        },
        next () {
          return this.$createElement('div', {
            staticClass: 'fizz',
          }, 'bar')
        },
      },
    })

    wrapper.setData({ isOverflowing: true })

    expect(wrapper.findAll('.fizz')).toHaveLength(2)
  })

  it('should match snapshot in rtl', async () => {
    const wrapper = mountFunction({
      computed: {
        hasAffixes: () => true,
        hasNext: () => true,
        hasPrev: () => true,
      },
      propsData: {
        showArrows: true,
      },
      mocks: {
        $vuetify: {
          rtl: true,
          breakpoint: { mobileBreakpoint: 1264 },
        },
      },
    })

    const html1 = wrapper.html()

    expect(html1).toMatchSnapshot()

    wrapper.vm.$vuetify.rtl = false

    const html2 = wrapper.html()

    expect(html1).not.toEqual(html2)
    expect(html2).toMatchSnapshot()
  })

  // showArrows | isOverflowing | isMobile | hasAffixes
  it.each([
    [true, true, true, true],
    [true, true, false, true],
    [true, false, true, false],
    [true, false, false, false],
    ['desktop', true, false, true],
    ['desktop', true, true, false],
    ['desktop', false, false, true],
    ['desktop', false, true, false],
    ['always', true, true, true],
    ['always', true, false, true],
    ['always', false, false, true],
  ])('should conditionally show arrows with %s %s %s %s', (...opts) => {
    const [
      showArrows,
      isOverflowing,
      isMobile,
      hasAffixes,
    ] = opts

    const wrapper = mountFunction({
      data: () => ({ isOverflowing }),
      computed: { isMobile: () => isMobile },
      propsData: { showArrows },
    })

    expect(wrapper.vm.hasAffixes).toBe(hasAffixes)
  })
})
