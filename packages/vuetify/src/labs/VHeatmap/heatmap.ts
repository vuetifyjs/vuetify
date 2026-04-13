// Utilities
import { computed, toRef } from 'vue'

// Types
import type { Ref } from 'vue'

export interface HeatmapThreshold {
  min: number
  color: string
}

export interface HeatmapCell {
  value: number
  color?: string
  raw: Record<string, any>
  row: any
  column: any
  groupKey: string
}

/** @deprecated Use HeatmapCell instead */
export type HeatmapDay = HeatmapCell

export interface HeatmapColumn {
  key: string
  /** Row-indexed; null = blank cell */
  cells: (HeatmapCell | null)[]
}

export interface HeatmapColumnGroup {
  key: string
  label: string
  columns: HeatmapColumn[]
  /** All non-blank cells in this group, in input order */
  items: HeatmapCell[]
}

export interface HeatmapData {
  rows: any[]
  groups: HeatmapColumnGroup[]
  /** Items indexed by row key (useful for row-header slot) */
  rowItems: Map<any, HeatmapCell[]>
}

export type HeatmapAccessor<T = any> = string | ((item: any) => T)

export interface HeatmapProps {
  items: Record<string, any>[]
  itemValue: HeatmapAccessor<number>
  itemRow: HeatmapAccessor
  itemColumn: HeatmapAccessor | undefined
  groupBy: HeatmapAccessor | undefined
  rows: any[] | undefined
  columns: any[] | undefined
  thresholds: HeatmapThreshold[]
}

function readValue (item: any, accessor: HeatmapAccessor | undefined) {
  if (accessor == null) return undefined
  if (typeof accessor === 'function') return accessor(item)
  return item[accessor]
}

export function useHeatmap (props: HeatmapProps | Ref<HeatmapProps>) {
  const _props = toRef(props)

  function colorFromValue (v: number) {
    return _props.value.thresholds.findLast(({ min }) => v >= min)?.color
  }

  const data = computed<HeatmapData>(() => {
    const _p = _props.value

    // 1. Resolve rows
    let rowKeys: any[]
    if (_p.rows) {
      rowKeys = [..._p.rows]
    } else {
      const set = new Set<any>()
      for (const item of _p.items) set.add(readValue(item, _p.itemRow))
      rowKeys = [...set]
    }
    const rowIndex = new Map<any, number>(rowKeys.map((k, i) => [k, i]))

    // 2. Group items
    const groupMap = new Map<string, { label: string, items: Record<string, any>[] }>()
    for (const item of _p.items) {
      const rawKey = _p.groupBy != null ? readValue(item, _p.groupBy) : ''
      const key = String(rawKey ?? '')
      if (!groupMap.has(key)) groupMap.set(key, { label: key, items: [] })
      groupMap.get(key)!.items.push(item)
    }

    // 3. Build groups + columns
    const groups: HeatmapColumnGroup[] = []
    const rowItems = new Map<any, HeatmapCell[]>()

    function pushToRow (cell: HeatmapCell) {
      if (!rowItems.has(cell.row)) rowItems.set(cell.row, [])
      rowItems.get(cell.row)!.push(cell)
    }

    for (const [groupKey, { label, items }] of groupMap) {
      const columns: HeatmapColumn[] = []
      const groupItems: HeatmapCell[] = []

      if (_p.itemColumn != null) {
        // Explicit column axis
        let columnKeys: any[]
        if (_p.columns) {
          columnKeys = [..._p.columns]
        } else {
          const set = new Set<any>()
          for (const item of items) set.add(readValue(item, _p.itemColumn))
          columnKeys = [...set]
        }
        for (const colKey of columnKeys) {
          columns.push({
            key: String(colKey),
            cells: Array(rowKeys.length).fill(null),
          })
        }
        const colIndex = new Map<any, number>(columnKeys.map((k, i) => [k, i]))

        for (const item of items) {
          const rKey = readValue(item, _p.itemRow)
          const cKey = readValue(item, _p.itemColumn)
          const rIdx = rowIndex.get(rKey)
          const cIdx = colIndex.get(cKey)
          if (rIdx === undefined || cIdx === undefined) continue
          const value = Number(readValue(item, _p.itemValue)) || 0
          const cell: HeatmapCell = {
            value,
            color: colorFromValue(value),
            raw: item,
            row: rKey,
            column: cKey,
            groupKey,
          }
          columns[cIdx].cells[rIdx] = cell
          groupItems.push(cell)
          pushToRow(cell)
        }
      } else {
        // Inferred columns: start a new column whenever the row key wraps
        let current: (HeatmapCell | null)[] = Array(rowKeys.length).fill(null)
        let colIdx = 0
        let lastRowIdx = -1

        for (const item of items) {
          const rKey = readValue(item, _p.itemRow)
          const rIdx = rowIndex.get(rKey)
          if (rIdx === undefined) continue
          if (rIdx <= lastRowIdx) {
            columns.push({ key: String(colIdx), cells: current })
            colIdx++
            current = Array(rowKeys.length).fill(null)
          }
          const value = Number(readValue(item, _p.itemValue)) || 0
          const cell: HeatmapCell = {
            value,
            color: colorFromValue(value),
            raw: item,
            row: rKey,
            column: colIdx,
            groupKey,
          }
          current[rIdx] = cell
          groupItems.push(cell)
          pushToRow(cell)
          lastRowIdx = rIdx
        }
        if (current.some(c => c !== null)) {
          columns.push({ key: String(colIdx), cells: current })
        }
      }

      groups.push({ key: groupKey, label, columns, items: groupItems })
    }

    return { rows: rowKeys, groups, rowItems }
  })

  return {
    colorFromValue,
    data,
  }
}
