// Styles
import './VTabs.sass'

// Components
import { VTab } from './VTab'
import { makeVSlideGroupProps, VSlideGroup } from '@/components/VSlideGroup/VSlideGroup'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, toRef } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { VTabsSymbol } from './shared'

export type TabItem = string | Record<string, any>

function parseItems (items: readonly TabItem[] | undefined) {
  if (!items) return []

  return items.map(item => {
    if (typeof item === 'string') return { title: item, value: item }

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
  ...makeTagProps(),
}, 'v-tabs')

export const VTabs = genericComponent()({
  name: 'VTabs',

  props: makeVTabsProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const parsedItems = computed(() => parseItems(props.items))
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
      const [slideGroupProps] = VSlideGroup.filterProps(props)

      return (
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
        >
          { slots.default ? slots.default() : parsedItems.value.map(item => (
            <VTab { ...item } key={ item.title } />
          ))}
        </VSlideGroup>
      )
    })

    return {}
  },
})

export type VTabs = InstanceType<typeof VTabs>
