// Styles
import './VChipGroup.sass'

// Extensions
// import { BaseSlideGroup } from '../VSlideGroup/VSlideGroup'

// Mixins
// import Colorable from '../../mixins/colorable'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
// import mixins from '../../util/mixins'
import { defineComponent } from '@/util'

/* @vue/component */
export const VChipGroupSymbol = Symbol.for('vuetify:v-item-group')

export const VChipGroup = defineComponent({
  name: 'VChipGroup',

  props: {
    column: Boolean,
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
    const { themeClasses } = useTheme(props)
    const { isSelected, select, next, prev, selected } = useGroup(props, VChipGroupSymbol)

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
