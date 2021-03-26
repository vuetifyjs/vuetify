import { onBeforeUpdate, ref } from 'vue'

export function useRefs <T extends {}> () {
  const refs = ref<(T | undefined)[]>([])

  onBeforeUpdate(() => refs.value = [])

  const updateRef = (e: any, i: number) => {
    refs.value[i] = e
  }

  return { refs, updateRef }
}
