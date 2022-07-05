// Styles
import './VTable.sass'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { convertToUnit, defineComponent, useRender } from '@/util'

export const VTable = defineComponent({
  name: 'VTable',

  props: {
    fixedHeader: Boolean,
    fixedFooter: Boolean,
    height: [Number, String],

    ...makeDensityProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)

    useRender(() => (
      <props.tag
        class={[
          'v-table',
          {
            'v-table--fixed-height': !!props.height,
            'v-table--fixed-header': props.fixedHeader,
            'v-table--fixed-footer': props.fixedFooter,
            'v-table--has-top': !!slots.top,
            'v-table--has-bottom': !!slots.bottom,
          },
          themeClasses.value,
          densityClasses.value,
        ]}
      >
        { slots.top?.() }

        { slots.default && (
          <div
            class="v-table__wrapper"
            style={{ height: convertToUnit(props.height) }}
          >
            <table>
              { slots.default() }
            </table>
          </div>
        ) }

        { slots.bottom?.() }
      </props.tag>
    ))

    return {}
  },
})
