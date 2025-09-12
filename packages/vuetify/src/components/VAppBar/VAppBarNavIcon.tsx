// Components
import { makeVBtnProps, VBtn } from '@/components/VBtn/VBtn'

// Utilities
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { VBtnSlots } from '@/components/VBtn/VBtn'

export const makeVAppBarNavIconProps = propsFactory({
  ...omit(makeVBtnProps({
    icon: '$menu',
    variant: 'text' as const,
  }), ['spaced']),
}, 'VAppBarNavIcon')

export const VAppBarNavIcon = genericComponent<VBtnSlots>()({
  name: 'VAppBarNavIcon',

  props: makeVAppBarNavIconProps(),

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
