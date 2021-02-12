// Styles
import './VThemeProvider.sass'

// Utilities
import { defineComponent } from 'vue'
import { provideTheme } from '@/composables/theme'
import makeProps from '@/util/makeProps'

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
