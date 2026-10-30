// Styles
import './VMap.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VProgressCircular } from '@/components/VProgressCircular'
import { VTooltip } from '@/components/VTooltip'

// Composables
import { useMapNavigation } from './map'
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { h, onMounted, shallowRef, toRef, useId, watch } from 'vue'
import { parseMapSvg } from './svg'
import { genericComponent, isCssColor, isNullOrUndefined, isString, propsFactory, useRender } from '@/util'

// Types
import type { PropType, VNode } from 'vue'
import type { MapDocument, MapNode, MapRegion } from './svg'
import type { MapViewBox } from './viewport'

export type VMapSlots = {
  default: { regions: MapRegion[], selected: string | null, viewBox: MapViewBox }
  controls: { zoom: number, zoomIn: () => void, zoomOut: () => void, reset: () => void }
  tooltip: MapRegion & { selected: boolean }
  loading: never
  error: { error: Error }
}

export const makeVMapProps = propsFactory({
  src: String,
  svg: String,
  modelValue: { type: String as PropType<string | null>, default: null },
  zoom: { type: Number, default: 1 },
  minZoom: { type: Number, default: 1 },
  maxZoom: { type: Number, default: 8 },
  color: String,
  selectedColor: { type: String, default: 'primary' },
  regionColors: Object as PropType<Record<string, string>>,
  regionLabels: Object as PropType<Record<string, string>>,
  label: { type: String, default: '$vuetify.map.label' },
  controls: { type: Boolean, default: true },
  pan: { type: Boolean, default: true },
  zoomable: { type: Boolean, default: true },
  tooltip: { type: Boolean, default: true },
  disabled: Boolean,
  readonly: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeThemeProps(),
}, 'VMap')

export const VMap = genericComponent<VMapSlots>()({
  name: 'VMap',

  props: makeVMapProps(),

  emits: {
    'update:modelValue': (value: string | null) => true,
    'update:zoom': (value: number) => true,
    'click:region': (region: MapRegion, event: MouseEvent | KeyboardEvent) => true,
    'hover:region': (region: MapRegion | null) => true,
    load: (regions: MapRegion[]) => true,
    error: (value: Error) => true,
  },

  setup (props, { emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { dimensionStyles } = useDimension(props)
    const { t } = useLocale()
    const selected = useProxiedModel(props, 'modelValue')
    const zoom = useProxiedModel(props, 'zoom')
    const element = shallowRef<SVGSVGElement>()
    const map = shallowRef<MapDocument>()
    const mounted = shallowRef(false)
    const loading = shallowRef(false)
    const error = shallowRef<Error>()
    const active = shallowRef<SVGElement>()
    const prefix = `v-map-${useId()}`
    const navigation = useMapNavigation(props, element, () => map.value?.viewBox, zoom)
    const activeRegion = toRef(() => {
      const id = active.value?.getAttribute('data-v-map-region')
      const region = map.value?.regions.find(region => region.id === id)
      return region ? { ...region, title: props.regionLabels?.[region.id] ?? region.title } : undefined
    })

    onMounted(() => { mounted.value = true })

    watch([mounted, () => props.src, () => props.svg], async ([mounted], _, onCleanup) => {
      if (!mounted) return
      const controller = new AbortController()
      onCleanup(() => controller.abort())
      map.value = undefined
      active.value = undefined
      error.value = undefined
      loading.value = true

      try {
        let source = props.svg
        if (isNullOrUndefined(source) && props.src) {
          const response = await fetch(props.src, { signal: controller.signal, credentials: 'same-origin' })
          if (!response.ok) throw new Error(`Unable to load map: HTTP ${response.status}`)
          source = await response.text()
        }
        if (controller.signal.aborted) return
        if (!source) throw new Error('VMap requires an SVG source')
        map.value = parseMapSvg(source, prefix)
        emit('load', map.value.regions)
      } catch (value) {
        if (controller.signal.aborted) return
        error.value = value instanceof Error ? value : new Error(String(value))
        emit('error', error.value)
      } finally {
        if (!controller.signal.aborted) loading.value = false
      }
    })

    watch(activeRegion, region => emit('hover:region', region ?? null))
    watch(() => props.disabled, disabled => { if (disabled) active.value = undefined })

    function regionElement (event: Event) {
      const target = event.target as Element | null
      const region = target?.closest?.<SVGElement>('[data-v-map-region]')
      return region && element.value?.contains(region) ? region : undefined
    }

    function onActivate (event: Event) {
      if (!props.disabled && !navigation.dragging.value) active.value = regionElement(event)
    }

    function onDeactivate (event: MouseEvent | FocusEvent) {
      const related = event.relatedTarget as Node | null
      if (active.value?.contains(related)) return
      active.value = undefined
    }

    function selectRegion (event: MouseEvent | KeyboardEvent) {
      if (props.disabled || (navigation.isClickSuppressed() && event instanceof MouseEvent)) return
      const id = regionElement(event)?.getAttribute('data-v-map-region')
      const region = map.value?.regions.find(region => region.id === id)
      if (!region) return
      const item = { ...region, title: props.regionLabels?.[region.id] ?? region.title }
      if (!props.readonly) selected.value = selected.value === id ? null : id!
      emit('click:region', item, event)
    }

    function onKeydown (event: KeyboardEvent) {
      if (!props.disabled && ['Enter', ' '].includes(event.key) && regionElement(event)) {
        event.preventDefault()
        selectRegion(event)
      } else {
        navigation.onKeydown(event)
      }
    }

    function resolveColor (color?: string) {
      return color ? isCssColor(color) ? color : `rgb(var(--v-theme-${color}))` : undefined
    }

    function renderNode (node: MapNode | string, parent?: MapRegion, inheritedFill?: string): VNode | string {
      if (isString(node)) return node
      const region = ['defs', 'clipPath', 'mask'].includes(node.tag) ? undefined : node.region ?? parent
      const isSelected = !!region && selected.value === region.id
      const fill = region && resolveColor(isSelected ? props.selectedColor : props.regionColors?.[region.id])
      const isShape = ['path', 'rect', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'use'].includes(node.tag)
      const originalFill = node.attributes.fill ?? inheritedFill
      const label = node.region && (props.regionLabels?.[node.region.id] ?? node.region.title)

      const attributes = {
        ...node.attributes,
        ...(isShape && fill ? originalFill === 'none' || node.tag === 'line' ? { stroke: fill } : { fill } : {}),
      }
      const regionAttributes = node.region ? {
        'data-v-map-region': node.region.id,
        class: ['v-map__region', { 'v-map__region--selected': isSelected }],
        tabindex: props.disabled ? -1 : 0,
        role: props.readonly ? 'img' : 'button',
        'aria-label': label,
        'aria-pressed': props.readonly ? undefined : isSelected,
        'aria-disabled': props.disabled || undefined,
      } : {}
      const children = node.children.map(child => renderNode(child, region, originalFill))

      return node.reference ? h('g', regionAttributes, [
        h('defs', [renderNode(node.reference, region, originalFill)]),
        h(node.tag, { ...attributes, href: `#${node.reference.attributes.id}` }, children),
      ]) : h(node.tag, { ...attributes, ...regionAttributes }, children)
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
          themeClasses.value,
          props.class,
        ]}
        style={[
          dimensionStyles.value,
          { '--v-map-color': resolveColor(props.color) },
          props.style,
        ]}
        aria-busy={ loading.value }
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
            tabindex={ props.disabled ? -1 : 0 }
            onClick={ selectRegion }
            onKeydown={ onKeydown }
            onPointerdown={ navigation.onPointerdown }
            onPointermove={ navigation.onPointermove }
            onPointerup={ navigation.onPointerup }
            onPointercancel={ navigation.onPointerup }
            onLostpointercapture={ navigation.onPointerup }
            onWheel={ navigation.onWheel }
            onDblclick={ navigation.onDblclick }
            onPointerover={ onActivate }
            onPointerout={ onDeactivate }
            onFocusin={ onActivate }
            onFocusout={ onDeactivate }
          >
            <g { ...map.value.attributes }>
              { map.value.children.map(child => renderNode(child, undefined, map.value!.attributes.fill)) }
            </g>
            { slots.default?.({ regions: map.value.regions, selected: selected.value, viewBox: navigation.viewBox.value }) }
          </svg>
        )}

        { loading.value && (
          <div key="loading" class="v-map__status" role="status" aria-label={ t('$vuetify.loading') }>
            { slots.loading?.() ?? <VProgressCircular indeterminate /> }
          </div>
        )}
        { error.value && (
          <div key="error" class="v-map__status" role="alert">
            { slots.error?.({ error: error.value }) ?? t('$vuetify.noDataText') }
          </div>
        )}

        { props.controls && props.zoomable && map.value && (
          <div key="controls" class="v-map__controls">
            { slots.controls?.({
              zoom: navigation.scale.value,
              zoomIn: navigation.zoomIn,
              zoomOut: navigation.zoomOut,
              reset: navigation.reset,
            }) ?? (
              <>
                <VBtn
                  icon="$plus"
                  size="small"
                  aria-label={ t('$vuetify.map.zoomIn') }
                  disabled={ props.disabled || navigation.scale.value >= navigation.maximum.value }
                  onClick={ navigation.zoomIn }
                />
                <VBtn
                  icon="$minus"
                  size="small"
                  aria-label={ t('$vuetify.map.zoomOut') }
                  disabled={ props.disabled || navigation.scale.value <= navigation.minimum.value }
                  onClick={ navigation.zoomOut }
                />
                <VBtn
                  icon="svg:M3,3H9V5H5V9H3V3M15,3H21V9H19V5H15V3M3,15H5V19H9V21H3V15M19,15H21V21H15V19H19V15Z"
                  size="small"
                  aria-label={ t('$vuetify.map.reset') }
                  disabled={ props.disabled }
                  onClick={ navigation.reset }
                />
              </>
            )}
          </div>
        )}

        { (props.tooltip || slots.tooltip) && activeRegion.value && !props.disabled && !navigation.dragging.value && (
          <VTooltip
            modelValue
            activator={ active.value }
            text={ activeRegion.value.title }
            v-slots={{
              default: slots.tooltip
                ? () => slots.tooltip!({ ...activeRegion.value!, selected: selected.value === activeRegion.value?.id })
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
