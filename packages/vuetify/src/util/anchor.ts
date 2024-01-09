// Utilities
import { includes } from '@/util/helpers'

const block = ['top', 'bottom'] as const
const inline = ['start', 'end', 'left', 'right'] as const
type Tblock = typeof block[number]
type Tinline = typeof inline[number]
export type Anchor =
  | Tblock
  | Tinline
  | 'center'
  | 'center center'
  | `${Tblock} ${Tinline | 'center'}`
  | `${Tinline} ${Tblock | 'center'}`
export type ParsedAnchor =
  | { side: 'center', align: 'center' }
  | { side: Tblock, align: 'left' | 'right' | 'center' }
  | { side: 'left' | 'right', align: Tblock | 'center' }

/** Parse a raw anchor string into an object */
export function parseAnchor (anchor: Anchor, isRtl: boolean) {
  let [side, align] = anchor.split(' ') as [Tblock | Tinline | 'center', Tblock | Tinline | 'center' | undefined]
  if (!align) {
    align =
      includes(block, side) ? 'start'
      : includes(inline, side) ? 'top'
      : 'center'
  }

  return {
    side: toPhysical(side, isRtl),
    align: toPhysical(align, isRtl),
  } as ParsedAnchor
}

export function toPhysical (str: 'center' | Tblock | Tinline, isRtl: boolean) {
  if (str === 'start') return isRtl ? 'right' : 'left'
  if (str === 'end') return isRtl ? 'left' : 'right'
  return str
}

export function flipSide (anchor: ParsedAnchor) {
  return {
    side: {
      center: 'center',
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    }[anchor.side],
    align: anchor.align,
  } as ParsedAnchor
}

export function flipAlign (anchor: ParsedAnchor) {
  return {
    side: anchor.side,
    align: {
      center: 'center',
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    }[anchor.align],
  } as ParsedAnchor
}

export function flipCorner (anchor: ParsedAnchor) {
  return {
    side: anchor.align,
    align: anchor.side,
  } as ParsedAnchor
}

export function getAxis (anchor: ParsedAnchor) {
  return includes(block, anchor.side) ? 'y' : 'x'
}
