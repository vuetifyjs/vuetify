// Types
import type { MapViewBox } from './viewport.types'

export type MapRegion = { id: string, title: string }
export type MapNode = {
  tag: string
  attributes: Record<string, string>
  region?: MapRegion
  reference?: MapNode
  children: (MapNode | string)[]
}
export type MapDocument = {
  viewBox: MapViewBox
  attributes: Record<string, string>
  children: (MapNode | string)[]
  regions: MapRegion[]
}

export {}
