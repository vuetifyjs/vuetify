// Composables
import { provideDefaults } from '@/composables/defaults'

// Utility
import { defineComponent, useRender } from '@/util'

export const VBannerActions = defineComponent({
  name: 'VBannerActions',

  props: {
    color: String,
    density: String,
  },

  setup (props, { slots }) {
    provideDefaults({
      VBtn: {
        color: props.color,
        density: props.density,
        variant: 'text',
      },
    })

    useRender(() => (
      <div class="v-banner-actions">
        { slots.default?.() }
      </div>
    ))

    return {}
  },
})
