// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { HeatmapCell } from './heatmap'

export type VHeatmapCellSlots = {
  default: { item: HeatmapCell }
}

export const makeVHeatmapCellProps = propsFactory({
  item: {
    type: Object as PropType<HeatmapCell>,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  disabled: Boolean,
  cellProps: Object as PropType<Record<string, any>>,
}, 'VHeatmapCell')

export const VHeatmapCell = genericComponent<VHeatmapCellSlots>()({
  name: 'VHeatmapCell',

  props: makeVHeatmapCellProps(),

  setup (props, { slots }) {
    useRender(() => {
      const { title, ...cellAttrs } = props.cellProps ?? {}

      return (
        <g
          class={[
            'v-heatmap__cell',
            {
              'v-heatmap__cell--disabled': props.disabled,
            },
          ]}
          transform={ `translate(${props.x},${props.y})` }
          style={{ '--v-heatmap-cell-color': props.item.color }}
          { ...cellAttrs }
        >
          { title && <title key="title">{ title }</title> }
          <rect
            class="v-heatmap__cell-underlay"
            width={ props.width }
            height={ props.height }
            fill="transparent"
          />
          <g class="v-heatmap__cell-content">
            <rect
              class="v-heatmap__cell-rect"
              width={ props.width }
              height={ props.height }
            />
            { slots.default && (
              <foreignObject class="v-heatmap__cell-overlay" width={ props.width } height={ props.height }>
                <div>
                  { slots.default({ item: props.item }) }
                </div>
              </foreignObject>
            )}
          </g>
        </g>
      )
    })
  },
})

export type VHeatmapCell = InstanceType<typeof VHeatmapCell>
