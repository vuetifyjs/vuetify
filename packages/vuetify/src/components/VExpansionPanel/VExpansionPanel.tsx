// Components
import VExpansionPanelHeader, { makeVExpansionPanelHeaderProps } from './VExpansionPanelHeader'
import VExpansionPanelContent from './VExpansionPanelContent'
import { VExpansionPanelSymbol } from './VExpansionPanels'

// Composables
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useBackgroundColor } from '@/composables/color'
import { makeTagProps } from '@/composables/tag'
import { makeLazyProps } from '@/composables/lazy'

// Utilities
import { computed, provide } from 'vue'
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VExpansionPanel',

  props: {
    header: String,
    content: String,
    bgColor: String,

    ...makeLazyProps(),
    ...makeGroupItemProps(),
    ...makeRoundedProps(),
    ...makeElevationProps(),
    ...makeTagProps(),
    ...makeVExpansionPanelHeaderProps(),
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

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'bgColor')

    return () => (
      <props.tag
        class={[
          'v-expansion-panel',
          {
            'v-expansion-panel--active': groupItem.isSelected.value,
            'v-expansion-panel--before-active': !groupItem.isSelected.value && isBeforeSelected.value,
            'v-expansion-panel--after-active': !groupItem.isSelected.value && isAfterSelected.value,
            'v-expansion-panel--disabled': groupItem.disabled.value,
          },
          roundedClasses.value,
          backgroundColorClasses.value,
        ]}
        style={ backgroundColorStyles.value }
        aria-expanded={ groupItem.isSelected.value }
      >
        <div
          class={[
            'v-expansion-panel__shadow',
            ...elevationClasses.value,
          ]}
        />
        { slots.default?.() || (
          <>
            <VExpansionPanelHeader
              expandIcon={ props.expandIcon }
              collapseIcon={ props.collapseIcon }
              color={ props.color }
              hideActions={ props.hideActions }
              ripple={ props.ripple }
            >
              { slots.header ? slots.header() : props.header }
            </VExpansionPanelHeader>
            <VExpansionPanelContent eager={ props.eager }>
              { slots.content ? slots.content() : props.content }
            </VExpansionPanelContent>
          </>
        ) }
      </props.tag>
    )
  },
})
