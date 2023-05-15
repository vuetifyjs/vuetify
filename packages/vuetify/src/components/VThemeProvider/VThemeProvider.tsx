// Styles
import './VThemeProvider.sass'

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
}, 'v-theme-provider')

export const VThemeProvider = genericComponent()({
  name: 'VThemeProvider',

  props: makeVThemeProviderProps(),

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
