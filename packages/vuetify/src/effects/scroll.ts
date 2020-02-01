import {
  Ref,
  getCurrentInstance,
  computed,
  ref,
  watch,
  onBeforeUnmount,
} from 'vue'
import { IN_BROWSER } from '@util/globals'
import { consoleWarn } from '@util/console'
import { passiveEventOptions } from '@util/events'

// Types
export interface ScrollProps {
  scrollTarget?: string
  scrollThreshold?: string | number
}

// Props
export function scrollProps (
  defaults: Partial<ScrollProps> = {}
) {
  return {
    scrollTarget: {
      type: String,
      default: defaults.scrollTarget,
    },
    scrollThreshold: {
      type: [String, Number],
      default: defaults.scrollThreshold,
    },
  }
}

interface ScrollArguments {
  thresholMetCallback?: (data: {
    isScrollingUp: boolean
    currentThreshold: number
    savedScroll: Ref<number>
  }) => void
  scrollThreshold?: Readonly<Ref<number>>
  canScroll?: Readonly<Ref<boolean>>
}

export function useScroll (
  props: ScrollProps,
  args: ScrollArguments,
) {
  const { thresholMetCallback, scrollThreshold, canScroll } = args
  let previousScroll = 0
  const target = ref<Element | Window | null>(null)
  const currentScroll = ref(0)
  const savedScroll = ref(0)
  const currentThreshold = ref(0)
  const isScrollActive = ref(false)
  const isScrollingUp = ref(false)

  const computedScrollThreshold = computed(() => {
    if (props.scrollThreshold != null) return Number(props.scrollThreshold)

    if (scrollThreshold != null) return scrollThreshold.value

    return 300
  })

  const onScroll = () => {
    const targetEl = target.value

    if (!targetEl || !IN_BROWSER || !(canScroll && canScroll.value)) return

    previousScroll = currentScroll.value
    currentScroll.value = targetEl instanceof Window ? targetEl.pageYOffset : (targetEl as Element).scrollTop

    isScrollingUp.value = currentScroll.value < previousScroll
    currentThreshold.value = Math.abs(currentScroll.value - computedScrollThreshold.value)
  }

  watch(isScrollingUp, () => (savedScroll.value = savedScroll.value || currentScroll.value))

  watch(isScrollActive, () => (savedScroll.value = 0))

  watch(() => props.scrollTarget, () => {
    target.value = props.scrollTarget ? document.querySelector(props.scrollTarget) : window

    if (!target.value) {
      consoleWarn(`Unable to locate element with identifier ${props.scrollTarget}`, getCurrentInstance())
    }
  })

  watch(target, (newTarget, prevTarget) => {
    prevTarget && prevTarget.removeEventListener('scroll', onScroll, passiveEventOptions())
    newTarget && newTarget.addEventListener('scroll', onScroll, passiveEventOptions())
  })

  thresholMetCallback && watch(() => (
    Math.abs(currentScroll.value - savedScroll.value) > computedScrollThreshold.value
  ), thresholdMet => thresholdMet && thresholMetCallback({
    currentThreshold: currentThreshold.value,
    isScrollingUp: isScrollingUp.value,
    savedScroll,
  }))

  // Do we need this? If yes - seems that
  // there's no need to expose onScroll
  canScroll && watch(canScroll, onScroll)

  onBeforeUnmount(() => {
    target.value && target.value.removeEventListener('scroll', onScroll, passiveEventOptions())
  })

  return {
    isScrollActive,
  }
}
