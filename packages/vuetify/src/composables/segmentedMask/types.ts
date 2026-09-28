export type SegmentParts = Record<string, string>

export type ValueSegment = {
  type: 'value'
  key: string
  size: number
  max?: number
  min?: number
  softMax?: (parts: SegmentParts) => number
  close?: (digits: string) => string
}

export type SeparatorSegment = {
  type: 'separator'
  value: string
}

export type Segment = ValueSegment | SeparatorSegment

export type MaskResult = {
  value: string
  index: number
  closed: boolean
  caret: number // -1 when it sits past the end
  width: number // how much of the format the value covers, empty sections included
  gaps: boolean // an empty section before another with digits, held open by the separator
  complete: boolean // every value section got its digits
}

export type MaskEditResult = Pick<MaskResult, 'value' | 'caret' | 'width' | 'gaps' | 'complete'>

export type MaskEdit = (value: string, caret?: number, inPlace?: boolean) => MaskEditResult
