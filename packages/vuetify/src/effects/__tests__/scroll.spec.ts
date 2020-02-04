import { ref } from 'vue'

// Effects
import {
  scrollProps,
  useScroll,
} from '../scroll'

// Utils
import {
  scrollElement,
  scrollWindow,
  wait,
} from '../../../test'

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

      await wait()

      await scrollWindow(1000)
      expect(isScrollingUp.value).toBe(false)

      await scrollWindow(0)
      expect(isScrollingUp.value).toBe(true)
    })

    it('should use a custom target', async () => {
      const thresholdMetCallback = jest.fn()

      useScroll({ scrollTarget: 'body', scrollThreshold: 300 }, { thresholdMetCallback })

      await wait()
      expect(thresholdMetCallback).not.toHaveBeenCalled()

      scrollElement(document.body, 1000)
      await wait()
      expect(thresholdMetCallback).toHaveBeenCalled()
    })

    it('should do nothing if !canScroll', async () => {
      const thresholdMetCallback = jest.fn()

      useScroll({ scrollTarget: 'body', scrollThreshold: 300 }, {
        thresholdMetCallback,
        canScroll: ref(false),
      })

      await wait()
      expect(thresholdMetCallback).not.toHaveBeenCalled()

      scrollElement(document.body, 1000)
      await wait()
      expect(thresholdMetCallback).not.toHaveBeenCalled()
    })

    it('should do something if canScroll', async () => {
      const thresholdMetCallback = jest.fn()

      useScroll({ scrollTarget: 'body', scrollThreshold: 300 }, {
        thresholdMetCallback,
        canScroll: ref(true),
      })

      await wait()
      expect(thresholdMetCallback).not.toHaveBeenCalled()

      scrollElement(document.body, 1000)
      await wait()
      expect(thresholdMetCallback).toHaveBeenCalled()
    })

    it('should reset savedScroll when isActive state changes', async () => {
      const { isScrollActive, isScrollingUp, savedScroll } = useScroll({})

      await wait()

      await scrollWindow(1000)
      expect(savedScroll.value).toEqual(0)

      await scrollWindow(900)
      expect(savedScroll.value).toEqual(900)

      isScrollActive.value = true
      await wait()
      expect(savedScroll.value).toEqual(0)
    })

    it('should warn if target isn\'t present', async () => {
      useScroll({ scrollTarget: '#test' })

      await wait()

      expect('Unable to locate element with identifier #test').toHaveBeenTipped()
    })
  })
})
