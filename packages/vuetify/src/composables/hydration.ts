// Composables
import { useDisplay } from '@/composables/display'

// Utilities
import { onMounted, shallowRef } from 'vue'
import { IN_BROWSER } from '@/util'

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
