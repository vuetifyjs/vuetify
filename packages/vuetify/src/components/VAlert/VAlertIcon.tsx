// Components
import { makeVIconProps, VIcon } from '@/components/VIcon/VIcon'

// Utilities
import { defineComponent } from '@/util'

export const VAlertIcon = defineComponent({
  name: 'VAlertIcon',

  props: makeVIconProps(),

  setup (props, { slots }) {
    return () => (
      <VIcon
        class="v-alert-icon"
        { ...props }
        v-slots={ slots }
      />
    )
  },
})
