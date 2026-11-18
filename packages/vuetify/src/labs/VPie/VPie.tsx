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
import { useLocale } from '@/composables/locale'

// Directives
import vClickOutside from '@/directives/click-outside'

// Utilities
import { computed, shallowRef, toRef, watch } from 'vue'
import { formatTextTemplate } from './utils'
import { convertToUnit, genericComponent, isFunction, isObject, pick, propsFactory } from '@/util'

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
  maxVisibleItems: Number,
  otherColor: {
    type: String,
    default: 'color-mix(in srgb, rgb(var(--v-theme-primary)) 50%, rgb(var(--v-theme-error)))',
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
    const { t } = useLocale()
    function isValidItemKey (key: unknown): key is PieItem['key'] {
      return typeof key === 'string' || typeof key === 'symbol' || (typeof key === 'number' && Number.isFinite(key))
    }

    function isValidItemValue (value: unknown): value is number {
      return typeof value === 'number' && Number.isFinite(value) && value >= 0
    }

    const legendConfig = computed(() => ({
      visible: !!props.legend,
      position: 'bottom',
      textFormat: '[title]',
      ...(isObject(props.legend) ? props.legend : {}),
    }))

    const { colorClasses, colorStyles } = useColor(() => ({ background: props.bgColor }))
    const textColorStyles = toRef(() => pick(colorStyles.value, ['color', 'caretColor']))

    const legendAvatarSize = toRef(() => ({ default: 20, comfortable: 18, compact: 16 }[props.density ?? 'default']))
    const legendDirection = toRef(() => ['left', 'right'].includes(legendConfig.value.position) ? 'vertical' : 'horizontal')

    const legendMode = toRef(() => !legendConfig.value.visible ? 'hidden' : legendConfig.value.position)

    const legendTextFormatFunction = toRef(() => (item: PieItem) => {
      return isFunction(legendConfig.value.textFormat)
        ? legendConfig.value.textFormat(item)
        : formatTextTemplate(legendConfig.value.textFormat, item)
    })

    const fallbackItemKeys = new Map<number, symbol>()
    function getFallbackItemKey (index: number) {
      let key = fallbackItemKeys.get(index)
      if (!key) {
        key = Symbol(`v-pie-item-${index}`)
        fallbackItemKeys.set(index, key)
      }
      return key
    }

    const arcs = computed<PieItem[]>(() => {
      // hidden items get (value: 0) to trigger disappearing animation
      const keys = new Set<PieItem['key']>()
      const items: PieItem[] = []

      props.items.forEach((item: any, index: number) => {
        if (!item) return

        const rawKey = item[props.itemKey]
        const key = isValidItemKey(rawKey) && !keys.has(rawKey)
          ? rawKey
          : getFallbackItemKey(index)
        keys.add(key)

        const value = item[props.itemValue]
        items.push({
          key,
          color: item.color ?? colorFromPalette(index),
          value: isValidItemValue(value) ? value : 0,
          title: String(item[props.itemTitle]),
          pattern: item.pattern ?? patternFromPalette(index),
          raw: item,
        } as PieItem)
      })

      return items
    })

    const visibleItemsKeys = shallowRef<PieItem['key'][]>([])

    let previousArcKeys: PieItem['key'][] = []
    watch(() => arcs.value.map(item => item.key), keys => {
      const keysChanged = keys.length !== previousArcKeys.length ||
        keys.some((key, index) => !Object.is(key, previousArcKeys[index]))

      if (keysChanged) visibleItemsKeys.value = keys
      previousArcKeys = keys
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

    const otherItemKey = Symbol('v-pie-other')
    const chartItems = computed(() => {
      const maxVisibleItems = props.maxVisibleItems
      if (
        typeof maxVisibleItems !== 'number' ||
        !Number.isInteger(maxVisibleItems) ||
        maxVisibleItems < 1 ||
        arcs.value.length <= maxVisibleItems
      ) {
        return visibleItems.value
      }

      const largestItems = new Set(
        [...arcs.value]
          .sort((a, b) => b.value - a.value)
          .slice(0, maxVisibleItems)
          .map(item => item.key),
      )
      const individualItems = visibleItems.value.filter(item => largestItems.has(item.key))
      const overflowItems = visibleItems.value.filter(item => !largestItems.has(item.key))
      const firstOverflowItem = overflowItems[0]!

      return [
        ...individualItems,
        {
          ...firstOverflowItem,
          key: otherItemKey,
          title: t('$vuetify.vPie.other'),
          value: overflowItems.reduce((sum, item) => sum + item.value, 0),
          color: props.otherColor,
          pattern: undefined,
          raw: undefined,
        },
      ]
    })

    const gaugeCut = toRef(() => Number(props.gaugeCut ?? 0))
    const gaugeOffset = computed(() => (1 - Math.cos(Math.PI * Math.min(90, gaugeCut.value / 2) / 180)) / 2)
    const rotateDeg = computed(() => `${gaugeCut.value ? (180 + gaugeCut.value / 2) : (props.rotate ?? 0)}deg`)

    function arcOffset (index: number) {
      return chartItems.value
        .slice(0, index)
        .reduce((acc, s) => acc + (total.value > 0 ? s.value / total.value : 0) * (360 - gaugeCut.value), 0)
    }

    function arcSize (v: number) { return total.value > 0 ? v / total.value * (100 - gaugeCut.value / 3.6) : 0 }

    function colorFromPalette (index: number) {
      if (props.palette.length === 0) return undefined
      const paletteItem = props.palette[index % props.palette.length]
      return isObject(paletteItem) ? paletteItem.color : paletteItem
    }

    function patternFromPalette (index: number) {
      if (props.palette.length === 0) return undefined
      const paletteItem = props.palette[index % props.palette.length]
      return isObject(paletteItem) ? paletteItem.pattern : undefined
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

    const activeItemKey = shallowRef<PieItem['key'] | null>(null)
    const tooltipItem = shallowRef<PieItem | null>(null)
    const tooltipVisible = shallowRef(false)
    const tooltipTarget = shallowRef<[x: number, y: number]>([0, 0])

    let mouseLeaveTimeout = null! as ReturnType<typeof setTimeout>

    function setItemActive (item: PieItem, active: boolean) {
      activeItemKey.value = active ? item.key : null

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
      activeItemKey.value = null
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
        titleFormat: isObject(props.tooltip) ? props.tooltip.titleFormat : '[title]',
        subtitleFormat: isObject(props.tooltip) ? props.tooltip.subtitleFormat : '[value]',
        transition: isObject(props.tooltip) ? props.tooltip.transition : defaultTooltipTransition,
        offset: isObject(props.tooltip) ? props.tooltip.offset : 16,
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
          size: isObject(props.tooltip) ? (props.tooltip.avatarSize ?? 28) : 28,
        },
      }

      const avatarSlot = ({ item }: { item: PieItem }) => (
        <VAvatar
          color={ item.color?.startsWith('color-mix(') ? undefined : item.color }
          style={{ backgroundColor: item.color }}
          start
        >
          { item.pattern && (
            <svg height="40" width="40">
              <rect width="40" height="40" fill={ item.pattern } />
            </svg>
          )}
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
              { chartItems.value.map((item, index) => (
                <VPieSegment
                  { ...segmentProps }
                  key={ item.key }
                  active={ activeItemKey.value === item.key }
                  color={ item.color }
                  value={ arcSize(item.value) }
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

          { legendConfig.value.visible && (
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
          )}
          { !!props.tooltip && (
            <VDefaultsProvider defaults={ tooltipDefaults }>
              <VPieTooltip
                { ...tooltipProps }
                v-slots={{
                  default: slots.tooltip ? slotProps => slots.tooltip?.({ ...slotProps, total: total.value }) : undefined,
                  prepend: avatarSlot,
                }}
              />
            </VDefaultsProvider>
          )}
        </div>
      )
    }
  },
})

export type VPie = InstanceType<typeof VPie>
