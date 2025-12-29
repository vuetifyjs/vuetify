// Components
import { VListItem } from '@/components/VList/VListItem'
import { makeVTooltipProps, VTooltip } from '@/components/VTooltip/VTooltip'

// Composables
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { toRef } from 'vue'
import { formatTextTemplate } from './utils'
import { genericComponent, pick, propsFactory, renderSlot } from '@/util'

// Types
import type { PropType } from 'vue'
import type { PieItem, TextTemplate } from './types'

export type VPieTooltipSlots = {
  default: { item: PieItem }
  prepend: { item: PieItem }
}

export const makeVPieTooltipProps = propsFactory({
  modelValue: Boolean,
  target: Object as PropType<[x: number, y: number]>,
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
        target={ props.target }
        contentClass="v-pie__tooltip-content"
      >
        { props.item ? (
          renderSlot(slots.default, { item: props.item }, ({ item }) => (
            <MaybeTransition transition={ props.transition } mode="out-in">
              <VListItem
                key={ item.key }
                density="compact"
                title={ tooltipTitleFormatFunction.value(item) }
                subtitle={ tooltipSubtitleFormatFunction.value(item) }
                v-slots={{
                  prepend: slots.prepend
                    ? () => slots.prepend!({ item })
                    : undefined,
                }}
              />
            </MaybeTransition>
          ))
        ) : undefined }
      </VTooltip>
    )
  },
})

export type VPieTooltip = InstanceType<typeof VPieTooltip>
