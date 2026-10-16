// Utilities
import { computed, toRef, toValue, unref } from 'vue'
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
  transformCell?: (cell: PivotCell<T>) => C
}

export function usePivot<
  T extends Record<string, any> = Record<string, any>,
  C extends PivotCell<T> = PivotCell<T>,
> (
  props: PivotProps<T>,
  options: PivotOptions<T, C> = {},
) {
  const transformCell = options.transformCell ?? ((cell: PivotCell<T>) => cell as unknown as C)

  const rows = computed<any[]>(() => {
    const rowsProp = toValue(props.rows)
    if (rowsProp) return [...rowsProp]

    const items = toValue(props.items)
    const itemRow = unref(props.itemRow)
    const set = new Set<any>()
    for (const item of items) set.add(getPropertyFromItem(item, itemRow))
    return [...set]
  })

  // True when itemColumn resolves to a value for at least one item — i.e. columns are
  // explicit. When false, columns are inferred from row-key wrapping (calendar-style).
  const hasExplicitColumns = computed<boolean>(() => {
    const itemColumn = unref(props.itemColumn)
    if (itemColumn == null) return false

    const columnsProp = toValue(props.columns)
    if (columnsProp?.length) return true

    const items = toValue(props.items)
    return items.some(item => getPropertyFromItem(item, itemColumn) != null)
  })

  // groups and rowItems are co-derived (pushToRow runs inline while columns build),
  // so they share a single internal computed.
  const grouped = computed<{ groups: PivotGroup<C>[], rowItems: Map<any, C[]> }>(() => {
    const items = toValue(props.items)
    const itemRow = unref(props.itemRow)
    const itemColumn = unref(props.itemColumn)
    const itemValue = unref(props.itemValue)
    const groupBy = unref(props.groupBy)
    const columnsProp = toValue(props.columns)
    const rowKeys = rows.value
    const explicit = hasExplicitColumns.value

    const rowIndexByKey = new Map<any, number>(rowKeys.map((k, i) => [k, i]))

    const groupMap = new Map<string, { label: string, items: T[] }>()
    for (const item of items) {
      const rawKey = groupBy != null ? getPropertyFromItem(item, groupBy) : ''
      const key = String(rawKey ?? '')

      if (!groupMap.has(key)) groupMap.set(key, { label: key, items: [] })

      groupMap.get(key)!.items.push(item)
    }

    const groups: PivotGroup<C>[] = []
    const rowItems = new Map<any, C[]>()

    function makeCell (item: T, rowKey: any, columnKey: any, groupKey: string): C {
      const cell = transformCell({
        value: getPropertyFromItem(item, itemValue),
        raw: item,
        row: rowKey,
        column: columnKey,
        groupKey,
      })
      if (!rowItems.has(rowKey)) rowItems.set(rowKey, [])
      rowItems.get(rowKey)!.push(cell)
      return cell
    }

    function buildExplicitColumns (sourceItems: T[], groupKey: string) {
      const groupItems: C[] = []

      const columnKeys = columnsProp
        ? [...columnsProp]
        : [...new Set(sourceItems.map(item => getPropertyFromItem(item, itemColumn)))]

      const columns: PivotColumn<C>[] = columnKeys.map(key => ({
        key: String(key),
        cells: Array(rowKeys.length).fill(null),
        items: [],
      }))
      const columnIndexByKey = new Map<any, number>(columnKeys.map((k, i) => [k, i]))

      for (const item of sourceItems) {
        const rowKey = getPropertyFromItem(item, itemRow)
        const columnKey = getPropertyFromItem(item, itemColumn)
        const rowIndex = rowIndexByKey.get(rowKey)
        const columnIndex = columnIndexByKey.get(columnKey)

        if (rowIndex === undefined || columnIndex === undefined) continue

        const cell = makeCell(item, rowKey, columnKey, groupKey)
        columns[columnIndex].cells[rowIndex] = cell
        columns[columnIndex].items.push(cell)
        groupItems.push(cell)
      }

      return { columns, groupItems }
    }

    // Start a new column whenever the row key wraps
    function buildInferredColumns (sourceItems: T[], groupKey: string) {
      const columns: PivotColumn<C>[] = []
      const groupItems: C[] = []

      let currentCells: (C | null)[] = Array(rowKeys.length).fill(null)
      let currentItems: C[] = []
      let columnIndex = 0
      let lastRowIndex = -1

      for (const item of sourceItems) {
        const rowKey = getPropertyFromItem(item, itemRow)
        const rowIndex = rowIndexByKey.get(rowKey)

        if (rowIndex === undefined) continue

        if (rowIndex <= lastRowIndex) {
          columns.push({ key: String(columnIndex), cells: currentCells, items: currentItems })
          columnIndex++
          currentCells = Array(rowKeys.length).fill(null)
          currentItems = []
        }

        const cell = makeCell(item, rowKey, columnIndex, groupKey)
        currentCells[rowIndex] = cell
        currentItems.push(cell)
        groupItems.push(cell)
        lastRowIndex = rowIndex
      }

      if (currentCells.some(c => c !== null)) {
        columns.push({ key: String(columnIndex), cells: currentCells, items: currentItems })
      }

      return { columns, groupItems }
    }

    for (const [groupKey, { label, items: sourceItems }] of groupMap) {
      const { columns, groupItems } = explicit
        ? buildExplicitColumns(sourceItems, groupKey)
        : buildInferredColumns(sourceItems, groupKey)

      groups.push({ key: groupKey, label, columns, items: groupItems })
    }

    return { groups, rowItems }
  })

  return {
    rows,
    hasExplicitColumns,
    groups: toRef(() => grouped.value.groups),
    rowItems: toRef(() => grouped.value.rowItems),
  }
}
