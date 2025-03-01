// Types
import type { ParsedAnchor } from '@/util'
import type { Box } from '@/util/box'

type Point = { x: number, y: number }
declare class As<T extends string> {
  private as: T
}
type ElementPoint = Point & As<'element'>
type ViewportPoint = Point & As<'viewport'>
type Offset = Point & As<'offset'>

/** Convert a point in local space to viewport space */
export function elementToViewport (point: ElementPoint, offset: Offset | Box) {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y,
  } as ViewportPoint
}

/** Convert a point in viewport space to local space */
export function viewportToElement (point: ViewportPoint, offset: Offset | Box) {
  return {
    x: point.x - offset.x,
    y: point.y - offset.y,
  } as ElementPoint
}

/** Get the difference between two points */
export function getOffset<T extends Point> (a: T, b: T) {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  } as Offset
}

/** Convert an anchor object to a point in local space */
export function anchorToPoint (anchor: ParsedAnchor, box: Box): ViewportPoint {
  if (anchor.side === 'top' || anchor.side === 'bottom') {
    const { side, align } = anchor

    const x: number =
      align === 'left' ? 0
      : align === 'center' ? box.width / 2
      : align === 'right' ? box.width
      : align
    const y: number =
      side === 'top' ? 0
      : side === 'bottom' ? box.height
      : side

    return elementToViewport({ x, y } as ElementPoint, box)
  } else if (anchor.side === 'left' || anchor.side === 'right') {
    const { side, align } = anchor

    const x: number =
      side === 'left' ? 0
      : side === 'right' ? box.width
      : side
    const y: number =
      align === 'top' ? 0
      : align === 'center' ? box.height / 2
      : align === 'bottom' ? box.height
      : align

    return elementToViewport({ x, y } as ElementPoint, box)
  }

  return elementToViewport({
    x: box.width / 2,
    y: box.height / 2,
  } as ElementPoint, box)
}
