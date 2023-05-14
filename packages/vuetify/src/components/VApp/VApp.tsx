// Styles
import './VApp.sass'

// Composables
import { createLayout, makeLayoutProps } from '@/composables/layout'
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useRtl } from '@/composables/locale'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...makeLayoutProps({ fullHeight: true }),
  ...makeThemeProps(),
}, 'v-app')

export const VApp = genericComponent()({
  name: 'VApp',

  props: makeVAppProps(),

  setup (props, { slots }) {
    const theme = provideTheme(props)
    const { layoutClasses, layoutStyles, getLayoutItem, items, layoutRef } = createLayout(props)
    const { rtlClasses } = useRtl()

    useRender(() => (
      <div
        ref={ layoutRef }
        class={[
          'v-application',
          theme.themeClasses.value,
          layoutClasses.value,
          rtlClasses.value,
          props.class,
        ]}
        style={[
          layoutStyles.value,
          props.style,
        ]}
      >
        <div class="v-application__wrap">
          { slots.default?.() }
        </div>
      </div>
    ))

    return {
      getLayoutItem,
      items,
      theme,
    }
  },
})

export type VApp = InstanceType<typeof VApp>
