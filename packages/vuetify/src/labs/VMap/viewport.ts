// Utilities
import { clamp } from '@/util'

export type MapPoint = { x: number, y: number }
export type MapViewBox = MapPoint & { width: number, height: number }

export function constrainViewBox (view: MapViewBox, bounds: MapViewBox): MapViewBox {
  return {
    ...view,
    x: clamp(view.x, bounds.x, bounds.x + Math.max(0, bounds.width - view.width)),
    y: clamp(view.y, bounds.y, bounds.y + Math.max(0, bounds.height - view.height)),
  }
}

export function zoomViewBox (view: MapViewBox, bounds: MapViewBox, zoom: number, anchor: MapPoint): MapViewBox {
  const width = bounds.width / zoom
  const height = bounds.height / zoom

  return constrainViewBox({
    x: anchor.x - (anchor.x - view.x) * width / view.width,
    y: anchor.y - (anchor.y - view.y) * height / view.height,
    width,
    height,
  }, bounds)
}
