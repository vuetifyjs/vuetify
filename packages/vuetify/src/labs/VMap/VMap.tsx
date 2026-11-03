// Styles
import './VMap.sass'

// Components
import { VTooltip } from '@/components/VTooltip'

// Composables
import { useMapFocus } from './focus'
import { useMapNavigation } from './map'
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { cloneVNode, computed, h, onMounted, onScopeDispose, shallowRef, toRef, useId, watch } from 'vue'
import { parseMapSvg } from './svg'
import {
  EventProp,
  genericComponent,
  hasEvent,
  isCssColor,
  isNullOrUndefined,
  isString,
  pick,
  propsFactory,
  useRender,
  wrapInArray,
} from '@/util'

// Types
import type { PropType, VNode } from 'vue'
import type { MapDocument, MapNode, MapRegion } from './svg'
import type { MapViewBox } from './viewport'

export type MapRegionData = { [key: string]: unknown, title?: string, color?: string }
export type MapRegionItem = MapRegion & MapRegionData

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
    reveal: (ids: string | readonly string[], options?: { zoom?: boolean }) => void
  }
  map: { regions: MapRegionItem[], selected: string | readonly string[] | null, viewBox: MapViewBox }
  tooltip: { region: MapRegionItem, selected: boolean }
  error: { error: Error }
}

const panOffsets: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
}

type LayerMode = 'overlay' | 'outline' | 'focus'

const shapeTags = new Set(['path', 'rect', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'use'])
const definitionTags = new Set(['defs', 'clipPath', 'mask'])

export const makeVMapProps = propsFactory({
  svg: String,
  modelValue: { type: [String, Array] as PropType<string | readonly string[] | null>, default: null },
  selectable: Boolean,
  multiple: Boolean,
  mandatory: Boolean,
  highlighted: { type: [String, Array] as PropType<string | readonly string[] | null>, default: null },
  zoom: { type: Number, default: 1 },
  zoomStep: { type: Number, default: 0.2 },
  zoomOnFocus: Boolean,
  minZoom: { type: Number, default: 1 },
  maxZoom: { type: Number, default: 8 },
  baseColor: String,
  baseStroke: String,
  color: String,
  regions: Object as PropType<Record<string, MapRegionData>>,
  label: String,
  disablePan: Boolean,
  disableZoom: Boolean,
  wheelZoom: Boolean,
  hideTooltip: Boolean,
  disabled: Boolean,
  'onClick:region': EventProp<[MouseEvent | KeyboardEvent, { region: MapRegionItem }]>(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
}, 'VMap')

export const VMap = genericComponent<VMapSlots>()({
  name: 'VMap',

  props: makeVMapProps(),

  emits: {
    'update:modelValue': (value: string | readonly string[] | null) => true,
    'update:zoom': (value: number) => true,
    'click:region': (event: MouseEvent | KeyboardEvent, value: { region: MapRegionItem }) => true,
    'update:highlighted': (value: string | readonly string[] | null) => true,
    load: (regions: MapRegion[]) => true,
    error: (value: Error) => true,
  },

  setup (props, { emit, slots }) {
    const { dimensionStyles } = useDimension(props)
    const { t } = useLocale()
    const selected = useProxiedModel(props, 'modelValue')
    // computed, not toRef: read once per SVG node on every render, and pointer moves re-render
    const selection = computed(() => new Set(wrapInArray(selected.value)))
    const zoom = useProxiedModel(props, 'zoom')
    const highlight = useProxiedModel(props, 'highlighted')
    const element = shallowRef<SVGSVGElement>()
    const map = shallowRef<MapDocument>()
    const mounted = shallowRef(false)
    const error = shallowRef<Error>()
    const active = shallowRef<SVGGraphicsElement>()
    const target = shallowRef<[number, number]>([0, 0])
    const prefix = `v-map-${useId()}`
    const tooltipId = `${prefix}-tooltip`
    const navigation = useMapNavigation(props, element, () => map.value?.viewBox, zoom)
    const focus = useMapFocus(element, () => map.value?.regions ?? [], navigation.reveal)
    const regions = computed(() => (map.value?.regions ?? []).map(region => ({ ...region, ...props.regions?.[region.id], id: region.id })))
    const regionById = computed(() => new Map(regions.value.map(region => [region.id, region])))
    const activeRegion = toRef(() => regionById.value.get(active.value?.getAttribute('data-v-map-region') ?? ''))
    const isClickable = toRef(() => props.selectable || hasEvent(props, 'click:region'))
    const hovered = toRef(() => props.disabled || navigation.dragging.value ? undefined : activeRegion.value?.id)
    const dismissed = shallowRef<string>()
    const focusRing = shallowRef<string>()
    const tooltipOpen = toRef(() => !!hovered.value && hovered.value !== dismissed.value)
    // includes the own hover so a one-way :highlighted binding still shows pointer feedback
    const highlights = toRef(() => props.disabled ? new Set() : new Set([...wrapInArray(highlight.value), hovered.value]))

    onMounted(() => { mounted.value = true })

    watch([mounted, () => props.svg], ([mounted]) => {
      if (!mounted) return
      map.value = undefined
      active.value = undefined
      error.value = undefined
      if (isNullOrUndefined(props.svg)) return

      try {
        map.value = parseMapSvg(props.svg, prefix)
        emit('load', map.value.regions)
      } catch (value) {
        error.value = value instanceof Error ? value : new Error(String(value))
        emit('error', error.value)
      }
    })

    watch(hovered, id => {
      highlight.value = id ?? null
      dismissed.value = undefined
    })

    // VTooltip skips the global overlay stack, so Escape never reaches it
    function onEscape (event: KeyboardEvent) {
      if (event.key === 'Escape') dismissed.value = hovered.value
    }
    watch(tooltipOpen, open => {
      if (open) window.addEventListener('keydown', onEscape)
      else window.removeEventListener('keydown', onEscape)
    })
    onScopeDispose(() => window.removeEventListener('keydown', onEscape))
    watch(() => props.disabled, disabled => { if (disabled) active.value = undefined })

    watch(navigation.viewBox, () => {
      if (active.value?.matches(':focus-visible')) anchorTooltip(active.value)
    }, { flush: 'post' })

    function anchorTooltip (region: Element) {
      const rectangle = region.getBoundingClientRect()
      target.value = [rectangle.x + rectangle.width / 2, rectangle.y + rectangle.height / 2]
    }

    function onHover (event: PointerEvent) {
      if (props.disabled || navigation.dragging.value) return
      active.value = focus.regionElement(event.target)
      target.value = [event.clientX, event.clientY]
    }

    function onPointermove (event: PointerEvent) {
      navigation.onPointermove(event)
      onHover(event)
    }

    function onFocus (event: FocusEvent) {
      if (props.disabled) return
      focus.onFocus(event)
      active.value = focus.regionElement(event.target)
      const visible = active.value?.matches(':focus-visible')
      focusRing.value = visible ? active.value!.getAttribute('data-v-map-region')! : undefined
      if (visible) anchorTooltip(active.value!)
    }

    function onLeave (event: MouseEvent | FocusEvent) {
      const related = event.relatedTarget as Node | null
      if (active.value?.contains(related)) return
      active.value = props.disabled ? undefined : focus.regionElement(event.relatedTarget)
    }

    function onFocusout (event: FocusEvent) {
      focusRing.value = undefined
      onLeave(event)
    }

    function selectRegion (event: MouseEvent | KeyboardEvent) {
      if (props.disabled || (navigation.isClickSuppressed() && event instanceof MouseEvent)) return
      const region = regionById.value.get(focus.regionElement(event.target)?.getAttribute('data-v-map-region') ?? '')
      if (!region) return
      if (props.selectable) {
        const isSelected = selection.value.has(region.id)
        const isLast = props.mandatory && selection.value.size === 1
        if (!props.multiple) {
          if (!isSelected) selected.value = region.id
          else if (!isLast) selected.value = null
        } else if (isSelected) {
          if (!isLast) selected.value = [...selection.value].filter(value => value !== region.id)
        } else {
          selected.value = [...selection.value, region.id]
        }
      }
      emit('click:region', event, { region })
    }

    function onKeydown (event: KeyboardEvent) {
      if (props.disabled || event.altKey || event.ctrlKey || event.metaKey) return
      const offset = event.shiftKey && panOffsets[event.key]
      if (offset) {
        event.preventDefault()
        navigation.nudge(...offset)
      } else if (['Enter', ' '].includes(event.key) && focus.regionElement(event.target)) {
        event.preventDefault()
        selectRegion(event)
      } else {
        focus.onKeydown(event)
      }
    }

    function reveal (ids: string | readonly string[], options: { zoom?: boolean } = {}) {
      const regions = wrapInArray(ids).flatMap(id => (
        element.value?.querySelector<SVGGraphicsElement>(`[data-v-map-region="${CSS.escape(id)}"]`) ?? []
      ))
      navigation.reveal(regions, options.zoom ?? props.zoomOnFocus)
    }

    function resolveColor (color?: string) {
      return color ? isCssColor(color) ? color : `rgb(var(--v-theme-${color}))` : undefined
    }

    function renderNode (
      node: MapNode | string,
      parent?: MapRegion,
      inheritedFill?: string,
      mode: 'map' | 'reference' | LayerMode = 'map',
    ): VNode | string {
      if (isString(node)) return node
      const region = definitionTags.has(node.tag) ? undefined : node.region ?? parent
      const item = region && regionById.value.get(region.id)
      const isSelected = !!region && selection.value.has(region.id)
      const isShape = shapeTags.has(node.tag)
      const originalFill = node.attributes.fill ?? inheritedFill
      const strokeOnly = originalFill === 'none' || node.tag === 'line'
      const paint = strokeOnly ? 'stroke' : 'fill'
      const fill = resolveColor(item?.color)
      const isLayer = mode !== 'map' && mode !== 'reference'

      const attributes: Record<string, unknown> = { ...node.attributes }
      if (isShape && region && fill) attributes[paint] = fill
      if (isShape && isSelected && !isLayer) attributes.class = [attributes.class, `v-map__selected-${paint}`]
      if (isLayer) delete attributes.id
      if (isLayer && isShape) {
        Object.assign(attributes, mode !== 'overlay' ? { fill: 'none' }
          : strokeOnly ? { stroke: 'currentColor' }
          : { fill: 'currentColor', stroke: 'none' })
      }
      const regionAttributes = mode === 'map' && node.region ? {
        'data-v-map-region': node.region.id,
        class: [attributes.class, 'v-map__region', { 'v-map__region--selected': isSelected }],
        tabindex: !props.disabled && focus.tabStop.value === node.region.id ? 0 : -1,
        role: isClickable.value ? 'button' : 'img',
        'aria-label': item?.title,
        'aria-describedby': hovered.value === node.region.id && !props.hideTooltip ? tooltipId : undefined,
        'aria-pressed': props.selectable ? isSelected : undefined,
        'aria-disabled': props.disabled || undefined,
      } : {}
      const children = node.children.map(child => renderNode(child, region, originalFill, mode))
      if (!node.reference) return h(node.tag, { ...attributes, ...regionAttributes }, children)

      const id = `${node.reference.attributes.id}${isLayer ? `-${mode}` : ''}`
      const reference = renderNode(node.reference, region, originalFill, isLayer ? mode : 'reference') as VNode
      return h('g', regionAttributes, [
        h('defs', [cloneVNode(reference, { id })]),
        h(node.tag, { ...attributes, href: `#${id}` }, children),
      ])
    }

    // SVG paints in document order, so states that must not be covered by neighbours are redrawn on top
    function renderLayer (nodes: (MapNode | string)[], ids: Set<unknown>, mode: LayerMode, inheritedFill?: string): VNode[] {
      return nodes.flatMap(node => {
        if (isString(node) || definitionTags.has(node.tag)) return []
        if (node.region && ids.has(node.region.id)) {
          return [h('g', { class: `v-map__region-${mode}` }, [renderNode(node, node.region, inheritedFill, mode)])]
        }
        const children = renderLayer(node.children, ids, mode, node.attributes.fill ?? inheritedFill)
        return children.length ? [h('g', pick(node.attributes, ['transform', 'clip-path', 'mask']), children)] : []
      })
    }

    // own render scope: pointer moves update only the tooltip, not the whole SVG
    function MapTooltip () {
      return (
        <VTooltip
          id={ tooltipId }
          modelValue={ tooltipOpen.value }
          // ignores click-outside: the tooltip only shows over the map, so that click lands on the map
          onUpdate:modelValue={ () => {} }
          target={ target.value }
          text={ activeRegion.value?.title }
          openDelay={ 0 }
          closeDelay={ 0 }
          v-slots={{
            default: slots.tooltip
              ? () => {
                const region = activeRegion.value
                return region && slots.tooltip!({ region, selected: selection.value.has(region.id) })
              }
              : undefined,
          }}
        />
      )
    }

    useRender(() => (
      <div
        class={[
          'v-map',
          {
            'v-map--disabled': props.disabled,
            'v-map--interactive': !props.disabled && (!props.disablePan || !props.disableZoom),
            'v-map--dragging': navigation.dragging.value,
          },
          props.class,
        ]}
        style={[
          dimensionStyles.value,
          {
            '--v-map-base-color': resolveColor(props.baseColor),
            '--v-map-base-stroke': resolveColor(props.baseStroke),
            '--v-map-selected-color': resolveColor(props.color),
          },
          props.style,
        ]}
      >
        { map.value && navigation.viewBox.value && (
          <svg
            key="map"
            ref={ element }
            class="v-map__svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={ Object.values(navigation.viewBox.value).join(' ') }
            preserveAspectRatio="xMidYMid meet"
            role="group"
            aria-label={ props.label && t(props.label) }
            aria-disabled={ props.disabled || undefined }
            tabindex={ !props.disabled && !map.value.regions.length ? 0 : -1 }
            onClick={ selectRegion }
            onKeydown={ onKeydown }
            onPointerdown={ navigation.onPointerdown }
            onPointermove={ onPointermove }
            onPointerup={ navigation.onPointerup }
            onPointercancel={ navigation.onPointerup }
            onLostpointercapture={ navigation.onPointerup }
            onWheel={ navigation.onWheel }
            onDblclick={ navigation.onDblclick }
            onPointerover={ onHover }
            onPointerout={ onLeave }
            onFocusin={ onFocus }
            onFocusout={ onFocusout }
          >
            <g { ...map.value.attributes }>
              { map.value.children.map(child => renderNode(child, undefined, map.value!.attributes.fill)) }
            </g>
            <g { ...pick(map.value.attributes, ['transform', 'clip-path', 'mask']) } aria-hidden="true">
              { renderLayer(map.value.children, selection.value, 'outline', map.value.attributes.fill) }
              { renderLayer(map.value.children, new Set(props.disabled ? [] : [focusRing.value]), 'focus', map.value.attributes.fill) }
              { renderLayer(map.value.children, highlights.value, 'overlay', map.value.attributes.fill) }
            </g>
            { slots.map?.({ regions: regions.value, selected: selected.value, viewBox: navigation.viewBox.value }) }
          </svg>
        )}

        { error.value && (
          <div key="error" class="v-map__status" role="alert">
            { slots.error?.({ error: error.value }) ?? t('$vuetify.noDataText') }
          </div>
        )}

        { slots.default?.({
          regions: regions.value,
          selected: selected.value,
          zoom: navigation.scale.value,
          minZoom: navigation.minimum.value,
          maxZoom: navigation.maximum.value,
          setZoom: navigation.zoomTo,
          zoomIn: navigation.zoomIn,
          zoomOut: navigation.zoomOut,
          resetZoom: navigation.resetZoom,
          reveal,
        })}

        { mounted.value && !props.hideTooltip && <MapTooltip /> }
      </div>
    ))

    return { zoomIn: navigation.zoomIn, zoomOut: navigation.zoomOut, resetZoom: navigation.resetZoom, reveal }
  },
})

export type VMap = InstanceType<typeof VMap>
