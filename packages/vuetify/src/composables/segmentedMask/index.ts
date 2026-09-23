export type {
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

export { remainingHint } from './formatHint'

export { createSegmentedEdit, overtype } from './edit'

export { dateSegments, dateTimeSegments, timeSegments } from './presets'
