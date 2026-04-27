// Utilities
import { computed, toValue } from 'vue'
import { getPropertyFromItem } from '@/util'

// Types
import type { MaybeRefOrGetter } from 'vue'
import type { SelectItemKey } from '@/util'

export interface HeatmapThreshold {
  min: number
  color: string
}

export interface HeatmapLinearScale {
  from: HeatmapThreshold
  to: HeatmapThreshold
}

export type HeatmapThresholds = HeatmapThreshold[] | HeatmapLinearScale

export function isLinearScale (t: HeatmapThresholds | undefined): t is HeatmapLinearScale {
  return !!t && !Array.isArray(t) && 'from' in t && 'to' in t
}

export interface HeatmapCell {
  value: number
  color?: string
  raw: Record<string, any>
  row: any
  column: any
  groupKey: string
}

export type HeatmapDay = HeatmapCell

export interface HeatmapColumn {
  key: string
  cells: (HeatmapCell | null)[]
  items: HeatmapCell[]
}

export interface HeatmapColumnGroup {
  key: string
  label: string
  columns: HeatmapColumn[]
  items: HeatmapCell[]
}

export interface HeatmapData {
  rows: any[]
  groups: HeatmapColumnGroup[]
  rowItems: Map<any, HeatmapCell[]>
  hasExplicitColumns: boolean // itemColumn accessor resolves to a value for at least one item
}

export interface HeatmapProps {
  items: Record<string, any>[]
  itemValue: SelectItemKey
  itemRow: SelectItemKey
  itemColumn: SelectItemKey
  groupBy: SelectItemKey
  rows: any[] | undefined
  columns: any[] | undefined
  thresholds: HeatmapThresholds
}

export function useHeatmap (props: MaybeRefOrGetter<HeatmapProps>) {
  function colorFromValue (value: number) {
    const thresholds = toValue(props).thresholds

    if (isLinearScale(thresholds)) {
      const { from, to } = thresholds
      const span = to.min - from.min

      if (span === 0) return value >= to.min ? to.color : from.color

      const ratio = Math.max(0, Math.min(1, (value - from.min) / span))
      const percent = Number((ratio * 100).toFixed(2))

      if (percent <= 0) return from.color
      if (percent >= 100) return to.color

      return `color-mix(in srgb, ${to.color} ${percent}%, ${from.color})`
    }

    return thresholds.findLast(({ min }) => value >= min)?.color
  }

  const data = computed<HeatmapData>(() => {
    const {
      rows,
      items,
      itemRow,
      itemColumn,
      itemValue,
      groupBy,
      columns: columnsProp,
    } = toValue(props)

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
    const groupMap = new Map<string, { label: string, items: Record<string, any>[] }>()

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
    const groups: HeatmapColumnGroup[] = []
    const rowItems = new Map<any, HeatmapCell[]>()

    function pushToRow (cell: HeatmapCell) {
      if (!rowItems.has(cell.row)) rowItems.set(cell.row, [])
      rowItems.get(cell.row)!.push(cell)
    }

    function buildExplicitColumns (sourceItems: Record<string, any>[], groupKey: string) {
      const columns: HeatmapColumn[] = []
      const groupItems: HeatmapCell[] = []

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

        const value = Number(getPropertyFromItem(item, itemValue)) || 0

        const cell: HeatmapCell = {
          value,
          color: colorFromValue(value),
          raw: item,
          row: rowKey,
          column: columnKey,
          groupKey,
        }

        columns[columnIndex].cells[rowIndex] = cell
        columns[columnIndex].items.push(cell)
        groupItems.push(cell)
        pushToRow(cell)
      }

      return { columns, groupItems }
    }

    function buildInferredColumns (sourceItems: Record<string, any>[], groupKey: string) {
      // Start a new column whenever the row key wraps
      const columns: HeatmapColumn[] = []
      const groupItems: HeatmapCell[] = []

      let current: (HeatmapCell | null)[] = Array(rowKeys.length).fill(null)
      let currentItems: HeatmapCell[] = []
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

        const value = Number(getPropertyFromItem(item, itemValue)) || 0

        const cell: HeatmapCell = {
          value,
          color: colorFromValue(value),
          raw: item,
          row: rowKey,
          column: columnIndex,
          groupKey,
        }

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

  return {
    colorFromValue,
    data,
  }
}
