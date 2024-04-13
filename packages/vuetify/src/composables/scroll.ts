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
  const target = ref<Element | Window | null>(null)
  const currentScroll = shallowRef(0)
  const savedScroll = shallowRef(0)
  const currentThreshold = shallowRef(0)
  const isScrollActive = shallowRef(false)
  const isScrollingUp = shallowRef(false)

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

  const onScroll = () => {
    const targetEl = target.value

    if (!targetEl || (canScroll && !canScroll.value)) return

    previousScroll = currentScroll.value
    currentScroll.value = ('window' in targetEl) ? targetEl.pageYOffset : targetEl.scrollTop

    isScrollingUp.value = currentScroll.value < previousScroll
    currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value)
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
    }, { immediate: true })
  })

  onBeforeUnmount(() => {
    target.value?.removeEventListener('scroll', onScroll)
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
  }
}
