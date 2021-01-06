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

export type DimensionKey = keyof DimensionProps
export type DimensionStyles = Partial<Record<DimensionKey, string>>

export const makeDimensionProps = propsFactory({
  height: { type: [Number, String] },
  maxHeight: { type: [Number, String] },
  maxWidth: { type: [Number, String] },
  minHeight: { type: [Number, String] },
  minWidth: { type: [Number, String] },
  width: { type: [Number, String] },
})

export function useDimension (props: DimensionProps) {
  const dimensionStyles = computed(() => {
    const styles: DimensionStyles = {}
    const height = convertToUnit(props.height)
    const minHeight = convertToUnit(props.minHeight)
    const maxHeight = convertToUnit(props.maxHeight)
    const width = convertToUnit(props.width)
    const minWidth = convertToUnit(props.minWidth)
    const maxWidth = convertToUnit(props.maxWidth)

    if (height) styles.height = height
    if (minHeight) styles.minHeight = minHeight
    if (maxHeight) styles.maxHeight = maxHeight
    if (width) styles.width = width
    if (minWidth) styles.minWidth = minWidth
    if (maxWidth) styles.maxWidth = maxWidth

    return styles
  })

  return { dimensionStyles }
}
