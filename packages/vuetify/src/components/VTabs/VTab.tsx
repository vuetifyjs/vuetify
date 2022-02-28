import './VTab.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VTabsSymbol } from './VTabs'

// Composables
import { useTextColor } from '@/composables/color'
import { provideDefaults } from '@/composables/defaults'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { makeRouterProps } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps } from '@/composables/theme'

// Utilities
import { computed, ref, toRef, watch } from 'vue'
import { defineComponent, pick, standardEasing, useRender } from '@/util'

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

    provideDefaults({
      VBtn: {
        block: toRef(props, 'fixed'),
        color: computed(() => isSelected.value ? props.color : undefined),
        height: 'auto',
        maxWidth: 360,
        minWidth: 90,
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

        const delta = prevBox.x - nextBox.x
        const origin =
          Math.sign(delta) > 0 ? 'right'
          : Math.sign(delta) < 0 ? 'left'
          : 'center'
        const width = Math.abs(delta) + (origin === 'left' ? prevBox.width : nextBox.width)
        const scale = width / nextBox.width

        const sigma = 1.5
        nextEl.animate({
          backgroundColor: [color, ''],
          transform: [`translateX(${delta}px)`, `translateX(${delta / sigma}px) scaleX(${(scale - 1) / sigma + 1})`, ''],
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
          onClick={ () => !props.disabled && select(!isSelected.value) }
          { ...btnProps }
          { ...attrs }
        >
          { slots.default ? slots.default() : props.title }
          <div
            ref={ sliderEl }
            class={[
              'v-tab__slider',
              sliderColorClasses.value,
            ]}
            style={ sliderColorStyles.value }
          />
        </VBtn>
      )
    })

    return {
      isSelected,
    }
  },
})

export type VTab = InstanceType<typeof VTab>
