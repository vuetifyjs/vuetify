// Components
import { VTooltip } from '@/components/VTooltip/VTooltip'

// Utilities
import { computed, Fragment, nextTick, ref, shallowRef, useId, watch } from 'vue'
import { makeLineProps } from './util/line'
import { genMonotonePath } from './util/monotone'
import { genRoundedPath } from './util/path'
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

function resample (values: number[], targetCount: number): number[] {
  const len = values.length
  if (len === 0) return Array(targetCount).fill(0)
  if (len === 1) return Array(targetCount).fill(values[0])

  const result: number[] = []
  for (let i = 0; i < targetCount; i++) {
    const t = i / (targetCount - 1) * (len - 1)
    const lo = Math.floor(t)
    const hi = Math.min(lo + 1, len - 1)
    const frac = t - lo
    result.push(values[lo] + (values[hi] - values[lo]) * frac)
  }
  return result
}

export const VTrendline = genericComponent<VTrendlineSlots>()({
  name: 'VTrendline',

  inheritAttrs: false,

  props: makeVTrendlineProps(),

  emits: {
    'update:currentIndex': (_index: number | null) => true,
  },

  setup (props, { slots, attrs, emit }) {
    const uid = useId()
    const id = computed(() => props.id || `trendline-${uid}`)
    const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || (props.fill ? 500 : 2000))

    const lastLength = ref(0)
    const hasDrawn = ref(false)
    const fillPath = ref<SVGPathElement | null>(null)
    const strokePath = ref<SVGPathElement | null>(null)
    const animationDuration = computed(() =>
      typeof props.animation === 'object' ? (props.animation.duration ?? 300) : 300
    )
    const animationEasing = computed(() =>
      typeof props.animation === 'object' ? (props.animation.easing ?? 'ease') : 'ease'
    )

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

    // When animation is enabled, resample to a consistent point count
    // so the SVG path always has the same number of commands for CSS d transitions
    const sampleCount = ref(0)

    // When sampleCount grows (new dataset is longer than any seen before),
    // manually patch the DOM path to old-data-at-new-count before Vue re-renders,
    // so the browser sees same-structure paths and can CSS-transition between them.
    watch(items, (newVal, oldVal) => {
      if (!props.animation) return

      const prevCount = sampleCount.value
      if (newVal.length > prevCount) {
        sampleCount.value = newVal.length

        if (prevCount > 0 && oldVal) {
          const oldResampled = resample(oldVal, sampleCount.value)
          for (const [pathRef, fill] of [[strokePath, false], [fillPath, true]] as const) {
            const path = pathRef.value
            if (!path) continue
            path.setAttribute('d', generatePathString(oldResampled, fill))
          }
        }
      }
    }, { immediate: true })

    const normalizedItems = computed(() => {
      if (!props.animation || !sampleCount.value || items.value.length === sampleCount.value) {
        return items.value
      }
      return resample(items.value, sampleCount.value)
    })

    const points = computed(() => genPoints(normalizedItems.value, boundary.value))

    function extendPoints (pts: Point[]): Point[] {
      if (!props.inset || pts.length < 2) return pts

      const first = pts[0]
      const second = pts[1]
      const last = pts[pts.length - 1]
      const secondLast = pts[pts.length - 2]

      const slopeStart = (second.y - first.y) / (second.x - first.x)
      const slopeEnd = (last.y - secondLast.y) / (last.x - secondLast.x)

      const ghostStart: Point = { x: 0, y: first.y - first.x * slopeStart, value: first.value }
      const ghostEnd: Point = { x: totalWidth.value, y: last.y + (totalWidth.value - last.x) * slopeEnd, value: last.value }

      return [ghostStart, ...pts, ghostEnd]
    }

    const extendedPoints = computed(() => extendPoints(points.value))

    function generatePathString (values: number[], fill: boolean): string {
      const pts = extendPoints(genPoints(values, boundary.value))
      return buildPath(pts.slice(), fill)
    }

    function buildPath (pts: Point[], fill: boolean): string {
      const smoothValue = typeof props.smooth === 'boolean' ? (props.smooth ? 8 : 0) : Number(props.smooth ?? 0)
      const h = parseInt(props.height, 10)
      if (props.smoothMode === 'monotone') {
        return genMonotonePath(pts, smoothValue, fill, h)
      }
      return genRoundedPath(pts, smoothValue, fill, h, !!props.animation)
    }

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

    function applyDTransition (path: SVGPathElement, duration: number, easing: string) {
      path.style.transition = `d ${duration}ms ${easing}`
    }

    watch(() => props.modelValue, async () => {
      await nextTick()

      if (PREFERS_REDUCED_MOTION()) return

      // Animation-only mode (no auto-draw): just ensure d transition is set
      if (!props.autoDraw) {
        if (props.animation && strokePath.value) {
          for (const path of [fillPath.value, strokePath.value]) {
            if (path) applyDTransition(path, animationDuration.value, animationEasing.value)
          }
        }
        return
      }

      if (!strokePath.value) return

      if (props.autoDraw === 'once' && hasDrawn.value) return
      hasDrawn.value = true

      const shouldDrawOnce = props.autoDraw === 'once'

      if (!props.fill) {
        const path = strokePath.value
        const length = path.getTotalLength()
        path.style.transition = 'none'
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`
        path.getBoundingClientRect()
        const dTransition = props.animation
          ? `, d ${animationDuration.value}ms ${animationEasing.value}`
          : ''
        path.style.transition = `stroke-dashoffset ${autoDrawDuration.value}ms ${props.autoDrawEasing}${dTransition}`
        path.style.strokeDashoffset = '0'
        lastLength.value = length

        if (shouldDrawOnce) {
          path.addEventListener('transitionend', e => {
            if (e.propertyName !== 'stroke-dashoffset') return
            path.style.strokeDasharray = ''
            path.style.strokeDashoffset = ''
            if (props.animation) {
              applyDTransition(path, animationDuration.value, animationEasing.value)
            } else {
              path.style.transition = ''
            }
          }, { once: true })
        }
      } else {
        for (const path of [fillPath.value, strokePath.value]) {
          if (!path) continue
          path.style.transformOrigin = 'bottom center'
          path.style.transition = 'none'
          path.style.transform = `scaleY(0)`
          path.getBoundingClientRect()
          const dTransition = props.animation
            ? `, d ${animationDuration.value}ms ${animationEasing.value}`
            : ''
          path.style.transition = `transform ${autoDrawDuration.value}ms ${props.autoDrawEasing}${dTransition}`
          path.style.transform = `scaleY(1)`

          if (shouldDrawOnce) {
            path.addEventListener('transitionend', e => {
              if (e.propertyName !== 'transform') return
              path.style.transform = ''
              path.style.transformOrigin = ''
              if (props.animation) {
                applyDTransition(path, animationDuration.value, animationEasing.value)
              } else {
                path.style.transition = ''
              }
            }, { once: true })
          }
        }
      }
    }, { immediate: true })

    function genPath (fill: boolean) {
      return buildPath(extendedPoints.value.slice(), fill)
    }

    // Hover / tooltip state
    const svgRef = shallowRef<SVGSVGElement | null>(null)
    const currentIndex = shallowRef<number | null>(null)
    const tooltipVisible = shallowRef(false)

    const currentPoint = computed(() =>
      currentIndex.value !== null ? points.value[currentIndex.value] : null
    )

    function getPathLengthAtX (svgPath: SVGPathElement, targetX: number): number {
      const total = svgPath.getTotalLength()
      let low = 0
      let high = total
      for (let i = 0; i < 32; i++) {
        const mid = (low + high) / 2
        if (svgPath.getPointAtLength(mid).x < targetX) low = mid
        else high = mid
      }
      return (low + high) / 2
    }

    const markerPathLength = shallowRef(0)
    watch(currentPoint, point => {
      if (!point || !strokePath.value) return
      markerPathLength.value = getPathLengthAtX(strokePath.value, point.x)
    })

    const animatedLength = useTransition(markerPathLength, { duration: 150, transition: easingPatterns.easeOutQuad })
    const markerCx = computed(() => strokePath.value?.getPointAtLength(animatedLength.value).x ?? 0)
    const markerCy = computed(() => strokePath.value?.getPointAtLength(animatedLength.value).y ?? 0)

    const tooltipTarget = computed<[number, number] | undefined>(() => {
      if (!currentPoint.value || !svgRef.value) return undefined
      const matrix = svgRef.value.getScreenCTM()
      if (!matrix) return undefined
      const svgPoint = svgRef.value.createSVGPoint()
      svgPoint.x = markerCx.value
      svgPoint.y = markerCy.value
      const { x, y } = svgPoint.matrixTransform(matrix)
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
        points.value.forEach((point, index) => {
          const dist = Math.abs(point.x - svgX)
          if (dist < minDist) { minDist = dist; nearest = index }
        })

        currentIndex.value = nearest
        emit('update:currentIndex', nearest)
        tooltipVisible.value = true
      })
    }

    function onSvgMouseleave () {
      cancelAnimationFrame(frame)
      tooltipVisible.value = false
      if (!props.tooltip) {
        currentIndex.value = null
        emit('update:currentIndex', null)
      }
    }

    function onTooltipAfterLeave () {
      currentIndex.value = null
      emit('update:currentIndex', null)
    }

    function setIndex (index: number | null) {
      currentIndex.value = index
      emit('update:currentIndex', index)
      tooltipVisible.value = index !== null
    }

    function onSvgFocus () {
      if (!points.value.length) return
      setIndex(points.value.length - 1)
    }

    function onSvgBlur () {
      tooltipVisible.value = false
      if (!props.tooltip) {
        setIndex(null)
      }
    }

    function onSvgKeydown (e: KeyboardEvent) {
      if (!points.value.length) return
      const length = points.value.length

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        const direction = e.key === 'ArrowLeft' ? -1 : 1
        const current = currentIndex.value ?? (direction === 1 ? -1 : length)
        const next = Math.max(0, Math.min(length - 1, current + direction))
        setIndex(next)
      }
    }

    useRender(() => {
      const gradientData = !props.gradient.slice().length ? [''] : props.gradient.slice().reverse()
      const markerRadius = (parseFloat(props.markerSize) || 8) / 2

      return (
        <Fragment>
        <svg
          ref={ svgRef }
          display="block"
          stroke-width={ parseFloat(props.lineWidth) ?? 4 }
          tabindex={ props.interactive ? 0 : undefined }
          onMousemove={ props.interactive ? onSvgMousemove : undefined }
          onMouseleave={ props.interactive ? onSvgMouseleave : undefined }
          onFocus={ props.interactive ? onSvgFocus : undefined }
          onBlur={ props.interactive ? onSvgBlur : undefined }
          onKeydown={ props.interactive ? onSvgKeydown : undefined }
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
            ref={ props.fill ? fillPath : strokePath }
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
              stroke="currentColor"
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
                  fill="currentColor"
                  stroke={ props.markerStroke }
                  stroke-width={ 2 }
                  pointer-events="none"
                />
              ))}
            </g>
          )}

          { props.interactive && currentPoint.value && (
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
                fill="currentColor"
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
            contentClass={ tooltipConfig.value.class }
            onAfterLeave={ onTooltipAfterLeave }
          >
            { currentIndex.value !== null && (
              slots.tooltip?.({
                index: currentIndex.value,
                value: points.value[currentIndex.value].value,
              }) ?? tooltipConfig.value.titleFormat({
                index: currentIndex.value,
                value: points.value[currentIndex.value].value,
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
