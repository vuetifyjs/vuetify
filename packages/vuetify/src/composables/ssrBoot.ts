// Utilities
import { onMounted, readonly, shallowRef, toRef } from 'vue'

// Composables
export function useSsrBoot () {
  const isBooted = shallowRef(false)

  onMounted(() => {
    window.requestAnimationFrame(() => {
      isBooted.value = true
    })
  })

  const ssrBootStyles = toRef(() => !isBooted.value ? ({
    transition: 'none !important',
  }) : undefined)

  return { ssrBootStyles, isBooted: readonly(isBooted) }
}
