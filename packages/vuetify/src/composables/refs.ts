// Utilities
import { onBeforeUpdate, ref } from 'vue'

// Types
import type { Ref } from 'vue'

export function useRefs <T extends {}> () {
  const refs = ref<(T | undefined)[]>([]) as Ref<(T | undefined)[]>

  onBeforeUpdate(() => (refs.value = []))

  function updateRef (e: any, i: number) {
    refs.value[i] = e
  }

  return { refs, updateRef }
}
