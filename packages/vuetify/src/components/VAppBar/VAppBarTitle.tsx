// Composables
import { VToolbarTitle } from '@/components/VToolbar'

// Utilities
import { defineComponent, useRender } from '@/util'

export const VAppBarTitle = defineComponent({
  name: 'VAppBarTitle',

  props: { ...VToolbarTitle.props },

  setup (_, { slots }) {
    useRender(() => (
      <VToolbarTitle
        class="v-app-bar-title"
        v-slots={ slots }
      />
    ))

    return {}
  },
})
