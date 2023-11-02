// Components
import { makeVToolbarTitleProps, VToolbarTitle } from '@/components/VToolbar/VToolbarTitle'

// Utilities
import { genericComponent, useRender } from '@/util'

// Types
import type { VToolbarTitleSlots } from '@/components/VToolbar/VToolbarTitle'

export const VAppBarTitle = genericComponent<VToolbarTitleSlots>()({
  name: 'VAppBarTitle',

  props: makeVToolbarTitleProps(),

  setup (props, { slots }) {
    useRender(() => (
      <VToolbarTitle
        { ...props }
        class="v-app-bar-title"
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VAppBarTitle = InstanceType<typeof VAppBarTitle>
