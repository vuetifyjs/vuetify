// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { IconValue } from '@/composables/icons'

// Utilities
import { defineComponent, useRender } from '@/util'

export const VAppBarNavIcon = defineComponent({
  name: 'VAppBarNavIcon',

  props: {
    icon: {
      type: IconValue,
      default: '$menu',
    },
  },

  setup (props, { slots }) {
    useRender(() => (
      <VBtn
        class="v-app-bar-nav-icon"
        icon={ props.icon }
        v-slots={ slots }
      />
    ))

    return {}
  },
})
