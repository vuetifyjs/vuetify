// Styles
import './VGrid.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps } from '@/composables/density'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, h } from 'vue'
import { deprecate, genericComponent, propsFactory } from '@/util'

export const makeVRowProps = propsFactory({
  /** @deprecated use density="comfortable" instead */
  dense: Boolean,
  /** @deprecated use density="compact" instead */
  noGutters: Boolean,

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

    return () => h(props.tag, {
      class: [
        'v-row',
        classes.value,
        props.class,
      ],
      style: props.style,
    }, slots.default?.())
  },
})

export type VRow = InstanceType<typeof VRow>
