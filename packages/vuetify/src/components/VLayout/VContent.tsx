// Utilities
import { defineComponent, inject } from 'vue'

// Composables
import { VuetifyLayoutKey } from '@/composables/layout'

export default defineComponent({
  name: 'VContent',

  setup (_, { slots }) {
    const layout = inject(VuetifyLayoutKey)

    if (!layout) throw new Error('Could not find injected Vuetify layout')

    return () => <div
      style={{
        padding: layout.padding.value,
        display: 'flex',
        flex: '1 0 auto',
        width: '100%',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
      }}
    >{ slots.default?.() }</div>
  },
})
