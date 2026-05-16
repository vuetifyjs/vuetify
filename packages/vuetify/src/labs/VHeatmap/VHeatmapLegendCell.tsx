// Utilities
import { computed } from 'vue'
import { convertToUnit, defineComponent, propsFactory, useRender } from '@/util'

export const makeVHeatmapLegendCellProps = propsFactory({
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
  rounded: [Number, String],
}, 'VHeatmapLegendCell')

function toPx (value: any, defaultValue: number): number {
  if (value == null || value === '') return defaultValue
  const parsed = parseFloat(value)
  return Number.isFinite(parsed) ? parsed : defaultValue
}

export const VHeatmapLegendCell = defineComponent({
  name: 'VHeatmapLegendCell',

  props: makeVHeatmapLegendCellProps(),

  setup (props, { slots, attrs }) {
    const isColorScale = computed(() => !!props.color && props.color.includes('('))
    const width = computed(() => toPx(props.width, 24))
    const height = computed(() => toPx(props.height, 24))

    useRender(() => {
      const empty = !props.color || props.disabled
      const fill = !empty && !isColorScale.value ? props.color : undefined

      return (
        <svg
          class={[
            'v-heatmap__cell',
            'v-heatmap__cell--standalone',
            {
              'v-heatmap__cell--empty': empty,
              'v-heatmap__cell--color-scale': !empty && isColorScale.value,
              'v-heatmap__cell--disabled': props.disabled,
            },
          ]}
          width={ width.value }
          height={ height.value }
          viewBox={ `0 0 ${width.value} ${height.value}` }
          style={[
            { '--v-heatmap-cell-radius': convertToUnit(props.rounded) },
            (!empty && isColorScale.value) ? { '--v-heatmap-cell-color': props.color } : null,
            attrs.style as any,
          ]}
        >
          <rect
            class="v-heatmap__cell-rect"
            width={ width.value }
            height={ height.value }
            fill={ fill }
          />
          { slots.default && (
            <foreignObject class="v-heatmap__cell-overlay" width={ width.value } height={ height.value }>
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
