// Styles
import './VThemeProvider.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeTagProps } from '@/composables/tag'

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
            props.class,
            themeClasses.value,
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
