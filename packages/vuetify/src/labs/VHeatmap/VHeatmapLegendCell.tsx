// Utilities
import { toRef } from 'vue'
import { convertToUnit, defineComponent, propsFactory, useRender } from '@/util'

// Types
import type { CSSProperties } from 'vue'

export const makeVHeatmapLegendCellProps = propsFactory({
  color: String,
  bucketIndex: Number,
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
    const width = toRef(() => toPx(props.width, 24))
    const height = toRef(() => toPx(props.height, 24))

    useRender(() => {
      const hasBucket = props.bucketIndex != null && props.bucketIndex >= 0

      const style: CSSProperties = {
        '--v-heatmap-cell-radius': convertToUnit(props.rounded),
      }
      if (hasBucket) {
        style['--v-heatmap-cell-color'] = `var(--v-heatmap-color-bucket-${props.bucketIndex})`
      } else if (props.color) {
        style['--v-heatmap-cell-color'] = props.color
      }

      return (
        <svg
          class={[
            'v-heatmap__cell',
            'v-heatmap__cell--standalone',
            {
              'v-heatmap__cell--disabled': props.disabled,
            },
          ]}
          width={ width.value }
          height={ height.value }
          viewBox={ `0 0 ${width.value} ${height.value}` }
          style={[style, attrs.style as any]}
        >
          <rect
            class="v-heatmap__cell-rect"
            width={ width.value }
            height={ height.value }
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
