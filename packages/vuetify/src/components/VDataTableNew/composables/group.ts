// Utilities
import { computed, inject, provide, ref } from 'vue'
import { getObjectValueByPath, propsFactory } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { DataTableItem, GroupHeaderItem } from '../types'
import type { SortItem } from './sort'

export const makeDataTableGroupProps = propsFactory({
  groupBy: {
    type: Array as PropType<SortItem[]>,
    default: () => ([]),
  },
})

const VDataTableGroupSymbol: InjectionKey<{
  opened: Ref<Set<string>>
  toggleGroup: (group: string, value?: boolean) => void
  sortByWithGroups: Ref<SortItem[]>
  groupBy: Ref<readonly SortItem[]>
  extractRows: (items: (DataTableItem | GroupHeaderItem)[]) => DataTableItem[]
}> = Symbol.for('vuetify:data-table-group')

type GroupProps = {
}

export function createGroupBy (props: GroupProps, groupBy: Ref<readonly SortItem[]>, sortBy: Ref<readonly SortItem[]>) {
  const opened = ref(new Set<string>())

  const sortByWithGroups = computed(() => {
    return groupBy.value.concat(sortBy.value)
  })

  function toggleGroup (group: string, value?: boolean) {
    const open = value == null ? !opened.value.has(group) : value
    if (open) opened.value.add(group)
    else opened.value.delete(group)
  }

  function extractRows (items: (DataTableItem | GroupHeaderItem)[]) {
    function dive (group: GroupHeaderItem): DataTableItem[] {
      const arr = []

      for (const item of group.items) {
        if (item.type === 'item') arr.push(item)
        else {
          arr.push(...dive(item))
        }
      }

      return arr
    }
    return dive({ type: 'group-header', items, id: 'dummy', key: 'dummy', value: 'dummy', depth: 0 })
  }

  // onBeforeMount(() => {
  //   for (const key of groupedItems.value.keys()) {
  //     opened.value.add(key)
  //   }
  // })

  const data = { sortByWithGroups, toggleGroup, opened, groupBy, extractRows }

  provide(VDataTableGroupSymbol, data)

  return data
}

export function useGroupBy () {
  const data = inject(VDataTableGroupSymbol)

  if (!data) throw new Error('Missing group!')

  return data
}

function groupItemsByProperty (items: DataTableItem[], groupBy: string) {
  if (!items.length) return []

  const groups: DataTableItem[][] = [[]]

  let current = getObjectValueByPath(items[0].raw, groupBy)
  for (const item of items) {
    const value = getObjectValueByPath(item.raw, groupBy)

    if (current === value) {
      groups.at(-1)?.push(item)
    } else {
      groups.push([item])
      current = value
    }
  }

  return groups
}

function groupItems (items: DataTableItem[], groupBy: string[], depth = 0, prefix = 'root') {
  if (!groupBy.length) return []

  const groupedItems = groupItemsByProperty(items, groupBy[0])
  const groups: GroupHeaderItem[] = []

  const rest = groupBy.slice(1)
  for (let i = 0; i < groupedItems.length; i++) {
    const key = groupBy[0]
    const value = getObjectValueByPath(groupedItems[i][0].raw, groupBy[0])
    const id = `${prefix}_${key}_${value}`
    groups.push({
      depth,
      id,
      key,
      value,
      items: rest?.length ? groupItems(groupedItems[i], rest, depth + 1, id) : groupedItems[i],
      type: 'group-header',
    })
  }

  return groups
}

function flattenItems (items: (DataTableItem | GroupHeaderItem)[], opened: Set<string>) {
  const flatItems: (DataTableItem | GroupHeaderItem)[] = []

  for (const item of items) {
    if (item.type === 'group-header') {
      flatItems.push(item)

      if (opened.has(item.id)) {
        flatItems.push(...flattenItems(item.items, opened))
      }
    } else {
      flatItems.push(item)
    }
  }

  return flatItems
}

export function useGroupedItems (items: Ref<DataTableItem[]>, groupBy: Ref<readonly SortItem[]>, opened: Ref<Set<string>>) {
  const flatItems = computed(() => {
    if (!groupBy.value.length) return items.value

    const groupedItems = groupItems(items.value, groupBy.value.map(item => item.key))

    return flattenItems(groupedItems, opened.value)
  })

  return { flatItems }
}
