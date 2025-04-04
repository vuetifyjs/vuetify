// Styles
import './VTabs.sass'

// Components
import { VTab } from './VTab'
import { VTabsWindow } from './VTabsWindow'
import { VTabsWindowItem } from './VTabsWindowItem'
import { makeVSlideGroupProps, VSlideGroup } from '@/components/VSlideGroup/VSlideGroup'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, toRef } from 'vue'
import { VTabsSymbol } from './shared'
import { convertToUnit, genericComponent, isObject, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { GenericProps } from '@/util'

export type TabItem = string | number | Record<string, any>

export type VTabsSlot<T> = {
  item: T
}

export type VTabsSlots<T> = {
  default: never
  tab: VTabsSlot<T>
  item: VTabsSlot<T>
  window: never
} & {
  [key: `tab.${string}`]: VTabsSlot<T>
  [key: `item.${string}`]: VTabsSlot<T>
}

function parseItems (items: readonly TabItem[] | undefined) {
  if (!items) return []

  return items.map(item => {
    if (!isObject(item)) return { text: item, value: item }

    return item
  })
}

export const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String as PropType<'start' | 'title' | 'center' | 'end'>,
    default: 'start',
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array as PropType<readonly TabItem[]>,
    default: () => ([]),
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: undefined,
  },
  hideSlider: Boolean,
  sliderColor: String,

  ...makeVSlideGroupProps({
    mandatory: 'force' as const,
    selectedClass: 'v-tab-item--selected',
  }),
  ...makeDensityProps(),
  ...makeTagProps(),
}, 'VTabs')

export const VTabs = genericComponent<new <T = TabItem>(
  props: {
    items?: T[]
  },
  slots: VTabsSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VTabs',

  props: makeVTabsProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { attrs, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const items = computed(() => parseItems(props.items))
    const { densityClasses } = useDensity(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.bgColor)
    const { scopeId } = useScopeId()

    provideDefaults({
      VTab: {
        color: toRef(() => props.color),
        direction: toRef(() => props.direction),
        stacked: toRef(() => props.stacked),
        fixed: toRef(() => props.fixedTabs),
        sliderColor: toRef(() => props.sliderColor),
        hideSlider: toRef(() => props.hideSlider),
      },
    })

    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props)
      const hasWindow = !!(slots.window || props.items.length > 0)

      return (
        <>
          <VSlideGroup
            { ...slideGroupProps }
            v-model={ model.value }
            class={[
              'v-tabs',
              `v-tabs--${props.direction}`,
              `v-tabs--align-tabs-${props.alignTabs}`,
              {
                'v-tabs--fixed-tabs': props.fixedTabs,
                'v-tabs--grow': props.grow,
                'v-tabs--stacked': props.stacked,
              },
              densityClasses.value,
              backgroundColorClasses.value,
              props.class,
            ]}
            style={[
              { '--v-tabs-height': convertToUnit(props.height) },
              backgroundColorStyles.value,
              props.style,
            ]}
            role="tablist"
            symbol={ VTabsSymbol }
            { ...scopeId }
            { ...attrs }
          >
            { slots.default?.() ?? items.value.map(item => (
              slots.tab?.({ item }) ?? (
                <VTab
                  { ...item }
                  key={ item.text }
                  value={ item.value }
                  v-slots={{
                    default: slots[`tab.${item.value}`] ? () => slots[`tab.${item.value}`]?.({ item }) : undefined,
                  }}
                />
              )
            ))}
          </VSlideGroup>

          { hasWindow && (
            <VTabsWindow
              v-model={ model.value }
              key="tabs-window"
              { ...scopeId }
            >
              { items.value.map(item => slots.item?.({ item }) ?? (
                <VTabsWindowItem
                  value={ item.value }
                  v-slots={{
                    default: () => slots[`item.${item.value}`]?.({ item }),
                  }}
                />
              ))}

              { slots.window?.() }
            </VTabsWindow>
          )}
        </>
      )
    })

    return {}
  },
})

export type VTabs = InstanceType<typeof VTabs>
