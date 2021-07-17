// Utilities
import { computed, ref, watch } from 'vue'

// Types
import type { Ref } from 'vue'
import { propsFactory } from '@/util'

export const makeLazyProps = propsFactory({
  eager: Boolean,
}, 'lazy')

export function useLazy (props: { eager: boolean }, active: Ref<boolean>) {
  const isBooted = ref(false)
  const hasContent = computed(() => isBooted.value || props.eager || active.value)

  watch(active, () => isBooted.value = true)

  return { isBooted, hasContent }
}
