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

export function useDimensionStyles (props: DimensionProps) {
  const dimensionStyles = computed(() => {
    const properties = Object.keys(props) as DimensionKey[]

    return properties.reduce((acc, cur) => {
      const value = props[cur]

      if (value != null) acc[cur] = convertToUnit(value)

      return acc
    }, {} as DimensionStyles)
  })

  return { dimensionStyles }
}
