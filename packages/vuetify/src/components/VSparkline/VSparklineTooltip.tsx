// Components
import { VTooltip } from '@/components/VTooltip/VTooltip'

// Utilities
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { ClassValue } from '@/composables/component'
import type { Anchor } from '@/util'

export type VSparklineTooltipSlots = {
  default: { index: number, value: number }
}

export const makeVSparklineTooltipProps = propsFactory({
  modelValue: Boolean,
  target: Object as PropType<[number, number] | undefined>,
  index: {
    type: Number as PropType<number | null>,
    default: null,
  },
  value: {
    type: Number,
    default: 0,
  },
  titleFormat: {
    type: Function as PropType<(item: { index: number, value: number }) => string>,
    default: (item: { index: number, value: number }) => String(item.value),
  },
  offset: Number,
  contentClass: null as unknown as PropType<ClassValue>,
  location: String as PropType<Anchor>,
}, 'VSparklineTooltip')

export const VSparklineTooltip = genericComponent<VSparklineTooltipSlots>()({
  name: 'VSparklineTooltip',

  props: makeVSparklineTooltipProps(),

  emits: {
    afterLeave: () => true,
  },

  setup (props, { slots, emit }) {
    return () => (
      <VTooltip
        modelValue={ props.modelValue }
        target={ props.target }
        offset={ props.offset }
        contentClass={ props.contentClass }
        location={ props.location }
        onAfterLeave={ () => emit('afterLeave') }
      >
        { props.index !== null && (
          slots.default?.({ index: props.index, value: props.value }) ??
          props.titleFormat({ index: props.index, value: props.value })
        )}
      </VTooltip>
    )
  },
})

export type VSparklineTooltip = InstanceType<typeof VSparklineTooltip>
