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
  const defaultDuration = 900
  const duration = toRef(() => typeof props.reveal === 'object'
    ? Math.max(0, Number(props.reveal.duration ?? defaultDuration))
    : defaultDuration
  )

  const state = shallowRef(props.reveal ? 'initial' : 'disabled')

  onMounted(async () => {
    if (props.reveal) {
      state.value = 'initial'
      await new Promise(resolve => requestAnimationFrame(resolve))
      state.value = 'pending'
      await new Promise(resolve => setTimeout(resolve, duration.value))
      state.value = 'done'
    }
  })

  return {
    duration,
    state,
  }
}
