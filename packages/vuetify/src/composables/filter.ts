// Utilities
import { computed } from 'vue'

// Types
import type { Ref } from 'vue'

export interface FilterProps {
  filter?: (text: string, query: any) => boolean
}

export function useFilter (props: FilterProps, items: Ref<any[]>, query: Ref<any>) {
  function filter (text: string, query: any) {
    if (typeof props.filter === 'function') return props.filter(text, query)

    if (query == null || query === false) return true

    return text.toLocaleLowerCase().includes(query.value.toLocaleLowerCase())
  }

  const filtered = computed(() => items.value.filter((item: any) => filter(item, query)))

  return {
    filtered,
    filter,
  }
}
