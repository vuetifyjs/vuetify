// Styles
import './VThemeProvider.sass'

// Composables
import { makeThemeProps, useTheme } from '@/composables/theme'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from '@/util'

export const VThemeProvider = defineComponent({
  name: 'VThemeProvider',

  props: {
    withBackground: Boolean,

    ...makeThemeProps(),
    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)

    return () => {
      if (!props.withBackground) return slots.default?.()

      return (
        <props.tag class={['v-theme-provider', themeClasses.value]}>
          { slots.default?.() }
        </props.tag>
      )
    }
  },
})
