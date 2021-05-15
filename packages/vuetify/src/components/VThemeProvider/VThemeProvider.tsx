// Styles
import './VThemeProvider.sass'

// Composables
import { provideTheme } from '@/composables/theme'

// Utilities
import { defineComponent } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VThemeProvider',

  props: makeProps({
    theme: {
      type: String,
    },
    // TODO: Better name
    newContext: {
      type: Boolean,
    },
  }),

  setup (props, context) {
    const { themeClasses } = provideTheme(props, context)

    return () => {
      return (
        <div class={['v-theme-provider', themeClasses.value]}>
          <div>{ context.slots.default?.() }</div>
        </div>
      )
    }
  },
})
