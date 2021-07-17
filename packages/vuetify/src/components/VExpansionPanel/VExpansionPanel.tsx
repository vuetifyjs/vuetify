// Components
import { VExpansionPanelSymbol } from './VExpansionPanels'

// Composables
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, provide } from 'vue'
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VExpansionPanel',

  props: {
    readonly: Boolean,
    ...makeGroupItemProps(),
    ...makeRoundedProps(),
    ...makeElevationProps(),
    ...makeTagProps(),
  },

  setup (props, { slots }) {
    const groupItem = useGroupItem(props, VExpansionPanelSymbol)
    const { roundedClasses } = useRounded(props, 'v-expansion-panel')
    const { elevationClasses } = useElevation(props)

    provide(VExpansionPanelSymbol, groupItem)

    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.indexOf(groupItem.id)
      return groupItem.group.selected.value.some(id => groupItem.group.items.value.indexOf(id) - index === 1)
    })

    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.indexOf(groupItem.id)
      return groupItem.group.selected.value.some(id => groupItem.group.items.value.indexOf(id) - index === -1)
    })

    return () => (
      <props.tag
        class={[
          'v-expansion-panel',
          {
            'v-expansion-panel--active': groupItem.isSelected.value,
            'v-expansion-panel--before-active': !groupItem.isSelected.value && isBeforeSelected.value,
            'v-expansion-panel--after-active': !groupItem.isSelected.value && isAfterSelected.value,
            'v-expansion-panel--disabled': props.disabled,
          },
          ...roundedClasses.value,
        ]}
        aria-expanded={groupItem.isSelected.value}
      >
        <div
          class={[
            'v-expansion-panel__shadow',
            ...elevationClasses.value,
          ]}
        />
        { slots.default?.() }
      </props.tag>
    )
  },
})
