// Components
import { makeVExpansionPanelTitleProps, VExpansionPanelTitle } from './VExpansionPanelTitle'
import { VExpansionPanelText } from './VExpansionPanelText'
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
import { defineComponent, useRender } from '@/util'

export const VExpansionPanel = defineComponent({
  name: 'VExpansionPanel',

  props: {
    title: String,
    text: String,
    bgColor: String,

    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeLazyProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeVExpansionPanelTitleProps(),
  },

  setup (props, { slots }) {
    const groupItem = useGroupItem(props, VExpansionPanelSymbol)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'bgColor')
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const isDisabled = computed(() => groupItem?.disabled.value || props.disabled)

    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id)
      return !groupItem.isSelected.value &&
        groupItem.group.selected.value.some(id => groupItem.group.items.value.indexOf(id) - index === 1)
    })

    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id)
      return !groupItem.isSelected.value &&
        groupItem.group.selected.value.some(id => groupItem.group.items.value.indexOf(id) - index === -1)
    })

    provide(VExpansionPanelSymbol, groupItem)

    useRender(() => {
      const hasText = !!(slots.text || props.text)
      const hasTitle = !!(slots.title || props.title)

      return (
        <props.tag
          class={[
            'v-expansion-panel',
            {
              'v-expansion-panel--active': groupItem.isSelected.value,
              'v-expansion-panel--before-active': isBeforeSelected.value,
              'v-expansion-panel--after-active': isAfterSelected.value,
              'v-expansion-panel--disabled': isDisabled.value,
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

          { hasTitle && (
            <VExpansionPanelTitle
              collapseIcon={ props.collapseIcon }
              color={ props.color }
              expandIcon={ props.expandIcon }
              hideActions={ props.hideActions }
              ripple={ props.ripple }
            >
              { slots.title ? slots.title() : props.title }
            </VExpansionPanelTitle>
          ) }

          { hasText && (
            <VExpansionPanelText eager={ props.eager }>
              { slots.text ? slots.text() : props.text }
            </VExpansionPanelText>
          ) }

          { slots.default?.() }
        </props.tag>
      )
    })

    return {}
  },
})

export type VExpansionPanel = InstanceType<typeof VExpansionPanel>
