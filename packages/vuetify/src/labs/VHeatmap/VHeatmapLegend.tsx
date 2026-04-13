// Components
import { VHeatmapCell } from './VHeatmapCell'

// Composables
import { makeRoundedProps } from '@/composables/rounded'

// Utilities
import { convertToUnit, defineComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { HeatmapThresholds } from './heatmap'
import { isLinearScale } from './heatmap'

export const makeVHeatmapLegendProps = propsFactory({
  cellSize: {
    type: [Number, String, Array] as PropType<string | number | (string | number)[]>,
    default: undefined,
  },
  labels: {
    type: Array as PropType<string[]>,
    default: () => ['Less', 'More'],
  },
  thresholds: {
    type: [Array, Object] as PropType<HeatmapThresholds>,
    default: () => [],
  },
  disabledColors: {
    type: Set as unknown as PropType<Set<string>>,
    required: true as const,
  },
  ...makeRoundedProps(),
}, 'VHeatmapLegend')

export const VHeatmapLegend = defineComponent({
  name: 'VHeatmapLegend',

  props: makeVHeatmapLegendProps(),

  emits: {
    'click:threshold': (_color: string) => true,
  },

  setup (props, { emit }) {
    useRender(() => {
      const cellWidth = Array.isArray(props.cellSize) ? props.cellSize[0] : props.cellSize
      const cellHeight = Array.isArray(props.cellSize) ? props.cellSize[1] : props.cellSize
      const linear = isLinearScale(props.thresholds) ? props.thresholds : null

      return (
        <div
          class="v-heatmap-legend"
          style={{
            '--v-heatmap-cell-width': convertToUnit(cellWidth),
            '--v-heatmap-cell-height': convertToUnit(cellHeight),
          }}
        >
          { props.labels[0] && (
            <div
              key="legend-label-start"
              class="v-heatmap-legend__label"
            >{ props.labels[0] }</div>
          )}
          { linear ? (
            <div
              key="legend-gradient"
              class="v-heatmap-legend__gradient"
              style={{
                background: `linear-gradient(to right, ${linear.from.color}, ${linear.to.color})`,
              }}
            />
          ) : (
            (props.thresholds as { min: number, color: string }[]).map(({ min, color }) => (
              <VHeatmapCell
                key={ min }
                class="v-heatmap-legend__cell"
                color={ color }
                disabled={ props.disabledColors.has(color) }
                rounded={ props.rounded }
                onClick={ () => emit('click:threshold', color) }
              />
            ))
          )}
          { props.labels[1] && (
            <div
              key="legend-label-end"
              class="v-heatmap-legend__label"
            >{ props.labels[1] }</div>
          )}
        </div>
      )
    })
  },
})
