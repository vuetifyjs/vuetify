export type SegmentParts = Record<string, string>

export type ValueSegment = {
  type: 'value'
  key: string
  size: number
  max?: number
  // a section stays open while its value is below it, e.g. a month is never 0
  min?: number
  // narrower limit read from the other sections, capped afterwards when they come later
  softMax?: (parts: SegmentParts) => number
  // completes a short section once a separator closes it, zero padded afterwards
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
  // caret mapped into the masked value, -1 when it sits past the end
  caret: number
  // how much of the format the value covers, empty sections included
  width: number
  // an empty section is kept in place when a later one still holds digits
  gaps: boolean
  // every value section got its digits
  complete: boolean
}

export type MaskEditResult = Pick<MaskResult, 'value' | 'caret' | 'width' | 'gaps'> & {
  // nothing is left to type, every section the field still takes is filled
  complete: boolean
}

// an in place edit keeps the caret it was given, the mask only hands it on to what is typed next
export type MaskEdit = (value: string, caret?: number, inPlace?: boolean) => MaskEditResult
