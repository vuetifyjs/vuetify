
// Utilities
import { getPropertyFromItem, propsFactory, wrapInArray } from '@/util'
import { computed } from 'vue'

// Types
import type { PropType, Ref } from 'vue'

export function defaultFilter (text: string, query?: string) {
  if (typeof query !== 'string') return true
  if (typeof text !== 'string') return false

  return text.toLocaleLowerCase().includes(query.toLocaleLowerCase())
}

export type FilterFunction = (item: any, query?: string) => boolean

export interface FilterProps {
  filterFn?: FilterFunction
}

// Composables
export const makeFilterProps = propsFactory({
  filterFn: {
    type: Function as PropType<FilterFunction>,
    default: defaultFilter,
  },
}, 'filter')

export function useFilter (
  props: FilterProps,
  items: Ref<any[]>,
  query?: Ref<string | number>,
  filterKeys?: (string | string[]) | (FilterFunction | FilterFunction[]),
) {
  const keys = computed(() => wrapInArray(filterKeys))
  const strQuery = computed(() => (
    typeof query?.value !== 'string' &&
    typeof query?.value !== 'number'
  ) ? '' : String(query.value))

  const filteredItems = computed(() => {
    if (!strQuery.value || !keys.value.length) return items.value

    const array: (typeof items.value) = []

    for (const item of items.value) {
      for (const key of keys.value) {
        const value = getPropertyFromItem(item, key, item)

        if (props.filterFn?.(value, strQuery.value)) {
          array.push(item)

          break
        }
      }
    }

    return array
  })

  return { filteredItems }
}
