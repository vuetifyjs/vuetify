// Styles
import './VChipGroup.sass'

// Extensions
// import { BaseSlideGroup } from '../VSlideGroup/VSlideGroup'

// Mixins
// import Colorable from '../../mixins/colorable'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
// import mixins from '../../util/mixins'
import { deepEqual, defineComponent } from '@/util'
import type { PropType } from 'vue'
import { toRef } from 'vue'
import { provideDefaults } from '@/composables/defaults'

/* @vue/component */
export const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group')

export const VChipGroup = defineComponent({
  name: 'VChipGroup',

  props: {
    color: String,
    column: Boolean,
    valueComparator: {
      type: Function as PropType<typeof deepEqual>,
      default: deepEqual,
    },
    // TODO: implement
    // mobileBreakpoint: [Number, String],

    ...makeGroupProps({
      selectedClass: 'v-chip--selected',
    }),
    ...makeTagProps({ tag: 'div' }),
    ...makeThemeProps(),
  },

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { isSelected, select, next, prev, selected } = useGroup(props, VChipGroupSymbol)

    provideDefaults({
      VChip: {
        activeColor: toRef(props, 'color'),
        selectedClass: toRef(props, 'selectedClass'),
        variant: 'contained-text',
      },
    })

    return () => (
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
        }) }
      </props.tag>
    )
  },
})

export type VChipGroup = InstanceType<typeof VChipGroup>
