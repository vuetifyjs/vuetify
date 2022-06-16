// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { IconValue } from '@/composables/icons'

// Utilities
import { defineComponent } from '@/util'

export const VAppBarNavIcon = defineComponent({
  name: 'VAppBarNavIcon',

  props: {
    icon: {
      type: IconValue,
      default: '$menu',
    },
  },

  setup (props, { slots }) {
    return () => (
      <VBtn class="v-app-bar-nav-icon" icon={ props.icon }>
        { slots.default?.() }
      </VBtn>
    )
  },
})
