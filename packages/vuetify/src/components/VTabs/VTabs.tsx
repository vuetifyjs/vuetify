// Styles
import './VTabs.sass'

// Components
import { VTab } from './VTab'
import { VSlideGroup } from '@/components/VSlideGroup'

// Composables
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { InjectionKey, PropType } from 'vue'
import type { GroupProvide } from '@/composables/group'

export type TabItem = string | Record<string, any>

function parseItems (items: TabItem[] | undefined) {
  if (!items) return []

  return items.map(item => {
    if (typeof item === 'string') return { title: item, value: item }

    return item
  })
}

export const VTabsSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-tabs')

export const VTabs = defineComponent({
  name: 'VTabs',

  props: {
    alignWithTitle: Boolean,
    centerActive: Boolean,
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
    right: Boolean,
    sliderColor: String,

    ...makeDensityProps(),
    ...makeTagProps(),
  },

  setup (props, { slots, attrs }) {
    const parsedItems = computed(() => parseItems(props.items))
    const { densityClasses } = useDensity(props)

    provideDefaults({
      VTab: {
        stacked: toRef(props, 'stacked'),
        color: toRef(props, 'color'),
        fixed: toRef(props, 'fixedTabs'),
        sliderColor: toRef(props, 'sliderColor'),
      },
    })

    return () => (
      <VSlideGroup
        class={[
          'v-tabs',
          `v-tabs--${props.direction}`,
          {
            'v-tabs--align-with-title': props.alignWithTitle,
            'v-tabs--centered': props.centered,
            'v-tabs--grow': props.grow,
            'v-tabs--right': props.right,
          },
          densityClasses.value,
        ]}
        role="tablist"
        symbol={ VTabsSymbol }
        mandatory="force"
        { ...attrs }
      >
        { slots.default ? slots.default() : parsedItems.value.map(item => (
          <VTab { ...item } key={ item.title } />
        )) }
      </VSlideGroup>
    )
  },
})

export type VTabs = InstanceType<typeof VTabs>
