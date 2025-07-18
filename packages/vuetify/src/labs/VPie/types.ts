export interface PieItem {
  key: string | number | symbol
  color: string
  value: number
  title: string
  pattern?: string
  raw?: Record<string, any>
}

export interface PieSegmentProps {
  gap?: number | string
  hoverScale?: number | string
  innerCut?: number | string
  rounded?: number | string
  value: number
}

export type TextTemplate = string | ((v: PieItem) => string)
