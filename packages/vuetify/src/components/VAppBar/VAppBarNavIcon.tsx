// Components
import { VBtn } from '@/components/VBtn'

// Utilities
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VAppBarNavIcon',

  props: {
    icon: {
      type: String,
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
