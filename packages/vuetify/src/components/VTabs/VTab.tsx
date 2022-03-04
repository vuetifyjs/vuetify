// Styles
import './VTab.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VTabsSymbol } from './VTabs'

// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { makeRouterProps } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps } from '@/composables/theme'
import { provideDefaults } from '@/composables/defaults'
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, ref, toRef, watch } from 'vue'
import { defineComponent, pick, standardEasing, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const VTab = defineComponent({
  name: 'VTab',

  props: {
    fixed: Boolean,
    icon: [Boolean, String],
    prependIcon: String,
    appendIcon: String,

    stacked: Boolean,
    title: String,

    ripple: {
      type: Boolean,
      default: true,
    },
    color: String,
    sliderColor: String,
    hideSlider: Boolean,

    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
    },

    ...makeTagProps(),
    ...makeRouterProps(),
    ...makeGroupItemProps({
      selectedClass: 'v-tab--selected',
    }),
    ...makeThemeProps(),
  },

  setup (props, { slots, attrs }) {
    const { isSelected, select, selectedClass } = useGroupItem(props, VTabsSymbol)
    const { textColorClasses: sliderColorClasses, textColorStyles: sliderColorStyles } = useTextColor(props, 'sliderColor')
    const isHorizontal = computed(() => props.direction === 'horizontal')

    provideDefaults({
      VBtn: {
        block: toRef(props, 'fixed'),
        color: computed(() => isSelected.value ? props.color : undefined),
        variant: 'text',
      },
    }, {
      scoped: true,
    })

    const rootEl = ref<VBtn>()
    const sliderEl = ref<HTMLElement>()
    watch(isSelected, isSelected => {
      if (isSelected) {
        const prevEl: HTMLElement | undefined = rootEl.value?.$el.parentElement?.querySelector('.v-tab--selected .v-tab__slider')
        const nextEl = sliderEl.value

        if (!prevEl || !nextEl) return

        const color = getComputedStyle(prevEl).color

        const prevBox = prevEl.getBoundingClientRect()
        const nextBox = nextEl.getBoundingClientRect()

        const xy = isHorizontal.value ? 'x' : 'y'
        const XY = isHorizontal.value ? 'X' : 'Y'
        const rightBottom = isHorizontal.value ? 'right' : 'bottom'
        const widthHeight = isHorizontal.value ? 'width' : 'height'

        const prevPos = prevBox[xy]
        const nextPos = nextBox[xy]
        const delta = prevPos > nextPos
          ? prevBox[rightBottom] - nextBox[rightBottom]
          : prevBox[xy] - nextBox[xy]
        const origin =
          Math.sign(delta) > 0 ? (isHorizontal.value ? 'right' : 'bottom')
          : Math.sign(delta) < 0 ? (isHorizontal.value ? 'left' : 'top')
          : 'center'
        const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight])
        const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight])
        const initialScale = prevBox[widthHeight] / nextBox[widthHeight]

        const sigma = 1.5
        nextEl.animate({
          backgroundColor: [color, ''],
          transform: [
            `translate${XY}(${delta}px) scale${XY}(${initialScale})`,
            `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`,
            '',
          ],
          transformOrigin: Array(3).fill(origin),
        }, {
          duration: 225,
          easing: standardEasing,
        })
      }
    })

    useRender(() => {
      const [btnProps] = pick(props, [
        'href',
        'to',
        'replace',
        'icon',
        'stacked',
        'prependIcon',
        'appendIcon',
        'ripple',
        'theme',
        'disabled',
      ])

      return (
        <VBtn
          ref={ rootEl }
          class={[
            'v-tab',
            selectedClass.value,
          ]}
          tabindex={ isSelected.value ? 0 : -1 }
          role="tab"
          aria-selected={ String(isSelected.value) }
          onClick={ () => !props.disabled && select(!isSelected.value) }
          { ...btnProps }
          { ...attrs }
        >
          { slots.default ? slots.default() : props.title }
          { !props.hideSlider && (
            <div
              ref={ sliderEl }
              class={[
                'v-tab__slider',
                sliderColorClasses.value,
              ]}
              style={ sliderColorStyles.value }
            />
          ) }
        </VBtn>
      )
    })

    return {
      isSelected,
    }
  },
})

export type VTab = InstanceType<typeof VTab>
