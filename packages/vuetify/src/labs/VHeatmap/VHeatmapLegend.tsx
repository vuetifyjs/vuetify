// Components
import { VHeatmapCell } from './VHeatmapCell'

// Composables
import { makeRoundedProps } from '@/composables/rounded'

// Utilities
import { convertToUnit, defineComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { HeatmapThreshold } from './heatmap'

export const makeVHeatmapLegendProps = propsFactory({
  cellSize: {
    type: [Number, String, Array] as PropType<string | number | (string | number)[]>,
    default: undefined,
  },
  thresholds: {
    type: Array as PropType<HeatmapThreshold[]>,
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

      return (
        <div
          class="v-heatmap-legend"
          style={{
            '--v-heatmap-cell-width': convertToUnit(cellWidth),
            '--v-heatmap-cell-height': convertToUnit(cellHeight),
          }}
        >
          <div class="v-heatmap-legend__label">Less</div>
          { props.thresholds.map(({ min, color }) => (
            <VHeatmapCell
              key={ min }
              class="v-heatmap-legend__cell"
              color={ color }
              disabled={ props.disabledColors.has(color) }
              rounded={ props.rounded }
              onClick={ () => emit('click:threshold', color) }
            />
          ))}
          <div class="v-heatmap-legend__label">More</div>
        </div>
      )
    })
  },
})
