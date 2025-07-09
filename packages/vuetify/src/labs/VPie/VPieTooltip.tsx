// Components
import { VListItem } from '@/components/VList/VListItem'
import { makeVTooltipProps, VTooltip } from '@/components/VTooltip/VTooltip'

// Composables
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { onBeforeUnmount, onMounted, shallowRef, toRef } from 'vue'
import { formatTextTemplate } from './utils'
import { genericComponent, getCurrentInstance, pick, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { PieItem, TextTemplate } from './types'

export type VPieTooltipSlots = {
  default: { item: PieItem }
  prepend: { item: PieItem }
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
  ...pick(makeVTooltipProps(), ['offset']),
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

    const tooltipTitleFormatFunction = toRef(() => (segment: PieItem) => {
      return typeof props.titleFormat === 'function'
        ? props.titleFormat(segment)
        : formatTextTemplate(props.titleFormat, segment)
    })

    const tooltipSubtitleFormatFunction = toRef(() => (segment: PieItem) => {
      return typeof props.subtitleFormat === 'function'
        ? props.subtitleFormat(segment)
        : formatTextTemplate(props.subtitleFormat, segment)
    })

    return () => (
      <VTooltip
        offset={ props.offset }
        modelValue={ props.modelValue }
        target={ target.value }
        contentClass="v-pie__tooltip-content"
      >
        { !!props.item && (
          slots.default?.({ item: props.item }) ?? (
            <MaybeTransition transition={ props.transition } mode="out-in">
              <VListItem
                key={ props.item.key }
                density="compact"
                title={ tooltipTitleFormatFunction.value(props.item) }
                subtitle={ tooltipSubtitleFormatFunction.value(props.item) }
                v-slots={{
                  prepend: slots.prepend
                    ? () => slots.prepend!({ item: props.item! })
                    : undefined,
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
