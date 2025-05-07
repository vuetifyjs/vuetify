// Utilities
import { computed, ref } from 'vue'

// Types
export interface InputAutocompleteProps {
  autocomplete?: 'suppress' | string
  name?: string
}

// Composables
export function useAutocomplete (props: InputAutocompleteProps) {
  const reloadTrigger = ref(0)

  const isSuppressing = computed(() => props.autocomplete === 'suppress')

  const fieldName = computed(() => {
    return isSuppressing.value
      ? `${props.name}-${new Date().getTime()}-${reloadTrigger.value}`
      : props.name
  })

  const fieldAutocomplete = computed(() => {
    return isSuppressing.value
      ? 'off'
      : props.autocomplete
  })

  return {
    isSuppressing,
    fieldAutocomplete,
    fieldName,
    update: () => reloadTrigger.value++,
  }
}
