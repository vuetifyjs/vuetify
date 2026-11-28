// Types
import type { StyleValue } from 'vue'
import type { MapRegion } from './svg.types'
import type { MapPoint, MapViewBox } from './viewport.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type MapRegionData = { [key: string]: unknown, title?: string, color?: string }
export type MapRegionItem = MapRegion & MapRegionData

type Reveal = (ids: string | readonly string[], options?: { zoom?: boolean }) => void

export type VMapSlots = {
  default: {
    regions: MapRegionItem[]
    selected: string | readonly string[] | null
    zoom: number
    minZoom: number
    maxZoom: number
    setZoom: (value: number) => void
    zoomIn: () => void
    zoomOut: () => void
    resetZoom: () => void
    reveal: Reveal
  }
  map: { regions: MapRegionItem[], selected: string | readonly string[] | null, viewBox: MapViewBox }
  tooltip: { region: MapRegionItem, selected: boolean }
  error: { error: Error }
}

export interface VMapProps {
  baseColor?: string
  baseStroke?: string
  center?: MapPoint | null
  class?: any
  color?: string
  disabled?: boolean
  disablePan?: boolean
  disableZoom?: boolean
  height?: string | number
  hideTooltip?: boolean
  highlighted?: string | readonly string[] | null
  label?: string
  mandatory?: boolean
  maxHeight?: string | number
  maxWidth?: string | number
  maxZoom?: string | number
  minHeight?: string | number
  minWidth?: string | number
  minZoom?: string | number
  modelValue?: string | readonly string[] | null
  multiple?: boolean
  'onClick:region'?: ((args_0: MouseEvent | KeyboardEvent, args_1: { region: MapRegionItem, reveal: Reveal }) => void)
  regions?: Record<string, MapRegionData>
  selectable?: boolean
  style?: StyleValue
  svg?: string
  wheelZoom?: boolean
  width?: string | number
  zoom?: string | number
  zoomOnFocus?: boolean
  zoomStep?: number
}

type VMapDefaultKeys =
  | 'disabled'
  | 'disablePan'
  | 'disableZoom'
  | 'hideTooltip'
  | 'highlighted'
  | 'mandatory'
  | 'maxZoom'
  | 'minZoom'
  | 'modelValue'
  | 'multiple'
  | 'selectable'
  | 'style'
  | 'wheelZoom'
  | 'zoom'
  | 'zoomOnFocus'
  | 'zoomStep'

export declare const VMap: VuetifyComponent<
  VMapProps,
  VMapDefaultKeys,
  {
    'update:modelValue': (value: string | readonly string[] | null) => true
    'update:zoom': (value: number) => true
    'update:center': (value: MapPoint | null | undefined) => true
    'click:region': (event: MouseEvent | KeyboardEvent, value: { region: MapRegionItem, reveal: Reveal }) => true
    'update:highlighted': (value: string | readonly string[] | null) => true
    load: (regions: MapRegion[]) => true
    error: (value: Error) => true
  },
  VMapSlots,
  {
    zoomIn: () => void
    zoomOut: () => void
    resetZoom: () => void
    reveal: Reveal
  }
>
export type VMap = InstanceType<typeof VMap>

export {}
