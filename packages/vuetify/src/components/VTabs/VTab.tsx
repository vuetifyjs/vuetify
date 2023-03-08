// Styles
import './VTab.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { IconValue } from '@/composables/icons'
import { makeGroupItemProps } from '@/composables/group'
import { makeRouterProps } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps } from '@/composables/theme'
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, ref } from 'vue'
import { animate, genericComponent, pick, standardEasing, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { VTabsSymbol } from './shared'

export const VTab = genericComponent()({
  name: 'VTab',

  props: {
    fixed: Boolean,
    icon: [Boolean, String, Function, Object] as PropType<boolean | IconValue>,
    prependIcon: IconValue,
    appendIcon: IconValue,

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
    const { textColorClasses: sliderColorClasses, textColorStyles: sliderColorStyles } = useTextColor(props, 'sliderColor')
    const isHorizontal = computed(() => props.direction === 'horizontal')
    const isSelected = ref(false)

    const rootEl = ref<VBtn>()
    const sliderEl = ref<HTMLElement>()

    function updateSlider ({ value }: { value: boolean }) {
      isSelected.value = value

      if (value) {
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
        animate(nextEl, {
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
    }

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
        'selectedClass',
        'value',
        'color',
      ])

      return (
        <VBtn
          _as="VTab"
          symbol={ VTabsSymbol }
          ref={ rootEl }
          class={[
            'v-tab',
          ]}
          tabindex={ isSelected.value ? 0 : -1 }
          role="tab"
          aria-selected={ String(isSelected.value) }
          active={ false }
          block={ props.fixed }
          maxWidth={ props.fixed ? 300 : undefined }
          variant="text"
          rounded={ 0 }
          { ...btnProps }
          { ...attrs }
          onGroup:selected={ updateSlider }
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
          )}
        </VBtn>
      )
    })

    return {}
  },
})

export type VTab = InstanceType<typeof VTab>
