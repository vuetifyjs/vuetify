export type TextTemplate = string | ((v: PieItem) => string)

export interface PieItem {
  key: string | number | symbol
  color: string
  value: number
  title: string
  pattern?: string
  isActive: boolean
  raw?: Record<string, any>
}
