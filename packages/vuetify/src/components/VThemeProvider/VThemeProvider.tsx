// Styles
import './VThemeProvider.sass'

// Composables
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { defineComponent } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VThemeProvider',

  props: makeProps(makeThemeProps()),

  setup (props, context) {
    const { themeClasses } = useTheme(props)

    return () => {
      return (
        <div class={['v-theme-provider', themeClasses.value]}>
          <div>{ context.slots.default?.() }</div>
        </div>
      )
    }
  },
})
