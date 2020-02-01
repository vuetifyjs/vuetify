import { ref } from 'vue'

// Effects
import {
  scrollProps,
  useScroll,
} from '../scroll'

// Utils
import { scrollWindow, scrollElement } from '../../../test'

describe('scroll.ts', () => {
  describe('scrollProps', () => {
    it('should have correct structure', () => {
      expect(scrollProps()).toEqual({
        scrollTarget: {
          type: String,
        },
        scrollThreshold: {
          type: [String, Number],
        },
      })
    })

    it('should allow setting default values', () => {
      expect(scrollProps({ scrollTarget: 'foo', scrollThreshold: 500 })).toEqual({
        scrollTarget: {
          type: String,
          default: 'foo',
        },
        scrollThreshold: {
          type: [String, Number],
          default: 500,
        },
      })
    })
  })

  describe('useScroll', () => {
    beforeEach(() => {
      (window as any).pageYOffset = 0
      document.body.scrollTop = 0
    })

    it('should set isScrollingUp', async () => {
      const { isScrollingUp } = useScroll({})

      await new Promise(resolve => setTimeout(resolve))

      await scrollWindow(1000)
      expect(isScrollingUp.value).toBe(false)

      await scrollWindow(0)
      expect(isScrollingUp.value).toBe(true)
    })

    it('should use a custom target', async () => {
      const thresholdMetCallback = jest.fn()

      useScroll({ scrollTarget: 'body', scrollThreshold: 300 }, { thresholdMetCallback })

      await new Promise(resolve => setTimeout(resolve))
      expect(thresholdMetCallback).not.toHaveBeenCalled()

      scrollElement(document.body, 1000)
      await new Promise(resolve => setTimeout(resolve))
      expect(thresholdMetCallback).toHaveBeenCalled()
    })

    it('should do nothing if !canScroll', async () => {
      const thresholdMetCallback = jest.fn()

      useScroll({ scrollTarget: 'body', scrollThreshold: 300 }, {
        thresholdMetCallback,
        canScroll: ref(false),
      })

      await new Promise(resolve => setTimeout(resolve))
      expect(thresholdMetCallback).not.toHaveBeenCalled()

      scrollElement(document.body, 1000)
      await new Promise(resolve => setTimeout(resolve))
      expect(thresholdMetCallback).not.toHaveBeenCalled()
    })

    it('should do something if canScroll', async () => {
      const thresholdMetCallback = jest.fn()

      useScroll({ scrollTarget: 'body', scrollThreshold: 300 }, {
        thresholdMetCallback,
        canScroll: ref(true),
      })

      await new Promise(resolve => setTimeout(resolve))
      expect(thresholdMetCallback).not.toHaveBeenCalled()

      scrollElement(document.body, 1000)
      await new Promise(resolve => setTimeout(resolve))
      expect(thresholdMetCallback).toHaveBeenCalled()
    })

    // it('should accept a custom scrollThreshold', async () => {
    //   const thresholdMet = jest.fn()
    //   const wrapper = mountFunction({
    //     methods: {
    //       thresholdMet,
    //     },
    //     propsData: {
    //       scrollThreshold: 1000,
    //     },
    //   })

    //   await scrollWindow(900)
    //   await wrapper.vm.$nextTick()

    //   expect(thresholdMet).not.toHaveBeenCalled()

    //   await scrollWindow(1001)
    //   await wrapper.vm.$nextTick()
    //   expect(thresholdMet).toHaveBeenCalled()
    // })

    // it('should reset savedScroll when isActive state changes', async () => {
    //   const wrapper = mountFunction({
    //     data: () => ({
    //       savedScroll: 100,
    //     }),
    //   })

    //   wrapper.setData({ isActive: true })

    //   expect(wrapper.vm.savedScroll).toBe(0)
    // })

    it('should warn if target isn\'t present', async () => {
      useScroll({ scrollTarget: '#test' })

      await new Promise(resolve => setTimeout(resolve))

      expect('Unable to locate element with identifier #test').toHaveBeenTipped()
    })
  })
})
