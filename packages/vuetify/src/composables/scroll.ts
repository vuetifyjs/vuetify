// Utilities
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
} from 'vue'
import { clamp, consoleWarn, propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'

export interface ScrollProps {
  scrollTarget?: string
  scrollThreshold?: string | number
}

export interface ThresholdMetCallbackData {
  isScrollingUp: boolean
  currentThreshold: number
  savedScroll: Ref<number>
}

// Composables
export const makeScrollProps = propsFactory({
  scrollTarget: {
    type: String,
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300,
  },
}, 'scroll')

export interface ScrollArguments {
  canScroll?: Readonly<Ref<boolean>>
}

export function useScroll (
  props: ScrollProps,
  args: ScrollArguments = {},
) {
  const { canScroll } = args
  let previousScroll = 0
  let previousScrollHeight = 0
  const target = ref<Element | Window | null>(null)
  const currentScroll = shallowRef(0)
  const savedScroll = shallowRef(0)
  const currentThreshold = shallowRef(0)
  const isScrollActive = shallowRef(false)
  const isScrollingUp = shallowRef(false)
  const isAtBottom = shallowRef(false)
  const reachedBottomWhileScrollingDown = shallowRef(false)
  const hasEnoughScrollableSpace = shallowRef(true)

  const scrollThreshold = computed(() => {
    return Number(props.scrollThreshold)
  })

  /**
   * 1: at top
   * 0: at threshold
   */
  const scrollRatio = computed(() => {
    return clamp(((scrollThreshold.value - currentScroll.value) / scrollThreshold.value) || 0)
  })

  const getScrollMetrics = (targetEl: Element | Window) => {
    const clientHeight = ('window' in targetEl) ? window.innerHeight : targetEl.clientHeight
    const scrollHeight = ('window' in targetEl) ? document.documentElement.scrollHeight : targetEl.scrollHeight
    return { clientHeight, scrollHeight }
  }

  const checkScrollableSpace = () => {
    const targetEl = target.value
    if (!targetEl) return

    const { clientHeight, scrollHeight } = getScrollMetrics(targetEl)
    const maxScrollableDistance = scrollHeight - clientHeight

    // Only enable scroll-hide if there's enough scrollable space
    // Require scrollable distance to be at least threshold + 50px to ensure smooth behavior
    const minScrollableDistance = scrollThreshold.value + 50
    hasEnoughScrollableSpace.value = maxScrollableDistance > minScrollableDistance
  }

  const onResize = () => {
    checkScrollableSpace()
  }

  const onScroll = () => {
    const targetEl = target.value

    if (!targetEl || (canScroll && !canScroll.value)) return

    previousScroll = currentScroll.value
    currentScroll.value = ('window' in targetEl) ? targetEl.pageYOffset : targetEl.scrollTop

    const currentScrollHeight = targetEl instanceof Window ? document.documentElement.scrollHeight : targetEl.scrollHeight
    if (previousScrollHeight !== currentScrollHeight) {
      // If page is growing (content loading), recalculate scrollable space
      // If page is shrinking (likely due to navbar animation), don't recalculate
      if (currentScrollHeight > previousScrollHeight) {
        checkScrollableSpace()
      }
      previousScrollHeight = currentScrollHeight
      return
    }

    isScrollingUp.value = currentScroll.value < previousScroll
    currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value)

    // Detect if at bottom of page
    const { clientHeight, scrollHeight } = getScrollMetrics(targetEl)
    const atBottom = currentScroll.value + clientHeight >= scrollHeight - 5

    // Track when bottom is reached during downward scroll
    // Only set flag if ALL conditions are met:
    // 1. Scrolled past threshold (navbar is hiding)
    // 2. Page has enough scrollable space for scroll-hide
    // This prevents activation on short pages or edge cases
    if (!isScrollingUp.value && atBottom &&
        currentScroll.value >= scrollThreshold.value &&
        hasEnoughScrollableSpace.value) {
      reachedBottomWhileScrollingDown.value = true
    }

    // Reset the flag when:
    // 1. Scrolling up away from bottom (with tolerance for small movements)
    // 2. Scroll position jumped significantly (e.g., navigation, scroll restoration)
    // 3. Scroll is at the very top (page navigation resets to top)
    const scrollJumped = Math.abs(currentScroll.value - previousScroll) > 100
    const atTop = currentScroll.value <= 5
    const scrolledUpSignificantly = isScrollingUp.value && (previousScroll - currentScroll.value) > 10
    if ((scrolledUpSignificantly && !atBottom) || (scrollJumped && currentScroll.value < scrollThreshold.value) || atTop) {
      reachedBottomWhileScrollingDown.value = false
    }

    // Update state
    isAtBottom.value = atBottom
  }

  watch(isScrollingUp, () => {
    savedScroll.value = savedScroll.value || currentScroll.value
  })

  watch(isScrollActive, () => {
    savedScroll.value = 0
  })

  onMounted(() => {
    watch(() => props.scrollTarget, scrollTarget => {
      const newTarget = scrollTarget ? document.querySelector(scrollTarget) : window

      if (!newTarget) {
        consoleWarn(`Unable to locate element with identifier ${scrollTarget}`)
        return
      }

      if (newTarget === target.value) return

      target.value?.removeEventListener('scroll', onScroll)
      target.value = newTarget
      target.value.addEventListener('scroll', onScroll, { passive: true })

      // Check scrollable space immediately when target is set
      // Need to use nextTick to ensure DOM is ready
      Promise.resolve().then(() => {
        checkScrollableSpace()
      })
    }, { immediate: true })

    // Listen to window resize to recalculate scrollable space
    window.addEventListener('resize', onResize, { passive: true })
  })

  onBeforeUnmount(() => {
    target.value?.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
  })

  // Do we need this? If yes - seems that
  // there's no need to expose onScroll
  canScroll && watch(canScroll, onScroll, { immediate: true })

  return {
    scrollThreshold,
    currentScroll,
    currentThreshold,
    isScrollActive,
    scrollRatio,

    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll,
    isAtBottom,
    reachedBottomWhileScrollingDown,
    hasEnoughScrollableSpace,
  }
}
