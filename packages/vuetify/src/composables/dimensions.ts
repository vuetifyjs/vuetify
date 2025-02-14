// Utilities
import { computed } from 'vue'
import { convertToUnit, propsFactory } from '@/util'

// Types
export interface DimensionProps {
  height?: number | string
  maxHeight?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  minWidth?: number | string
  width?: number | string
}

// Composables
export const makeDimensionProps = propsFactory({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String],
}, 'dimension')

export function useDimension (props: DimensionProps) {
  const dimensionStyles = computed(() => {
    const styles: Record<string, any> = {}

    const height = convertToUnit(props.height)
    const maxHeight = convertToUnit(props.maxHeight)
    const maxWidth = convertToUnit(props.maxWidth)
    const minHeight = convertToUnit(props.minHeight)
    const minWidth = convertToUnit(props.minWidth)
    const width = convertToUnit(props.width)

    if (height != null) styles.height = height
    if (maxHeight != null) styles.maxHeight = maxHeight
    if (maxWidth != null) styles.maxWidth = maxWidth
    if (minHeight != null) styles.minHeight = minHeight
    if (minWidth != null) styles.minWidth = minWidth
    if (width != null) styles.width = width

    return styles
  })

  return { dimensionStyles }
}
