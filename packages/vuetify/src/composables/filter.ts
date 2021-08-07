// Utilities
import { computed } from 'vue'
import { consoleWarn, propsFactory } from '@/util'

// Types
import type { PropType, Ref } from 'vue'

export function defaultFilter (text: string, query?: string) {
  if (typeof query !== 'string') return true
  if (typeof text !== 'string') return false

  return text.toLocaleLowerCase().includes(query.toLocaleLowerCase())
}

export interface FilterProps {
  filterFn?: (item: any, query?: string) => boolean
}

// Composables
export const makeFilterProps = propsFactory({
  filterFn: Function as unknown as PropType<FilterProps['filterFn']>,
}, 'filter')

export function useFilter (
  props: FilterProps,
  items: Ref<unknown[]>,
  query?: Ref<string | number>
) {
  const strQuery = computed(() => (
    typeof query?.value !== 'string' &&
    typeof query?.value !== 'number'
  ) ? '' : String(query.value))

  const filtered = computed(() => {
    if (!strQuery.value) return items.value

    const array: (typeof items.value) = []

    for (const item of items.value) {
      if (props.filterFn) {
        if (props.filterFn(item, strQuery.value)) {
          array.push(item)
        }
      } else if (
        typeof item === 'string' ||
        typeof item === 'number'
      ) {
        if (defaultFilter(String(item), strQuery.value)) {
          array.push(item)
        }
      } else {
        consoleWarn(`The default filter function expects a string | number, received ${item}. Update the item value or use a custom filter.`)
      }
    }

    return array
  })

  return { filtered }
}
