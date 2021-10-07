// Styles
import './VApp.sass'

// Composables
import { makeThemeProps, useTheme } from '@/composables/theme'
import { createLayout, makeLayoutProps } from '@/composables/layout'

// Utilities
import { defineComponent } from '@/util'
import { useRtl } from '@/composables/rtl'

export const VApp = defineComponent({
  name: 'VApp',

  props: {
    ...makeLayoutProps({ fullHeight: true }),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { layoutClasses } = createLayout(props)
    const { rtlClasses } = useRtl()

    return () => (
      <div
        class={[
          'v-application',
          themeClasses.value,
          layoutClasses.value,
          rtlClasses.value,
        ]}
        data-app="true"
      >
        <div class="v-application__wrap">
          { slots.default?.() }
        </div>
      </div>
    )
  },
})

export type VApp = InstanceType<typeof VApp>
