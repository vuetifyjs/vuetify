// Styles
import './VLabel.sass'

// Composables
import { makeThemeProps } from '@/composables/theme'

// Utilities
import { defineComponent, useRender } from '@/util'

export const VLabel = defineComponent({
  name: 'VLabel',

  props: {
    text: String,
    clickable: Boolean,

    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    useRender(() => (
      <label
        class={[
          'v-label',
          {
            'v-label--clickable': props.clickable,
          },
        ]}
      >
        { props.text }

        { slots.default?.() }
      </label>
    ))

    return {}
  },
})

export type VLabel = InstanceType<typeof VLabel>
