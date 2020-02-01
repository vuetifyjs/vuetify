import {
  Ref,
  getCurrentInstance,
  computed,
  ref,
  watch,
  onBeforeUnmount,
} from 'vue'
import { IN_BROWSER } from '../util/globals'
import { consoleWarn } from '../util/console'
import { passiveEventOptions } from '../util/events'

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
  thresholdMetCallback?: (data: {
    isScrollingUp: boolean
    currentThreshold: number
    savedScroll: Ref<number>
  }) => void
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
    if (props.scrollThreshold != null) return Number(props.scrollThreshold)

    if (scrollThreshold != null) return scrollThreshold.value

    return 300
  })

  const onScroll = () => {
    const targetEl = target.value

    if (!targetEl || (canScroll && !canScroll.value)) return

    previousScroll = currentScroll.value
    currentScroll.value = ('window' in targetEl) ? (targetEl as Window).pageYOffset : (targetEl as Element).scrollTop

    isScrollingUp.value = currentScroll.value < previousScroll
    currentThreshold.value = Math.abs(currentScroll.value - computedScrollThreshold.value)
  }

  watch(isScrollingUp, () => (savedScroll.value = savedScroll.value || currentScroll.value))

  watch(isScrollActive, () => (savedScroll.value = 0))

  watch(() => [props.scrollTarget], () => {
    target.value = props.scrollTarget ? document.querySelector(props.scrollTarget) : window

    if (!target.value) {
      consoleWarn(`Unable to locate element with identifier ${props.scrollTarget}`, getCurrentInstance())
    }
  })

  watch(target, (newTarget, prevTarget) => {
    prevTarget && prevTarget.removeEventListener('scroll', onScroll, passiveEventOptions())
    newTarget && newTarget.addEventListener('scroll', onScroll, passiveEventOptions())
  })

  thresholdMetCallback && watch(() => (
    Math.abs(currentScroll.value - savedScroll.value) > computedScrollThreshold.value
  ), thresholdMet => {
    thresholdMet && thresholdMetCallback({
      currentThreshold: currentThreshold.value,
      isScrollingUp: isScrollingUp.value,
      savedScroll,
    })
  })

  // Do we need this? If yes - seems that
  // there's no need to expose onScroll
  canScroll && watch(canScroll, onScroll)

  getCurrentInstance() && onBeforeUnmount(() => {
    target.value && target.value.removeEventListener('scroll', onScroll, passiveEventOptions())
  })

  return {
    isScrollActive,

    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll,
  }
}
