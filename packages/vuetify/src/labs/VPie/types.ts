// Types
import type { PieItem, TextTemplate } from './types.types'

export type { PieItem, TextTemplate }

export interface PieSegmentProps {
  gap?: number | string
  hoverScale?: number | string
  innerCut?: number | string
  rounded?: number | string
  value: number
}
