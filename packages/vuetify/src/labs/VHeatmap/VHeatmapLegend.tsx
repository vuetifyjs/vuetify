// Components
import { VHeatmapLegendCell } from './VHeatmapLegendCell'

// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { getInterpolationMethod } from './colorScale'
import { isLinearScale } from './heatmap'
import { convertToUnit, defineComponent, propsFactory, useRender } from '@/util'

// Types
import type { CSSProperties, PropType } from 'vue'
import type { ColorScaleStop } from './colorScale'
import type { HeatmapThresholds } from './heatmap'

export const makeVHeatmapLegendProps = propsFactory({
  cellSize: {
    type: [Number, String, Array] as PropType<string | number | (string | number)[]>,
    default: undefined,
  },
  labels: {
    type: Array as PropType<string[]>,
    default: () => ['$vuetify.heatmap.less', '$vuetify.heatmap.more'],
  },
  thresholds: {
    type: [Array, Object] as PropType<HeatmapThresholds>,
    default: () => [],
  },
  activeBuckets: {
    type: Array as PropType<number[]>,
    required: true as const,
  },
  rounded: [Number, String],
}, 'VHeatmapLegend')

export const VHeatmapLegend = defineComponent({
  name: 'VHeatmapLegend',

  props: makeVHeatmapLegendProps(),

  emits: {
    'click:threshold': (index: number) => true,
  },

  setup (props, { emit }) {
    const { t } = useLocale()

    useRender(() => {
      const cellWidth = Array.isArray(props.cellSize) ? props.cellSize[0] : props.cellSize
      const cellHeight = Array.isArray(props.cellSize) ? props.cellSize[1] : props.cellSize
      const linear = isLinearScale(props.thresholds) ? props.thresholds : null
      const buckets = !linear && Array.isArray(props.thresholds) ? props.thresholds : null

      const style: CSSProperties = {
        '--v-heatmap-cell-width': convertToUnit(cellWidth),
        '--v-heatmap-cell-height': convertToUnit(cellHeight),
      }
      if (linear) {
        style['--v-heatmap-color-start'] = linear.from.color
        style['--v-heatmap-color-end'] = linear.to.color
      }
      if (buckets) {
        buckets.forEach((stop, i) => {
          style[`--v-heatmap-color-bucket-${i}`] = stop.color
        })
      }

      return (
        <div class="v-heatmap-legend" style={ style }>
          { props.labels[0] && (
            <div
              key="legend-label-start"
              class="v-heatmap-legend__label"
            >{ t(props.labels[0]) }</div>
          )}
          { linear ? (
            <div
              key="legend-gradient"
              class="v-heatmap-legend__gradient"
              style={{
                background: `linear-gradient(${getInterpolationMethod(linear)} to right, var(--v-heatmap-color-start), var(--v-heatmap-color-end))`,
              }}
            />
          ) : (
            (props.thresholds as ColorScaleStop[]).map(({ min }, i) => (
              <VHeatmapLegendCell
                key={ min }
                class="v-heatmap-legend__cell"
                bucketIndex={ i }
                disabled={ !props.activeBuckets.includes(i) }
                rounded={ props.rounded }
                width={ cellWidth }
                height={ cellHeight }
                onClick={ () => emit('click:threshold', i) }
              />
            ))
          )}
          { props.labels[1] && (
            <div
              key="legend-label-end"
              class="v-heatmap-legend__label"
            >{ t(props.labels[1]) }</div>
          )}
        </div>
      )
    })
  },
})
