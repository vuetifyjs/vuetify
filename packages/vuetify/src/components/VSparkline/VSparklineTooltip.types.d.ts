// Types
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VSparklineTooltipSlots = {
  default: { index: number, value: number }
}

export interface VSparklineTooltipProps {
  contentClass?: any
  index?: number | null
  location?: Anchor
  modelValue?: boolean
  offset?: number
  target?: [number, number]
  titleFormat?: ((item: { index: number, value: number }) => string)
  value?: number
}

type VSparklineTooltipDefaultKeys =
  | 'index'
  | 'modelValue'
  | 'titleFormat'
  | 'value'

export declare const VSparklineTooltip: VuetifyComponent<
  VSparklineTooltipProps,
  VSparklineTooltipDefaultKeys,
  {
    afterLeave: () => true
  },
  VSparklineTooltipSlots
>
export type VSparklineTooltip = InstanceType<typeof VSparklineTooltip>

export {}
