// Styles
import './VPie.sass'

// Components
import { makeVPieSegmentProps, VPieSegment } from './VPieSegment'
import { VPieTooltip } from './VPieTooltip'
import { VAvatar } from '@/components/VAvatar'
import { VChip } from '@/components/VChip'
import { VChipGroup } from '@/components/VChipGroup'

// Composables
import { makeDensityProps } from '@/composables/density'

// Utilities
import { computed, ref, shallowRef, watch } from 'vue'
import { formatTextTemplate } from './utils'
import { clamp, genericComponent, pick, propsFactory } from '@/util'

// Types
import type { PropType, TransitionProps } from 'vue'
import type { PieItem, TextTemplate } from './types'

export type VPieSlots = {
  center: { total: number }
  legend: {
    isActive: (item: PieItem) => boolean
    toggle: (item: PieItem) => void
    items: PieItem[]
  }
  'legend-text': { item: PieItem }
  title: never
  tooltip: { item: PieItem }
}

export const makeVPieProps = propsFactory({
  title: String,
  items: {
    type: Array as PropType<Record<string, any> | { color?: string, pattern?: string }[]>,
    default: () => [],
  },
  palette: {
    type: Array as PropType<({ color?: string, pattern?: string } | string)[]>,
    default: () => [],
  },
  itemKey: {
    type: String,
    default: 'key',
  },
  itemValue: {
    type: String,
    default: 'value',
  },
  itemTitle: {
    type: String,
    default: 'title',
  },
  size: {
    type: Number,
    default: 250,
  },
  rotate: Number,
  innerCut: Number,
  hoverScale: {
    Number,
    default: 0.05,
  },
  gaugeCut: {
    type: Number,
    default: 0,
  },
  legend: {
    type: [Boolean, Object] as PropType<boolean | {
      position?: 'left' | 'top' | 'right' | 'bottom'
      textFormat?: TextTemplate
    }>,
    default: false,
  },
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | {
      titleFormat?: TextTemplate
      subtitleFormat?: TextTemplate
      transition?: string | boolean | TransitionProps
    }>,
    default: true,
  },
  ...makeDensityProps(),
  ...pick(makeVPieSegmentProps(), [
    'speed',
    'gap',
    'rounded',
    'hideSlice',
  ]),
}, 'VPie')

export const VPie = genericComponent<VPieSlots>()({
  name: 'VPie',

  props: makeVPieProps(),

  setup (props, { slots }) {
    const legendConfig = computed(() => ({
      visible: !!props.legend,
      position: 'bottom',
      textFormat: '[title]',
      ...(typeof props.legend === 'object' ? props.legend : {}),
    }))

    const legendCircleSize = computed(() => ({ default: 20, comfortable: 18, compact: 16 }[props.density ?? 'default']))
    const legendDirection = computed(() => ['left', 'right'].includes(legendConfig.value.position) ? 'vertical' : 'horizontal')

    const legendMode = computed<string>(() => !legendConfig.value.visible ? 'hidden' : legendConfig.value.position)

    const legendTextFormatFunction = computed(() => (item: PieItem) => {
      return typeof legendConfig.value.textFormat === 'function'
        ? legendConfig.value.textFormat(item)
        : formatTextTemplate(legendConfig.value.textFormat, item)
    })

    const arcs = computed<PieItem[]>(() => {
      // hidden items get (value: 0) to trigger disappearing animation
      return props.items
        .filter(Boolean)
        .map((item: any, index: number) => {
          return {
            key: item[props.itemKey],
            color: item.color ?? colorFromPalette(index),
            value: item[props.itemValue],
            title: String(item[props.itemTitle]),
            pattern: item.pattern ?? patternFromPalette(index),
            raw: item,
          } as PieItem
        })
    })

    const visibleItemsKeys = ref<PieItem['key'][]>([])

    watch(() => arcs.value.length, () => {
      // reset when number of items changes
      visibleItemsKeys.value = arcs.value.map(a => a.key)
    }, { immediate: true })

    const visibleItems = computed(() => {
      // hidden items get (value: 0) to trigger disappearing animation
      return arcs.value.map(item => {
        return visibleItemsKeys.value.includes(item.key)
          ? item
          : { ...item, value: 0 }
      })
    })

    const total = computed(() => visibleItems.value.reduce((sum, item) => sum + item.value, 0))

    const gaugeOffset = computed(() => `${props.size * 0.4 * (Math.min(180, props.gaugeCut ?? 0)) / 180}px`)
    const rotateDeg = computed(() => `${props.gaugeCut ? (180 + props.gaugeCut / 2) : (props.rotate ?? 0)}deg`)

    function arcOffset (index: number) {
      return visibleItems.value
        .slice(0, index)
        .reduce((acc, s) => acc + (total.value > 0 ? s.value / total.value : 0) * (360 - props.gaugeCut), 0)
    }

    function arcSize (v: number) { return v / total.value * (100 - props.gaugeCut / 3.6) }

    function colorFromPalette (index: number) {
      if (props.palette.length === 0) return undefined
      const paletteItem = props.palette[index % props.palette.length]
      return typeof paletteItem === 'object' ? paletteItem.color : paletteItem
    }

    function patternFromPalette (index: number) {
      if (props.palette.length === 0) return undefined
      const paletteItem = props.palette[index % props.palette.length]
      return typeof paletteItem === 'object' ? paletteItem.pattern : undefined
    }

    function isActive (item: PieItem) {
      return visibleItemsKeys.value.includes(item.key)
    }

    function toggle (item: PieItem) {
      if (visibleItemsKeys.value.includes(item.key)) {
        visibleItemsKeys.value = visibleItemsKeys.value.filter(x => x !== item.key)
      } else {
        visibleItemsKeys.value.push(item.key)
      }
    }

    const tooltipItem = shallowRef<PieItem | null>(null)
    const tooltipVisible = shallowRef(false)

    let mouseLeaveTimeout = null! as ReturnType<typeof setTimeout>

    function onMouseenter (item: PieItem) {
      if (!props.tooltip) return

      clearTimeout(mouseLeaveTimeout)
      tooltipVisible.value = true
      tooltipItem.value = item
    }

    function onMouseleave () {
      if (!props.tooltip) return

      clearTimeout(mouseLeaveTimeout)
      mouseLeaveTimeout = setTimeout(() => {
        tooltipVisible.value = false
        tooltipItem.value = null
      }, 100)
    }

    return () => {
      const itemProps = VPieSegment.filterProps(pick(props, [
        'speed',
        'gap',
        'rounded',
        'hideSlice',
      ]))

      const defaultTooltipTransition = {
        name: 'fade-transition',
        duration: 150,
      }

      const tooltipProps = {
        item: tooltipItem.value,
        modelValue: tooltipVisible.value,
        titleFormat: typeof props.tooltip === 'object' ? props.tooltip.titleFormat : '[title]',
        subtitleFormat: typeof props.tooltip === 'object' ? props.tooltip.subtitleFormat : '[value]',
        transition: typeof props.tooltip === 'object' ? props.tooltip.transition : defaultTooltipTransition,
      }

      return (
        <div
          class={[
            'v-pie',
            `v-pie--legend-${legendMode.value}`,
          ]}
          style={{
            '--v-pie-size': `${props.size}px`,
          }}
        >
          { slots.title?.() ?? (props.title && (<div class="v-pie__title">{ props.title }</div>)) }
          <div
            class="v-pie__content"
            style={{
              transform: `rotate(${rotateDeg.value})`,
              marginBottom: `calc(-1 * ${gaugeOffset.value})`,
              height: `${props.size}px`,
              width: `${props.size}px`,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
            >
              { arcs.value.map((item, index) => (
                <VPieSegment
                  { ...itemProps }
                  key={ item.key }
                  color={ item.color }
                  value={ isActive(item) ? arcSize(item.value) : 0 }
                  rotate={ arcOffset(index) }
                  pattern={ item.pattern }
                  innerCut={ props.innerCut }
                  hoverScale={ clamp(props.hoverScale, 0, 0.25) }
                  onMouseenter={ () => onMouseenter(item) }
                  onMouseleave={ () => onMouseleave() }
                />
              ))}
            </svg>

            <div
              class="v-pie__center-content"
              style={{
                transform: `rotate(-${rotateDeg.value})`,
                marginTop: `-${40 * props.gaugeCut / 360}%`,
              }}
            >
              <div style="pointer-events: auto">
                { slots.center?.({ total: total.value }) }
              </div>
            </div>
          </div>

          { legendConfig.value.visible && (
            <div class="v-pie__legend" key="legend">
              { slots.legend?.({ isActive, toggle, items: arcs.value }) ?? (
                <VChipGroup
                  column
                  multiple
                  model-value={ visibleItemsKeys.value }
                  direction={ legendDirection.value }
                >
                  { arcs.value.map(item => (
                    <VChip
                      key={ item.key }
                      density={ props.density }
                      class={{ 'opacity-40': !isActive(item) }}
                      onClick={ () => toggle(item) }
                      v-slots={{
                        prepend: () => (
                          <VAvatar
                            class="v-pie__legend__circle"
                            color={ item.color }
                            border="thin opacity-25"
                            size={ legendCircleSize.value }
                            start
                          >
                            { item.pattern && (
                              <svg height="40" width="40">
                                <rect width="40" height="40" fill={ item.pattern } />
                              </svg>
                            )}
                          </VAvatar>
                        ),
                        default: () => (
                          <div class="v-pie__legend__text">
                            { slots['legend-text']?.({ item }) ?? legendTextFormatFunction.value(item) }
                          </div>
                        ),
                      }}
                    />
                  ))}
                </VChipGroup>
              )}
            </div>
          )}
          { !!props.tooltip && (
            <VPieTooltip
              { ...tooltipProps }
              v-slots:default={ slots.tooltip }
            />
          )}
        </div>
      )
    }
  },
})

export type VPie = InstanceType<typeof VPie>
