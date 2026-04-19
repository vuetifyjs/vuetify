// Utilities
import { shallowRef, toRef, useId } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

// Types
export interface InputAutocompleteProps {
  autocomplete: 'suppress' | string | undefined
  name?: string
}

// Composables
export const makeAutocompleteProps = propsFactory({
  autocomplete: String as PropType<'suppress' | string>,
}, 'autocomplete')

export function useAutocomplete (props: InputAutocompleteProps) {
  const uniqueId = useId()
  const reloadTrigger = shallowRef(0)

  const isSuppressing = toRef(() => props.autocomplete === 'suppress')

  const fieldName = toRef(() => {
    if (!props.name) return undefined

    return isSuppressing.value
      ? `${props.name}-${uniqueId}-${reloadTrigger.value}`
      : props.name
  })

  const fieldAutocomplete = toRef(() => {
    return isSuppressing.value
      ? 'off'
      : props.autocomplete
  })

  return {
    isSuppressing,
    fieldAutocomplete,
    fieldName,
    update: () => reloadTrigger.value = new Date().getTime(),
  }
}
