// Utilities
import { defineComponent } from '@/util'

// Composables
import { makeThemeProps } from '@/composables/theme'

export default defineComponent({
  name: 'VInputLabel',

  props: {
    floating: Boolean,

    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    return () => {
      return (
        <label
          class={[
            'v-input-label',
            { 'v-input-label--floating': props.floating },
          ]}
          aria-hidden={ props.floating || undefined }
        >
          { slots.default?.() }
        </label>
      )
    }
  },
})
