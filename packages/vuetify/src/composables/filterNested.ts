// Composables
import { useFilter } from './filter'

// Utilities
import { computed } from 'vue'

// Types
import type { Ref } from 'vue'
import type { InternalItem } from './items'
import type { FilterProps } from './filter'

function flatten <T> (items: InternalItem<T>[], flat: InternalItem<T>[] = []) {
  for (const item of items) {
    flat.push(item)

    if (item.children) flatten(item.children, flat)
  }

  return flat
}

function filter <T> (items: InternalItem<T>[], include: Set<any>, out: InternalItem<T>[] = []): InternalItem<T>[] {
  const children = []
  for (const item of items) {
    if (item.children) {
      const matches = filter(item.children, include, out)
      if (matches.length) {
        children.push({
          ...item,
          children: matches,
        })
      }
    } else if (include.has(item.value)) {
      children.push(item)
    }
  }

  return children
}

export function useFilterNested <T> (props: FilterProps, items: Ref<InternalItem<T>[]>, search: Ref<string | undefined>) {
  const flatItems = computed(() => flatten(items.value))

  const { filteredItems: flatFilteredItems, filteredMatches } = useFilter(props, flatItems, search)

  const filteredItems = computed(() => filter(items.value, new Set(flatFilteredItems.value.map(item => item.value))))

  return { filteredItems, filteredMatches }
}
