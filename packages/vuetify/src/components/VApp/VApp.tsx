// Styles
import './VApp.sass'

// Composables
import { createLayout, makeLayoutProps } from '@/composables/layout'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useRtl } from '@/composables/rtl'

// Utilities
import { defineComponent, useRender } from '@/util'

export const VApp = defineComponent({
  name: 'VApp',

  props: {
    ...makeLayoutProps({ fullHeight: true }),
    ...makeThemeProps(),
  },

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
        ]}
        style={ layoutStyles.value }
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
