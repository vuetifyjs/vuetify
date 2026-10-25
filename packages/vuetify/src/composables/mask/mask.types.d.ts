export interface MaskOptions {
  mask: string
  tokens: Record<string, MaskItem>
}

export type MaskItem = {
  convert?: (char: string) => string
} & ({
  pattern?: never
  test: (char: string) => boolean
} | {
  pattern: RegExp
  test?: never
})

export {}
