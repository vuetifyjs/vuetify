// Styles
import './VThemeProvider.sass'

// Composables
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent } from '@/util'

export const VThemeProvider = genericComponent()({
  name: 'VThemeProvider',

  props: {
    withBackground: Boolean,

    ...makeThemeProps(),
    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)

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

export type VThemeProvider = InstanceType<typeof VThemeProvider>
