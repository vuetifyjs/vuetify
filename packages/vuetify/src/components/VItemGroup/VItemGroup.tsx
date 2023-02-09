// Styles
import './VItemGroup.sass'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { genericComponent } from '@/util'

// Types
import type { SlotsToProps } from '@/util'

export const VItemGroupSymbol = Symbol.for('vuetify:v-item-group')

export type VItemGroupSlot = {
  default: []
}

export const VItemGroup = genericComponent<new () => {
  $props: SlotsToProps<VItemGroupSlot>
}>()({
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
    const { themeClasses } = provideTheme(props)
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
