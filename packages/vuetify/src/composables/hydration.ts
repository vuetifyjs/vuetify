import { IN_BROWSER } from '@/util'
import { getCurrentInstance, onMounted } from 'vue'

export function useHydration (callback: () => void) {
  if (!IN_BROWSER) return
  const vm = getCurrentInstance()
  const elId = vm?.root?.appContext?.app?._container?.id
  // @ts-expect-error
  return document.querySelector(`#${elId}`)?.__vue_app__ ? callback() : onMounted(callback)
}
