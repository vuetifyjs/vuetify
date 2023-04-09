// Utilities
import { onMounted, ref } from 'vue'
import { IN_BROWSER } from '@/util'
import { useDisplay } from '@/composables/display'

export function useHydration () {
  if (!IN_BROWSER) return ref(false)

  const { ssr } = useDisplay()

  if (ssr) {
    const isMounted = ref(false)
    onMounted(() => {
      isMounted.value = true
    })
    return isMounted
  } else {
    return ref(true)
  }
}
