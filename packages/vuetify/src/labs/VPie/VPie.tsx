// Styles
import './VPie.sass'

// Components
import { makeVPieSegmentProps, VPieSegment } from './VPieSegment'
import { VPieTooltip } from './VPieTooltip'
import { VAvatar } from '@/components/VAvatar'
import { VChip } from '@/components/VChip'
import { VChipGroup } from '@/components/VChipGroup'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { useColor } from '@/composables/color'
import { makeDensityProps } from '@/composables/density'

// Directives
import vClickOutside from '@/directives/click-outside'

// Utilities
import { computed, shallowRef, toRef, watch } from 'vue'
import { formatTextTemplate } from './utils'
import { convertToUnit, genericComponent, pick, propsFactory } from '@/util'

// Types
import type { PropType, TransitionProps } from 'vue'
import type { PieItem, TextTemplate } from './types'

export type VPieSlots = {
  center: { total: number }
  legend: {
    isActive: (item: PieItem) => boolean
    toggle: (item: PieItem) => void
    items: PieItem[]
    total: number
  }
  'legend-text': {
    item: PieItem
    total: number
  }
  title: never
  tooltip: {
    item: PieItem
    total: number
  }
}

export const makeVPieProps = propsFactory({
  title: String,
  bgColor: String,
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
    type: [Number, String],
    default: 250,
  },
  rotate: [Number, String],
  gaugeCut: [Number, String],
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
      avatarSize?: number
      transition?: string | boolean | TransitionProps
      offset?: number
    }>,
    default: false,
  },

  ...makeDensityProps(),
  ...pick(makeVPieSegmentProps(), [
    'animation',
    'gap',
    'rounded',
    'innerCut',
    'hoverScale',
    'hideSlice',
    'reveal',
  ]),
}, 'VPie')

export const VPie = genericComponent<VPieSlots>()({
  name: 'VPie',

  directives: { vClickOutside },

  props: makeVPieProps(),

  setup (props, { slots }) {
    const legendConfig = computed(() => ({
      visible: !!props.legend,
      position: 'bottom',
      textFormat: '[title]',
      ...(typeof props.legend === 'object' ? props.legend : {}),
    }))

    const { colorClasses, colorStyles } = useColor(() => ({ background: props.bgColor }))
    const textColorStyles = toRef(() => pick(colorStyles.value, ['color', 'caretColor']))

    const legendAvatarSize = toRef(() => ({ default: 20, comfortable: 18, compact: 16 }[props.density ?? 'default']))
    const legendDirection = toRef(() => ['left', 'right'].includes(legendConfig.value.position) ? 'vertical' : 'horizontal')

    const legendMode = toRef(() => !legendConfig.value.visible ? 'hidden' : legendConfig.value.position)

    const legendTextFormatFunction = toRef(() => (item: PieItem) => {
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

    const visibleItemsKeys = shallowRef<PieItem['key'][]>([])

    watch(() => arcs.value.length, () => {
      // reset when number of items changes
      visibleItemsKeys.value = arcs.value.map(a => a.key)
    }, { immediate: true })

    const visibleItems = computed(() => {
      // hidden items get (value: 0) to trigger disappearing animation
      return arcs.value.map(item => {
        return isVisible(item)
          ? item
          : { ...item, value: 0 }
      })
    })

    const total = computed(() => visibleItems.value.reduce((sum, item) => sum + item.value, 0))

    const gaugeCut = toRef(() => Number(props.gaugeCut ?? 0))
    const gaugeOffset = computed(() => (1 - Math.cos(Math.PI * Math.min(90, gaugeCut.value / 2) / 180)) / 2)
    const rotateDeg = computed(() => `${gaugeCut.value ? (180 + gaugeCut.value / 2) : (props.rotate ?? 0)}deg`)

    function arcOffset (index: number) {
      return visibleItems.value
        .slice(0, index)
        .reduce((acc, s) => acc + (total.value > 0 ? s.value / total.value : 0) * (360 - gaugeCut.value), 0)
    }

    function arcSize (v: number) { return v / total.value * (100 - gaugeCut.value / 3.6) }

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

    function isVisible (item: PieItem) {
      return visibleItemsKeys.value.includes(item.key)
    }

    function toggle (item: PieItem) {
      if (isVisible(item)) {
        visibleItemsKeys.value = visibleItemsKeys.value.filter(x => x !== item.key)
      } else {
        visibleItemsKeys.value = [...visibleItemsKeys.value, item.key]
      }
    }

    const tooltipItem = shallowRef<PieItem | null>(null)
    const tooltipVisible = shallowRef(false)
    const tooltipTarget = shallowRef<[x: number, y: number]>([0, 0])

    let mouseLeaveTimeout = null! as ReturnType<typeof setTimeout>

    function setItemActive (item: PieItem, active: boolean) {
      arcs.value.forEach(a => a.isActive = a.key === item.key && active)

      if (props.tooltip) {
        setTooltip(item, active)
      }
    }

    function setTooltip (item: PieItem, active: boolean) {
      clearTimeout(mouseLeaveTimeout)

      if (active) {
        tooltipVisible.value = true
        tooltipItem.value = item
      } else {
        mouseLeaveTimeout = setTimeout(() => {
          tooltipVisible.value = false

          // intentionally reusing timeout here
          mouseLeaveTimeout = setTimeout(() => {
            tooltipItem.value = null
          }, 500)
        }, 100)
      }
    }

    let frame = -1
    function onSvgMousemove ({ clientX, clientY }: MouseEvent) {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        tooltipTarget.value = [clientX, clientY]
      })
    }

    function onSvgTouchstart ({ touches }: TouchEvent) {
      if (!touches) return
      const { clientX, clientY } = touches[0]
      tooltipTarget.value = [clientX, clientY]
    }

    function onSvgClickOutside () {
      arcs.value.forEach(a => a.isActive = false)
      tooltipVisible.value = false
    }

    return () => {
      const segmentProps = pick(props, [
        'animation',
        'gap',
        'rounded',
        'hideSlice',
        'reveal',
        'innerCut',
        'hoverScale',
      ])

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
        offset: typeof props.tooltip === 'object' ? props.tooltip.offset : 16,
        target: tooltipTarget.value,
      }

      const legendDefaults = {
        VChipGroup: {
          direction: legendDirection.value,
        },
        VChip: {
          density: props.density,
        },
        VAvatar: {
          size: legendAvatarSize.value,
        },
      }

      const tooltipDefaults = {
        VAvatar: {
          size: typeof props.tooltip === 'object' ? (props.tooltip.avatarSize ?? 28) : 28,
        },
      }

      const avatarSlot = ({ item }: { item: PieItem }) => (
        <VAvatar color={ item.color } start>
          { item.pattern ? (
            <svg height="40" width="40">
              <rect width="40" height="40" fill={ item.pattern } />
            </svg>
          ) : undefined }
        </VAvatar>
      )

      return (
        <div
          class={[
            'v-pie',
            `v-pie--legend-${legendMode.value}`,
          ]}
          style={{
            '--v-pie-size': convertToUnit(props.size),
          }}
        >
          { slots.title?.() ?? (props.title && (<div class="v-pie__title">{ props.title }</div>)) }
          <div
            class={[
              'v-pie__content',
              colorClasses.value,
            ]}
            style={[
              {
                transform: `rotate(${rotateDeg.value})`,
                marginBottom: `calc(-1 * ${convertToUnit(props.size)} * ${gaugeOffset.value})`,
              },
              textColorStyles.value,
            ]}
          >
            <div
              class={[
                'v-pie__content-underlay',
                colorClasses.value,
              ]}
              style={ colorStyles.value }
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              class="v-pie__segments"
              onMousemove={ onSvgMousemove }
              onTouchstart={ onSvgTouchstart }
              v-click-outside={{ handler: onSvgClickOutside }}
            >
              { arcs.value.map((item, index) => (
                <VPieSegment
                  { ...segmentProps }
                  key={ item.key }
                  active={ item.isActive }
                  color={ item.color }
                  value={ isVisible(item) ? arcSize(item.value) : 0 }
                  rotate={ arcOffset(index) }
                  pattern={ item.pattern }
                  onUpdate:active={ val => setItemActive(item, val) }
                  onTouchend={ () => setItemActive(item, true) }
                />
              ))}
            </svg>

            <div
              class="v-pie__center-content"
              style={{
                transform: `translate(-50%, -50%)
                  rotate(-${rotateDeg.value})
                  translateY(calc(-100% * ${gaugeOffset.value}))`,
              }}
            >
              <div>
                { slots.center?.({ total: total.value }) }
              </div>
            </div>
          </div>

          { legendConfig.value.visible ? (
            <VDefaultsProvider key="legend" defaults={ legendDefaults }>
              <div class="v-pie__legend">
                { slots.legend?.({ isActive: isVisible, toggle, items: arcs.value, total: total.value }) ?? (
                  <VChipGroup
                    column
                    multiple
                    v-model={ visibleItemsKeys.value }
                  >
                    { arcs.value.map(item => (
                      <VChip
                        value={ item.key }
                        v-slots={{
                          prepend: () => avatarSlot({ item }),
                          default: () => (
                            <div class="v-pie__legend__text">
                              { slots['legend-text']?.({ item, total: total.value }) ?? legendTextFormatFunction.value(item) }
                            </div>
                          ),
                        }}
                      />
                    ))}
                  </VChipGroup>
                )}
              </div>
            </VDefaultsProvider>
          ) : undefined }
          { props.tooltip ? (
            <VDefaultsProvider defaults={ tooltipDefaults }>
              <VPieTooltip
                { ...tooltipProps }
                v-slots={{
                  default: slots.tooltip ? slotProps => slots.tooltip?.({ ...slotProps, total: total.value }) : undefined,
                  prepend: avatarSlot,
                }}
              />
            </VDefaultsProvider>
          ) : undefined }
        </div>
      )
    }
  },
})

export type VPie = InstanceType<typeof VPie>
