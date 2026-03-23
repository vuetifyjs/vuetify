// Components
import { VTooltip } from '@/components/VTooltip/VTooltip'

// Utilities
import { computed, Fragment, nextTick, ref, shallowRef, useId, watch } from 'vue'
import { makeLineProps } from './util/line'
import { genPath as _genPath } from './util/path'
import { genericComponent, getPropertyFromItem, PREFERS_REDUCED_MOTION, propsFactory, useRender } from '@/util'
import { easingPatterns, useTransition } from '@/util/easing'

// Types
export type VTrendlineSlots = {
  default: void
  label: { index: number, value: string }
  tooltip: { index: number, value: number }
}

export type SparklineItem = number | { value: number }

export type SparklineText = {
  x: number
  value: string
}

export interface Boundary {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export interface Point {
  x: number
  y: number
  value: number
}

export const makeVTrendlineProps = propsFactory({
  fill: Boolean,

  ...makeLineProps(),
}, 'VTrendline')

export const VTrendline = genericComponent<VTrendlineSlots>()({
  name: 'VTrendline',

  inheritAttrs: false,

  props: makeVTrendlineProps(),

  setup (props, { slots, attrs }) {
    const uid = useId()
    const id = computed(() => props.id || `trendline-${uid}`)
    const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || (props.fill ? 500 : 2000))

    const lastLength = ref(0)
    const path = ref<SVGPathElement | null>(null)
    const strokePath = ref<SVGPathElement | null>(null)

    function genPoints (
      values: number[],
      boundary: Boundary
    ): Point[] {
      const { minX, maxX, minY, maxY } = boundary

      if (values.length === 1) {
        values = [values[0], values[0]]
      }

      const totalValues = values.length
      const maxValue = props.max != null ? Number(props.max) : Math.max(...values)
      const minValue = props.min != null ? Number(props.min) : Math.min(...values)

      const gridX = (maxX - minX) / (totalValues - 1)
      const gridY = (maxY - minY) / ((maxValue - minValue) || 1)

      return values.map((value, index) => ({
        x: minX + index * gridX,
        y: maxY - (value - minValue) * gridY,
        value,
      }))
    }

    const hasLabels = computed(() => {
      return Boolean(
        props.showLabels ||
        props.labels.length > 0 ||
        !!slots?.label
      )
    })
    const lineWidth = computed(() => {
      return parseFloat(props.lineWidth) || 4
    })
    const totalWidth = computed(() => Number(props.width))

    const boundary = computed<Boundary>(() => {
      const padding = Number(props.padding)

      return {
        minX: padding,
        maxX: totalWidth.value - padding,
        minY: padding,
        maxY: parseInt(props.height, 10) - padding,
      }
    })

    const items = computed(() => props.modelValue.map(item => getPropertyFromItem(item, props.itemValue, item)))
    const points = computed(() => genPoints(items.value, boundary.value))

    const extendedPoints = computed(() => {
      if (!props.inset || points.value.length < 2) return points.value

      const pts = points.value
      const first = pts[0]
      const second = pts[1]
      const last = pts[pts.length - 1]
      const secondLast = pts[pts.length - 2]

      const slopeStart = (second.y - first.y) / (second.x - first.x)
      const slopeEnd = (last.y - secondLast.y) / (last.x - secondLast.x)

      const ghostStart: Point = { x: 0, y: first.y - first.x * slopeStart, value: first.value }
      const ghostEnd: Point = { x: totalWidth.value, y: last.y + (totalWidth.value - last.x) * slopeEnd, value: last.value }

      return [ghostStart, ...pts, ghostEnd]
    })

    const parsedLabels = computed(() => {
      const labels = []
      const len = points.value.length

      for (let i = 0; labels.length < len; i++) {
        const point = points.value[i]
        let value = props.labels[i]

        if (!value) {
          value = point.value
        }

        labels.push({
          x: point.x,
          value: String(value),
        })
      }

      return labels
    })

    watch(() => props.modelValue, async () => {
      await nextTick()

      if (!props.autoDraw || !path.value || PREFERS_REDUCED_MOTION()) return

      const pathRef = path.value
      const length = pathRef.getTotalLength()

      if (!props.fill) {
        pathRef.style.transition = 'none'
        pathRef.style.strokeDasharray = `${length}`
        pathRef.style.strokeDashoffset = `${length}`
        pathRef.getBoundingClientRect()
        pathRef.style.transition = `stroke-dashoffset ${autoDrawDuration.value}ms ${props.autoDrawEasing}`
        pathRef.style.strokeDashoffset = '0'
      } else {
        pathRef.style.transformOrigin = 'bottom center'
        pathRef.style.transition = 'none'
        pathRef.style.transform = `scaleY(0)`
        pathRef.getBoundingClientRect()
        pathRef.style.transition = `transform ${autoDrawDuration.value}ms ${props.autoDrawEasing}`
        pathRef.style.transform = `scaleY(1)`

        if (strokePath.value) {
          strokePath.value.style.transformOrigin = 'bottom center'
          strokePath.value.style.transition = 'none'
          strokePath.value.style.transform = `scaleY(0)`
          strokePath.value.getBoundingClientRect()
          strokePath.value.style.transition = `transform ${autoDrawDuration.value}ms ${props.autoDrawEasing}`
          strokePath.value.style.transform = `scaleY(1)`
        }
      }

      lastLength.value = length
    }, { immediate: true })

    function genPath (fill: boolean) {
      const smoothValue = typeof props.smooth === 'boolean' ? (props.smooth ? 8 : 0) : Number(props.smooth)

      return _genPath(
        extendedPoints.value.slice(),
        smoothValue,
        fill,
        parseInt(props.height, 10)
      )
    }

    // Hover / tooltip state
    const svgRef = shallowRef<SVGSVGElement | null>(null)
    const hoveredIndex = shallowRef<number | null>(null)
    const tooltipVisible = shallowRef(false)

    const hoveredPoint = computed(() =>
      hoveredIndex.value !== null ? points.value[hoveredIndex.value] : null
    )

    function getPathLengthAtX (svgPath: SVGPathElement, targetX: number): number {
      const total = svgPath.getTotalLength()
      let lo = 0, hi = total
      for (let i = 0; i < 32; i++) {
        const mid = (lo + hi) / 2
        if (svgPath.getPointAtLength(mid).x < targetX) lo = mid
        else hi = mid
      }
      return (lo + hi) / 2
    }

    const markerPathLength = shallowRef(0)
    watch(hoveredPoint, p => {
      if (!p || !strokePath.value) return
      markerPathLength.value = getPathLengthAtX(strokePath.value, p.x)
    })

    const animatedLength = useTransition(markerPathLength, { duration: 150, transition: easingPatterns.easeOutQuad })
    const markerCx = computed(() => strokePath.value?.getPointAtLength(animatedLength.value).x ?? 0)
    const markerCy = computed(() => strokePath.value?.getPointAtLength(animatedLength.value).y ?? 0)

    const tooltipTarget = computed<[number, number] | undefined>(() => {
      if (!hoveredPoint.value || !svgRef.value) return undefined
      const ctm = svgRef.value.getScreenCTM()
      if (!ctm) return undefined
      const pt = svgRef.value.createSVGPoint()
      pt.x = markerCx.value
      pt.y = markerCy.value
      const { x, y } = pt.matrixTransform(ctm)
      return [x, y]
    })

    const tooltipConfig = computed(() => ({
      showCrosshair: true,
      offset: 16 as number | undefined,
      titleFormat: (item: { index: number, value: number }) => String(item.value),
      ...(typeof props.tooltip === 'object' ? props.tooltip : {}),
    }))

    let frame = -1

    function onSvgMousemove (e: MouseEvent) {
      const target = e.currentTarget as SVGSVGElement
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect()
        const svgX = (e.clientX - rect.left) / rect.width * Number(props.width)

        let nearest = 0
        let minDist = Infinity
        points.value.forEach((p, i) => {
          const dist = Math.abs(p.x - svgX)
          if (dist < minDist) { minDist = dist; nearest = i }
        })

        hoveredIndex.value = nearest
        tooltipVisible.value = true
      })
    }

    function onSvgMouseleave () {
      cancelAnimationFrame(frame)
      tooltipVisible.value = false
    }

    function onTooltipAfterLeave () {
      hoveredIndex.value = null
    }

    useRender(() => {
      const gradientData = !props.gradient.slice().length ? [''] : props.gradient.slice().reverse()
      const markerRadius = (parseFloat(props.markerSize) || 8) / 2
      const markerFill = props.color || props.gradient?.[0] || 'currentColor'

      return (
        <Fragment>
        <svg
          ref={ svgRef }
          display="block"
          stroke-width={ parseFloat(props.lineWidth) ?? 4 }
          onMousemove={ props.tooltip ? onSvgMousemove : undefined }
          onMouseleave={ props.tooltip ? onSvgMouseleave : undefined }
          { ...attrs }
        >
          <defs>
            <linearGradient
              id={ id.value }
              gradientUnits="userSpaceOnUse"
              x1={ props.gradientDirection === 'left' ? '100%' : '0' }
              y1={ props.gradientDirection === 'top' ? '100%' : '0' }
              x2={ props.gradientDirection === 'right' ? '100%' : '0' }
              y2={ props.gradientDirection === 'bottom' ? '100%' : '0' }
            >
              {
                gradientData.map((color, index) => (
                  <stop offset={ index / (Math.max(gradientData.length - 1, 1)) } stop-color={ color || 'currentColor' } />
                ))
              }
            </linearGradient>
          </defs>

          { hasLabels.value && (
            <g
              key="labels"
              style={{
                textAnchor: 'middle',
                dominantBaseline: 'mathematical',
                fill: 'currentColor',
              }}
            >
              {
                parsedLabels.value.map((item, i) => (
                  <text
                    x={ item.x + (lineWidth.value / 2) + lineWidth.value / 2 }
                    y={ (parseInt(props.height, 10) - 4) + (parseInt(props.labelSize, 10) || 7 * 0.75) }
                    font-size={ Number(props.labelSize) || 7 }
                  >
                    { slots.label?.({ index: i, value: item.value }) ?? item.value }
                  </text>
                ))
              }
            </g>
          )}

          <path
            key="fill"
            ref={ (el: SVGPathElement | null) => {
              path.value = el
              if (!props.fill) strokePath.value = el
            }}
            d={ genPath(props.fill) }
            fill={ props.fill ? `url(#${id.value})` : 'none' }
            stroke={ props.fill ? 'none' : `url(#${id.value})` }
          />

          { props.fill && (
            <path
              key="trendline"
              ref={ strokePath }
              d={ genPath(false) }
              fill="none"
              stroke={ props.color ?? props.gradient?.[0] }
            />
          )}

          { props.showMarkers && (
            <g key="markers">
              { points.value.map((point, i) => (
                <circle
                  key={ i }
                  cx={ point.x }
                  cy={ point.y }
                  r={ markerRadius }
                  fill={ markerFill }
                  stroke={ props.markerStroke }
                  stroke-width={ 2 }
                  pointer-events="none"
                />
              ))}
            </g>
          )}

          { !!props.tooltip && hoveredPoint.value && (
            <g key="hover" pointer-events="none">
              { tooltipConfig.value.showCrosshair && (
                <line
                  key="crosshair-line"
                  x1={ markerCx.value }
                  y1={ props.inset ? 0 : boundary.value.minY }
                  x2={ markerCx.value }
                  y2={ props.inset ? parseInt(props.height, 10) : boundary.value.maxY }
                  stroke="currentColor"
                  stroke-width={ 1 }
                  stroke-dasharray="4 2"
                  opacity={ 0.5 }
                />
              )}
              <circle
                key="marker"
                cx={ markerCx.value }
                cy={ markerCy.value }
                r={ markerRadius }
                fill={ markerFill }
                stroke={ props.markerStroke }
                stroke-width={ 2 }
              />
            </g>
          )}

        </svg>

        { !!props.tooltip && (
          <VTooltip
            key="tooltip"
            modelValue={ tooltipVisible.value }
            target={ tooltipTarget.value }
            offset={ tooltipConfig.value.offset }
            onAfterLeave={ onTooltipAfterLeave }
          >
            { hoveredIndex.value !== null && (
              slots.tooltip?.({
                index: hoveredIndex.value,
                value: points.value[hoveredIndex.value].value,
              }) ?? tooltipConfig.value.titleFormat({
                index: hoveredIndex.value,
                value: points.value[hoveredIndex.value].value,
              })
            )}
          </VTooltip>
        )}
        </Fragment>
      )
    })
  },
})

export type VTrendline = InstanceType<typeof VTrendline>
