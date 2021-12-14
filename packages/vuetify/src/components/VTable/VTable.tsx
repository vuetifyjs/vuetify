// Styles
import './VTable.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { convertToUnit, defineComponent } from '@/util'
import { makeDensityProps, useDensity } from '@/composables/density'

export const VTable = defineComponent({
  name: 'VTable',

  props: {
    fixedHeader: Boolean,
    fixedFooter: Boolean,
    height: [Number, String],

    ...makeDensityProps(),
    ...makeThemeProps(),
    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { densityClasses } = useDensity(props)

    return () => (
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
              { slots.default?.() }
            </table>
          </div>
        ) }

        { slots.bottom?.() }
      </props.tag>
    )
  },
})
