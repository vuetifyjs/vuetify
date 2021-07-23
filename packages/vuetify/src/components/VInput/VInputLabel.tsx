// Utilities
import { defineComponent } from '@/util'

// Composables
import { makeThemeProps } from '@/composables/theme'

export default defineComponent({
  name: 'VInputLabel',

  props: {
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    return () => {
      return (
        <label class="v-label">
          { slots.default?.() }
        </label>
      )
    }
  },
})
