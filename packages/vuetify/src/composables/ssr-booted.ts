// Utilities
import {
  onMounted,
  ref,
} from 'vue'

// Types
import type { Ref } from 'vue'

export interface SSRBootedProps {
  el?: Ref<Element | null | undefined>
}

export function useSSRBooted (props: SSRBootedProps) {
  const isBooted = ref(false)

  onMounted(() => {
    // Use setAttribute instead of dataset
    // because dataset does not work well
    // with unit tests
    window.requestAnimationFrame(() => {
      props.el?.value?.setAttribute('data-booted', 'true')
      isBooted.value = true
    })
  })

  return { isBooted }
}
