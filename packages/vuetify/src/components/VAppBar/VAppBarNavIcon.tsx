// Components
import { VBtn } from '@/components/VBtn'

import { makeVBtnProps } from '@/components/VBtn/VBtn'

// Utilities
import { genericComponent, useRender } from '@/util'

// Types
import type { VBtnSlots } from '@/components/VBtn/VBtn'

export const VAppBarNavIcon = genericComponent<VBtnSlots>()({
  name: 'VAppBarNavIcon',

  props: makeVBtnProps({
    icon: '$menu',
    variant: 'text' as const,
  }),

  setup (props, { slots }) {
    useRender(() => (
      <VBtn
        { ...props }
        class={[
          'v-app-bar-nav-icon',
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VAppBarNavIcon = InstanceType<typeof VAppBarNavIcon>
