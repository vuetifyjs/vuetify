// Styles
import './VTabs.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VSlideGroup } from '@/components/VSlideGroup'
import { VTab } from './VTab'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, toRef } from 'vue'
import { convertToUnit, genericComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { VTabsSymbol } from './shared'

export type TabItem = string | Record<string, any>

function parseItems (items: TabItem[] | undefined) {
  if (!items) return []

  return items.map(item => {
    if (typeof item === 'string') return { title: item, value: item }

    return item
  })
}

export const VTabs = genericComponent()({
  name: 'VTabs',

  props: {
    alignTabs: {
      type: String as PropType<'start' | 'title' | 'center' | 'end'>,
      default: 'start',
    },
    color: String,
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
    fixedTabs: Boolean,
    items: {
      type: Array as PropType<TabItem[]>,
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
    modelValue: null,
    mandatory: {
      type: [Boolean, String] as PropType<boolean | 'force'>,
      default: 'force',
    },

    ...makeDensityProps(),
    ...makeTagProps(),
  },

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const parsedItems = computed(() => parseItems(props.items))
    const { densityClasses } = useDensity(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'bgColor'))

    useRender(() => (
      <VSlideGroup
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
        ]}
        style={[
          { '--v-tabs-height': convertToUnit(props.height) },
          backgroundColorStyles.value,
        ]}
        role="tablist"
        symbol={ VTabsSymbol }
        mandatory={ props.mandatory }
        direction={ props.direction }
      >
        { !slots.default ? (
          parsedItems.value.map(item => (
            <VTab
              key={ item.title }
              color={ props.color }
              direction={ props.direction }
              fixed={ props.fixedTabs }
              hideSlider={ props.hideSlider }
              sliderColor={ props.sliderColor }
              stacked={ props.stacked }
              { ...item }
            />
          ))
        ) : (
          <VDefaultsProvider
            key="tabs-defaults"
            defaults={{
              VTab: {
                color: props.color,
                direction: props.direction,
                fixed: props.fixedTabs,
                hideSlider: props.hideSlider,
                sliderColor: props.sliderColor,
                stacked: props.stacked,
              },
            }}
            v-slots:default={ slots.default }
          />
        )}
      </VSlideGroup>
    ))

    return {}
  },
})

export type VTabs = InstanceType<typeof VTabs>
