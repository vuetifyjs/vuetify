// Components
import { VSparklineTooltip } from './VSparklineTooltip'

// Utilities
import { computed, Fragment, nextTick, ref, shallowRef, useId, watch } from 'vue'
import { buildPath, extendPoints, makeLineProps, resample } from './util/line'
import { genericComponent, getPropertyFromItem, PREFERS_REDUCED_MOTION, propsFactory, useRender } from '@/util'
import { easingPatterns, useTransition } from '@/util/easing'

// Types
import type { Boundary, Point } from './util/line'

export type VTrendlineSlots = {
  default: void
  label: { index: number, value: string }
  tooltip: { index: number, value: number }
}

export const makeVTrendlineProps = propsFactory({
  fill: Boolean,

  ...makeLineProps(),
}, 'VTrendline')

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
            path.setAttribute('d', genPath(oldResampled, fill))
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

    const extendedPoints = computed(() => extendPoints(points.value, props.inset, totalWidth.value))

    function genPath (input: Point[] | number[], fill: boolean): string {
      const points = typeof input[0] === 'number'
        ? extendPoints(genPoints(input as number[], boundary.value), props.inset, totalWidth.value)
        : input as Point[]

      return buildPath(points, {
        smooth: props.smooth,
        smoothMode: props.smoothMode,
        height: parseInt(props.height, 10),
        fill,
        animation: !!props.animation,
      })
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
      // 32 bisections ≈ sub-pixel accuracy on any reasonable chart width
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
    const markerPoint = computed(() => {
      const { x, y } = strokePath.value?.getPointAtLength(animatedLength.value) ?? { x: 0, y: 0 }
      return { x, y }
    })

    const tooltipTarget = computed<[number, number] | undefined>(() => {
      if (!currentPoint.value || !svgRef.value) return undefined
      const matrix = svgRef.value.getScreenCTM()
      if (!matrix) return undefined
      const svgPoint = svgRef.value.createSVGPoint()
      svgPoint.x = markerPoint.value.x
      svgPoint.y = markerPoint.value.y
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
          if (dist < minDist) {
            minDist = dist
            nearest = index
          }
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
                    x={ item.x }
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
            d={ genPath(extendedPoints.value, props.fill) }
            fill={ props.fill ? `url(#${id.value})` : 'none' }
            stroke={ props.fill ? 'none' : `url(#${id.value})` }
          />

          { props.fill && (
            <path
              key="trendline"
              ref={ strokePath }
              d={ genPath(extendedPoints.value, false) }
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
                  x1={ markerPoint.value.x }
                  y1={ props.inset ? 0 : boundary.value.minY }
                  x2={ markerPoint.value.x }
                  y2={ props.inset ? parseInt(props.height, 10) : boundary.value.maxY }
                  stroke="currentColor"
                  stroke-width={ 1 }
                  stroke-dasharray="4 2"
                  opacity={ 0.5 }
                />
              )}
              <circle
                key="marker"
                cx={ markerPoint.value.x }
                cy={ markerPoint.value.y }
                r={ markerRadius }
                fill="currentColor"
                stroke={ props.markerStroke }
                stroke-width={ 2 }
              />
            </g>
          )}

        </svg>

        { !!props.tooltip && (
          <VSparklineTooltip
            key="tooltip"
            modelValue={ tooltipVisible.value }
            target={ tooltipTarget.value }
            index={ currentIndex.value }
            value={ currentIndex.value !== null ? points.value[currentIndex.value].value : 0 }
            offset={ tooltipConfig.value.offset }
            contentClass={ tooltipConfig.value.class }
            titleFormat={ tooltipConfig.value.titleFormat }
            onAfterLeave={ onTooltipAfterLeave }
            v-slots={{ default: slots.tooltip }}
          />
        )}
        </Fragment>
      )
    })
  },
})

export type VTrendline = InstanceType<typeof VTrendline>
