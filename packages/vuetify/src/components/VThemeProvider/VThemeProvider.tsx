// Styles
import './VThemeProvider.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { genericComponent } from '@/util'

export const VThemeProvider = genericComponent()({
  name: 'VThemeProvider',

  props: {
    withBackground: Boolean,

    ...makeComponentProps(),
    ...makeThemeProps(),
    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)

    return () => {
      if (!props.withBackground) return slots.default?.()

      return (
        <props.tag
          class={[
            'v-theme-provider',
            themeClasses.value,
            props.class,
          ]}
          style={ props.style }
        >
          { slots.default?.() }
        </props.tag>
      )
    }
  },
})

export type VThemeProvider = InstanceType<typeof VThemeProvider>
