// Styles
import './VSparklineGroup.sass'

// Components
import { createSparklineGroup, VSparklineGroupSymbol } from './sparklineGroup'
import { VChartAxis } from './VChartAxis'
import { VAvatar } from '@/components/VAvatar'
import { VTooltip } from '@/components/VTooltip'

// Composables
import { makeComponentProps } from '@/composables/component'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, provide, ref, shallowRef, toRef, watch } from 'vue'
import { convertToUnit, genericComponent, isObject, propsFactory, useRender } from '@/util'
import { easingPatterns, useTransition } from '@/util/easing'

// Types
import type { PropType } from 'vue'
import type { ChartAxisConfig } from './scale'
import type { SparklineGroupItem } from './sparklineGroup'
import type { ClassValue } from '@/composables/component'

export type SparklineGroupTooltipConfig = {
  location?: 'left' | 'right'
  offset?: number
  class?: ClassValue
}

export type VSparklineGroupSlots = {
  default: never
  tooltip: { index: number, items: SparklineGroupItem[] }
}

export const makeVSparklineGroupProps = propsFactory({
  height: {
    type: [Number, String],
    default: 200,
  },
  min: [Number, String],
  max: [Number, String],
  interactive: Boolean,
  tooltip: {
    type: [Boolean, Object] as PropType<boolean | SparklineGroupTooltipConfig>,
    default: false,
  },
  xAxis: [Boolean, Object] as PropType<boolean | ChartAxisConfig>,
  yAxis: [Boolean, Object] as PropType<boolean | ChartAxisConfig>,

  ...makeComponentProps(),
}, 'VSparklineGroup')

export const VSparklineGroup = genericComponent<VSparklineGroupSlots>()({
  name: 'VSparklineGroup',

  props: makeVSparklineGroupProps(),

  setup (props, { slots }) {
    const plotEl = shallowRef<HTMLElement>()
    const width = shallowRef(0)
    const xAxis = toRef(() => isObject(props.xAxis) ? props.xAxis : {})
    const yAxis = toRef(() => isObject(props.yAxis) ? props.yAxis : {})

    useResizeObserver(plotEl, entries => {
      if (!entries.length) return
      width.value = entries[0].contentRect.width
    })

    const group = createSparklineGroup({
      min: () => props.min == null ? undefined : Number(props.min),
      max: () => props.max == null ? undefined : Number(props.max),
      xAxis,
      yAxis,
      width,
      height: () => parseFloat(props.height),
      interactive: () => props.interactive,
    })

    provide(VSparklineGroupSymbol, group.provided)

    const tooltipConfig = toRef(() => ({
      location: 'right' as 'left' | 'right',
      offset: 8,
      ...(isObject(props.tooltip) ? props.tooltip : {}),
    }))

    let jump = true
    const cursorTarget = shallowRef(0)
    // sync: `jump` must be set before useTransition's watcher reads the duration
    watch(group.fraction, (value, previous) => {
      if (value === null) return
      jump = previous === null
      cursorTarget.value = value
    }, { flush: 'sync' })
    const cursor = useTransition(cursorTarget, () => ({
      duration: jump ? 0 : 150,
      transition: easingPatterns.easeOutQuad,
    }))

    const tooltipRef = ref<VTooltip>()

    const tooltipSide = computed(() => {
      const { location, offset } = tooltipConfig.value
      const width = tooltipRef.value?.contentEl?.offsetWidth
      if (group.fraction.value === null || !plotEl.value || !width) return location
      const plotWidth = plotEl.value.clientWidth
      const x = group.fraction.value * plotWidth
      const room = location === 'right' ? plotWidth - x : x
      if (room >= width + offset) return location
      return location === 'right' ? 'left' : 'right'
    })

    const tooltipTarget = computed<[number, number] | undefined>(() => {
      if (group.fraction.value === null || !plotEl.value) return undefined
      const rect = plotEl.value.getBoundingClientRect()
      return [rect.left + cursor.value * rect.width, rect.top]
    })

    let frame = -1

    function onPointermove (e: PointerEvent) {
      const target = e.currentTarget as HTMLElement
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect()
        group.selectAt((e.clientX - rect.left) / rect.width)
      })
    }

    function onPointerleave () {
      cancelAnimationFrame(frame)
      group.select(null)
    }

    function onFocus () {
      group.step(-1)
    }

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      e.preventDefault()
      group.step(e.key === 'ArrowLeft' ? -1 : 1)
    }

    useRender(() => {
      const hasTooltip = !!props.tooltip && props.interactive && group.index.value !== null

      return (
        <div
          class={['v-sparkline-group', props.class]}
          style={[
            { '--v-sparkline-group-height': convertToUnit(props.height) },
            props.style,
          ]}
        >
          { props.yAxis && (
            <VChartAxis
              key="y-axis"
              class="v-sparkline-group__y-axis"
              direction="vertical"
              ticks={ group.yTicks.value }
            />
          )}

          <div
            ref={ plotEl }
            class="v-sparkline-group__plot"
            tabindex={ props.interactive ? 0 : undefined }
            onPointermove={ props.interactive ? onPointermove : undefined }
            onPointerleave={ props.interactive ? onPointerleave : undefined }
            onFocus={ props.interactive ? onFocus : undefined }
            onBlur={ props.interactive ? onPointerleave : undefined }
            onKeydown={ props.interactive ? onKeydown : undefined }
          >
            { yAxis.value.grid && group.yTicks.value.map(tick => (
              <div
                key={ tick.value }
                class="v-sparkline-group__grid-line"
                style={{ '--v-chart-axis-position': tick.position }}
              />
            ))}

            { width.value > 0 && slots.default?.() }

            { props.interactive && group.fraction.value !== null && (
              <div
                class="v-sparkline-group__crosshair"
                style={{ '--v-sparkline-group-cursor': cursor.value }}
              />
            )}
          </div>

          { props.xAxis && (
            <VChartAxis
              key="x-axis"
              class="v-sparkline-group__x-axis"
              ticks={ group.xTicks.value }
            />
          )}

          { !!props.tooltip && props.interactive && (
            <VTooltip
              modelValue={ hasTooltip }
              target={ tooltipTarget.value }
              offset={ tooltipConfig.value.offset }
              contentClass={ tooltipConfig.value.class }
              ref={ tooltipRef }
              location={ `${tooltipSide.value} top` }
            >
              { group.index.value !== null && (
                slots.tooltip?.({ index: group.index.value, items: group.items.value }) ?? (
                  <>
                    { xAxis.value.format && (
                      <div>{ xAxis.value.format(group.index.value) }</div>
                    )}
                    { group.items.value.map((item, i) => (
                      <div key={ i } class="v-sparkline-group__tooltip-item">
                        <VAvatar color={ item.color } size={ 8 } />
                        { item.value }
                      </div>
                    ))}
                  </>
                )
              )}
            </VTooltip>
          )}
        </div>
      )
    })
  },
})

export type VSparklineGroup = InstanceType<typeof VSparklineGroup>
