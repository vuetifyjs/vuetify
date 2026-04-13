// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeRoundedProps, useRounded } from '@/composables/rounded'

// Utilities
import { computed, toRef } from 'vue'
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
    // Color-scale values (e.g. `color-mix(...)`) come through as raw CSS
    // functions — route them through a custom property so the stylesheet
    // can compose them, bypassing the theme-aware background resolver.
    const isColorScale = computed(() => !!props.color && props.color.includes('('))
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(
      toRef(() => props.disabled || isColorScale.value ? undefined : props.color)
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
              'v-heatmap-cell--color-scale': isColorScale.value && !props.disabled,
            },
          ]}
          style={[
            backgroundColorStyles.value,
            isColorScale.value && !props.disabled
              ? { '--v-heatmap-cell-color': props.color }
              : undefined,
          ]}
        >
          { slots.default?.() }
        </div>
      </div>
    ))
  },
})
