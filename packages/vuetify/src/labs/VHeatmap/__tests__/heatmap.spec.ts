// Composables
import { useHeatmap } from '../heatmap'

// Utilities
import { mount } from '@vue/test-utils'
import { defineComponent, reactive } from 'vue'
import { createVuetify } from '@/framework'

// Types
import type { HeatmapProps } from '../heatmap'

function setup (props: Partial<HeatmapProps>) {
  const full: HeatmapProps = {
    items: [],
    itemValue: 'value',
    itemRow: 'row',
    itemColumn: undefined,
    groupBy: undefined,
    rows: undefined,
    columns: undefined,
    thresholds: [],
    ...props,
  }
  let result!: ReturnType<typeof useHeatmap>
  mount(defineComponent({
    setup () {
      result = useHeatmap(reactive(full))
      return () => {}
    },
  }), {
    global: { plugins: [createVuetify()] },
  })
  return result
}

const THRESHOLDS = [
  { min: 1, color: '#a' },
  { min: 5, color: '#b' },
  { min: 10, color: '#c' },
]

describe('useHeatmap rows', () => {
  it('derives rows from items in insertion order', () => {
    const { rows } = setup({
      itemColumn: 'col',
      items: [
        { row: 'B', col: 'X', value: 1 },
        { row: 'A', col: 'X', value: 2 },
      ],
    })
    expect(rows.value).toEqual(['B', 'A'])
  })

  it('uses explicit rows when provided', () => {
    const { rows } = setup({
      rows: ['A', 'B', 'C'],
      itemColumn: 'col',
      items: [
        { row: 'B', col: 'X', value: 1 },
      ],
    })
    expect(rows.value).toEqual(['A', 'B', 'C'])
  })
})

describe('useHeatmap column groups', () => {
  it('creates a single empty-keyed group when groupBy is not set', () => {
    const { groups } = setup({
      itemColumn: 'col',
      items: [{ row: 'A', col: 'X', value: 1 }],
    })
    expect(groups.value).toHaveLength(1)
    expect(groups.value[0].key).toBe('')
    expect(groups.value[0].label).toBe('')
  })

  it('splits items across column groups by groupBy', () => {
    const { groups } = setup({
      groupBy: 'month',
      itemColumn: 'col',
      items: [
        { month: 'Jan', row: 'A', col: 'X', value: 1 },
        { month: 'Feb', row: 'A', col: 'X', value: 2 },
        { month: 'Jan', row: 'A', col: 'Y', value: 3 },
      ],
    })
    expect(groups.value.map(g => g.key)).toEqual(['Jan', 'Feb'])
    expect(groups.value[0].columns).toHaveLength(2) // X, Y
    expect(groups.value[1].columns).toHaveLength(1) // X
  })

  it('accepts a function as groupBy', () => {
    const { groups } = setup({
      groupBy: (v: any) => v.m.toUpperCase(),
      itemColumn: 'col',
      items: [
        { m: 'jan', row: 'A', col: 'X', value: 1 },
        { m: 'feb', row: 'A', col: 'X', value: 2 },
      ],
    })
    expect(groups.value.map(g => g.key)).toEqual(['JAN', 'FEB'])
  })
})

describe('useHeatmap explicit columns (itemColumn)', () => {
  it('derives columns per group from items', () => {
    const { groups } = setup({
      itemColumn: 'col',
      items: [
        { row: 'A', col: 'X', value: 1 },
        { row: 'A', col: 'Y', value: 2 },
      ],
    })
    const cols = groups.value[0].columns
    expect(cols.map(c => c.key)).toEqual(['X', 'Y'])
  })

  it('uses explicit columns when provided', () => {
    const { groups } = setup({
      itemColumn: 'col',
      columns: ['X', 'Y', 'Z'],
      rows: ['A'],
      items: [{ row: 'A', col: 'X', value: 1 }],
    })
    const cols = groups.value[0].columns
    expect(cols.map(c => c.key)).toEqual(['X', 'Y', 'Z'])
    expect(cols[0].cells[0]?.value).toBe(1)
    expect(cols[1].cells[0]).toBeNull() // blank
    expect(cols[2].cells[0]).toBeNull() // blank
  })

  it('maps cell values and colors by (row, column)', () => {
    const { groups } = setup({
      itemColumn: 'col',
      rows: ['A'],
      items: [
        { row: 'A', col: 'X', value: 7 },
        { row: 'A', col: 'Y', value: 12 },
      ],
      thresholds: THRESHOLDS,
    })
    const [cx, cy] = groups.value[0].columns
    expect(cx.cells[0]?.value).toBe(7)
    expect(cx.cells[0]?.color).toBe('#b')
    expect(cy.cells[0]?.color).toBe('#c')
  })
})

describe('useHeatmap inferred columns (no itemColumn)', () => {
  // Row key 0..6 simulates days of the week — new column starts when index wraps back.
  const rows = [0, 1, 2, 3, 4, 5, 6]

  it('places items in a single column while row index is monotonically increasing', () => {
    const { groups } = setup({
      rows,
      items: [
        { row: 0, value: 1 },
        { row: 1, value: 2 },
        { row: 2, value: 3 },
      ],
    })
    const cols = groups.value[0].columns
    expect(cols).toHaveLength(1)
    expect(cols[0].cells[0]?.value).toBe(1)
    expect(cols[0].cells[1]?.value).toBe(2)
    expect(cols[0].cells[2]?.value).toBe(3)
    // remaining rows stay blank
    expect(cols[0].cells[3]).toBeNull()
  })

  it('starts a new column when row index wraps back', () => {
    const { groups } = setup({
      rows,
      items: [
        { row: 5, value: 1 },
        { row: 6, value: 2 },
        { row: 0, value: 3 }, // wraps → new column
        { row: 1, value: 4 },
      ],
    })
    const cols = groups.value[0].columns
    expect(cols).toHaveLength(2)
    // first column: leading blanks, then Fri/Sat
    expect(cols[0].cells[0]).toBeNull()
    expect(cols[0].cells[5]?.value).toBe(1)
    expect(cols[0].cells[6]?.value).toBe(2)
    // second column: Sun/Mon, trailing blanks
    expect(cols[1].cells[0]?.value).toBe(3)
    expect(cols[1].cells[1]?.value).toBe(4)
    expect(cols[1].cells[6]).toBeNull()
  })

  it('groupBy + inferred columns produces a calendar-like layout', () => {
    const { groups } = setup({
      rows,
      groupBy: 'month',
      items: [
        // Jan — starts on Wed (row 3), ends on Fri (row 5)
        { month: 'Jan', row: 3, value: 1 },
        { month: 'Jan', row: 4, value: 2 },
        { month: 'Jan', row: 5, value: 3 },
        // Feb — starts on Mon (row 1)
        { month: 'Feb', row: 1, value: 4 },
        { month: 'Feb', row: 2, value: 5 },
      ],
    })
    expect(groups.value).toHaveLength(2)

    const [jan, feb] = groups.value
    expect(jan.columns).toHaveLength(1)
    // Jan leading blanks (Sun, Mon, Tue) then Wed-Fri, Sat blank
    expect(jan.columns[0].cells[0]).toBeNull()
    expect(jan.columns[0].cells[2]).toBeNull()
    expect(jan.columns[0].cells[3]?.value).toBe(1)
    expect(jan.columns[0].cells[6]).toBeNull()

    expect(feb.columns).toHaveLength(1)
    expect(feb.columns[0].cells[0]).toBeNull() // Sun blank
    expect(feb.columns[0].cells[1]?.value).toBe(4)
    expect(feb.columns[0].cells[2]?.value).toBe(5)
  })
})

describe('useHeatmap accessors', () => {
  it('supports function accessors', () => {
    const { groups } = setup({
      itemRow: (v: any) => v.r,
      itemColumn: (v: any) => v.c,
      itemValue: (v: any) => v.v * 2,
      items: [{ r: 'A', c: 'X', v: 3 }],
    })
    const cell = groups.value[0].columns[0].cells[0]
    expect(cell?.value).toBe(6)
    expect(cell?.row).toBe('A')
    expect(cell?.column).toBe('X')
  })

  it('interpolates colors with color-mix when thresholds is a linear scale', () => {
    const { groups } = setup({
      rows: [0],
      itemColumn: 'col',
      columns: ['A', 'B', 'C', 'D', 'E'],
      items: [
        { row: 0, col: 'A', value: 0 }, // below from.min → clamps to from.color
        { row: 0, col: 'B', value: 1 }, // at from.min
        { row: 0, col: 'C', value: 2 }, // midpoint
        { row: 0, col: 'D', value: 3 }, // at to.min
        { row: 0, col: 'E', value: 4 }, // above to.min → clamps to to.color
      ],
      thresholds: {
        from: { min: 1, color: '#ff0000' },
        to: { min: 3, color: '#00ff00' },
      },
    })
    const cols = groups.value[0].columns
    expect(cols[0].cells[0]?.color).toBe('#ff0000')
    expect(cols[1].cells[0]?.color).toBe('#ff0000')
    expect(cols[2].cells[0]?.color).toBe('color-mix(in srgb, #ff0000, #00ff00 50%)')
    expect(cols[3].cells[0]?.color).toBe('#00ff00')
    expect(cols[4].cells[0]?.color).toBe('#00ff00')
  })

  it('applies threshold colors with findLast semantics', () => {
    const { groups } = setup({
      rows: [0],
      itemColumn: 'col',
      columns: ['X', 'Y', 'Z'],
      items: [
        { row: 0, col: 'X', value: 0 },
        { row: 0, col: 'Y', value: 1 },
        { row: 0, col: 'Z', value: 99 },
      ],
      thresholds: THRESHOLDS,
    })
    const cols = groups.value[0].columns
    expect(cols[0].cells[0]?.color).toBeUndefined()
    expect(cols[1].cells[0]?.color).toBe('#a')
    expect(cols[2].cells[0]?.color).toBe('#c')
  })
})

describe('useHeatmap rowItems', () => {
  it('indexes cells by row key', () => {
    const { rowItems } = setup({
      rows: [0, 1],
      itemColumn: 'col',
      items: [
        { row: 0, col: 'X', value: 1 },
        { row: 0, col: 'Y', value: 2 },
        { row: 1, col: 'X', value: 3 },
      ],
    })
    expect(rowItems.value.get(0)).toHaveLength(2)
    expect(rowItems.value.get(1)).toHaveLength(1)
  })
})
