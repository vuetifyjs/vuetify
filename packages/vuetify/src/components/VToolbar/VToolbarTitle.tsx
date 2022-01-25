// Styles
import './VToolbarTitle.sass'

// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from '@/util'

export const VToolbarTitle = defineComponent({
  name: 'VToolbarTitle',

  props: {
    text: String,

    ...makeTagProps(),
  },

  setup (props, { slots }) {
    return () => (
      <props.tag class="v-toolbar-title">
        { slots.default && (
          <div class="v-toolbar-title__placeholder">
            { slots.default() }
          </div>
        ) || props.text }
      </props.tag>
    )
  },
})
