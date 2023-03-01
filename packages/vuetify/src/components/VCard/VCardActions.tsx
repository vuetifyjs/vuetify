// Composables
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { defineComponent, useRender } from '@/util'

// Types
import type { SlotsToProps } from '@/util'

export const VCardActions = defineComponent<SlotsToProps<{ default: [] }>>({
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

export type VCardActions = InstanceType<typeof VCardActions>
