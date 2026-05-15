// Utilities
import { computed, toValue, unref } from 'vue'
import { getPropertyFromItem } from '@/util'

// Types
import type { MaybeRef, MaybeRefOrGetter } from 'vue'
import type { SelectItemKey } from '@/util'

export interface PivotCell<T = Record<string, any>> {
  value: any
  raw: T
  row: any
  column: any
  groupKey: string
}

export interface PivotColumn<C> {
  key: string
  cells: (C | null)[]
  items: C[]
}

export interface PivotGroup<C> {
  key: string
  label: string
  columns: PivotColumn<C>[]
  items: C[]
}

export interface PivotData<C> {
  rows: any[]
  groups: PivotGroup<C>[]
  rowItems: Map<any, C[]>
  // True when itemColumn resolves to a value for at least one item — i.e. columns are
  // explicit. When false, columns are inferred from row-key wrapping (calendar-style).
  hasExplicitColumns: boolean
}

export interface PivotProps<T = Record<string, any>> {
  items: MaybeRefOrGetter<T[]>
  // SelectItemKey allows accessor functions, which collide with the getter
  // form of MaybeRefOrGetter — accept Ref or raw value only.
  itemValue: MaybeRef<SelectItemKey>
  itemRow: MaybeRef<SelectItemKey>
  itemColumn: MaybeRef<SelectItemKey>
  groupBy: MaybeRef<SelectItemKey>
  rows: MaybeRefOrGetter<any[] | undefined>
  columns: MaybeRefOrGetter<any[] | undefined>
}

export interface PivotOptions<T, C extends PivotCell<T>> {
  decorate?: (cell: PivotCell<T>) => C
}

export function usePivot<
  T extends Record<string, any> = Record<string, any>,
  C extends PivotCell<T> = PivotCell<T>,
> (
  props: PivotProps<T>,
  options: PivotOptions<T, C> = {},
) {
  const decorate = options.decorate ?? ((cell: PivotCell<T>) => cell as unknown as C)

  const data = computed<PivotData<C>>(() => {
    const rows = toValue(props.rows)
    const items = toValue(props.items)
    const itemRow = unref(props.itemRow)
    const itemColumn = unref(props.itemColumn)
    const itemValue = unref(props.itemValue)
    const groupBy = unref(props.groupBy)
    const columnsProp = toValue(props.columns)

    // 1. Resolve rows
    let rowKeys: any[]
    if (rows) {
      rowKeys = [...rows]
    } else {
      const set = new Set<any>()
      for (const item of items) set.add(getPropertyFromItem(item, itemRow))
      rowKeys = [...set]
    }

    const rowIndexByKey = new Map<any, number>(rowKeys.map((k, i) => [k, i]))

    // 2. Group items
    const groupMap = new Map<string, { label: string, items: T[] }>()

    for (const item of items) {
      const rawKey = groupBy != null ? getPropertyFromItem(item, groupBy) : ''
      const key = String(rawKey ?? '')

      if (!groupMap.has(key)) groupMap.set(key, { label: key, items: [] })

      groupMap.get(key)!.items.push(item)
    }

    // 3. Decide whether item-column is actually in effect
    const hasExplicitColumns = itemColumn != null && (
      !!columnsProp?.length ||
      items.some(item => getPropertyFromItem(item, itemColumn) != null)
    )

    // 4. Build groups + columns
    const groups: PivotGroup<C>[] = []
    const rowItems = new Map<any, C[]>()

    function pushToRow (cell: C) {
      if (!rowItems.has(cell.row)) rowItems.set(cell.row, [])
      rowItems.get(cell.row)!.push(cell)
    }

    function buildExplicitColumns (sourceItems: T[], groupKey: string) {
      const columns: PivotColumn<C>[] = []
      const groupItems: C[] = []

      let columnKeys: any[]
      if (columnsProp) {
        columnKeys = [...columnsProp]
      } else {
        const set = new Set<any>()
        for (const item of sourceItems) set.add(getPropertyFromItem(item, itemColumn))
        columnKeys = [...set]
      }

      for (const columnKey of columnKeys) {
        columns.push({
          key: String(columnKey),
          cells: Array(rowKeys.length).fill(null),
          items: [],
        })
      }

      const columnIndexByKey = new Map<any, number>(columnKeys.map((k, i) => [k, i]))

      for (const item of sourceItems) {
        const rowKey = getPropertyFromItem(item, itemRow)
        const columnKey = getPropertyFromItem(item, itemColumn)
        const rowIndex = rowIndexByKey.get(rowKey)
        const columnIndex = columnIndexByKey.get(columnKey)

        if (rowIndex === undefined || columnIndex === undefined) {
          continue // skip items
        }

        const cell = decorate({
          value: getPropertyFromItem(item, itemValue),
          raw: item,
          row: rowKey,
          column: columnKey,
          groupKey,
        })

        columns[columnIndex].cells[rowIndex] = cell
        columns[columnIndex].items.push(cell)
        groupItems.push(cell)
        pushToRow(cell)
      }

      return { columns, groupItems }
    }

    function buildInferredColumns (sourceItems: T[], groupKey: string) {
      // Start a new column whenever the row key wraps
      const columns: PivotColumn<C>[] = []
      const groupItems: C[] = []

      let current: (C | null)[] = Array(rowKeys.length).fill(null)
      let currentItems: C[] = []
      let columnIndex = 0
      let lastRowIndex = -1

      for (const item of sourceItems) {
        const rowKey = getPropertyFromItem(item, itemRow)
        const rowIndex = rowIndexByKey.get(rowKey)

        if (rowIndex === undefined) continue

        if (rowIndex <= lastRowIndex) {
          columns.push({ key: String(columnIndex), cells: current, items: currentItems })
          columnIndex++
          current = Array(rowKeys.length).fill(null)
          currentItems = []
        }

        const cell = decorate({
          value: getPropertyFromItem(item, itemValue),
          raw: item,
          row: rowKey,
          column: columnIndex,
          groupKey,
        })

        current[rowIndex] = cell
        currentItems.push(cell)
        groupItems.push(cell)
        pushToRow(cell)
        lastRowIndex = rowIndex
      }

      if (current.some(c => c !== null)) {
        columns.push({ key: String(columnIndex), cells: current, items: currentItems })
      }

      return { columns, groupItems }
    }

    for (const [groupKey, { label, items: sourceItems }] of groupMap) {
      const { columns, groupItems } = hasExplicitColumns
        ? buildExplicitColumns(sourceItems, groupKey)
        : buildInferredColumns(sourceItems, groupKey)

      groups.push({ key: groupKey, label, columns, items: groupItems })
    }

    return { rows: rowKeys, groups, rowItems, hasExplicitColumns }
  })

  return { data }
}
