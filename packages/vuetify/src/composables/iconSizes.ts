// Utilities
import { computed } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { ComputedGetter, PropType } from 'vue'
import type { VIconBtnSizes } from '@/labs/VIconBtn/VIconBtn'

// Types
export interface IconSizeProps {
  iconSize?: VIconBtnSizes | number | string
  iconSizes: [VIconBtnSizes, number][]
}

// Composables
export const makeIconSizeProps = propsFactory({
  iconSize: [Number, String] as PropType<VIconBtnSizes | number | string>,
  iconSizes: {
    type: Array as PropType<[VIconBtnSizes, number][]>,
    default: () => ([
      ['x-small', 10],
      ['small', 16],
      ['default', 24],
      ['large', 28],
      ['x-large', 32],
    ]),
  },
}, 'iconSize')

export function useIconSizes (props: IconSizeProps, fallback: ComputedGetter<VIconBtnSizes | number | string | undefined>) {
  const iconSize = computed(() => {
    const iconSizeMap = new Map(props.iconSizes)
    const _iconSize = props.iconSize as VIconBtnSizes ?? fallback() ?? 'default'
    return iconSizeMap.has(_iconSize)
      ? iconSizeMap.get(_iconSize)
      : _iconSize
  })

  return { iconSize }
}
