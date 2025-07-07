// Utilities
import { onMounted, shallowRef, toRef } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

// Types
export interface RevealProps {
  reveal: boolean | { duration?: number }
}

// Composables
export const makeRevealProps = propsFactory({
  reveal: {
    type: [Boolean, Object] as PropType<boolean | {
      duration?: number
    }>,
    default: false,
  },
}, 'reveal')

export function useReveal (props: RevealProps) {
  const isRevealing = shallowRef(false)
  const isRevealed = shallowRef(false)

  const defaultDuration = 900
  const duration = toRef(() => typeof props.reveal === 'object'
    ? Math.max(0, Number(props.reveal.duration ?? defaultDuration))
    : defaultDuration
  )

  const state = toRef(() => {
    if (!props.reveal) return 'disabled'
    return isRevealed.value ? 'done'
      : isRevealing.value ? 'pending'
      : 'initial'
  })

  onMounted(async () => {
    if (props.reveal) {
      isRevealed.value = false
      await new Promise(resolve => requestAnimationFrame(resolve))
      isRevealing.value = true
      await new Promise(resolve => setTimeout(resolve, duration.value))
      isRevealing.value = false
      isRevealed.value = true
    }
  })

  return {
    duration,
    state,
  }
}
