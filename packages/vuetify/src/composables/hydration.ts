// Composables
import { useDisplay } from '@/composables/display'
import { useSSRHandler } from '@/composables/ssr'

// Utilities
import { onMounted, shallowRef } from 'vue'

export function useHydration () {
  const { isServer } = useSSRHandler()

  if (isServer) return shallowRef(false)

  const { ssr } = useDisplay()

  if (ssr) {
    const isMounted = shallowRef(false)
    onMounted(() => {
      isMounted.value = true
    })
    return isMounted
  } else {
    return shallowRef(true)
  }
}
