// Components
import { VToolbarTitle } from '@/components/VToolbar'

// Utilities
import { makeVToolbarTitleProps } from '@/components/VToolbar/VToolbarTitle'
import { defineComponent, useRender } from '@/util'

export const VAppBarTitle = defineComponent({
  name: 'VAppBarTitle',

  props: makeVToolbarTitleProps(),

  setup (props, { slots }) {
    useRender(() => (
      <VToolbarTitle
        { ... props }
        class="v-app-bar-title"
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VAppBarTitle = InstanceType<typeof VAppBarTitle>
