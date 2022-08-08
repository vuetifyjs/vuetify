// Composables
import { provideDefaults } from '@/composables/defaults'

// Utility
import { defineComponent, useRender } from '@/util'

export const VCardActions = defineComponent({
  name: 'VCardActions',

  setup (_, { slots }) {
    provideDefaults({
      VBtn: {
        variant: 'text',
      },
    })

    useRender(() => (
      <div class="v-card-actions">
        { slots.default?.() }
      </div>
    ))

    return {}
  },
})
