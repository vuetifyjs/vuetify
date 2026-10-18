export type {
  HintToken,
  MaskEdit,
  MaskEditResult,
  MaskResult,
  Segment,
  SegmentParts,
  SeparatorSegment,
  ValueSegment,
} from './types'

export {
  maskInput,
  maskSegmentsFrom,
  toMaskSource,
} from './segmentedMask'

export {
  hintToken,
  remainingHint,
  remainingTokens,
  rtlScript,
} from './formatHint'

export { createSegmentedEdit, overtype } from './edit'

export { dateSegments, timeSegments } from './presets'
