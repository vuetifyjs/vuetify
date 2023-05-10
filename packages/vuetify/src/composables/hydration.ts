// Composables
import { useDisplay } from '@/composables/display'

// Utilities
import { IN_BROWSER } from '@/util'
import { onMounted, shallowRef } from 'vue'

export function useHydration () {
  if (!IN_BROWSER) return shallowRef(false)

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
