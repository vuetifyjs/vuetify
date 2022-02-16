// Styles
import './VTabs.sass'

// Components
import { VTab } from './VTab'
import { VTabsSlider } from './VTabsSlider'

// Directives
import Resize from '../../directives/resize'

// Utilities
import { convertToUnit } from '../../util/helpers'
import { defineComponent } from '@/util'
import { makeTagProps } from '@/composables/tag'
import { computed, ref, toRef, watchEffect } from 'vue'

// Types
import type { InjectionKey, PropType } from 'vue'
import { provideDefaults } from '@/composables/defaults'
import type { GroupProvide } from '@/composables/group'
import { makeGroupProps, useGroup } from '@/composables/group'

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
    items: {
      type: Array as PropType<TabItem[]>,
      default: () => ([]),
    },
    stacked: Boolean,
    color: String,
    direction: {
      type: String,
      default: 'horizontal',
    },
    ...makeTagProps(),
    ...makeGroupProps({
      mandatory: 'force' as const,
    }),
    //     alignWithTitle: Boolean,
    //     backgroundColor: String,
    //     centerActive: Boolean,
    //     centered: Boolean,
    //     fixedTabs: Boolean,
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

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const rootRef = ref<HTMLElement | undefined>()
    const items = computed(() => parseItems(props.items))
    const group = useGroup(props, VTabsSymbol)

    provideDefaults({
      VTab: {
        stacked: toRef(props, 'stacked'),
        color: toRef(props, 'color'),
      },
    })

    const sliderStyles = ref({})

    watchEffect(() => {
      const index = group.items.value.findIndex(item => item.id === group.selected.value[0])

      if (index < 0 || !rootRef.value) return

      const el = rootRef.value.querySelectorAll('.v-tab')[index] as HTMLElement

      if (props.direction === 'horizontal') {
        sliderStyles.value = {
          left: convertToUnit(el.offsetLeft),
          width: convertToUnit(el.offsetWidth),
        }
      } else {
        sliderStyles.value = {
          top: convertToUnit(el.offsetTop),
          height: convertToUnit(el.offsetHeight),
        }
      }
    }, {
      flush: 'post',
    })

    return () => (
      <props.tag
        ref={ rootRef }
        class={[
          'v-tabs',
          `v-tabs--${props.direction}`,
        ]}
      >
        { slots.default ? slots.default() : items.value.map(item => (
          <VTab { ...item } key={ item.text } />
        )) }
        <VTabsSlider
          style={ sliderStyles.value }
          color={ props.color }
        />
      </props.tag>
    )
  },
})
