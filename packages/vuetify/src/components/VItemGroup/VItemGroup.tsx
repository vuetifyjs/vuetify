// Styles
import './VItemGroup.sass'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { useTheme } from '@/composables/theme'

// Utilities
import { defineComponent } from 'vue'
import { makeProps } from '@/util'

export const VItemGroupSymbol = Symbol.for('vuetify:v-item-group')

export default defineComponent({
  name: 'VItemGroup',

  props: makeProps({
    ...makeGroupProps({
      selectedClass: 'v-item--selected',
    }),
    ...makeTagProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { isSelected, select, next, prev, selected } = useGroup(props, VItemGroupSymbol)

    return () => (
      <props.tag
        class={[
          'v-item-group',
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
