import { IN_BROWSER } from '@/util'
import { getCurrentInstance, onMounted } from 'vue'

export function useHydration (callback: () => void) {
  if (!IN_BROWSER) return
  const vm = getCurrentInstance()
  const rootEl = vm?.root?.appContext?.app?._container

  return rootEl?.__vue_app__ ? callback() : onMounted(callback)
}
