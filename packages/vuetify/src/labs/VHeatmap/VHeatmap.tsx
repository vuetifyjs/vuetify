// Styles
import './VHeatmap.scss'

// Components
import { VHeatmapCell } from './VHeatmapCell'
import { VHeatmapLegend } from './VHeatmapLegend'

// Composables
import { useHeatmap } from './heatmap'
import { makeRoundedProps } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { reactive } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { HeatmapCell, HeatmapThreshold } from './heatmap'

export type VHeatmapSlots = {
  cell: { item: HeatmapCell }
  legend: { thresholds: HeatmapThreshold[], disabledColors: Set<string>, toggle: (color: string) => void }
  'row-header': { row: string }
  'column-header': { column: string }
}

export const makeVHeatmapProps = propsFactory({
  type: {
    type: String as PropType<'grid' | 'calendar'>,
    default: 'grid',
  },
  cellSize: {
    type: [Number, String, Array] as PropType<string | number | (string | number)[]>,
    default: 26,
  },
  gap: {
    type: [Number, String] as PropType<string | number>,
    default: undefined,
  },
  hideColumnHeaders: Boolean,
  hideLegend: Boolean,
  hideRowHeaders: Boolean,
  hover: Boolean,
  hoverScale: {
    type: [Number, String] as PropType<string | number>,
    default: 0.85,
  },
  items: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
  itemValue: {
    type: [String, Number] as PropType<string>,
    default: 'value',
  },
  itemProps: {
    type: [Object, Function] as PropType<Record<string, any> | ((item: HeatmapCell) => Record<string, any>)>,
    default: undefined,
  },
  thresholds: {
    type: Array as PropType<HeatmapThreshold[]>,
    default: () => [],
  },

  // Calendar-specific
  itemKey: {
    type: String,
    default: 'key',
  },
  year: {
    type: Number,
    default: () => new Date().getFullYear(),
  },
  startMonth: {
    type: Number,
    default: 0,
  },
  monthCount: {
    type: Number,
    default: 12,
  },
  firstDayOfWeek: {
    type: Number,
    default: 0,
  },
  separateMonths: {
    type: Boolean,
    default: true,
  },

  // Grid-specific
  itemRow: {
    type: String,
    default: 'row',
  },
  itemColumn: {
    type: String,
    default: 'column',
  },
  rows: {
    type: Array as PropType<string[]>,
    default: undefined,
  },
  columns: {
    type: Array as PropType<string[]>,
    default: undefined,
  },

  ...makeRoundedProps(),
  ...makeThemeProps(),
}, 'VHeatmap')

export const VHeatmap = genericComponent<VHeatmapSlots>()({
  name: 'VHeatmap',

  props: makeVHeatmapProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { weekdayLabels, visibleMonths, gridData } = useHeatmap(props)
    const disabledColors = reactive(new Set<string>())

    function toggle (color: string) {
      if (disabledColors.has(color)) {
        disabledColors.delete(color)
      } else {
        disabledColors.add(color)
      }
    }

    function isDisabled (color?: string) {
      return !!color && disabledColors.has(color)
    }

    function renderCell (item: HeatmapCell, key: string) {
      const cellProps = typeof props.itemProps === 'function'
        ? props.itemProps(item)
        : props.itemProps
      return (
        <VHeatmapCell
          key={ key }
          color={ item.color }
          disabled={ isDisabled(item.color) }
          rounded={ props.rounded }
          { ...cellProps }
        >
          { slots.cell?.({ item }) }
        </VHeatmapCell>
      )
    }

    function renderGrid () {
      const { rows, columns, cells } = gridData.value

      return (
        <div class="v-heatmap__grid">
          { !props.hideColumnHeaders && (
            <>
              { !props.hideRowHeaders && <div class="v-heatmap__column-spacer" /> }
              { columns.map(col => (
                <span key={ col } class="v-heatmap__column-header">
                  { slots['column-header']?.({ column: col }) ?? col }
                </span>
              ))}
            </>
          )}

          { rows.map(row => (
            <>
              { !props.hideRowHeaders && (
                <div class="v-heatmap__row-header" key={ `rh-${row}` }>
                  { slots['row-header']?.({ row }) ?? row }
                </div>
              )}
              { columns.map(col => {
                const cell = cells.get(`${row}\0${col}`)
                const item: HeatmapCell = cell ?? { value: 0, row, column: col }
                return renderCell(item, `${row}-${col}`)
              })}
            </>
          ))}
        </div>
      )
    }

    function renderCalendar () {
      return (
        <>
          <div class="v-heatmap__weekdays">
            { weekdayLabels.value.map(d => (
              <span key={ d }>{ d }</span>
            ))}
          </div>

          <div class="v-heatmap__months">
            { visibleMonths.value.map((m, i) => (
              <span
                key={ i }
                data-offset={ m.weekOffset }
                class={ m.columnClass }
              >
                { m.label }
              </span>
            ))}
          </div>

          <div class="v-heatmap__cells">
              { visibleMonths.value.map((m, i) => (
                <div
                  key={ i }
                  class={['v-heatmap__month-days', m.columnClass]}
                  style={{ '--v-heatmap-cell-columns': m.columns }}
                >
                  { Array.from({ length: m.weekOffset }).map((_, j) => (
                    <div key={ `o-${j}` } class="v-heatmap__offset-cell" />
                  ))}
                  { m.days.map((d, j) => renderCell(d, `d-${j}`)) }
                </div>
              ))}
            </div>
        </>
      )
    }

    useRender(() => {
      const isGrid = props.type === 'grid'
      const cellWidth = Array.isArray(props.cellSize) ? props.cellSize[0] : props.cellSize
      const cellHeight = Array.isArray(props.cellSize) ? props.cellSize[1] : props.cellSize

      return (
        <div
          class={[
            'v-heatmap',
            `v-heatmap--${props.type}`,
            {
              'v-heatmap--hover': props.hover,
              'v-heatmap--hide-column-headers': props.hideColumnHeaders,
              'v-heatmap--hide-row-headers': props.hideRowHeaders,
              'v-heatmap--merged-months': !isGrid && !props.separateMonths,
              'v-heatmap--separated-months': !isGrid && props.separateMonths,
            },
            themeClasses.value,
          ]}
          style={{
            '--v-heatmap-cell-width': convertToUnit(cellWidth),
            '--v-heatmap-cell-height': convertToUnit(cellHeight),
            '--v-heatmap-cell-gap': convertToUnit(props.gap),
            '--v-heatmap-hover-scale': props.hover ? Number(props.hoverScale) : undefined,
            ...(isGrid
              ? {
                '--v-heatmap-grid-rows': gridData.value.rows.length,
                '--v-heatmap-grid-columns': gridData.value.columns.length,
              }
              : {
                '--v-heatmap-month-limit': props.monthCount,
              }
            ),
          }}
        >
          { isGrid ? renderGrid() : renderCalendar() }

          { !props.hideLegend && (
            slots.legend?.({ thresholds: props.thresholds, disabledColors, toggle }) ?? (
              <VHeatmapLegend
                thresholds={ props.thresholds }
                disabledColors={ disabledColors }
                rounded={ props.rounded }
                onClick:threshold={ toggle }
              />
            )
          )}
        </div>
      )
    })
  },
})

export type VHeatmap = InstanceType<typeof VHeatmap>
