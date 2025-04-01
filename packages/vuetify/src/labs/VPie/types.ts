export interface PieItem {
  key: string | number | symbol
  color: string
  value: number
  title: string
  pattern?: string
}

export type TextTemplate<T = any> = string | ((v: PieItem) => string)
