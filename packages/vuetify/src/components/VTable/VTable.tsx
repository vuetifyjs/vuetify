import './VTable.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { convertToUnit, defineComponent } from '@/util'
import { makeDensityProps, useDensity } from '@/composables/density'

export default defineComponent({
  name: 'VTable',

  props: {
    fixedHeader: Boolean,
    height: [Number, String],

    ...makeDensityProps(),
    ...makeThemeProps(),
    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { densityClasses } = useDensity(props, 'v-table')

    return () => (
      <props.tag
        class={[
          'v-table',
          {
            'v-table--fixed-height': !!props.height && !props.fixedHeader,
            'v-table--fixed-header': props.fixedHeader,
            'v-table--has-top': !!slots.top,
            'v-table--has-bottom': !!slots.bottom,
          },
          themeClasses.value,
          densityClasses.value,
        ]}
      >
        { slots.top?.() }
        <div class="v-table__wrapper" style={{ height: convertToUnit(props.height) }}>
          <table>
            { slots.default?.() }
          </table>
        </div>
        { slots.bottom?.()}
      </props.tag>
    )
  },
})
