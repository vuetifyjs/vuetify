export interface VPieItem {
  id: any
  color: string
  value: number
  title: string
  pattern?: string
}

export type TextTemplate<T> = string | ((v: T) => string)