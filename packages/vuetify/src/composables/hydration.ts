// Composables
import { useDisplay } from '@/composables/display'
import { useSSRHandler } from '@/composables/ssr'

// Utilities
import { onMounted, ref, shallowRef, watch } from 'vue'

export function useHydration () {
  const { isServer, isHydrated } = useSSRHandler()

  if (isServer) return shallowRef(false)

  const { ssr } = useDisplay()

  if (ssr) {
    const isMounted = shallowRef(false)
    const mounted = ref(false)
    onMounted(() => {
      mounted.value = true
    })
    watch([mounted, isHydrated], ([h, m]) => {
      if (h && m) {
        isMounted.value = true
      }
    })
    return isMounted
  } else {
    return shallowRef(true)
  }
}
