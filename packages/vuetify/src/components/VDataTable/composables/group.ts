// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject, provide, ref, toRef, toValue } from 'vue'
import { getObjectValueByPath, propsFactory } from '@/util'

// Types
import type { InjectionKey, MaybeRefOrGetter, PropType, Ref } from 'vue'
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
  items: readonly (T | Group<T> | GroupSummary<T>)[]
}

export interface GroupSummary<T = any> {
  type: 'group-summary'
  depth: number
  id: string
  key: string
  value: any
  items: readonly (T | Group<T> | GroupSummary<T>)[]
}

export type GroupKeyFn = (options: { key: string, value: any, parentKey: string | null }) => string

export const makeDataTableGroupProps = propsFactory({
  groupBy: {
    type: Array as PropType<readonly SortItem[]>,
    default: () => ([]),
  },
  opened: {
    type: Array as PropType<readonly string[]>,
    default: () => ([]),
  },
  openAllGroups: Boolean,
  groupKey: Function as PropType<GroupKeyFn>,
}, 'DataTable-group')

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
  opened: readonly string[]
  'onUpdate:opened': ((value: string[]) => void) | undefined
  openAllGroups: boolean
  groupKey: GroupKeyFn | undefined
}

export function createGroupBy (props: GroupProps) {
  const groupBy = useProxiedModel(props, 'groupBy')
  const opened = useProxiedModel(props, 'opened')
  const openAllGroups = toRef(() => props.openAllGroups)
  const groupKey = toRef(() => props.groupKey)

  return { groupBy, opened, openAllGroups, groupKey }
}

export function provideGroupBy (options: {
  groupBy: Ref<readonly SortItem[]>
  sortBy: Ref<readonly SortItem[]>
  disableSort?: Ref<boolean>
  opened?: Ref<readonly string[]>
  openAllGroups?: MaybeRefOrGetter<boolean>
}) {
  const { disableSort, groupBy, sortBy, openAllGroups } = options

  const openedModel = options.opened ?? ref<readonly string[]>([])

  const opened = computed<Set<string>>({
    get: () => new Set(openedModel.value),
    set: v => {
      openedModel.value = [...v.values()]
    },
  })

  // Track groups that have been explicitly closed when openAllGroups is active
  const closedGroups = ref(new Set<string>())

  const sortByWithGroups = computed(() => {
    return groupBy.value.map<SortItem>(val => ({
      ...val,
      order: val.order ?? false,
    })).concat(disableSort?.value ? [] : sortBy.value)
  })

  function isGroupOpen (group: Group) {
    if (toValue(openAllGroups) && !closedGroups.value.has(group.id)) {
      return true
    }
    return opened.value.has(group.id)
  }

  function toggleGroup (group: Group) {
    const newOpened = new Set(opened.value)
    if (toValue(openAllGroups)) {
      const newClosed = new Set(closedGroups.value)
      if (isGroupOpen(group)) {
        newClosed.add(group.id)
        newOpened.delete(group.id)
      } else {
        newClosed.delete(group.id)
        newOpened.add(group.id)
      }
      closedGroups.value = newClosed
    } else {
      if (!isGroupOpen(group)) newOpened.add(group.id)
      else newOpened.delete(group.id)
    }

    opened.value = newOpened
  }

  function extractRows <T extends GroupableItem> (items: readonly (T | Group<T> | GroupSummary<T>)[]) {
    function dive (group: Group<T>): T[] {
      const arr = []

      for (const item of group.items) {
        if ('type' in item && item.type === 'group') {
          arr.push(...dive(item))
        } else {
          arr.push(item as T)
        }
      }

      return [...new Set(arr)]
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

const defaultGroupId = (key: string, value: any, parentKey: string) => `${parentKey}_${key}_${value}`

function groupItems <T extends GroupableItem> (
  items: readonly T[],
  groupBy: readonly string[],
  groupKeyFn?: GroupKeyFn,
  depth = 0,
  parentKey = 'root',
) {
  if (!groupBy.length) return []

  const groupedItems = groupItemsByProperty(items, groupBy[0])
  const groups: Group<T>[] = []

  const rest = groupBy.slice(1)
  groupedItems.forEach((items, value) => {
    const key = groupBy[0]
    const id = groupKeyFn
      ? groupKeyFn({ key, value, parentKey: depth === 0 ? null : parentKey })
      : defaultGroupId(key, value, parentKey)
    groups.push({
      depth,
      id,
      key,
      value,
      items: rest.length ? groupItems(items, rest, groupKeyFn, depth + 1, id) : items,
      type: 'group',
    })
  })

  return groups
}

function flattenItems <T extends GroupableItem> (
  items: readonly (T | Group<T> | GroupSummary<T>)[],
  isOpen: (id: string) => boolean,
  hasSummary: boolean
): readonly (T | Group<T> | GroupSummary<T>)[] {
  const flatItems: (T | Group<T> | GroupSummary<T>)[] = []

  for (const item of items) {
    // TODO: make this better
    if ('type' in item && item.type === 'group') {
      if (item.value != null) {
        flatItems.push(item)
      }

      if (isOpen(item.id) || item.value == null) {
        flatItems.push(...flattenItems(item.items, isOpen, hasSummary))

        if (hasSummary) {
          flatItems.push({ ...item, type: 'group-summary' })
        }
      }
    } else {
      flatItems.push(item)
    }
  }

  return flatItems
}

export function useGroupedItems <T extends GroupableItem> (
  items: MaybeRefOrGetter<readonly T[]>,
  groupBy: Ref<readonly SortItem[]>,
  opened: Ref<Set<string>>,
  hasSummary: MaybeRefOrGetter<boolean>,
  isGroupOpen?: (group: Group) => boolean,
  groupKeyFn?: MaybeRefOrGetter<GroupKeyFn | undefined>,
) {
  const groups = computed(() => {
    if (!groupBy.value.length) return []
    return groupItems(toValue(items), groupBy.value.map(item => item.key), toValue(groupKeyFn))
  })

  const isOpen = isGroupOpen
    ? (id: string) => isGroupOpen({ id } as Group)
    : (id: string) => opened.value.has(id)

  const flatItems = computed(() => {
    if (!groupBy.value.length) return toValue(items)
    return flattenItems(groups.value, isOpen, toValue(hasSummary))
  })

  return { groups, flatItems }
}
