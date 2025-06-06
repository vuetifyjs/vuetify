// Components
import { VAvatar } from '@/components/VAvatar'
import { VListItem } from '@/components/VList/VListItem'
import { VTooltip } from '@/components/VTooltip/VTooltip'

// Composables
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { formatTextTemplate } from './utils'
import { genericComponent, getCurrentInstance, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { PieItem, TextTemplate } from './types'

export type VPieTooltipSlots = {
  default: { segment: PieItem }
}

export const makeVPieTooltipProps = propsFactory({
  modelValue: Boolean,
  item: {
    type: Object as PropType<PieItem | null>,
    default: null,
  },
  titleFormat: {
    type: [String, Function] as PropType<TextTemplate>,
    default: '[title]',
  },
  subtitleFormat: {
    type: [String, Function] as PropType<TextTemplate>,
    default: '[value]',
  },
  ...makeTransitionProps(),
}, 'VPieTooltip')

export const VPieTooltip = genericComponent<VPieTooltipSlots>()({
  name: 'VPieTooltip',

  props: makeVPieTooltipProps(),

  setup (props, { slots }) {
    const target = shallowRef<[x: number, y: number]>([0, 0])
    const vm = getCurrentInstance('VPieTooltip')

    let frame = -1
    function onMouseMove ({ clientX, clientY }: MouseEvent) {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        target.value = [clientX, clientY]
      })
    }

    onMounted(() => {
      vm.proxy!.$el.parentNode.addEventListener('mousemove', onMouseMove)
    })

    onBeforeUnmount(() => {
      vm.proxy!.$el.parentNode.removeEventListener('mousemove', onMouseMove)
    })

    const tooltipTitleFormatFunction = computed(() => (segment: PieItem) => {
      return typeof props.titleFormat === 'function'
        ? props.titleFormat(segment)
        : formatTextTemplate(props.titleFormat, segment)
    })

    const tooltipSubtitleFormatFunction = computed(() => (segment: PieItem) => {
      return typeof props.subtitleFormat === 'function'
        ? props.subtitleFormat(segment)
        : formatTextTemplate(props.subtitleFormat, segment)
    })

    return () => (
      <VTooltip
        absolute={ false }
        offset={ 16 }
        model-value={ props.modelValue }
        target={ target.value }
        content-class="v-pie__tooltip-content"
      >
        { !!props.item && (
          slots.default?.({ segment: props.item }) ?? (
            <MaybeTransition transition={ props.transition } mode="out-in">
              <VListItem
                key={ props.item.key }
                class="px-0"
                density="compact"
                style="zoom: 0.88"
                title={ tooltipTitleFormatFunction.value(props.item) }
                subtitle={ tooltipSubtitleFormatFunction.value(props.item) }
                v-slots={{
                  prepend: () => (
                    <VAvatar
                      color={ props.item!.color }
                      size="28"
                      border="thin opacity-25"
                    >
                      { !!props.item!.pattern && (
                        <svg height="40" width="40">
                          <circle r="40" fill={ props.item!.pattern } />
                        </svg>
                      )}
                    </VAvatar>
                  ),
                }}
              />
            </MaybeTransition>
          )
        )}
      </VTooltip>
    )
  },
})

export type VPieTooltip = InstanceType<typeof VPieTooltip>
