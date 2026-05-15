// Styles
import './VHeatmap.scss'

// Components
import { VHeatmapLegend } from './VHeatmapLegend'

// Composables
import { useHeatmap } from './heatmap'
import { makeRoundedProps } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { ref, watch } from 'vue'
import { genericComponent, hasLightForeground, isParsableColor, parseColor, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { HeatmapCell, HeatmapColumnGroup, HeatmapThresholds } from './heatmap'
import type { SelectItemKey } from '@/util'

export interface HeatmapLegendOptions {
  labels?: string[]
  cellSize?: string | number | (string | number)[]
}

export type VHeatmapSlots = {
  cell: { item: HeatmapCell }
  legend: { thresholds: HeatmapThresholds, activeBuckets: number[], toggle: (index: number) => void }
  'row-header': { row: any, index: number, items: HeatmapCell[] }
  'column-header': { column: any, index: number, items: HeatmapCell[] }
  'group-header': { group: HeatmapColumnGroup, items: HeatmapCell[] }
}

// Rounded keyword → SVG-compatible radius value (matches Vuetify's $rounded scale).
const RADIUS_KEYWORDS: Record<string, string> = {
  sm: '2px',
  md: '4px',
  lg: '8px',
  xl: '24px',
  pill: '9999px',
  circle: '50%',
}

export function getCellRadius (rounded: any, defaultRadius = '5px'): string {
  if (rounded == null || rounded === '' || rounded === true) return defaultRadius
  if (rounded === false || rounded === 0 || rounded === '0' || rounded === 'tile') return '0'
  if (typeof rounded === 'number') return `${rounded}px`
  if (typeof rounded === 'string') {
    if (rounded in RADIUS_KEYWORDS) return RADIUS_KEYWORDS[rounded]
    if (/^\d/.test(rounded)) return /[a-z%]$/i.test(rounded) ? rounded : `${rounded}px`
  }
  return defaultRadius
}

function toPx (value: any, defaultValue: number): number {
  if (value == null || value === '') return defaultValue
  const parsed = parseFloat(value)
  return Number.isFinite(parsed) ? parsed : defaultValue
}

export const makeVHeatmapProps = propsFactory({
  cellSize: {
    type: [Number, String, Array] as PropType<string | number | (string | number)[]>,
    default: 26,
  },
  gap: {
    type: [Number, String] as PropType<string | number>,
    default: 6,
  },
  groupGap: [Number, String] as PropType<string | number>,
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
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: 'value',
  },
  itemRow: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: 'row',
  },
  itemColumn: {
    type: [String, Array, Function] as PropType<SelectItemKey>,
    default: 'column',
  },
  groupBy: [String, Array, Function] as PropType<SelectItemKey>,
  itemProps: [Object, Function] as PropType<Record<string, any> | ((item: HeatmapCell) => Record<string, any>)>,
  thresholds: {
    type: [Array, Object] as PropType<HeatmapThresholds>,
    default: () => [],
  },
  rows: Array as PropType<any[]>,
  columns: Array as PropType<any[]>,

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

    useRender(() => {
      const cellWidth = toPx(Array.isArray(props.cellSize) ? props.cellSize[0] : props.cellSize, 26)
      const cellHeight = toPx(Array.isArray(props.cellSize) ? props.cellSize[1] : props.cellSize, 26)
      const gap = toPx(props.gap, 6)
      const groupGap = props.groupGap != null ? toPx(props.groupGap, cellWidth + gap) : (cellWidth + gap)
      const radius = getCellRadius(props.rounded)

      const { rows, groups, rowItems, hasExplicitColumns } = data.value
      const rowCount = rows.length

      const hasGroupLabels = !props.hideColumnHeaders && (!!slots['group-header'] || groups.some(g => g.label))
      const hasColumnHeaders = !props.hideColumnHeaders && hasExplicitColumns

      const totalHeight = rowCount * cellHeight + Math.max(0, rowCount - 1) * gap

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
            '--v-heatmap-cell-width': `${cellWidth}px`,
            '--v-heatmap-cell-height': `${cellHeight}px`,
            '--v-heatmap-cell-gap': `${gap}px`,
            '--v-heatmap-group-gap': `${groupGap}px`,
            '--v-heatmap-cell-radius': radius,
            '--v-heatmap-hover-scale': props.hover ? Number(props.hoverScale) : undefined,
            '--v-heatmap-rows-count': rowCount,
          }}
        >
          <div class="v-heatmap__body">
            { !props.hideRowHeaders && (
              <div class="v-heatmap__row-headers" key="row-headers">
                { rows.map((row, index) => (
                  <div key={ `row-header-${index}` } class="v-heatmap__row-header">
                    { slots['row-header']?.({ row, index, items: rowItems.get(row) ?? [] }) ?? row }
                  </div>
                ))}
              </div>
            )}

            <div class="v-heatmap__groups">
              { groups.map((group, groupIndex) => {
                const columnCount = group.columns.length
                const groupWidth = columnCount * cellWidth + Math.max(0, columnCount - 1) * gap
                // Calendar-style: a non-first group that begins with a leading blank in its first column
                // should overlap the gap between groups so the rendered weeks stay flush.
                const offsetStart = groupIndex > 0 && group.columns[0]?.cells[0] == null

                return (
                  <div
                    key={ group.key }
                    class="v-heatmap__group"
                    style={{ '--v-heatmap-group-columns': columnCount }}
                  >
                    { hasGroupLabels && (
                      <div class="v-heatmap__group-label" key="group-label">
                        { slots['group-header']?.({ group, items: group.items }) ?? group.label }
                      </div>
                    )}
                    { hasColumnHeaders && (
                      <div class="v-heatmap__column-headers" key="column-headers">
                        { group.columns.map((col, index) => (
                          <div key={ `column-header-${col.key}` } class="v-heatmap__column-header">
                            { slots['column-header']?.({ column: col.key, index, items: col.items }) ?? col.key }
                          </div>
                        ))}
                      </div>
                    )}
                    <svg
                      class={[
                        'v-heatmap__group-grid',
                        { 'v-heatmap__group-grid--offset-start': offsetStart },
                      ]}
                      width={ groupWidth }
                      height={ totalHeight }
                      viewBox={ `0 0 ${groupWidth} ${totalHeight}` }
                    >
                      { group.columns.flatMap((col, columnIndex) =>
                        col.cells.map((cell, rowIndex) => {
                          if (!cell) return null

                          const x = columnIndex * (cellWidth + gap)
                          const y = rowIndex * (cellHeight + gap)
                          const disabled = isDisabled(cell)
                          // SVG <title> child renders as a native tooltip; the `title` HTML attribute
                          // does not. Pull it out of the spread and render it as a child instead.
                          const { title, ...cellProps } = (typeof props.itemProps === 'function'
                            ? props.itemProps(cell)
                            : props.itemProps) ?? {}
                          const color = !disabled ? cell.color : undefined
                          const isColorScale = !!color && color.includes('(')
                          const hasSlot = !!slots.cell
                          const empty = !color
                          const key = `${group.key}-${columnIndex}-${rowIndex}`

                          // Match v2 behavior: auto-contrast text on solid-color cells (hex/rgb).
                          // Color-scale cells handle this in CSS via oklch().
                          const autoTextColor = !empty && !isColorScale && color && isParsableColor(color)
                            ? (hasLightForeground(parseColor(color)) ? '#fff' : '#000')
                            : undefined

                          return (
                            <g
                              key={ key }
                              class={[
                                'v-heatmap-cell',
                                {
                                  'v-heatmap-cell--empty': empty,
                                  'v-heatmap-cell--color-scale': isColorScale,
                                  'v-heatmap-cell--disabled': disabled,
                                },
                              ]}
                              transform={ `translate(${x},${y})` }
                              style={[
                                isColorScale ? { '--v-heatmap-cell-color': color } : null,
                                autoTextColor ? { color: autoTextColor } : null,
                              ]}
                              { ...cellProps }
                            >
                              { title != null && <title>{ title }</title> }
                              <rect
                                class="v-heatmap-cell__underlay"
                                width={ cellWidth }
                                height={ cellHeight }
                                fill="transparent"
                              />
                              <g class="v-heatmap-cell__content">
                                <rect
                                  class="v-heatmap-cell__rect"
                                  width={ cellWidth }
                                  height={ cellHeight }
                                  fill={ !empty && !isColorScale ? color : undefined }
                                />
                                { hasSlot && (
                                  <foreignObject class="v-heatmap-cell__overlay" width={ cellWidth } height={ cellHeight }>
                                    <div>
                                      { slots.cell?.({ item: cell }) }
                                    </div>
                                  </foreignObject>
                                )}
                              </g>
                            </g>
                          )
                        })
                      )}
                    </svg>
                  </div>
                )
              })}
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
