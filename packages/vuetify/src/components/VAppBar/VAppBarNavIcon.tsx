// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { IconValue } from '@/composables/icons'
import { makeComponentProps } from '@/composables/component'

// Utilities
import { genericComponent, useRender } from '@/util'

// Types
import type { VBtnSlots } from '@/components/VBtn/VBtn'

export const VAppBarNavIcon = genericComponent<VBtnSlots>()({
  name: 'VAppBarNavIcon',

  props: {
    icon: {
      type: IconValue,
      default: '$menu',
    },

    ...makeComponentProps(),
  },

  setup (props, { slots }) {
    useRender(() => (
      <VBtn
        class={[
          'v-app-bar-nav-icon',
          props.class,
        ]}
        icon={ props.icon }
        style={ props.style }
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VAppBarNavIcon = InstanceType<typeof VAppBarNavIcon>
