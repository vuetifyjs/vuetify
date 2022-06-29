// Styles
import './VTabs.sass'

// Components
import { VSlideGroup } from '@/components/VSlideGroup'
import { VTab } from './VTab'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeTagProps } from '@/composables/tag'
import { provideDefaults } from '@/composables/defaults'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent, useRender } from '@/util'

// Types
import { VTabsSymbol } from './shared'
import type { PropType } from 'vue'

export type TabItem = string | Record<string, any>

function parseItems (items: TabItem[] | undefined) {
  if (!items) return []

  return items.map(item => {
    if (typeof item === 'string') return { title: item, value: item }

    return item
  })
}

export const VTabs = defineComponent({
  name: 'VTabs',

  props: {
    alignWithTitle: Boolean,
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
    backgroundColor: String,
    centered: Boolean,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: undefined,
    },
    hideSlider: Boolean,
    optional: Boolean,
    end: Boolean,
    sliderColor: String,
    modelValue: null,

    ...makeDensityProps(),
    ...makeTagProps(),
  },

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots, emit }) {
    const parsedItems = computed(() => parseItems(props.items))
    const { densityClasses } = useDensity(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'backgroundColor'))

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

    useRender(() => (
      <VSlideGroup
        class={[
          'v-tabs',
          `v-tabs--${props.direction}`,
          {
            'v-tabs--align-with-title': props.alignWithTitle,
            'v-tabs--centered': props.centered,
            'v-tabs--fixed-tabs': props.fixedTabs,
            'v-tabs--grow': props.grow,
            'v-tabs--end': props.end,
            'v-tabs--stacked': props.stacked,
          },
          densityClasses.value,
          backgroundColorClasses.value,
        ]}
        style={backgroundColorStyles.value}
        role="tablist"
        symbol={ VTabsSymbol }
        mandatory="force"
        direction={ props.direction }
        modelValue={ props.modelValue }
        onUpdate:modelValue={ v => emit('update:modelValue', v) }
      >
        { slots.default ? slots.default() : parsedItems.value.map(item => (
          <VTab { ...item } key={ item.title } />
        )) }
      </VSlideGroup>
    ))

    return {}
  },
})

export type VTabs = InstanceType<typeof VTabs>
