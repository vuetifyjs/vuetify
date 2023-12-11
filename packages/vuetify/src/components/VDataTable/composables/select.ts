// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject, provide } from 'vue'
import { deepEqual, propsFactory, wrapInArray } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { DataTableItemProps } from './items'
import type { EventProp } from '@/util'

export interface SelectableItem {
  value: any
  selectable: boolean
}

export interface DataTableSelectStrategy {
  showSelectAll: boolean
  allSelected: (data: {
    allItems: SelectableItem[]
    currentPage: SelectableItem[]
  }) => SelectableItem[]
  select: (data: {
    items: SelectableItem[]
    value: boolean
    selected: Set<unknown>
  }) => Set<unknown>
  selectAll: (data: {
    value: boolean
    allItems: SelectableItem[]
    currentPage: SelectableItem[]
    selected: Set<unknown>
  }) => Set<unknown>
}

type SelectionProps = Pick<DataTableItemProps, 'itemValue'> & {
  modelValue: readonly any[]
  selectStrategy: 'single' | 'page' | 'all'
  valueComparator: typeof deepEqual
  'onUpdate:modelValue': EventProp<[any[]]> | undefined
}

const singleSelectStrategy: DataTableSelectStrategy = {
  showSelectAll: false,
  allSelected: () => [],
  select: ({ items, value }) => {
    return new Set(value ? [items[0]?.value] : [])
  },
  selectAll: ({ selected }) => selected,
}

const pageSelectStrategy: DataTableSelectStrategy = {
  showSelectAll: true,
  allSelected: ({ currentPage }) => currentPage,
  select: ({ items, value, selected }) => {
    for (const item of items) {
      if (value) selected.add(item.value)
      else selected.delete(item.value)
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
      if (value) selected.add(item.value)
      else selected.delete(item.value)
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
  const selected = useProxiedModel(props, 'modelValue', props.modelValue, v => {
    return new Set(wrapInArray(v).map(v => {
      return allItems.value.find(item => props.valueComparator(v, item.value))?.value ?? v
    }))
  }, v => {
    return [...v.values()]
  })

  const allSelectable = computed(() => allItems.value.filter(item => item.selectable))
  const currentPageSelectable = computed(() => currentPage.value.filter(item => item.selectable))

  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === 'object') return props.selectStrategy

    switch (props.selectStrategy) {
      case 'single': return singleSelectStrategy
      case 'all': return allSelectStrategy
      case 'page':
      default: return pageSelectStrategy
    }
  })

  function isSelected (items: SelectableItem | SelectableItem[]) {
    return wrapInArray(items).every(item => selected.value.has(item.value))
  }

  function isSomeSelected (items: SelectableItem | SelectableItem[]) {
    return wrapInArray(items).some(item => selected.value.has(item.value))
  }

  function select (items: SelectableItem[], value: boolean) {
    const newSelected = selectStrategy.value.select({
      items,
      value,
      selected: new Set(selected.value),
    })

    selected.value = newSelected
  }

  function toggleSelect (item: SelectableItem) {
    select([item], !isSelected([item]))
  }

  function selectAll (value: boolean) {
    const newSelected = selectStrategy.value.selectAll({
      value,
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value,
      selected: new Set(selected.value),
    })

    selected.value = newSelected
  }

  const someSelected = computed(() => selected.value.size > 0)
  const allSelected = computed(() => {
    const items = selectStrategy.value.allSelected({
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value,
    })
    return !!items.length && isSelected(items)
  })

  const data = {
    toggleSelect,
    select,
    selectAll,
    isSelected,
    isSomeSelected,
    someSelected,
    allSelected,
    showSelectAll: selectStrategy.value.showSelectAll,
  }

  provide(VDataTableSelectionSymbol, data)

  return data
}

export function useSelection () {
  const data = inject(VDataTableSelectionSymbol)

  if (!data) throw new Error('Missing selection!')

  return data
}
