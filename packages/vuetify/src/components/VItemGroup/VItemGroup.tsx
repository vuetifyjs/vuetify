// Styles
import './VItemGroup.sass'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { defineComponent } from '@/util'

export const VItemGroupSymbol = Symbol.for('vuetify:v-item-group')

export const VItemGroup = defineComponent({
  name: 'VItemGroup',

  props: {
    ...makeGroupProps({
      selectedClass: 'v-item--selected',
    }),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
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

export type VItemGroup = InstanceType<typeof VItemGroup>
