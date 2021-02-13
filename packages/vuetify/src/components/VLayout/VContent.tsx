// Styles
import './VContent.sass'

// Utilities
import { defineComponent, inject } from 'vue'

// Composables
import { VuetifyLayoutKey } from '@/composables/layout'

export default defineComponent({
  name: 'VContent',

  setup (_, { slots }) {
    const layout = inject(VuetifyLayoutKey)

    if (!layout) throw new Error('Could not find injected Vuetify layout')

    return () => (
      <div
        class='v-content'
        style={layout.contentStyles.value}
      >{ slots.default?.() }</div>
    )
  },
})
