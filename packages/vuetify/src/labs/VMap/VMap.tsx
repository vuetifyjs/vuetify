// Styles
import './VMap.sass'

// Components
import { VTooltip } from '@/components/VTooltip'

// Composables
import { useMapFocus } from './focus'
import { DEFAULT_ZOOM_STEP, useMapNavigation } from './map'
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { cloneVNode, h, onMounted, onScopeDispose, shallowRef, toRef, useId, watch } from 'vue'
import { parseMapSvg } from './svg'
import { genericComponent, isCssColor, isNullOrUndefined, isString, pick, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType, Ref, VNode } from 'vue'
import type { MapDocument, MapNode, MapRegion } from './svg'
import type { MapViewBox } from './viewport'

export type VMapSlots = {
  default: {
    regions: MapRegion[]
    selected: string | readonly string[] | null
    zoom: Ref<number>
    minZoom: number
    maxZoom: number
    zoomIn: () => void
    zoomOut: () => void
    reset: () => void
    reveal: (ids: string | readonly string[], options?: { zoom?: boolean }) => void
  }
  map: { regions: MapRegion[], selected: string | readonly string[] | null, viewBox: MapViewBox }
  tooltip: MapRegion & { selected: boolean }
  error: { error: Error }
}

const panOffsets: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
}

type LayerMode = 'overlay' | 'outline' | 'focus'

export const makeVMapProps = propsFactory({
  svg: String,
  modelValue: { type: [String, Array] as PropType<string | readonly string[] | null>, default: null },
  multiple: Boolean,
  mandatory: Boolean,
  highlighted: { type: [String, Array] as PropType<string | readonly string[] | null>, default: null },
  zoom: { type: Number, default: 1 },
  zoomStep: { type: Number, default: DEFAULT_ZOOM_STEP },
  zoomOnFocus: Boolean,
  minZoom: { type: Number, default: 1 },
  maxZoom: { type: Number, default: 8 },
  baseColor: String,
  baseStroke: String,
  color: { type: String, default: 'primary' },
  regionColors: Object as PropType<Record<string, string>>,
  regionLabels: Object as PropType<Record<string, string>>,
  label: String,
  pan: { type: Boolean, default: true },
  wheel: Boolean,
  zoomable: { type: Boolean, default: true },
  tooltip: { type: Boolean, default: true },
  disabled: Boolean,
  readonly: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps(),
}, 'VMap')

export const VMap = genericComponent<VMapSlots>()({
  name: 'VMap',

  props: makeVMapProps(),

  emits: {
    'update:modelValue': (value: string | readonly string[] | null) => true,
    'update:zoom': (value: number) => true,
    'click:region': (region: MapRegion, event: MouseEvent | KeyboardEvent) => true,
    'update:highlighted': (value: string | readonly string[] | null) => true,
    load: (regions: MapRegion[]) => true,
    error: (value: Error) => true,
  },

  setup (props, { emit, slots }) {
    const { dimensionStyles } = useDimension(props)
    const { t } = useLocale()
    const selected = useProxiedModel(props, 'modelValue')
    const selection = toRef(() => new Set(wrapInArray(selected.value)))
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
    const description = toRef(() => props.tooltip || slots.tooltip ? tooltipId : undefined)
    const navigation = useMapNavigation(props, element, () => map.value?.viewBox, zoom)
    const focus = useMapFocus(props, element, () => map.value?.regions ?? [], navigation.reveal)
    const activeRegion = toRef(() => {
      const id = active.value?.getAttribute('data-v-map-region')
      const region = map.value?.regions.find(region => region.id === id)
      return region ? { ...region, title: props.regionLabels?.[region.id] ?? region.title } : undefined
    })
    const hovered = toRef(() => props.disabled || navigation.dragging.value ? undefined : activeRegion.value?.id)
    const dismissed = shallowRef<string>()
    const ring = shallowRef<string>()
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
      if (!active.value?.matches(':focus-visible')) return
      const rectangle = active.value.getBoundingClientRect()
      target.value = [rectangle.x + rectangle.width / 2, rectangle.y + rectangle.height / 2]
    }, { flush: 'post' })

    function onActivate (event: PointerEvent) {
      if (props.disabled || navigation.dragging.value) return
      active.value = focus.regionElement(event.target)
      target.value = [event.clientX, event.clientY]
    }

    function onPointermove (event: PointerEvent) {
      navigation.onPointermove(event)
      onActivate(event)
    }

    function onFocus (event: FocusEvent) {
      if (props.disabled) return
      focus.onFocus(event)
      active.value = focus.regionElement(event.target)
      ring.value = active.value?.matches(':focus-visible') ? active.value.getAttribute('data-v-map-region')! : undefined
      if (ring.value && active.value) {
        const rectangle = active.value.getBoundingClientRect()
        target.value = [rectangle.x + rectangle.width / 2, rectangle.y + rectangle.height / 2]
      }
    }

    function onDeactivate (event: MouseEvent | FocusEvent) {
      const related = event.relatedTarget as Node | null
      if (active.value?.contains(related)) return
      active.value = props.disabled ? undefined : focus.regionElement(event.relatedTarget)
    }

    function onFocusout (event: FocusEvent) {
      ring.value = undefined
      onDeactivate(event)
    }

    function selectRegion (event: MouseEvent | KeyboardEvent) {
      if (props.disabled || (navigation.isClickSuppressed() && event instanceof MouseEvent)) return
      const id = focus.regionElement(event.target)?.getAttribute('data-v-map-region')
      const region = map.value?.regions.find(region => region.id === id)
      if (!region) return
      const item = { ...region, title: props.regionLabels?.[region.id] ?? region.title }
      if (!props.readonly) {
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
      emit('click:region', item, event)
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
      const region = ['defs', 'clipPath', 'mask'].includes(node.tag) ? undefined : node.region ?? parent
      const isSelected = !!region && selection.value.has(region.id)
      const fill = region && resolveColor(isSelected ? props.color : props.regionColors?.[region.id])
      const isShape = ['path', 'rect', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'use'].includes(node.tag)
      const originalFill = node.attributes.fill ?? inheritedFill

      const attributes: Record<string, string> = {
        ...node.attributes,
        ...(isShape && fill ? originalFill === 'none' || node.tag === 'line' ? { stroke: fill } : { fill } : {}),
      }
      const isLayer = mode !== 'map' && mode !== 'reference'
      if (isLayer) {
        delete attributes.id
        if (isShape && mode !== 'overlay') attributes.fill = 'none'
        else if (isShape) {
          Object.assign(attributes, originalFill === 'none' || node.tag === 'line'
            ? { stroke: 'currentColor' }
            : { fill: 'currentColor', stroke: 'none' })
        }
      }
      const regionAttributes = mode === 'map' && node.region ? {
        'data-v-map-region': node.region.id,
        class: ['v-map__region', { 'v-map__region--selected': isSelected }],
        tabindex: !props.disabled && focus.tabStop.value === node.region.id ? 0 : -1,
        role: props.readonly ? 'img' : 'button',
        'aria-label': props.regionLabels?.[node.region.id] ?? node.region.title,
        'aria-describedby': hovered.value === node.region.id ? description.value : undefined,
        'aria-pressed': props.readonly ? undefined : isSelected,
        'aria-disabled': props.disabled || undefined,
      } : {}
      const children = node.children.map(child => renderNode(child, region, originalFill, mode))
      let content: VNode
      if (node.reference) {
        const id = `${node.reference.attributes.id}${isLayer ? `-${mode}` : ''}`
        const reference = renderNode(node.reference, region, originalFill, isLayer ? mode : 'reference') as VNode
        content = h('g', regionAttributes, [
          h('defs', [cloneVNode(reference, { id })]),
          h(node.tag, { ...attributes, href: `#${id}` }, children),
        ])
      } else {
        content = h(node.tag, { ...attributes, ...regionAttributes }, children)
      }
      return content
    }

    // SVG paints in document order, so states that must not be covered by neighbours are redrawn on top
    function renderLayer (nodes: (MapNode | string)[], ids: Set<unknown>, mode: LayerMode, inheritedFill?: string): VNode[] {
      return nodes.flatMap(node => {
        if (isString(node) || ['defs', 'clipPath', 'mask'].includes(node.tag)) return []
        if (node.region && ids.has(node.region.id)) {
          return [h('g', { class: `v-map__region-${mode}` }, [renderNode(node, node.region, inheritedFill, mode)])]
        }
        const children = renderLayer(node.children, ids, mode, node.attributes.fill ?? inheritedFill)
        return children.length ? [h('g', pick(node.attributes, ['transform', 'clip-path', 'mask']), children)] : []
      })
    }

    useRender(() => (
      <div
        class={[
          'v-map',
          {
            'v-map--disabled': props.disabled,
            'v-map--interactive': !props.disabled && (props.pan || props.zoomable),
            'v-map--dragging': navigation.dragging.value,
          },
          props.class,
        ]}
        style={[
          dimensionStyles.value,
          { '--v-map-base-color': resolveColor(props.baseColor), '--v-map-stroke': resolveColor(props.baseStroke) },
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
            onPointerover={ onActivate }
            onPointerout={ onDeactivate }
            onFocusin={ onFocus }
            onFocusout={ onFocusout }
          >
            <g { ...map.value.attributes }>
              { map.value.children.map(child => renderNode(child, undefined, map.value!.attributes.fill)) }
            </g>
            <g { ...pick(map.value.attributes, ['transform', 'clip-path', 'mask']) } aria-hidden="true">
              { renderLayer(map.value.children, selection.value, 'outline', map.value.attributes.fill) }
              { renderLayer(map.value.children, new Set(props.disabled ? [] : [ring.value]), 'focus', map.value.attributes.fill) }
              { renderLayer(map.value.children, highlights.value, 'overlay', map.value.attributes.fill) }
            </g>
            { slots.map?.({ regions: map.value.regions, selected: selected.value, viewBox: navigation.viewBox.value }) }
          </svg>
        )}

        { error.value && (
          <div key="error" class="v-map__status" role="alert">
            { slots.error?.({ error: error.value }) ?? t('$vuetify.noDataText') }
          </div>
        )}

        { slots.default?.({
          regions: map.value?.regions ?? [],
          selected: selected.value,
          zoom,
          minZoom: navigation.minimum.value,
          maxZoom: navigation.maximum.value,
          zoomIn: navigation.zoomIn,
          zoomOut: navigation.zoomOut,
          reset: navigation.reset,
          reveal,
        })}

        { mounted.value && (props.tooltip || slots.tooltip) && (
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
                  return region && slots.tooltip!({ ...region, selected: selection.value.has(region.id) })
                }
                : undefined,
            }}
          />
        )}
      </div>
    ))

    return { zoomIn: navigation.zoomIn, zoomOut: navigation.zoomOut, reset: navigation.reset, reveal }
  },
})

export type VMap = InstanceType<typeof VMap>
