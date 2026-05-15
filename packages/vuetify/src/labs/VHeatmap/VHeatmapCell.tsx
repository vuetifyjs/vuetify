// Composables
import { makeRoundedProps } from '@/composables/rounded'

// Utilities
import { computed } from 'vue'
import { getCellRadius } from './VHeatmap'
import { defineComponent, propsFactory, useRender } from '@/util'

export const makeVHeatmapCellProps = propsFactory({
  color: String,
  disabled: Boolean,
  width: {
    type: [Number, String],
    default: 24,
  },
  height: {
    type: [Number, String],
    default: 24,
  },

  ...makeRoundedProps(),
}, 'VHeatmapCell')

function toPx (value: any, defaultValue: number): number {
  if (value == null || value === '') return defaultValue
  const parsed = parseFloat(value)
  return Number.isFinite(parsed) ? parsed : defaultValue
}

export const VHeatmapCell = defineComponent({
  name: 'VHeatmapCell',

  props: makeVHeatmapCellProps(),

  setup (props, { slots, attrs }) {
    const isColorScale = computed(() => !!props.color && props.color.includes('('))
    const radius = computed(() => getCellRadius(props.rounded))
    const width = computed(() => toPx(props.width, 24))
    const height = computed(() => toPx(props.height, 24))

    useRender(() => {
      const empty = !props.color || props.disabled
      const fill = !empty && !isColorScale.value ? props.color : undefined

      return (
        <svg
          class={[
            'v-heatmap-cell',
            'v-heatmap-cell--standalone',
            {
              'v-heatmap-cell--empty': empty,
              'v-heatmap-cell--color-scale': !empty && isColorScale.value,
              'v-heatmap-cell--disabled': props.disabled,
            },
          ]}
          width={ width.value }
          height={ height.value }
          viewBox={ `0 0 ${width.value} ${height.value}` }
          style={[
            { '--v-heatmap-cell-radius': radius.value },
            (!empty && isColorScale.value) ? { '--v-heatmap-cell-color': props.color } : null,
            attrs.style as any,
          ]}
        >
          <rect
            class="v-heatmap-cell__rect"
            width={ width.value }
            height={ height.value }
            fill={ fill }
          />
          { slots.default && (
            <foreignObject class="v-heatmap-cell__overlay" width={ width.value } height={ height.value }>
              <div>
                { slots.default() }
              </div>
            </foreignObject>
          )}
        </svg>
      )
    })
  },
})
