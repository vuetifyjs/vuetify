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
import { clamp, genericComponent, pick, propsFactory } from '@/util'
import { formatTextTemplate } from './utils'

// Types
import type { PropType } from 'vue'
import type { TextTemplate, VPieItem } from './types'

export type VPieSlots = {
  'center-content': { total: number }
  legend: { isActive: (item: VPieItem) => boolean, toggle: (item: VPieItem) => void }
  'legend-text': { segment: VPieItem }
  title: never
  tooltip: { segment: VPieItem }
}

export const makeVPieProps = propsFactory({
  title: String,
  item: {
    type: Array as PropType<VPieItem[]>,
    default: () => [],
  },
  itemKey: {
    type: String as PropType<keyof VPieItem>,
    default: 'id',
  },
  size: {
    type: Number,
    default: 250,
  },
  rotate: Number,
  hideLegend: Boolean,
  width: Number,
  hoverScale: Number,
  legendPosition: {
    type: String as PropType<'left' | 'top' | 'right' | 'bottom'>,
    default: 'bottom',
    validator: (v: any) => ['left', 'top', 'right', 'bottom'].includes(v),
  },
  formats: {
    type: Object as PropType<{
      legendText: TextTemplate<VPieItem>,
      tooltipTitle: TextTemplate<VPieItem>,
      tooltipSubtitle: TextTemplate<VPieItem>,
    }>,
    default: {
      legendText: '[title]',
      tooltipTitle: '[title]',
      tooltipSubtitle: '[value]',
    }
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
    const legendCircleSize = computed(() => ({ default: 20, comfortable: 18, compact: 16 }[props.density ?? 'default']))
    const legendDirection = computed(() => ['left', 'right'].includes(props.legendPosition) ? 'vertical' : 'horizontal')

    const visibleItemsKeys = ref<number[]>([])

    watch(() => props.item.length, () => {
      // reset when number of items changes
      visibleItemsKeys.value = props.item.map(item => item[props.itemKey])
    }, { immediate: true })

    const visibleItems = computed(() => {
      // hidden items get (value: 0) to trigger disappearing animation
      return props.item.map(item => {
        return visibleItemsKeys.value.includes(item[props.itemKey])
          ? item
          : { ...item, value: 0 }
      })
    })

    const total = computed(() => visibleItems.value.reduce((sum, item) => sum + item.value, 0))

    function arcOffset (index: number) {
      return visibleItems.value
        .slice(0, index)
        .reduce((acc, s) => acc + (s.value / total.value) * 360, 0)
    }

    function arcSize (v: number) { return v / total.value * 100 }

    function isActive (item: VPieItem) {
      return visibleItemsKeys.value.includes(item[props.itemKey])
    }

    function toggle (item: VPieItem) {
      if (visibleItemsKeys.value.includes(item[props.itemKey])) {
        visibleItemsKeys.value = visibleItemsKeys.value.filter(x => x !== item[props.itemKey])
      } else {
        visibleItemsKeys.value.push(item[props.itemKey])
      }
    }

    const legendTextFormatFunction = computed(() => (item: VPieItem) => {
      return typeof props.formats.legendText === 'function'
        ? props.formats.legendText(item)
        : formatTextTemplate(props.formats.legendText, item)
    })

    const tooltipProps = reactive({
      modelValue: false,
      target: [0, 0] satisfies [x: number, y: number],
      item: null as VPieItem | null,
    })

    function onMousemove ({ clientX, clientY }: MouseEvent) {
      tooltipProps.target = [clientX, clientY]
    }

    let mouseLeaveTimeout = null! as ReturnType<typeof setTimeout>

    function onMouseenter (item: VPieItem) {
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
        'hideSlice'
      ]))

      return (
        <div
          class={[
            'v-pie',
            `v-pie--legend-${props.legendPosition}`,
          ]}
          style={{
            '--v-pie-size': `${props.size}px`,
          }}
        >
          { slots.title?.() ?? (props.title && (<div class="v-pie__title">{ props.title }</div>)) }
          <div
            class="v-pie__content"
            style={{
              transform: `rotate(${props.rotate || 0}deg)`,
              height: `${props.size}px`,
              width: `${props.size}px`,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              onMousemove={ onMousemove }
            >
              { props.item.map((item, index) => (
                <VPieSegment
                  { ...itemProps }
                  key={ item[props.itemKey] }
                  color={ item.color }
                  value={ isActive(item) ? arcSize(item.value) : 0 }
                  rotate={ arcOffset(index) }
                  pattern={ item.pattern }
                  width={ props.width ? props.width / props.size : 1 }
                  zoom={ clamp(props.hoverScale ?? 0.05, 0, 0.25) }
                  onMouseenter={ () => onMouseenter(item) }
                  onMouseleave={ () => onMouseleave() }
                />
              ))}
            </svg>

            <div
              class="v-pie__center-content"
              style={{
                transform: `rotate(-${props.rotate || 0}deg)`,
              }}
            >
              <div style="pointer-events: auto">
                { slots['center-content']?.({ total: total.value }) }
              </div>
            </div>
          </div>

          { !props.hideLegend && (
            <div class="v-pie__legend">
              { slots.legend?.({ isActive, toggle }) ?? (
                <VChipGroup
                  column
                  multiple
                  model-value={ visibleItemsKeys.value }
                  direction={ legendDirection.value }
                >
                  { props.item.map(item => (
                    <VChip
                      key={ item[props.itemKey] }
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
                            { slots['legend-text']?.({ segment: item }) ?? legendTextFormatFunction.value(item) }
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
