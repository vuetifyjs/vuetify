// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject, provide, ref } from 'vue'
import { getObjectValueByPath, propsFactory } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { SortItem } from './sort'
import type { DataTableItem } from '../types'

export interface GroupableItem<T = any> {
  type: 'item'
  raw: T
}

export interface Group<T = any> {
  type: 'group'
  depth: number
  id: string
  key: string
  value: any
  items: readonly (T | Group<T>)[]
}

export const makeDataTableGroupProps = propsFactory({
  groupBy: {
    type: Array as PropType<readonly SortItem[]>,
    default: () => ([]),
  },
}, 'data-table-group')

const VDataTableGroupSymbol: InjectionKey<{
  opened: Ref<Set<string>>
  toggleGroup: (group: Group) => void
  isGroupOpen: (group: Group) => boolean
  sortByWithGroups: Ref<SortItem[]>
  groupBy: Ref<readonly SortItem[]>
  extractRows: (items: (DataTableItem | Group<DataTableItem>)[]) => DataTableItem[]
}> = Symbol.for('vuetify:data-table-group')

type GroupProps = {
  groupBy: readonly SortItem[]
  'onUpdate:groupBy': ((value: SortItem[]) => void) | undefined
}

export function createGroupBy (props: GroupProps) {
  const groupBy = useProxiedModel(props, 'groupBy')

  return { groupBy }
}

export function provideGroupBy (options: { groupBy: Ref<readonly SortItem[]>, sortBy: Ref<readonly SortItem[]> }) {
  const { groupBy, sortBy } = options
  const opened = ref(new Set<string>())

  const sortByWithGroups = computed(() => {
    return groupBy.value.map<SortItem>(val => ({
      ...val,
      order: val.order ?? false,
    })).concat(sortBy.value)
  })

  function isGroupOpen (group: Group) {
    return opened.value.has(group.id)
  }

  function toggleGroup (group: Group) {
    const newOpened = new Set(opened.value)
    if (!isGroupOpen(group)) newOpened.add(group.id)
    else newOpened.delete(group.id)

    opened.value = newOpened
  }

  function extractRows <T extends GroupableItem> (items: readonly (T | Group<T>)[]) {
    function dive (group: Group<T>): T[] {
      const arr = []

      for (const item of group.items) {
        if ('type' in item && item.type === 'group') {
          arr.push(...dive(item))
        } else {
          arr.push(item as T)
        }
      }

      return arr
    }
    return dive({ type: 'group', items, id: 'dummy', key: 'dummy', value: 'dummy', depth: 0 })
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

function groupItemsByProperty <T extends GroupableItem> (items: readonly T[], groupBy: string) {
  if (!items.length) return []

  const groups = new Map<any, T[]>()
  for (const item of items) {
    const value = getObjectValueByPath(item.raw, groupBy)

    if (!groups.has(value)) {
      groups.set(value, [])
    }
    groups.get(value)!.push(item)
  }

  return groups
}

function groupItems <T extends GroupableItem> (items: readonly T[], groupBy: readonly string[], depth = 0, prefix = 'root') {
  if (!groupBy.length) return []

  const groupedItems = groupItemsByProperty(items, groupBy[0])
  const groups: Group<T>[] = []

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
      type: 'group',
    })
  })

  return groups
}

function flattenItems <T extends GroupableItem> (items: readonly (T | Group<T>)[], opened: Set<string>): readonly (T | Group<T>)[] {
  const flatItems: (T | Group<T>)[] = []

  for (const item of items) {
    // TODO: make this better
    if ('type' in item && item.type === 'group') {
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

export function useGroupedItems <T extends GroupableItem> (
  items: Ref<T[]>,
  groupBy: Ref<readonly SortItem[]>,
  opened: Ref<Set<string>>
) {
  const flatItems = computed(() => {
    if (!groupBy.value.length) return items.value

    const groupedItems = groupItems(items.value, groupBy.value.map(item => item.key))

    return flattenItems(groupedItems, opened.value)
  })

  return { flatItems }
}
