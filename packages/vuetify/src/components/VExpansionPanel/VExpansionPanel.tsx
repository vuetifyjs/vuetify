// Components
import { VExpansionPanelSymbol } from './shared'
import { makeVExpansionPanelTextProps, VExpansionPanelText } from './VExpansionPanelText'
import { makeVExpansionPanelTitleProps, VExpansionPanelTitle } from './VExpansionPanelTitle'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, provide } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVExpansionPanelProps = propsFactory({
  title: String,
  text: String,
  bgColor: String,

  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeVExpansionPanelTitleProps(),
  ...makeVExpansionPanelTextProps(),
}, 'VExpansionPanel')

export type VExpansionPanelSlots = {
  default: never
  title: never
  text: never
}

export const VExpansionPanel = genericComponent<VExpansionPanelSlots>()({
  name: 'VExpansionPanel',

  props: makeVExpansionPanelProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  setup (props, { slots }) {
    const groupItem = useGroupItem(props, VExpansionPanelSymbol)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'bgColor')
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const isDisabled = computed(() => groupItem?.disabled.value || props.disabled)

    const selectedIndices = computed(() => groupItem.group.items.value.reduce<number[]>((arr, item, index) => {
      if (groupItem.group.selected.value.includes(item.id)) arr.push(index)
      return arr
    }, []))

    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id)
      return !groupItem.isSelected.value &&
        selectedIndices.value.some(selectedIndex => selectedIndex - index === 1)
    })

    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id)
      return !groupItem.isSelected.value &&
        selectedIndices.value.some(selectedIndex => selectedIndex - index === -1)
    })

    provide(VExpansionPanelSymbol, groupItem)

    useRender(() => {
      const hasText = !!(slots.text || props.text)
      const hasTitle = !!(slots.title || props.title)

      const expansionPanelTitleProps = VExpansionPanelTitle.filterProps(props)
      const expansionPanelTextProps = VExpansionPanelText.filterProps(props)

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
            props.class,
          ]}
          style={[
            backgroundColorStyles.value,
            props.style,
          ]}
        >
          <div
            class={[
              'v-expansion-panel__shadow',
              ...elevationClasses.value,
            ]}
          />

          <VDefaultsProvider
            defaults={{
              VExpansionPanelTitle: {
                ...expansionPanelTitleProps,
              },
              VExpansionPanelText: {
                ...expansionPanelTextProps,
              },
            }}
          >
            { hasTitle && (
              <VExpansionPanelTitle key="title">
                { slots.title ? slots.title() : props.title }
              </VExpansionPanelTitle>
            )}

            { hasText && (
              <VExpansionPanelText key="text">
                { slots.text ? slots.text() : props.text }
              </VExpansionPanelText>
            )}

            { slots.default?.() }
          </VDefaultsProvider>
        </props.tag>
      )
    })

    return {
      groupItem,
    }
  },
})

export type VExpansionPanel = InstanceType<typeof VExpansionPanel>
