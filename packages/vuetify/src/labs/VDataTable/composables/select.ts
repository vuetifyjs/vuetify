// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject, provide } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { ItemProps } from '@/composables/items'
import type { DataTableItem } from '../types'

export const makeDataTableSelectProps = propsFactory({
  showSelect: Boolean,
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => ([]),
  },
}, 'v-data-table-select')

export const VDataTableSelectionSymbol: InjectionKey<{
  toggleSelect: (item: DataTableItem) => void
  select: (items: DataTableItem[], value: boolean) => void
  selectAll: (value: boolean) => void
  isSelected: (items: DataTableItem[]) => boolean
  isSomeSelected: (items: DataTableItem[]) => boolean
  someSelected: Ref<boolean>
  allSelected: Ref<boolean>
}> = Symbol.for('vuetify:data-table-selection')

type SelectionProps = Pick<ItemProps, 'itemValue'> & { modelValue: any[], 'onUpdate:modelValue': ((value: any[]) => void) | undefined }

export function createSelection (props: SelectionProps, allItems: Ref<DataTableItem[]>) {
  const selected = useProxiedModel(props, 'modelValue', props.modelValue, v => {
    return new Set(v)
  }, v => {
    return [...v.values()]
  })

  function isSelected (items: DataTableItem[]) {
    return items.every(item => selected.value.has(item.value))
  }

  function isSomeSelected (items: DataTableItem[]) {
    return items.some(item => selected.value.has(item.value))
  }

  function select (items: DataTableItem[], value: boolean) {
    const newSelected = new Set(selected.value)

    for (const item of items) {
      if (value) newSelected.add(item.value)
      else newSelected.delete(item.value)
    }

    selected.value = newSelected
  }

  function toggleSelect (item: DataTableItem) {
    select([item], !isSelected([item]))
  }

  function selectAll (value: boolean) {
    select(allItems.value, value)
  }

  const someSelected = computed(() => selected.value.size > 0)
  const allSelected = computed(() => isSelected(allItems.value))

  const data = { toggleSelect, select, selectAll, isSelected, isSomeSelected, someSelected, allSelected }

  provide(VDataTableSelectionSymbol, data)

  return data
}

export function useSelection () {
  const data = inject(VDataTableSelectionSymbol)

  if (!data) throw new Error('Missing selection!')

  return data
}
