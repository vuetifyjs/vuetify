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
import { ref, watch } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { HeatmapAccessor, HeatmapCell, HeatmapColumnGroup, HeatmapThresholds } from './heatmap'

export interface HeatmapLegendOptions {
  labels?: string[]
  cellSize?: string | number | (string | number)[]
}

export type VHeatmapSlots = {
  cell: { item: HeatmapCell }
  legend: { thresholds: HeatmapThresholds, activeBuckets: number[], toggle: (index: number) => void }
  'row-header': { row: any, items: HeatmapCell[] }
  'column-header': { column: any, items: HeatmapCell[] }
  'group-header': { group: HeatmapColumnGroup, items: HeatmapCell[] }
}

export const makeVHeatmapProps = propsFactory({
  cellSize: {
    type: [Number, String, Array] as PropType<string | number | (string | number)[]>,
    default: 26,
  },
  gap: {
    type: [Number, String] as PropType<string | number>,
    default: undefined,
  },
  groupGap: {
    type: [Number, String] as PropType<string | number>,
    default: undefined,
  },
  hideColumnHeaders: Boolean,
  hideRowHeaders: Boolean,
  legend: {
    type: [Boolean, Object] as PropType<boolean | HeatmapLegendOptions>,
    default: false,
  },
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
    type: [String, Function] as PropType<HeatmapAccessor<number>>,
    default: 'value',
  },
  itemRow: {
    type: [String, Function] as PropType<HeatmapAccessor>,
    default: 'row',
  },
  itemColumn: {
    type: [String, Function] as PropType<HeatmapAccessor | undefined>,
    default: 'column',
  },
  groupBy: {
    type: [String, Function] as PropType<HeatmapAccessor | undefined>,
    default: undefined,
  },
  itemProps: {
    type: [Object, Function] as PropType<Record<string, any> | ((item: HeatmapCell) => Record<string, any>)>,
    default: undefined,
  },
  thresholds: {
    type: [Array, Object] as PropType<HeatmapThresholds>,
    default: () => [],
  },
  rows: {
    type: Array as PropType<any[]>,
    default: undefined,
  },
  columns: {
    type: Array as PropType<any[]>,
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
    const { data } = useHeatmap(props)
    const activeBuckets = ref<number[]>([])

    watch(() => props.thresholds, val => {
      activeBuckets.value = Array.isArray(val) ? val.map((_, i) => i) : []
    }, { deep: 1, immediate: true })

    function toggle (index: number) {
      const position = activeBuckets.value.indexOf(index)

      if (position >= 0) activeBuckets.value.splice(position, 1)
      else activeBuckets.value.push(index)
    }

    function isDisabled (cell: HeatmapCell) {
      const thresholds = props.thresholds

      if (!Array.isArray(thresholds)) return false

      const bucketIndex = thresholds.findLastIndex(({ min }) => cell.value >= min)

      if (bucketIndex < 0) return false

      return !activeBuckets.value.includes(bucketIndex)
    }

    function renderCell (item: HeatmapCell, key: string) {
      const cellProps = typeof props.itemProps === 'function'
        ? props.itemProps(item)
        : props.itemProps

      return (
        <VHeatmapCell
          key={ key }
          color={ item.color }
          disabled={ isDisabled(item) }
          rounded={ props.rounded }
          { ...cellProps }
        >
          { slots.cell?.({ item }) }
        </VHeatmapCell>
      )
    }

    useRender(() => {
      const cellWidth = Array.isArray(props.cellSize) ? props.cellSize[0] : props.cellSize
      const cellHeight = Array.isArray(props.cellSize) ? props.cellSize[1] : props.cellSize

      const { rows, groups, rowItems, hasExplicitColumns } = data.value

      const hasGroupLabels = !props.hideColumnHeaders && (!!slots['group-header'] || groups.some(g => g.label))
      const hasColumnHeaders = !props.hideColumnHeaders && hasExplicitColumns

      return (
        <div
          class={[
            'v-heatmap',
            {
              'v-heatmap--hover': props.hover,
              'v-heatmap--hide-column-headers': props.hideColumnHeaders,
              'v-heatmap--hide-row-headers': props.hideRowHeaders,
              'v-heatmap--has-group-labels': hasGroupLabels,
              'v-heatmap--has-column-headers': hasColumnHeaders,
            },
            themeClasses.value,
          ]}
          style={{
            '--v-heatmap-cell-width': convertToUnit(cellWidth),
            '--v-heatmap-cell-height': convertToUnit(cellHeight),
            '--v-heatmap-cell-gap': convertToUnit(props.gap),
            '--v-heatmap-group-gap': convertToUnit(props.groupGap),
            '--v-heatmap-hover-scale': props.hover ? Number(props.hoverScale) : undefined,
            '--v-heatmap-rows-count': rows.length,
          }}
        >
          <div class="v-heatmap__body">
            { !props.hideRowHeaders && (
              <div class="v-heatmap__row-headers" key="row-headers">
                { rows.map((row, i) => (
                  <div key={ `rh-${i}` } class="v-heatmap__row-header">
                    { slots['row-header']?.({ row, items: rowItems.get(row) ?? [] }) ?? row }
                  </div>
                ))}
              </div>
            )}

            <div class="v-heatmap__groups">
              { groups.map(group => (
                <div
                  key={ group.key }
                  class="v-heatmap__group"
                  style={{ '--v-heatmap-group-columns': group.columns.length }}
                >
                  { hasGroupLabels && (
                    <div class="v-heatmap__group-label" key="group-label">
                      { slots['group-header']?.({ group, items: group.items }) ?? group.label }
                    </div>
                  )}
                  { hasColumnHeaders && (
                    <div class="v-heatmap__column-headers" key="column-headers">
                      { group.columns.map(col => (
                        <div key={ `ch-${col.key}` } class="v-heatmap__column-header">
                          { slots['column-header']?.({ column: col.key, items: col.items }) ?? col.key }
                        </div>
                      ))}
                    </div>
                  )}
                  <div class="v-heatmap__group-grid">
                    { group.columns.flatMap((col, columnIndex) =>
                      col.cells.map((cell, rowIndex) =>
                        cell
                          ? renderCell(cell, `${group.key}-${columnIndex}-${rowIndex}`)
                          : <div key={ `blank-${group.key}-${columnIndex}-${rowIndex}` } class="v-heatmap__blank-cell" />
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          { props.legend && (
            slots.legend?.({ thresholds: props.thresholds, activeBuckets: activeBuckets.value, toggle }) ?? (
              <VHeatmapLegend
                cellSize={ (typeof props.legend === 'object' ? props.legend.cellSize : undefined) ?? props.cellSize }
                thresholds={ props.thresholds }
                activeBuckets={ activeBuckets.value }
                rounded={ props.rounded }
                labels={ typeof props.legend === 'object' ? props.legend.labels : undefined }
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
