// Composables
import { useDate } from '@/composables'
import { daysDiff } from '@/composables/date/date'

// Utilities
import { computed, toRef } from 'vue'

// Types
import type { Ref } from 'vue'

export interface HeatmapCell {
  value: number
  color?: string
  raw?: Record<string, any>
  /** Calendar mode only — formatted date text */
  dateText?: string
  /** Grid mode only — row key */
  row?: string
  /** Grid mode only — column key */
  column?: string
}

/** @deprecated Use HeatmapCell instead */
export type HeatmapDay = HeatmapCell

export interface HeatmapMonth {
  label: string
  columns: number
  weekOffset: number
  columnClass: Record<string, boolean>
  days: HeatmapCell[]
}

export interface HeatmapThreshold {
  min: number
  color: string
}

export interface HeatmapGridData {
  rows: string[]
  columns: string[]
  cells: Map<string, HeatmapCell>
}

export interface HeatmapProps {
  type: 'grid' | 'calendar'
  items: Record<string, any>[]
  itemValue: string
  thresholds: HeatmapThreshold[]
  // Calendar
  itemKey: string
  year: number
  startMonth: number
  monthCount: number
  firstDayOfWeek: number
  // Grid
  itemRow: string
  itemColumn: string
  rows: string[] | undefined
  columns: string[] | undefined
}

export function useHeatmap (props: HeatmapProps | Ref<HeatmapProps>) {
  const adapter = useDate()
  const _props = toRef(props)

  function colorFromValue (v: number) {
    return _props.value.thresholds.findLast(({ min }) => v >= min)?.color
  }

  // ---- Calendar mode ----

  const weekdayLabels = computed(() =>
    adapter.getWeekdays(_props.value.firstDayOfWeek, 'short')
  )

  const calendarItemMap = computed(() => {
    const map = new Map<string, { value: number, raw: Record<string, any> }>()
    for (const item of _props.value.items) {
      map.set(item[_props.value.itemKey], {
        value: item[_props.value.itemValue],
        raw: item,
      })
    }
    return map
  })

  const visibleMonths = computed<HeatmapMonth[]>(() => {
    const months: HeatmapMonth[] = []
    for (let monthIndex = 0; monthIndex < _props.value.monthCount; monthIndex++) {
      const month = _props.value.startMonth + monthIndex
      const firstOfMonth = adapter.setMonth(adapter.setYear(adapter.startOfYear(adapter.date()!), _props.value.year), month)
      const offset = daysDiff(adapter, adapter.startOfWeek(firstOfMonth, _props.value.firstDayOfWeek), firstOfMonth)
      const daysCount = adapter.getDate(adapter.endOfMonth(firstOfMonth))
      months.push({
        label: adapter.format(firstOfMonth, 'monthShort'),
        columns: Math.ceil((offset + daysCount) / 7),
        weekOffset: offset,
        columnClass: {
          'v-heatmap-month--aligned': offset === 0 && monthIndex > 0,
          'v-heatmap-month--shifted': offset > 0 && monthIndex > 0,
        },
        days: Array.from({ length: daysCount })
          .map((_, day) => {
            const date = adapter.addDays(firstOfMonth, day)
            const key = adapter.toISO(date)
            const item = calendarItemMap.value.get(key)
            const value = item?.value ?? 0
            return {
              dateText: adapter.format(date, 'fullDate'),
              value,
              color: colorFromValue(value),
              raw: item?.raw,
            }
          }),
      })
    }
    return months
  })

  // ---- Grid mode ----

  const gridData = computed<HeatmapGridData>(() => {
    const _p = _props.value
    const rowSet = new Set<string>()
    const colSet = new Set<string>()
    const cells = new Map<string, HeatmapCell>()

    for (const item of _p.items) {
      const row = String(item[_p.itemRow])
      const col = String(item[_p.itemColumn])
      const value = Number(item[_p.itemValue]) || 0
      rowSet.add(row)
      colSet.add(col)
      cells.set(`${row}\0${col}`, {
        value,
        color: colorFromValue(value),
        raw: item,
        row,
        column: col,
      })
    }

    return {
      rows: _p.rows ?? [...rowSet],
      columns: _p.columns ?? [...colSet],
      cells,
    }
  })

  return {
    weekdayLabels,
    visibleMonths,
    gridData,
  }
}
