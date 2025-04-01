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
import { computed, reactive, ref, watch } from 'vue'
import { formatTextTemplate } from './utils'
import { clamp, genericComponent, pick, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { PieItem, TextTemplate } from './types'

export type VPieSlots = {
  'center-content': { total: number }
  legend: { isActive: (item: PieItem) => boolean, toggle: (item: PieItem) => void }
  'legend-text': { item: PieItem }
  title: never
  tooltip: { item: PieItem }
}

export const makeVPieProps = propsFactory({
  title: String,
  items: {
    type: Array as PropType<PieItem[]>,
    default: () => [],
  },
  size: {
    type: Number,
    default: 250,
  },
  rotate: Number,
  width: Number,
  hoverScale: Number,
  gaugeCut: {
    type: Number,
    default: 0,
  },
  legend: {
    type: [Boolean, Object] as PropType<boolean | {
      visible?: boolean
      position?: 'left' | 'top' | 'right' | 'bottom'
      textFormat?: TextTemplate<PieItem>
    }>,
    default: false,
  },
  formats: {
    type: Object as PropType<{
      tooltipTitle?: TextTemplate<PieItem>
      tooltipSubtitle?: TextTemplate<PieItem>
    }>,
    default: () => ({
      tooltipTitle: '[title]',
      tooltipSubtitle: '[value]',
    }),
  },
  ...makeDensityProps(),
  ...pick(makeVPieSegmentProps(), [
    'speed',
    'padAngle',
    'rounded',
    'hideSlice',
  ]),
}, 'VPie')

export const VPie = genericComponent<VPieSlots>()({
  name: 'VPie',

  props: makeVPieProps(),

  setup (props, { slots }) {
    const legendConfig = computed(() => ({
      visible: !!props.legend && (props.legend as any)?.visible !== false,
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

    const visibleItemsKeys = ref<PieItem['key'][]>([])

    watch(() => props.items.length, () => {
      // reset when number of items changes
      visibleItemsKeys.value = props.items.map(item => item.key)
    }, { immediate: true })

    const visibleItems = computed(() => {
      // hidden items get (value: 0) to trigger disappearing animation
      return props.items.map(item => {
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
        .reduce((acc, s) => acc + (s.value / total.value) * (360 - props.gaugeCut), 0)
    }

    function arcSize (v: number) { return v / total.value * (100 - props.gaugeCut / 3.6) }

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

    const tooltipProps = reactive({
      modelValue: false,
      target: [0, 0] satisfies [x: number, y: number],
      item: null as PieItem | null,
    })

    function onMousemove ({ clientX, clientY }: MouseEvent) {
      tooltipProps.target = [clientX, clientY]
    }

    let mouseLeaveTimeout = null! as ReturnType<typeof setTimeout>

    function onMouseenter (item: PieItem) {
      clearTimeout(mouseLeaveTimeout)
      tooltipProps.modelValue = true
      tooltipProps.item = item
    }

    function onMouseleave () {
      clearTimeout(mouseLeaveTimeout)
      mouseLeaveTimeout = setTimeout(() => tooltipProps.modelValue = false, 100)
    }

    return () => {
      const itemProps = VPieSegment.filterProps(pick(props, [
        'speed',
        'padAngle',
        'rounded',
        'hideSlice',
      ]))

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
              onMousemove={ onMousemove }
            >
              { props.items.map((item, index) => (
                <VPieSegment
                  { ...itemProps }
                  key={ item.key }
                  color={ item.color }
                  value={ isActive(item) ? arcSize(item.value) : 0 }
                  rotate={ arcOffset(index) }
                  pattern={ item.pattern }
                  width={ props.width ?? 100 }
                  zoom={ clamp(props.hoverScale ?? 0.05, 0, 0.25) }
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
                { slots['center-content']?.({ total: total.value }) }
              </div>
            </div>
          </div>

          { legendConfig.value.visible && (
            <div class="v-pie__legend" key="legend">
              { slots.legend?.({ isActive, toggle }) ?? (
                <VChipGroup
                  column
                  multiple
                  model-value={ visibleItemsKeys.value }
                  direction={ legendDirection.value }
                >
                  { props.items.map(item => (
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
          <VPieTooltip
            { ...tooltipProps }
            title-format={ props.formats.tooltipTitle }
            subtitle-format={ props.formats.tooltipSubtitle }
            v-slots:default={ slots.tooltip }
          />
        </div>
      )
    }
  },
})

export type VPie = InstanceType<typeof VPie>
