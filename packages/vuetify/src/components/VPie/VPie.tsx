// Styles
import './VPie.sass'

// Components
import { makeVPieSegmentProps, VPieSegment } from './VPieSegment'
import { VAvatar } from '@/components/VAvatar'
import { VChip } from '@/components/VChip'
import { VChipGroup } from '@/components/VChipGroup'
import { VOverlay } from '@/components/VOverlay'
import { VTooltip } from '@/components/VTooltip'

// Composables
import { makeDensityProps } from '@/composables/density'

// Utilities
import { computed, ref, watch } from 'vue'
import { clamp, genericComponent, omit, pick, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VPieSeries } from './types'
import type { VPieSegmentTooltipSlotProps } from './VPieSegment'

export type VPieSlots = {
  'center-content': { total: number }
  'legend-text': { segment: VPieSeries }
  title: never
  'tooltip': { visible: boolean, x: number, y: number, segment: VPieSeries }
}

export const makeVPieProps = propsFactory({
  title: String,
  series: {
    type: Array as PropType<VPieSeries[]>,
    default: () => [],
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
  ...makeDensityProps(),
  ...pick(makeVPieSegmentProps(), [
    'speed',
    'hideSlice',
  ]),
}, 'VPie')

export const VPie = genericComponent<VPieSlots>()({
  name: 'VPie',

  props: makeVPieProps(),

  setup (props, { slots }) {
    const legendCircleSize = computed(() => ({ default: 20, comfortable: 18, compact: 16 }[props.density ?? 'default']))
    const legendDirection = computed(() => ['left', 'right'].includes(props.legendPosition) ? 'vertical' : 'horizontal')

    const enabledSeries = ref<number[]>([])

    watch(() => props.series.length, () => {
      // reset when number of series changes
      enabledSeries.value = props.series.map((_, index) => index)
    }, { immediate: true })

    const visibleSeries = computed(() => {
      // hidden series get (value: 0) to trigger disappearing animation
      return props.series.map((series, index) => {
        return enabledSeries.value.includes(index)
          ? series
          : { ...series, value: 0 }
      })
    })

    const total = computed(() => visibleSeries.value.reduce((sum, item) => sum + item.value, 0))

    function arcOffset (index: number) {
      return visibleSeries.value
        .slice(0, index)
        .reduce((acc, s) => acc + (s.value / total.value) * 360, 0)
    }

    function arcSize (v: number) { return v / total.value * 100 }

    return () => {
      const segmentProps = VPieSegment.filterProps(omit(props, ['width']))

      return (
        <div
          class={[
            'v-pie',
            `v-pie--legend-${props.legendPosition}`,
          ]}
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
              { visibleSeries.value.map((s, index) => (
                <VPieSegment
                  { ...segmentProps }
                  key={ s.id }
                  color={ s.color }
                  value={ arcSize(s.value) }
                  rotate={ arcOffset(index) }
                  pattern={ s.pattern }
                  width={ props.width ? props.width / props.size : 1 }
                  zoom={ clamp(props.hoverScale ?? 0.05, 0, 0.25) }
                  v-slots={{
                    tooltip: ({ visible, x, y }: VPieSegmentTooltipSlotProps) => (
                      slots.tooltip?.({ visible, x, y, segment: s }) ?? (
                        <VTooltip
                          absolute={ false }
                          model-value={ visible }
                          style={{ transform: `translate(${x}px,${y}px)` }}
                          text={ `${s.title}: ${s.value}` }
                        />
                      )
                    ),
                  }}
                />
              ))}

            <VOverlay
              style={{
                'pointer-events': 'none',
                transform: `rotate(-${props.rotate || 0}deg)`,
              }}
              model-value
              persistent
              contained
              opacity={ 0 }
              content-class="v-pie__center-content"
            >
              <div style="pointer-events: auto">
                { slots['center-content']?.({ total: total.value }) }
              </div>
            </VOverlay>
          </div>

          { !props.hideLegend && (
            <div
              class="v-pie__legend"
              style={{ 'max-width': `${props.size}px` }}
            >
            <VChipGroup
              column
              multiple
              v-model={ enabledSeries.value }
              direction={ legendDirection.value }
            >
              { props.series.map((s, index) => (
                <VChip
                  key={ index }
                  density={ props.density }
                  class={{ 'opacity-40': !enabledSeries.value.includes(index) }}
                  v-slots={{
                    prepend: () => (
                      <VAvatar
                        class="v-pie__legend__circle"
                        color={ s.color }
                        border="thin opacity-25"
                        size={ legendCircleSize.value }
                        start
                      >
                        { s.pattern && (
                          <svg height="40" width="40">
                            <rect width="40" height="40" fill={ s.pattern } />
                          </svg>
                        )}
                      </VAvatar>
                    ),
                    default: () => (
                      <div class="v-pie__legend__text">
                        { slots['legend-text']?.({ segment: s }) ?? s.title }
                      </div>
                    ),
                  }}
                />
              ))}
            </VChipGroup>
          </div>
          )}
        </div>
      )
    }
  },
})

export type VPie = InstanceType<typeof VPie>
