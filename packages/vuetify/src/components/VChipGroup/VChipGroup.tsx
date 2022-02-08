// Styles
import './VChipGroup.sass'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'
import { provideDefaults } from '@/composables/defaults'
import { useTextColor } from '@/composables/color'

// Utilities
import { deepEqual, defineComponent } from '@/util'
import { toRef } from 'vue'

// Types
import type { PropType } from 'vue'

export const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group')

export const VChipGroup = defineComponent({
  name: 'VChipGroup',

  props: {
    column: Boolean,
    valueComparator: {
      type: Function as PropType<typeof deepEqual>,
      default: deepEqual,
    },
    // TODO: implement
    // mobileBreakpoint: [Number, String],

    ...makeGroupProps({ selectedClass: 'v-chip--selected' }),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps(),
  },

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { isSelected, select, next, prev, selected } = useGroup(props, VChipGroupSymbol)
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))

    provideDefaults({
      VChip: {
        selectedClass: toRef(props, 'selectedClass'),
        variant: toRef(props, 'variant'),
      },
    }, { scoped: true })

    return () => (
      <props.tag
        class={[
          'v-chip-group',
          {
            'v-chip-group--column': props.column,
          },
          textColorClasses.value,
          themeClasses.value,
        ]}
        style={ textColorStyles.value }
      >
        { slots.default?.({
          isSelected,
          select,
          next,
          prev,
          selected: selected.value,
        }) }
      </props.tag>
    )
  },
})

export type VChipGroup = InstanceType<typeof VChipGroup>
