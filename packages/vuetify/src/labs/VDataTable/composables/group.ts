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
}, 'data-table-group')

const VDataTableGroupSymbol: InjectionKey<{
  opened: Ref<Set<string>>
  toggleGroup: (group: GroupHeaderItem) => void
  isGroupOpen: (group: GroupHeaderItem) => boolean
  sortByWithGroups: Ref<SortItem[]>
  groupBy: Ref<readonly SortItem[]>
  extractRows: (items: (DataTableItem | GroupHeaderItem)[]) => DataTableItem[]
}> = Symbol.for('vuetify:data-table-group')

type GroupProps = {
}

export function createGroupBy (props: GroupProps, groupBy: Ref<readonly SortItem[]>, sortBy: Ref<readonly SortItem[]>) {
  const opened = ref(new Set<string>())

  const sortByWithGroups = computed(() => {
    return groupBy.value.map<SortItem>(val => ({
      ...val,
      order: val.order ?? false,
    })).concat(sortBy.value)
  })

  function isGroupOpen (group: GroupHeaderItem) {
    return opened.value.has(group.id)
  }

  function toggleGroup (group: GroupHeaderItem) {
    const newOpened = new Set(opened.value)
    if (!isGroupOpen(group)) newOpened.add(group.id)
    else newOpened.delete(group.id)

    opened.value = newOpened
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

  const data = { sortByWithGroups, toggleGroup, opened, groupBy, extractRows, isGroupOpen }

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

  const groups = new Map<any, DataTableItem[]>()
  for (const item of items) {
    const value = getObjectValueByPath(item.raw, groupBy)

    if (!groups.has(value)) {
      groups.set(value, [])
    }
    groups.get(value)!.push(item)
  }

  return groups
}

function groupItems (items: DataTableItem[], groupBy: string[], depth = 0, prefix = 'root') {
  if (!groupBy.length) return []

  const groupedItems = groupItemsByProperty(items, groupBy[0])
  const groups: GroupHeaderItem[] = []

  const rest = groupBy.slice(1)
  groupedItems.forEach((items, value) => {
    const key = groupBy[0]
    const id = `${prefix}_${key}_${value}`
    groups.push({
      depth,
      id,
      key,
      value,
      items: rest.length ? groupItems(items, rest, depth + 1, id) : items,
      type: 'group-header',
    })
  })

  return groups
}

function flattenItems (items: (DataTableItem | GroupHeaderItem)[], opened: Set<string>) {
  const flatItems: (DataTableItem | GroupHeaderItem)[] = []

  for (const item of items) {
    // TODO: make this better
    if (item.type === 'group-header') {
      if (item.value != null) {
        flatItems.push(item)
      }

      if (opened.has(item.id) || item.value == null) {
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
