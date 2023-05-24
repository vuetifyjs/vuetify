// Styles
import './VTab.sass'

// Components
import { makeVBtnProps, VBtn } from '@/components/VBtn/VBtn'

// Composables
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, ref, shallowRef } from 'vue'
import { VTabsSymbol } from './shared'
import { animate, genericComponent, omit, propsFactory, standardEasing, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVTabProps = propsFactory({
  fixed: Boolean,

  sliderColor: String,
  hideSlider: Boolean,

  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },

  ...omit(makeVBtnProps({
    selectedClass: 'v-tab--selected',
    variant: 'text' as const,
  }), [
    'active',
    'block',
    'flat',
    'location',
    'position',
    'symbol',
  ]),
}, 'v-tabs')

export const VTab = genericComponent()({
  name: 'VTab',

  props: makeVTabProps(),

  setup (props, { slots, attrs }) {
    const { textColorClasses: sliderColorClasses, textColorStyles: sliderColorStyles } = useTextColor(props, 'sliderColor')
    const isHorizontal = computed(() => props.direction === 'horizontal')
    const isSelected = shallowRef(false)

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
      const [btnProps] = VBtn.filterProps(props)

      return (
        <VBtn
          symbol={ VTabsSymbol }
          ref={ rootEl }
          class={[
            'v-tab',
            props.class,
          ]}
          style={ props.style }
          tabindex={ isSelected.value ? 0 : -1 }
          role="tab"
          aria-selected={ String(isSelected.value) }
          active={ false }
          block={ props.fixed }
          maxWidth={ props.fixed ? 300 : undefined }
          rounded={ 0 }
          { ...btnProps }
          { ...attrs }
          onGroup:selected={ updateSlider }
        >
          { slots.default?.() ?? props.text }

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
