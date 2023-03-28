// Styles
import './VChipGroup.sass'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { deepEqual, genericComponent, useRender } from '@/util'
import { toRef } from 'vue'

// Types
import type { PropType } from 'vue'

export const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group')

export const VChipGroup = genericComponent()({
  name: 'VChipGroup',

  props: {
    column: Boolean,
    filter: Boolean,
    valueComparator: {
      type: Function as PropType<typeof deepEqual>,
      default: deepEqual,
    },

    ...makeGroupProps({ selectedClass: 'v-chip--selected' }),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'tonal' } as const),
  },

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { isSelected, select, next, prev, selected } = useGroup(props, VChipGroupSymbol)

    provideDefaults({
      VChip: {
        color: toRef(props, 'color'),
        disabled: toRef(props, 'disabled'),
        filter: toRef(props, 'filter'),
        variant: toRef(props, 'variant'),
      },
    })

    useRender(() => (
      <props.tag
        class={[
          'v-chip-group',
          {
            'v-chip-group--column': props.column,
          },
          themeClasses.value,
        ]}
      >
        { slots.default?.({
          isSelected,
          select,
          next,
          prev,
          selected: selected.value,
        })}
      </props.tag>
    ))

    return {}
  },
})

export type VChipGroup = InstanceType<typeof VChipGroup>
