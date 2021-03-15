import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  ref,
  watch,
  onMounted,
} from 'vue'
import { consoleWarn } from '@/util/console'
import propsFactory from '@/util/propsFactory'

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

// Props
export const makeScrollProps = propsFactory({
  scrollTarget: {
    type: String,
  },
  scrollThreshold: {
    type: [String, Number],
  },
}, 'scroll')

export interface ScrollArguments {
  thresholdMetCallback?: (data: ThresholdMetCallbackData) => void
  scrollThreshold?: Readonly<Ref<number>>
  canScroll?: Readonly<Ref<boolean>>
}

export function useScroll (
  props: ScrollProps,
  args: ScrollArguments = {},
) {
  const { thresholdMetCallback, scrollThreshold, canScroll } = args
  let previousScroll = 0
  const target = ref<Element | Window | null>(null)
  const currentScroll = ref(0)
  const savedScroll = ref(0)
  const currentThreshold = ref(0)
  const isScrollActive = ref(false)
  const isScrollingUp = ref(false)

  const computedScrollThreshold = computed(() => {
    return Number(props.scrollThreshold ?? scrollThreshold ?? 300)
  })

  const onScroll = () => {
    const targetEl = target.value

    if (!targetEl || (canScroll && !canScroll.value)) return

    previousScroll = currentScroll.value
    currentScroll.value = ('window' in targetEl) ? targetEl.pageYOffset : targetEl.scrollTop

    isScrollingUp.value = currentScroll.value < previousScroll
    currentThreshold.value = Math.abs(currentScroll.value - computedScrollThreshold.value)
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
        consoleWarn(`Unable to locate element with identifier ${scrollTarget}`, getCurrentInstance())
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

  thresholdMetCallback && watch(() => (
    Math.abs(currentScroll.value - savedScroll.value) > computedScrollThreshold.value
  ), thresholdMet => {
    thresholdMet && thresholdMetCallback({
      currentThreshold: currentThreshold.value,
      isScrollingUp: isScrollingUp.value,
      savedScroll,
    })
  }, { immediate: true })

  // Do we need this? If yes - seems that
  // there's no need to expose onScroll
  canScroll && watch(canScroll, onScroll, { immediate: true })

  return {
    isScrollActive,

    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll,
  }
}
