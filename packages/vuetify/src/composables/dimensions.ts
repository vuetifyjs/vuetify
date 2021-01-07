// Utilities
import { computed } from 'vue'
import { convertToUnit } from '@/util/helpers'
import propsFactory from '@/util/propsFactory'

// Types
export interface DimensionProps {
  height?: number | string
  maxHeight?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  minWidth?: number | string
  width?: number | string
}

type DimensionKey = keyof DimensionProps
type DimensionStyles = Partial<Record<DimensionKey, string>>

// Composables
export const makeDimensionProps = propsFactory({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String],
})

export function useDimension (props: DimensionProps) {
  const dimensionStyles = computed(() => {
    const styles: DimensionStyles = {}
    const height = convertToUnit(props.height)
    const maxHeight = convertToUnit(props.maxHeight)
    const maxWidth = convertToUnit(props.maxWidth)
    const minHeight = convertToUnit(props.minHeight)
    const minWidth = convertToUnit(props.minWidth)
    const width = convertToUnit(props.width)

    if (height) styles.height = height
    if (maxHeight) styles.maxHeight = maxHeight
    if (maxWidth) styles.maxWidth = maxWidth
    if (minHeight) styles.minHeight = minHeight
    if (minWidth) styles.minWidth = minWidth
    if (width) styles.width = width

    return styles
  })

  return { dimensionStyles }
}
