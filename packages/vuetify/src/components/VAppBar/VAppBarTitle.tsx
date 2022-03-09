// Composables
import { VToolbarTitle } from '@/components/VToolbar'

// Utilities
import { defineComponent } from '@/util'

export const VAppBarTitle = defineComponent({
  ...VToolbarTitle,

  name: 'VAppBarTitle',

  setup (_, { slots }) {
    return () => (
      <VToolbarTitle
        class="v-app-bar-title"
        v-slots={ slots }
      />
    )
  },
})
