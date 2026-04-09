// Styles
import './VThemeProvider.sass'

// Components
import { Theme } from '@vuetify/v0/components'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { genericComponent, propsFactory } from '@/util'

export const makeVThemeProviderProps = propsFactory({
  withBackground: Boolean,

  ...makeComponentProps(),
  ...makeThemeProps(),
  ...makeTagProps(),
}, 'VThemeProvider')

export const VThemeProvider = genericComponent()({
  name: 'VThemeProvider',

  props: makeVThemeProviderProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)

    return () => {
      if (!props.withBackground) {
        return (
          <Theme theme={ props.theme } renderless>
            { slots.default?.() }
          </Theme>
        )
      }

      return (
        <Theme theme={ props.theme } renderless>
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
        </Theme>
      )
    }
  },
})

export type VThemeProvider = InstanceType<typeof VThemeProvider>
