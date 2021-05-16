// Imports
import { onBeforeUpdate, ref } from 'vue'

export function useRefs <T extends {}> () {
  const refs = ref<(T | undefined)[]>([])

  onBeforeUpdate(() => (refs.value = []))

  function updateRef (e: any, i: number) {
    console.log('eeee', e, i)
    refs.value[i] = e
  }

  return { refs, updateRef }
}
