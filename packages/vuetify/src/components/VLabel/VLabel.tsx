// Styles
import './VLabel.sass'

// Composables
import { makeThemeProps } from '@/composables/theme'

// Utilities
import { defineComponent } from '@/util'

export const VLabel = defineComponent({
  name: 'VLabel',

  props: {
    disabled: Boolean,
    error: Boolean,
    text: String,

    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    return () => (
      <label
        class={[
          'v-label',
          {
            'v-label--disabled': props.disabled,
            'v-label--error': props.error,
          },
        ]}
      >
        { props.text }

        { slots.default?.() }
      </label>
    )
  },
})

export type VLabel = InstanceType<typeof VLabel>
