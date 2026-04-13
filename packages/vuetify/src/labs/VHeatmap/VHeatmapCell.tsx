// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeRoundedProps, useRounded } from '@/composables/rounded'

// Utilities
import { toRef } from 'vue'
import { defineComponent, propsFactory, useRender } from '@/util'

export const makeVHeatmapCellProps = propsFactory({
  color: String,
  disabled: Boolean,

  ...makeRoundedProps(),
}, 'VHeatmapCell')

export const VHeatmapCell = defineComponent({
  name: 'VHeatmapCell',

  props: makeVHeatmapCellProps(),

  setup (props, { slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(
      toRef(() => props.disabled ? undefined : props.color)
    )
    const { roundedClasses } = useRounded(props)

    useRender(() => (
      <div class="v-heatmap-cell">
        <div
          class={[
            'v-heatmap-cell__content',
            backgroundColorClasses.value,
            roundedClasses.value,
            {
              'v-heatmap-cell--empty': !props.color || props.disabled,
            },
          ]}
          style={ backgroundColorStyles.value }
        >
          { slots.default?.() }
        </div>
      </div>
    ))
  },
})
