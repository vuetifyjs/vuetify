// Composables
import { useHeatmap } from '../heatmap'

// Utilities
import { mount } from '@vue/test-utils'
import { defineComponent, reactive } from 'vue'
import { createVuetify } from '@/framework'

// Types
import type { HeatmapProps } from '../heatmap'

function setup (props: HeatmapProps) {
  let result!: ReturnType<typeof useHeatmap>
  mount(defineComponent({
    setup () {
      result = useHeatmap(reactive(props))
      return () => {}
    },
  }), {
    global: { plugins: [createVuetify()] },
  })
  return result
}

/** Build items for a month from a sparse value array */
function monthItems (year: number, month: number, values: (number | undefined)[]) {
  const date = new Date(year, month, 1)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return values.map((v, i) => {
    if (v == null) return undefined
    const day = String(i + 1).padStart(2, '0')
    return { key: `${y}-${m}-${day}`, value: v }
  }).filter(Boolean) as { key: string, value: number }[]
}

const CALENDAR_BASE: HeatmapProps = {
  type: 'calendar',
  year: 2025,
  startMonth: 0,
  monthCount: 0,
  items: [],
  itemKey: 'key',
  itemValue: 'value',
  thresholds: [],
  firstDayOfWeek: 0,
  itemRow: 'row',
  itemColumn: 'column',
  rows: undefined,
  columns: undefined,
}

const GRID_BASE: HeatmapProps = {
  type: 'grid',
  year: 2025,
  startMonth: 0,
  monthCount: 0,
  items: [],
  itemKey: 'key',
  itemValue: 'value',
  thresholds: [],
  firstDayOfWeek: 0,
  itemRow: 'row',
  itemColumn: 'column',
  rows: undefined,
  columns: undefined,
}

const THRESHOLDS = [
  { min: 1, color: '#a' },
  { min: 5, color: '#b' },
  { min: 10, color: '#c' },
]

describe('useHeatmap calendar mode', () => {
  // -- day counts --

  it('produces 29 days for Feb in a leap year', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      year: 2024,
      startMonth: 1,
      monthCount: 1,
      items: monthItems(2024, 1, Array(29).fill(0)),
    })
    expect(visibleMonths.value[0].days).toHaveLength(29)
  })

  it('produces 28 days for Feb in a non-leap year', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      year: 2025,
      startMonth: 1,
      monthCount: 1,
      items: monthItems(2025, 1, Array(28).fill(0)),
    })
    expect(visibleMonths.value[0].days).toHaveLength(28)
  })

  // -- week offset (the layout-critical calculation) --
  // Jan 2025 starts on Wednesday (getDay=3)

  it('computes weekOffset for Sunday-start week', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      year: 2025,
      startMonth: 0,
      monthCount: 1,
      items: monthItems(2025, 0, Array(31).fill(0)),
      firstDayOfWeek: 0,
    })
    expect(visibleMonths.value[0].weekOffset).toBe(3)
  })

  it('computes weekOffset for Monday-start week', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      year: 2025,
      startMonth: 0,
      monthCount: 1,
      items: monthItems(2025, 0, Array(31).fill(0)),
      firstDayOfWeek: 1,
    })
    expect(visibleMonths.value[0].weekOffset).toBe(2)
  })

  it('computes weekOffset=0 when month starts on firstWeekday', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      year: 2024,
      startMonth: 6,
      monthCount: 1,
      items: monthItems(2024, 6, Array(31).fill(0)),
      firstDayOfWeek: 1,
    })
    expect(visibleMonths.value[0].weekOffset).toBe(0)
  })

  // -- column count --

  it('calculates column count from offset + days', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      year: 2025,
      startMonth: 0,
      monthCount: 1,
      items: monthItems(2025, 0, Array(31).fill(0)),
      firstDayOfWeek: 0,
    })
    expect(visibleMonths.value[0].columns).toBe(5)
  })

  // -- month labels --

  it('labels months according to startMonth', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      startMonth: 3,
      monthCount: 3,
      items: [
        ...monthItems(2025, 3, Array(30).fill(0)),
        ...monthItems(2025, 4, Array(31).fill(0)),
        ...monthItems(2025, 5, Array(30).fill(0)),
      ],
    })
    expect(visibleMonths.value.map(m => m.label)).toEqual(['Apr', 'May', 'Jun'])
  })

  it('wraps month labels past December', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      startMonth: 10,
      monthCount: 4,
      items: [
        ...monthItems(2025, 10, Array(30).fill(0)),
        ...monthItems(2025, 11, Array(31).fill(0)),
        ...monthItems(2025, 12, Array(31).fill(0)),
        ...monthItems(2025, 13, Array(28).fill(0)),
      ],
    })
    expect(visibleMonths.value.map(m => m.label)).toEqual(['Nov', 'Dec', 'Jan', 'Feb'])
  })

  // -- threshold color matching (findLast semantics) --

  it('returns no color when value is below all thresholds', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      startMonth: 0,
      monthCount: 1,
      items: [{ key: '2025-01-01', value: 0 }],
      thresholds: THRESHOLDS,
    })
    expect(visibleMonths.value[0].days[0].color).toBeUndefined()
  })

  it('returns first threshold color at exact boundary', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      monthCount: 1,
      items: [{ key: '2025-01-01', value: 1 }],
      thresholds: THRESHOLDS,
    })
    expect(visibleMonths.value[0].days[0].color).toBe('#a')
  })

  it('returns highest matching threshold color', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      monthCount: 1,
      items: [{ key: '2025-01-01', value: 7 }],
      thresholds: THRESHOLDS,
    })
    expect(visibleMonths.value[0].days[0].color).toBe('#b')
  })

  it('returns last threshold color when value exceeds all', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      monthCount: 1,
      items: [{ key: '2025-01-01', value: 99 }],
      thresholds: THRESHOLDS,
    })
    expect(visibleMonths.value[0].days[0].color).toBe('#c')
  })

  // -- columnClass --

  it('never applies columnClass to the first month', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      year: 2025,
      startMonth: 2,
      monthCount: 1,
      items: monthItems(2025, 2, Array(31).fill(0)),
    })
    expect(visibleMonths.value[0].columnClass).toEqual({
      'v-heatmap-month--aligned': false,
      'v-heatmap-month--shifted': false,
    })
  })

  it('applies shifted class to non-first month with offset > 0', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      year: 2025,
      startMonth: 0,
      monthCount: 2,
      items: [
        ...monthItems(2025, 0, Array(31).fill(0)),
        ...monthItems(2025, 1, Array(28).fill(0)),
      ],
    })
    expect(visibleMonths.value[1].columnClass['v-heatmap-month--shifted']).toBe(true)
    expect(visibleMonths.value[1].columnClass['v-heatmap-month--aligned']).toBe(false)
  })

  it('applies aligned class to non-first month with offset = 0', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      year: 2025,
      startMonth: 5,
      monthCount: 4,
      items: [
        ...monthItems(2025, 5, Array(30).fill(0)),
        ...monthItems(2025, 6, Array(31).fill(0)),
        ...monthItems(2025, 7, Array(31).fill(0)),
        ...monthItems(2025, 8, Array(30).fill(0)),
      ],
      firstDayOfWeek: 1,
    })
    const sep = visibleMonths.value[3]
    expect(sep.weekOffset).toBe(0)
    expect(sep.columnClass['v-heatmap-month--aligned']).toBe(true)
  })

  // -- items mapping --

  it('defaults to 0 for days with no matching item', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      monthCount: 1,
      items: [
        { key: '2025-01-01', value: 5 },
        { key: '2025-01-04', value: 3 },
      ],
      thresholds: THRESHOLDS,
    })
    const days = visibleMonths.value[0].days
    expect(days[0].value).toBe(5)
    expect(days[1].value).toBe(0)
    expect(days[3].value).toBe(3)
  })

  it('exposes raw item reference on matched days', () => {
    const rawItem = { key: '2025-01-01', value: 5, extra: 'test' }
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      monthCount: 1,
      items: [rawItem],
      thresholds: THRESHOLDS,
    })
    expect(visibleMonths.value[0].days[0].raw).toStrictEqual(rawItem)
  })

  it('raw is undefined for days with no matching item', () => {
    const { visibleMonths } = setup({
      ...CALENDAR_BASE,
      monthCount: 1,
      items: [{ key: '2025-01-01', value: 5 }],
      thresholds: THRESHOLDS,
    })
    expect(visibleMonths.value[0].days[1].raw).toBeUndefined()
  })

  // -- weekday labels --

  it('rotates weekday labels based on firstDayOfWeek', () => {
    const sunday = setup({ ...CALENDAR_BASE, firstDayOfWeek: 0 })
    const monday = setup({ ...CALENDAR_BASE, firstDayOfWeek: 1 })
    expect(sunday.weekdayLabels.value[0]).not.toBe(monday.weekdayLabels.value[0])
    expect(sunday.weekdayLabels.value[1]).toBe(monday.weekdayLabels.value[0])
  })
})

describe('useHeatmap grid mode', () => {
  it('derives rows and columns from items in insertion order', () => {
    const { gridData } = setup({
      ...GRID_BASE,
      items: [
        { row: 'B', column: 'Y', value: 1 },
        { row: 'A', column: 'X', value: 2 },
        { row: 'B', column: 'X', value: 3 },
      ],
    })
    expect(gridData.value.rows).toEqual(['B', 'A'])
    expect(gridData.value.columns).toEqual(['Y', 'X'])
  })

  it('uses explicit rows and columns when provided', () => {
    const { gridData } = setup({
      ...GRID_BASE,
      rows: ['A', 'B', 'C'],
      columns: ['X', 'Y'],
      items: [
        { row: 'A', column: 'X', value: 1 },
        { row: 'B', column: 'Y', value: 2 },
        // 'C' row has no items — that's fine
      ],
    })
    expect(gridData.value.rows).toEqual(['A', 'B', 'C'])
    expect(gridData.value.columns).toEqual(['X', 'Y'])
  })

  it('maps cell values and colors by row/column key', () => {
    const { gridData } = setup({
      ...GRID_BASE,
      items: [
        { row: 'A', column: 'X', value: 7 },
        { row: 'A', column: 'Y', value: 12 },
      ],
      thresholds: THRESHOLDS,
    })
    const cellAX = gridData.value.cells.get('A\0X')
    expect(cellAX?.value).toBe(7)
    expect(cellAX?.color).toBe('#b')

    const cellAY = gridData.value.cells.get('A\0Y')
    expect(cellAY?.value).toBe(12)
    expect(cellAY?.color).toBe('#c')
  })

  it('returns undefined for missing row/column pair', () => {
    const { gridData } = setup({
      ...GRID_BASE,
      items: [{ row: 'A', column: 'X', value: 1 }],
    })
    expect(gridData.value.cells.get('A\0Z')).toBeUndefined()
  })

  it('handles empty items', () => {
    const { gridData } = setup({
      ...GRID_BASE,
      items: [],
    })
    expect(gridData.value.rows).toEqual([])
    expect(gridData.value.columns).toEqual([])
    expect(gridData.value.cells.size).toBe(0)
  })

  it('uses custom itemRow, itemColumn, itemValue fields', () => {
    const { gridData } = setup({
      ...GRID_BASE,
      itemRow: 'region',
      itemColumn: 'year',
      itemValue: 'speed',
      items: [
        { region: 'BC', year: '2020', speed: 15 },
      ],
      thresholds: THRESHOLDS,
    })
    expect(gridData.value.rows).toEqual(['BC'])
    expect(gridData.value.columns).toEqual(['2020'])
    const cell = gridData.value.cells.get('BC\x002020')
    expect(cell?.value).toBe(15)
    expect(cell?.color).toBe('#c')
    expect(cell?.row).toBe('BC')
    expect(cell?.column).toBe('2020')
  })

  it('exposes raw item on cells', () => {
    const rawItem = { row: 'A', column: 'X', value: 5, extra: 'data' }
    const { gridData } = setup({
      ...GRID_BASE,
      items: [rawItem],
    })
    expect(gridData.value.cells.get('A\0X')?.raw).toStrictEqual(rawItem)
  })

  it('applies threshold colors with findLast semantics', () => {
    const { gridData } = setup({
      ...GRID_BASE,
      items: [
        { row: 'A', column: 'X', value: 0 },
        { row: 'A', column: 'Y', value: 1 },
        { row: 'A', column: 'Z', value: 99 },
      ],
      thresholds: THRESHOLDS,
    })
    expect(gridData.value.cells.get('A\0X')?.color).toBeUndefined()
    expect(gridData.value.cells.get('A\0Y')?.color).toBe('#a')
    expect(gridData.value.cells.get('A\0Z')?.color).toBe('#c')
  })
})
