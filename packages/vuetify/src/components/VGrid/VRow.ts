// Styles
import './VGrid.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps } from '@/composables/density'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, h } from 'vue'
import { convertToUnit, deprecate, genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVRowProps = propsFactory({
  /** @deprecated use density="comfortable" instead */
  dense: Boolean,
  /** @deprecated use density="compact" instead */
  noGutters: Boolean,

  gap: [Number, String, Array] as PropType<number | string | (string | number)[]>,
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
}, 'VRow')

export const VRow = genericComponent()({
  name: 'VRow',

  props: makeVRowProps(),

  setup (props, { slots }) {
    if (props.dense) {
      deprecate('dense', 'density="comfortable"')
    }
    if (props.noGutters) {
      deprecate('noGutters', 'density="compact"')
    }

    const classes = computed(() => {
      const classList: any[] = []

      classList.push({
        'v-row--density-default': props.density === 'default' && !props.noGutters && !props.dense,
        'v-row--density-compact': props.density === 'compact' || props.noGutters,
        'v-row--density-comfortable': props.density === 'comfortable' || props.dense,
      })

      return classList
    })

    const horizontalGap = computed(() => {
      return (Array.isArray(props.gap))
        ? convertToUnit(props.gap[0] || 0)
        : convertToUnit(props.gap)
    })

    const verticalGap = computed(() => {
      return (Array.isArray(props.gap))
        ? convertToUnit(props.gap[1] || 0)
        : horizontalGap.value
    })

    return () => h(props.tag, {
      class: [
        'v-row',
        classes.value,
        props.class,
      ],
      style: [
        {
          '--v-col-gap-x': horizontalGap.value,
          '--v-col-gap-y': verticalGap.value,
        },
        props.style,
      ],
    }, slots.default?.())
  },
})

export type VRow = InstanceType<typeof VRow>
