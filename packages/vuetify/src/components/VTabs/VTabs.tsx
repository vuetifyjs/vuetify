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
import { makeGroupProps, useGroup } from '@/composables/group'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, toRef } from 'vue'
import { convertToUnit, genericComponent, isObject, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { VTabsSymbol } from './shared'

export type TabItem = string | number | Record<string, any>

export type VTabsSlots = {
  default: never
  header: never
  'header-item': never
  item: TabItem
  window: never
} & {
  [key: `header-item.${string}`]: never
  [key: `item.${string}`]: TabItem
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

  ...makeVSlideGroupProps({ mandatory: 'force' as const }),
  ...makeDensityProps(),
  ...makeGroupProps({
    mandatory: 'force' as const,
    selectedClass: 'v-tab-item--selected',
  }),
  ...makeTagProps(),
}, 'VTabs')

export const VTabs = genericComponent<VTabsSlots>()({
  name: 'VTabs',

  props: makeVTabsProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const { items: _items } = useGroup(props, VTabsSymbol)
    const items = computed(() => parseItems(props.items))
    const { densityClasses } = useDensity(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'bgColor'))

    provideDefaults({
      VTab: {
        color: toRef(props, 'color'),
        direction: toRef(props, 'direction'),
        stacked: toRef(props, 'stacked'),
        fixed: toRef(props, 'fixedTabs'),
        sliderColor: toRef(props, 'sliderColor'),
        hideSlider: toRef(props, 'hideSlider'),
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
          >
            { slots.header?.() ?? slots.default?.() ?? items.value.map(item => (
              slots[`header-item.${item.value}`]?.() ?? slots['header-item']?.() ?? (
                  <VTab
                    { ...item }
                    key={ item.text }
                    value={ item.value }
                  />
              )
            ))
            }
          </VSlideGroup>

          { !hasWindow && slots.default?.() }

          { hasWindow && (
            <VTabsWindow
              v-model={ model.value }
              key="tabs-window"
            >
              { items.value.map(item => (
                <VTabsWindowItem
                  value={ item.value }
                  v-slots={{
                    default: () => slots[`item.${item.value}`]?.(item) ?? slots.item?.(item),
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
