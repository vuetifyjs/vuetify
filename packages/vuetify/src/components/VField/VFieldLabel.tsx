// Utilities
import { defineComponent } from '@/util'

// Composables
import { makeThemeProps } from '@/composables/theme'

export const VFieldLabel = defineComponent({
  name: 'VFieldLabel',

  props: {
    floating: Boolean,

    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    return () => {
      return (
        <label
          class={[
            'v-field-label',
            { 'v-field-label--floating': props.floating },
          ]}
          aria-hidden={ props.floating || undefined }
        >
          { slots.default?.() }
        </label>
      )
    }
  },
})

export type VFieldLabel = InstanceType<typeof VFieldLabel>
