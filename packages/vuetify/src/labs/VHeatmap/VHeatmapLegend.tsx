// Components
import { VHeatmapCell } from './VHeatmapCell'

// Utilities
import { defineComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { HeatmapThreshold } from './heatmap'
import type { RoundedProps } from '@/composables/rounded'

export const makeVHeatmapLegendProps = propsFactory({
  thresholds: {
    type: Array as PropType<HeatmapThreshold[]>,
    default: () => [],
  },
  disabledColors: {
    type: Set as unknown as PropType<Set<string>>,
    required: true as const,
  },
  rounded: {
    type: [Boolean, Number, String] as PropType<RoundedProps['rounded']>,
    default: undefined,
  },
}, 'VHeatmapLegend')

export const VHeatmapLegend = defineComponent({
  name: 'VHeatmapLegend',

  props: makeVHeatmapLegendProps(),

  emits: {
    'click:threshold': (_color: string) => true,
  },

  setup (props, { emit }) {
    useRender(() => (
      <div class="v-heatmap-legend">
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
    ))
  },
})
