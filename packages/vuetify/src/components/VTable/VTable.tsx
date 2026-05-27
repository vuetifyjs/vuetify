// Styles
import './VTable.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VTableSlots = {
  default: never
  top: never
  bottom: never
  wrapper: never
  caption: never
}

export type Striped = null | 'odd' | 'even'
export type Gridlines = 'horizontal' | 'vertical' | 'all'

export const makeVTableProps = propsFactory({
  ariaLabel: String,
  ariaLabelledby: String,
  gridlines: {
    type: [Boolean, String] as PropType<boolean | Gridlines>,
    default: 'horizontal',
    validator: (v: any) => typeof v === 'boolean' || ['horizontal', 'vertical', 'all'].includes(v),
  },
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  striped: {
    type: String as PropType<Striped>,
    default: null,
    validator: (v: any) => ['even', 'odd'].includes(v),
  },

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VTable')

export const VTable = genericComponent<VTableSlots>()({
  name: 'VTable',

  props: makeVTableProps(),

  setup (props, { slots, emit }) {
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)

    const gridlinesVariant = computed<'none' | 'horizontal' | 'vertical' | 'all'>(() => {
      if (props.gridlines === false) return 'none'
      if (props.gridlines === true) return 'all'
      return props.gridlines
    })

    useRender(() => (
      <props.tag
        class={[
          'v-table',
          `v-table--gridlines-${gridlinesVariant.value}`,
          {
            'v-table--fixed-height': !!props.height,
            'v-table--fixed-header': props.fixedHeader,
            'v-table--fixed-footer': props.fixedFooter,
            'v-table--has-top': !!slots.top,
            'v-table--has-bottom': !!slots.bottom,
            'v-table--hover': props.hover,
            'v-table--striped-even': props.striped === 'even',
            'v-table--striped-odd': props.striped === 'odd',
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
            <table
              aria-label={ props.ariaLabel }
              aria-labelledby={ props.ariaLabelledby }
            >
              { slots.caption?.() }
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
