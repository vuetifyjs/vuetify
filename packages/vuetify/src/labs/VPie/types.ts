export interface PieItem {
  key: string | number | symbol
  color: string
  value: number
  title: string
  pattern?: string
  raw?: Record<string, any>
}

export interface PieSegmentProps {
  value: number
  gap: number
  innerCut: number
  rounded: number
  zoom?: number
}

export type TextTemplate<T = any> = string | ((v: PieItem) => string)
