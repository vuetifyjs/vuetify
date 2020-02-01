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

export function useScroll (
  props: ScrollProps,
  canScroll?: Readonly<Ref<boolean>>
) {
  let previousScroll = 0
  const target = ref<Element | Window | null>(null)
  const computedScrollThreshold = computed(() => props.scrollThreshold == null ? Number(props.scrollThreshold) : 300)
  const currentScroll = ref(0)
  const savedScroll = ref(0)
  const currentThreshold = ref(0)
  const isActive = ref(false)
  const isScrollingUp = ref(false)
  const thresholdMet = computed(() => Math.abs(currentScroll.value - savedScroll.value) > computedScrollThreshold.value)

  const onScroll = () => {
    const targetEl = target.value

    if (!targetEl || !IN_BROWSER || !(canScroll && canScroll.value)) return

    previousScroll = currentScroll.value
    currentScroll.value = targetEl instanceof Window ? targetEl.pageYOffset : (targetEl as Element).scrollTop

    isScrollingUp.value = currentScroll.value < previousScroll
    currentThreshold.value = Math.abs(currentScroll.value - computedScrollThreshold.value)
  }

  watch(isScrollingUp, () => (savedScroll.value = savedScroll.value || currentScroll.value))

  watch(isActive, () => (savedScroll.value = 0))

  // Do we need this? If yes - seems that
  // there's no need to expose onScroll
  canScroll && watch(canScroll, onScroll)

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

  onBeforeUnmount(() => {
    target.value && target.value.removeEventListener('scroll', onScroll, passiveEventOptions())
  })

  return {
    currentThreshold,
    isActive,
    isScrollingUp,
    onScroll,
    savedScroll,
    thresholdMet,
  }
}
