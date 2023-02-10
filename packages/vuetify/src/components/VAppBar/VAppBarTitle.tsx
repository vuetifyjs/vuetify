// Components
import { VToolbarTitle } from '@/components/VToolbar'

// Utilities
import { makeVToolbarTitleProps } from '@/components/VToolbar/VToolbarTitle'
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
