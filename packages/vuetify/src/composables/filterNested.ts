// Composables
import { useFilter } from './filter'

// Utilities
import { computed } from 'vue'

// Types
import type { Ref } from 'vue'
import type { FilterProps } from './filter'
import type { ListItem } from './list-items'

function flatten <T> (items: ListItem<T>[], flat: ListItem<T>[] = []) {
  for (const item of items) {
    flat.push(item)

    if (item.children) flatten(item.children, flat)
  }

  return flat
}

function filter <T> (items: ListItem<T>[], include: Set<any>, out: ListItem<T>[] = []): ListItem<T>[] {
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

export function useFilterNested <T> (props: FilterProps, items: Ref<ListItem<T>[]>, search: Ref<string | undefined>) {
  const flatItems = computed(() => flatten(items.value))

  const { filteredItems: flatFilteredItems, filteredMatches, getMatches } = useFilter(props, flatItems, search)

  const filteredItems = computed(() => filter(items.value, new Set(flatFilteredItems.value.map(item => item.value))))

  return { filteredItems, filteredMatches, getMatches }
}
