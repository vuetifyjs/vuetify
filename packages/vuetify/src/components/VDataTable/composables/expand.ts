// Utilities
import { inject, provide, ref, toRef } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { InjectionKey, Ref } from 'vue'
import type { DataTableItem } from '../types'

export const makeDataTableExpandProps = propsFactory({
  expandOnClick: Boolean,
  showExpand: Boolean,
}, 'v-data-table-expand')

export const VDataTableExpandedKey: InjectionKey<{
  expand: (item: DataTableItem, value: boolean) => void
  expanded: Ref<Set<string>>
  expandOnClick: Ref<boolean | undefined>
  isExpanded: (item: DataTableItem) => boolean
  toggleExpand: (item: DataTableItem) => void
}> = Symbol.for('vuetify:datatable:expanded')

type ExpandProps = {
  expandOnClick: boolean
}

export function createExpanded (props: ExpandProps) {
  const expandOnClick = toRef(props, 'expandOnClick')
  const expanded = ref(new Set<string>())

  function expand (item: DataTableItem, value: boolean) {
    if (!value) {
      expanded.value.delete(item.value)
    } else {
      expanded.value.add(item.value)
    }
  }

  function isExpanded (item: DataTableItem) {
    return expanded.value.has(item.value)
  }

  function toggleExpand (item: DataTableItem) {
    expand(item, !isExpanded(item))
  }

  const data = { expand, expanded, expandOnClick, isExpanded, toggleExpand }

  provide(VDataTableExpandedKey, data)

  return data
}

export function useExpanded () {
  const data = inject(VDataTableExpandedKey)

  if (!data) throw new Error('foo')

  return data
}
