// Styles
import './VHeatmap.scss'

// Components
import { VHeatmapCell } from './VHeatmapCell'
import { VHeatmapLegend } from './VHeatmapLegend'

// Composables
import { useHeatmap } from './heatmap'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, ref, watch } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { CSSProperties, PropType } from 'vue'
import type { HeatmapCell, HeatmapGroup, HeatmapThresholds } from './heatmap'
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
  'group-header': { group: HeatmapGroup, items: HeatmapCell[] }
}

export const makeVHeatmapProps = propsFactory({
  cellSize: {
    type: [Number, String, Array] as PropType<string | number | (string | number)[]>,
    default: 26,
  },
  gap: {
    type: [Number, String],
    default: 6,
  },
  groupGap: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  rounded: [Number, String],
  hideColumnHeaders: Boolean,
  hideRowHeaders: Boolean,
  legend: {
    type: [Boolean, Object] as PropType<boolean | HeatmapLegendOptions>,
    default: false,
  },
  hover: Boolean,
  hoverScale: {
    type: [Number, String],
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
  emptyColor: String,
  rows: Array as PropType<any[]>,
  columns: Array as PropType<any[]>,
  ...makeThemeProps(),
}, 'VHeatmap')

export const VHeatmap = genericComponent<VHeatmapSlots>()({
  name: 'VHeatmap',

  props: makeVHeatmapProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const {
      rows,
      rowItems,
      groups,
      hasExplicitColumns,
      cellWidth,
      cellHeight,
      gap,
      cellStep,
      rowStep,
      totalWidth,
      totalHeight,
      bucketColors,
      linearColors,
      colorSpaceClass,
      bucketBoundaries,
    } = useHeatmap(props)

    const activeBuckets = ref<number[]>([])

    const colorProperties = computed(() => {
      const style: CSSProperties = {}
      const buckets = bucketColors.value
      const linear = linearColors.value

      for (let i = 0; i < buckets.length; i++) {
        style[`--v-heatmap-color-bucket-${i}`] = buckets[i]
      }

      if (linear) {
        style['--v-heatmap-color-start'] = linear.from
        style['--v-heatmap-color-end'] = linear.to
      }

      return style
    })

    watch(bucketBoundaries, val => {
      activeBuckets.value = val.map((_, i) => i)
    }, { immediate: true })

    function toggle (index: number) {
      const position = activeBuckets.value.indexOf(index)

      if (position >= 0) activeBuckets.value.splice(position, 1)
      else activeBuckets.value.push(index)
    }

    function isDisabled (cell: HeatmapCell) {
      if (cell.bucketIndex < 0) return false
      return !activeBuckets.value.includes(cell.bucketIndex)
    }

    useRender(() => {
      const radius = convertToUnit(props.rounded)
      const hasGroupLabels = !props.hideColumnHeaders && (!!slots['group-header'] || groups.value.some(group => group.label))
      const hasColumnHeaders = !props.hideColumnHeaders && hasExplicitColumns.value
      const itemProps = props.itemProps
      const hasCellSlot = !!slots.cell
      const space = colorSpaceClass.value

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
            space && `v-heatmap--color-space-${space}`,
            themeClasses.value,
          ]}
          style={{
            '--v-heatmap-cell-width': `${cellWidth.value}px`,
            '--v-heatmap-cell-height': `${cellHeight.value}px`,
            '--v-heatmap-cell-gap': `${gap.value}px`,
            '--v-heatmap-cell-radius': radius,
            '--v-heatmap-hover-scale': props.hover ? Number(props.hoverScale) : undefined,
            '--v-heatmap-rows-count': rows.value.length,
            '--v-heatmap-empty-color': props.emptyColor,
            ...colorProperties.value,
          }}
        >
          <div class="v-heatmap__body">
            { hasGroupLabels && (
              <div class="v-heatmap__group-labels" key="group-labels" style={{ width: `${totalWidth.value}px` }}>
                { groups.value.map(group => (
                  <div
                    key={ group.key }
                    class="v-heatmap__group-label"
                    style={{
                      insetInlineStart: `${group.x}px`,
                      width: `${group.width}px`,
                      paddingInlineStart: group.labelOffset ? `${group.labelOffset}px` : undefined,
                    }}
                  >
                    { slots['group-header']?.({ group, items: group.items }) ?? group.label }
                  </div>
                ))}
              </div>
            )}

            { hasColumnHeaders && (
              <div class="v-heatmap__column-headers" key="column-headers" style={{ width: `${totalWidth.value}px` }}>
                { groups.value.flatMap(group =>
                  group.columns.map((col, index) => (
                    <div
                      key={ `column-header-${group.key}-${col.key}` }
                      class="v-heatmap__column-header"
                      style={{
                        insetInlineStart: `${group.x + index * cellStep.value}px`,
                        width: `${cellWidth.value}px`,
                      }}
                    >
                      { slots['column-header']?.({ column: col.key, index, items: col.items }) ?? col.key }
                    </div>
                  ))
                )}
              </div>
            )}

            { !props.hideRowHeaders && (
              <div class="v-heatmap__row-headers" key="row-headers">
                { rows.value.map((row, index) => (
                  <div key={ `row-header-${index}` } class="v-heatmap__row-header">
                    { slots['row-header']?.({ row, index, items: rowItems.value.get(row) ?? [] }) ?? row }
                  </div>
                ))}
              </div>
            )}

            <svg
              class="v-heatmap__grid"
              width={ totalWidth.value }
              height={ totalHeight.value }
              viewBox={ `0 0 ${totalWidth.value} ${totalHeight.value}` }
            >
              { groups.value.flatMap(group =>
                group.columns.flatMap((col, columnIndex) =>
                  col.cells.map((cell, rowIndex) => {
                    if (!cell) return null

                    const cellProps = (typeof itemProps === 'function' ? itemProps(cell) : itemProps) ?? {}

                    return (
                      <VHeatmapCell
                        key={ `${group.key}-${columnIndex}-${rowIndex}` }
                        item={ cell }
                        x={ group.x + columnIndex * cellStep.value }
                        y={ rowIndex * rowStep.value }
                        width={ cellWidth.value }
                        height={ cellHeight.value }
                        disabled={ isDisabled(cell) }
                        cellProps={ cellProps }
                        v-slots={ hasCellSlot ? { default: () => slots.cell!({ item: cell }) } : undefined }
                      />
                    )
                  })
                )
              )}
            </svg>
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
