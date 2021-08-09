import { propsFactory } from '@/util'
// Utilities
import { computed } from 'vue'

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
  items: Ref<any[]>,
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
      if (props?.filterFn?.(item, strQuery.value)) {
        array.push(item)

        continue
      }

      const text = String(item?.text ?? item ?? '')

      if (
        !text ||
        !defaultFilter(text, strQuery.value)
      ) continue

      array.push(item)
    }

    return array
  })

  return { filtered }
}

// WIP
export function transformItems (
  items: Record<string, any>[],
  map: Record<string, any>,
) {
  const transformed = []

  for (const item of items) {
    const newItem: Record<string, any> = {}
    const itemKeys = Object.keys(item)

    for (const itemKey of itemKeys) {
      const value = item[itemKey]
      const mapKey = map[itemKey]

      if (!mapKey) {
        newItem[itemKey] = value

        continue
      }

      const type = typeof mapKey

      if (type === 'function') {
        newItem[mapKey(item)] = value
      } else {
        newItem[mapKey] = value
      }
    }

    transformed.push(newItem)
  }

  return transformed
}
