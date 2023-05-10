// Utilities
import { computed, onMounted, readonly, shallowRef } from 'vue'

// Composables
export function useSsrBoot () {
  const isBooted = shallowRef(false)

  onMounted(() => {
    window.requestAnimationFrame(() => {
      isBooted.value = true
    })
  })

  const ssrBootStyles = computed(() => !isBooted.value ? ({
    transition: 'none !important',
  }) : undefined)

  return { ssrBootStyles, isBooted: readonly(isBooted) }
}
