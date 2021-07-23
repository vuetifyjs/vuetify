// Utilities
import { defineComponent } from '@/util'

// Composables
import { makeThemeProps } from '@/composables/theme'

export default defineComponent({
  name: 'VInputLabel',

  props: {
    sizer: Boolean,

    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    return () => {
      return (
        <label
          class={[
            'v-label',
            { 'v-label--sizer': props.sizer },
          ]}
          aria-hidden={ props.sizer || undefined }
        >
          { slots.default?.() }
        </label>
      )
    }
  },
})
