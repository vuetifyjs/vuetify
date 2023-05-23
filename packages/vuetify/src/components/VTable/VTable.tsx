// Styles
import './VTable.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

export type VTableSlots = {
  default: never
  top: never
  bottom: never
  wrapper: never
}

export const makeVTableProps = propsFactory({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'v-table')

export const VTable = genericComponent<VTableSlots>()({
  name: 'VTable',

  props: makeVTableProps(),

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
            'v-table--hover': props.hover,
          },
          themeClasses.value,
          densityClasses.value,
          props.class,
        ]}
        style={ props.style }
      >
        { slots.top?.() }

        { slots.default ? (
          <div
            class="v-table__wrapper"
            style={{ height: convertToUnit(props.height) }}
          >
            <table>
              { slots.default() }
            </table>
          </div>
        ) : slots.wrapper?.()}

        { slots.bottom?.() }
      </props.tag>
    ))

    return {}
  },
})

export type VTable = InstanceType<typeof VTable>
