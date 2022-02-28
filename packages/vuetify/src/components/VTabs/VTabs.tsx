// Styles
import './VTabs.sass'

// Components
import { VTab } from './VTab'
import { VSlideGroup } from '@/components/VSlideGroup'

// Composables
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeGroupProps } from '@/composables/group'
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

    ...makeDensityProps(),
    ...makeTagProps(),
    //     backgroundColor: String,
    //     centered: Boolean,
    //     grow: Boolean,
    //     height: {
    //       type: [Number, String],
    //       default: undefined,
    //     },
    //     hideSlider: Boolean,
    //     iconsAndText: Boolean,
    //     mobileBreakpoint: [String, Number],
    //     nextIcon: {
    //       type: String,
    //       default: '$next',
    //     },
    //     optional: Boolean,
    //     prevIcon: {
    //       type: String,
    //       default: '$prev',
    //     },
    //     right: Boolean,
    //     showArrows: [Boolean, String],
    //     sliderColor: String,
    //     sliderSize: {
    //       type: [Number, String],
    //       default: 2,
    //     },
  },

  setup (props, { slots, attrs }) {
    const parsedItems = computed(() => parseItems(props.items))
    const { densityClasses } = useDensity(props)

    provideDefaults({
      VTab: {
        stacked: toRef(props, 'stacked'),
        color: toRef(props, 'color'),
        fixed: toRef(props, 'fixedTabs'),
      },
    })

    return () => (
      <VSlideGroup
        class={[
          'v-tabs',
          `v-tabs--${props.direction}`,
          {
            'v-tabs--align-with-title': props.alignWithTitle,
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
