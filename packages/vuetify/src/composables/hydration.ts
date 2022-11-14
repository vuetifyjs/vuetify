// Utilities
import { getCurrentInstance, IN_BROWSER } from '@/util'
import { onMounted, ref } from 'vue'

export function useHydration () {
  if (!IN_BROWSER) return ref(false)

  const vm = getCurrentInstance('useHydration')
  const rootEl = vm?.root?.appContext?.app?._container

  const isMounted = ref(!!rootEl?.__vue_app__)

  if (!isMounted.value) {
    onMounted(() => isMounted.value = true)
  }

  return isMounted
}
