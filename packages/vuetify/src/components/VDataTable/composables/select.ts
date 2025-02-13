// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject, provide } from 'vue'
import { deepEqual, getObjectValueByPath, propsFactory, wrapInArray } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { DataTableItemProps } from './items'
import type { EventProp } from '@/util'

export interface SelectableItem {
  key: any
  value: any
  selectable: boolean
}

export interface DataTableSelectStrategy {
  showSelectAll: boolean
  allSelected: (data: {
    selectedSize: number
    allItems: SelectableItem[]
    currentPage: SelectableItem[]
  }) => SelectableItem[]
  select: (data: {
    items: SelectableItem[]
    value: boolean
    selected: Map<string | number, unknown>
  }) => Map<string | number, unknown>
  selectAll: (data: {
    value: boolean
    allItems: SelectableItem[]
    currentPage: SelectableItem[]
    selected: Map<string | number, unknown>
  }) => Map<string | number, unknown>
}

type SelectionProps = Pick<DataTableItemProps, 'itemId'> & Pick<DataTableItemProps, 'itemValue'> & {
  modelValue: readonly any[]
  selectStrategy: 'single' | 'page' | 'all'
  valueComparator: typeof deepEqual
  'onUpdate:modelValue': EventProp<[any[]]> | undefined
}

const singleSelectStrategy: DataTableSelectStrategy = {
  showSelectAll: false,
  allSelected: () => [],
  select: ({ items, value, selected }) => {
    selected.clear()
    if (value) selected.set(items[0].key, items[0])
    return selected
  },
  selectAll: ({ selected }) => selected,
}

const pageSelectStrategy: DataTableSelectStrategy = {
  showSelectAll: true,
  allSelected: ({ currentPage }) => currentPage,
  select: ({ items, value, selected }) => {
    for (const item of items) {
      if (value) selected.set(item.key, item)
      else selected.delete(item.key)
    }

    return selected
  },
  selectAll: ({ value, currentPage, selected }) => pageSelectStrategy.select({ items: currentPage, value, selected }),
}

const allSelectStrategy: DataTableSelectStrategy = {
  showSelectAll: true,
  allSelected: ({ allItems }) => allItems,
  select: ({ items, value, selected }) => {
    for (const item of items) {
      if (value) selected.set(item.key, item)
      else selected.delete(item.key)
    }

    return selected
  },
  selectAll: ({ value, allItems, selected }) => allSelectStrategy.select({ items: allItems, value, selected }),
}

export const makeDataTableSelectProps = propsFactory({
  showSelect: Boolean,
  selectStrategy: {
    type: [String, Object] as PropType<'single' | 'page' | 'all'>,
    default: 'page',
  },
  modelValue: {
    type: Array as PropType<readonly any[]>,
    default: () => ([]),
  },
  valueComparator: {
    type: Function as PropType<typeof deepEqual>,
    default: deepEqual,
  },
}, 'DataTable-select')

export const VDataTableSelectionSymbol: InjectionKey<ReturnType<typeof provideSelection>> = Symbol.for('vuetify:data-table-selection')

export function provideSelection (
  props: SelectionProps,
  { allItems, currentPage }: { allItems: Ref<SelectableItem[]>, currentPage: Ref<SelectableItem[]> }
) {
  const itemId = props.itemId || 'id'
  const extractId = typeof itemId === 'function'
    ? (item: any) => itemId(item)
    : (item: any) => getObjectValueByPath(item, itemId)
  const findItem = (a: any, b: any) => extractId(a) === extractId(b)
  const selectedItems = new Map<string | number, SelectableItem>()

  const selected = useProxiedModel(props, 'modelValue', props.modelValue, v => {
    return new Set(wrapInArray(v).map(v => {
      return allItems.value.find(item => findItem(v, item.value))?.value ?? v
    }))
  }, v => {
    return [...v.values()]
  })

  const allSelectable = computed(() => allItems.value.filter(item => item.selectable))
  const currentPageSelectable = computed(() => currentPage.value.filter(item => item.selectable))

  const selectStrategy = computed(() => {
    // TODO: this should be documented, data-iterator and data-table docs using with 'single', 'page' and 'all' values
    if (typeof props.selectStrategy === 'object') return props.selectStrategy

    switch (props.selectStrategy) {
      case 'single': return singleSelectStrategy
      case 'all': return allSelectStrategy
      case 'page':
      default: return pageSelectStrategy
    }
  })

  const itemSelected = (key: any) => selectedItems.has(key)

  function isSelected (items: SelectableItem | SelectableItem[]) {
    return wrapInArray(items).every(item => itemSelected(item.key))
  }

  function isSomeSelected (items: SelectableItem | SelectableItem[]) {
    return wrapInArray(items).some(item => itemSelected(item.key))
  }

  function select (items: SelectableItem[], value: boolean) {
    selectStrategy.value.select({
      items,
      value,
      selected: selectedItems,
    })

    selected.value = new Set(selectedItems.values())
  }

  function toggleSelect (item: SelectableItem) {
    select([item], !isSelected([item]))
  }

  function selectAll (value: boolean) {
    selectStrategy.value.selectAll({
      value,
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value,
      selected: selectedItems,
    })

    selected.value = new Set(selectedItems.values())
  }

  const someSelected = computed(() => selected.value.size > 0)
  const allSelected = computed(() => {
    const items = selectStrategy.value.allSelected({
      // required to re-compute when selected changes, otherwise will not be triggered
      selectedSize: selected.value.size,
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value,
    })
    return !!items.length && isSelected(items)
  })
  const showSelectAll = computed(() => selectStrategy.value.showSelectAll)

  const data = {
    toggleSelect,
    select,
    selectAll,
    isSelected,
    isSomeSelected,
    someSelected,
    allSelected,
    showSelectAll,
  }

  provide(VDataTableSelectionSymbol, data)

  return data
}

export function useSelection () {
  const data = inject(VDataTableSelectionSymbol)

  if (!data) throw new Error('Missing selection!')

  return data
}
