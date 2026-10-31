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
import { cloneVNode, Fragment, h, onMounted, shallowRef, toRef, useId, watch } from 'vue'
import { parseMapSvg } from './svg'
import { genericComponent, isCssColor, isNullOrUndefined, isString, propsFactory, useRender, wrapInArray } from '@/util'

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
  }
  map: { regions: MapRegion[], selected: string | readonly string[] | null, viewBox: MapViewBox }
  tooltip: MapRegion & { selected: boolean }
  error: { error: Error }
}

export const makeVMapProps = propsFactory({
  svg: String,
  modelValue: { type: [String, Array] as PropType<string | readonly string[] | null>, default: null },
  multiple: Boolean,
  zoom: { type: Number, default: 1 },
  zoomStep: { type: Number, default: DEFAULT_ZOOM_STEP },
  zoomOnFocus: Boolean,
  minZoom: { type: Number, default: 1 },
  maxZoom: { type: Number, default: 8 },
  color: String,
  selectedColor: { type: String, default: 'primary' },
  regionColors: Object as PropType<Record<string, string>>,
  regionLabels: Object as PropType<Record<string, string>>,
  label: { type: String, default: '$vuetify.map.label' },
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
    'hover:region': (region: MapRegion | null) => true,
    load: (regions: MapRegion[]) => true,
    error: (value: Error) => true,
  },

  setup (props, { emit, slots }) {
    const { dimensionStyles } = useDimension(props)
    const { t } = useLocale()
    const selected = useProxiedModel(props, 'modelValue')
    const selection = toRef(() => new Set(wrapInArray(selected.value)))
    const zoom = useProxiedModel(props, 'zoom')
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
    const highlighted = toRef(() => props.disabled || navigation.dragging.value ? undefined : activeRegion.value?.id)

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

    watch(activeRegion, region => emit('hover:region', region ?? null))
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
      if (active.value?.matches(':focus-visible')) {
        const rectangle = active.value.getBoundingClientRect()
        target.value = [rectangle.x + rectangle.width / 2, rectangle.y + rectangle.height / 2]
      }
    }

    function onDeactivate (event: MouseEvent | FocusEvent) {
      const related = event.relatedTarget as Node | null
      if (active.value?.contains(related)) return
      active.value = props.disabled ? undefined : focus.regionElement(event.relatedTarget)
    }

    function selectRegion (event: MouseEvent | KeyboardEvent) {
      if (props.disabled || (navigation.isClickSuppressed() && event instanceof MouseEvent)) return
      const id = focus.regionElement(event.target)?.getAttribute('data-v-map-region')
      const region = map.value?.regions.find(region => region.id === id)
      if (!region) return
      const item = { ...region, title: props.regionLabels?.[region.id] ?? region.title }
      if (!props.readonly) {
        selected.value = props.multiple
          ? selection.value.has(id!) ? [...selection.value].filter(value => value !== id) : [...selection.value, id!]
          : selection.value.has(id!) ? null : id!
      }
      emit('click:region', item, event)
    }

    function onKeydown (event: KeyboardEvent) {
      if (props.disabled || event.altKey || event.ctrlKey || event.metaKey) return
      if (['Enter', ' '].includes(event.key) && focus.regionElement(event.target)) {
        event.preventDefault()
        selectRegion(event)
      } else {
        focus.onKeydown(event)
      }
    }

    function resolveColor (color?: string) {
      return color ? isCssColor(color) ? color : `rgb(var(--v-theme-${color}))` : undefined
    }

    function renderNode (
      node: MapNode | string,
      parent?: MapRegion,
      inheritedFill?: string,
      mode: 'map' | 'reference' | 'overlay' = 'map',
    ): VNode | string {
      if (isString(node)) return node
      const region = ['defs', 'clipPath', 'mask'].includes(node.tag) ? undefined : node.region ?? parent
      const isSelected = !!region && selection.value.has(region.id)
      const fill = region && resolveColor(isSelected ? props.selectedColor : props.regionColors?.[region.id])
      const isShape = ['path', 'rect', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'use'].includes(node.tag)
      const originalFill = node.attributes.fill ?? inheritedFill

      const attributes: Record<string, string> = {
        ...node.attributes,
        ...(isShape && fill ? originalFill === 'none' || node.tag === 'line' ? { stroke: fill } : { fill } : {}),
      }
      if (mode === 'overlay') {
        delete attributes.id
        if (isShape) {
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
        'aria-describedby': highlighted.value === node.region.id ? description.value : undefined,
        'aria-pressed': props.readonly ? undefined : isSelected,
        'aria-disabled': props.disabled || undefined,
      } : {}
      const children = node.children.map(child => renderNode(child, region, originalFill, mode))
      let content: VNode
      if (node.reference) {
        const id = `${node.reference.attributes.id}${mode === 'overlay' ? '-overlay' : ''}`
        const reference = renderNode(node.reference, region, originalFill, mode === 'overlay' ? 'overlay' : 'reference') as VNode
        content = h('g', regionAttributes, [
          h('defs', [cloneVNode(reference, { id })]),
          h(node.tag, { ...attributes, href: `#${id}` }, children),
        ])
      } else {
        content = h(node.tag, { ...attributes, ...regionAttributes }, children)
      }
      if (mode !== 'map' || !isShape) return content
      const hovered = !!region && region.id === highlighted.value
      return h(Fragment, [content, hovered
        ? h('g', { class: 'v-map__region-overlay', 'aria-hidden': 'true' }, [renderNode(node, region, inheritedFill, 'overlay')])
        : undefined])
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
          { '--v-map-color': resolveColor(props.color) },
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
            aria-label={ t(props.label) }
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
            onFocusout={ onDeactivate }
          >
            <g { ...map.value.attributes }>
              { map.value.children.map(child => renderNode(child, undefined, map.value!.attributes.fill)) }
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
        })}

        { mounted.value && (props.tooltip || slots.tooltip) && (
          <VTooltip
            id={ tooltipId }
            modelValue={ !!activeRegion.value && !props.disabled && !navigation.dragging.value }
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

    return { zoomIn: navigation.zoomIn, zoomOut: navigation.zoomOut, reset: navigation.reset }
  },
})

export type VMap = InstanceType<typeof VMap>
