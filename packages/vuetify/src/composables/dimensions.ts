// Utilities
import { computed } from 'vue'
import { convertToUnit, isNullOrUndefined, propsFactory } from '@/util'

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

    if (!isNullOrUndefined(height)) styles.height = height
    if (!isNullOrUndefined(maxHeight)) styles.maxHeight = maxHeight
    if (!isNullOrUndefined(maxWidth)) styles.maxWidth = maxWidth
    if (!isNullOrUndefined(minHeight)) styles.minHeight = minHeight
    if (!isNullOrUndefined(minWidth)) styles.minWidth = minWidth
    if (!isNullOrUndefined(width)) styles.width = width

    return styles
  })

  return { dimensionStyles }
}
