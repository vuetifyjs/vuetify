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
import { computed, ref, toRef, watch } from 'vue'

// Types
import type { InjectionKey, PropType } from 'vue'
import { provideDefaults } from '@/composables/defaults'
import type { GroupProvide } from '@/composables/group'
import { makeGroupProps, useGroup } from '@/composables/group'
import { useResizeObserver } from '@/composables/resizeObserver'
import { useSlideGroup } from '@/composables/slideGroup'

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
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },
    ...makeTagProps(),
    ...makeGroupProps({
      mandatory: 'force' as const,
    }),
    //     alignWithTitle: Boolean,
    //     backgroundColor: String,
    centerActive: Boolean,
    //     centered: Boolean,
    fixedTabs: Boolean,
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
    const parsedItems = computed(() => parseItems(props.items))
    const {
      containerRef,
      containerListeners,
      contentRef,
      contentStyles,
      items,
      selected,
    } = useSlideGroup(props, VTabsSymbol)

    provideDefaults({
      VTab: {
        stacked: toRef(props, 'stacked'),
        color: toRef(props, 'color'),
        fixed: toRef(props, 'fixedTabs'),
      },
    })

    const sliderStyles = ref({})

    function updateSliderStyles (el: HTMLElement) {
      if (!selected.value.length) return

      const index = items.value.findIndex(item => item.id === selected.value[0])

      if (index < 0 || !el) return

      const selectedElement = el.querySelectorAll('.v-tab')[index] as HTMLElement

      if (props.direction === 'horizontal') {
        sliderStyles.value = {
          left: convertToUnit(selectedElement.offsetLeft),
          width: convertToUnit(selectedElement.offsetWidth),
        }
      } else {
        sliderStyles.value = {
          top: convertToUnit(selectedElement.offsetTop),
          height: convertToUnit(selectedElement.offsetHeight),
        }
      }
    }

    const { resizeRef } = useResizeObserver(entries => {
      if (!entries.length) return

      updateSliderStyles(entries[0].target as HTMLElement)
    })

    watch(selected, () => resizeRef.value && updateSliderStyles(resizeRef.value as HTMLElement), {
      flush: 'post',
    })

    return () => (
      <props.tag
        ref={ resizeRef }
        class={[
          'v-tabs',
          `v-tabs--${props.direction}`,
        ]}
        role="tablist"
      >
        <div
          ref={ containerRef }
          class="v-tabs__container"
          { ...containerListeners }
        >
          <div
            ref={ contentRef }
            class="v-tabs__content"
            style={ contentStyles.value }
          >
            { slots.default ? slots.default() : parsedItems.value.map(item => (
              <VTab { ...item } key={ item.text } />
            )) }
            <VTabsSlider
              style={ sliderStyles.value }
              color={ props.color }
            />
          </div>
        </div>
      </props.tag>
    )
  },
})
