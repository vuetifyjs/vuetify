const block = ['top', 'bottom'] as const
const inline = ['start', 'end'] as const
type Tblock = typeof block[number]
type Tinline = typeof inline [number]
export type Anchor =
  | Tblock
  | Tinline
  | 'center'
  | 'center center'
  | `${Tblock} ${Tinline | 'center'}`
  | `${Tinline} ${Tblock | 'center'}`
export type ParsedAnchor =
  | { side: 'center', align: 'center' }
  | { side: Tblock, align: Tinline | 'center' }
  | { side: Tinline, align: Tblock | 'center' }

/** Parse a raw anchor string into an object */
export function parseAnchor (anchor: Anchor) {
  let [side, align] = anchor.split(' ')
  if (!align) {
    align =
      side === 'top' || side === 'bottom' ? 'start'
      : side === 'start' || side === 'end' ? 'top'
      : 'center'
  }
  return {
    side,
    align,
  } as ParsedAnchor
}

/** Get an anchor directly opposite, with the same alignment */
export function oppositeAnchor (anchor: ParsedAnchor) {
  return {
    side: {
      center: 'center',
      top: 'bottom',
      bottom: 'top',
      start: 'end',
      end: 'start',
    }[anchor.side],
    align: anchor.align,
  } as ParsedAnchor
}

/** Convert start/end into left/right */
export function physicalAnchor (anchor: ParsedAnchor, el: HTMLElement) {
  const { side, align } = anchor
  const { direction } = window.getComputedStyle(el)

  const map: Dictionary<string | undefined> = direction === 'ltr' ? {
    start: 'left',
    end: 'right',
  } : {
    start: 'right',
    end: 'left',
  }

  return (map[side] ?? side) + ' ' + (map[align] ?? align)
}
