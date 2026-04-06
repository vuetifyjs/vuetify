// Components
import { VTooltip } from '@/components/VTooltip/VTooltip'

// Utilities
import { computed, Fragment, nextTick, ref, shallowRef, useId, watch } from 'vue'
import { makeLineProps } from './util/line'
import { genericComponent, getPropertyFromItem, PREFERS_REDUCED_MOTION, propsFactory, useRender } from '@/util'
import { easingPatterns, useTransition } from '@/util/easing'

// Types
export type VBarlineSlots = {
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

export interface Bar {
  x: number
  y: number
  height: number
  value: number
}

export const makeVBarlineProps = propsFactory({
  autoLineWidth: Boolean,

  ...makeLineProps(),
}, 'VBarline')

export const VBarline = genericComponent<VBarlineSlots>()({
  name: 'VBarline',

  inheritAttrs: false,

  props: makeVBarlineProps(),

  emits: {
    'update:currentIndex': (_index: number | null) => true,
  },

  setup (props, { slots, attrs, emit }) {
    const uid = useId()
    const id = computed(() => props.id || `barline-${uid}`)
    const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || 500)
    const hasDrawn = ref(false)
    const clipRects = shallowRef<SVGRectElement[]>([])
    const animationDuration = computed(() =>
      typeof props.animation === 'object' ? (props.animation.duration ?? 300) : 300
    )
    const animationEasing = computed(() =>
      typeof props.animation === 'object' ? (props.animation.easing ?? 'ease') : 'ease'
    )

    const hasLabels = computed(() => {
      return Boolean(
        props.showLabels ||
        props.labels.length > 0 ||
        !!slots?.label
      )
    })

    const lineWidth = computed(() => parseFloat(props.lineWidth) || 4)

    const items = computed(() => props.modelValue.map(item => getPropertyFromItem(item, props.itemValue, item)))

    const totalWidth = computed(() => Math.max(items.value.length * lineWidth.value, Number(props.width)))

    const boundary = computed<Boundary>(() => {
      return {
        minX: 0,
        maxX: totalWidth.value,
        minY: 0,
        maxY: parseInt(props.height, 10),
      }
    })

    function genBars (
      values: number[],
      boundary: Boundary
    ): Bar[] {
      const { minX, maxX, minY, maxY } = boundary

      const totalValues = values.length
      let maxValue = props.max != null ? Number(props.max) : Math.max(...values)
      let minValue = props.min != null ? Number(props.min) : Math.min(...values)

      if (minValue > 0 && props.min == null) minValue = 0
      if (maxValue < 0 && props.max == null) maxValue = 0

      const gridX = maxX / (totalValues === 1 ? 2 : totalValues)
      const gridY = (maxY - minY) / ((maxValue - minValue) || 1)
      const horizonY = maxY - Math.abs(minValue * gridY)

      return values.map((value, index) => {
        const height = Math.abs(gridY * value)

        return {
          x: minX + index * gridX,
          y: horizonY - height +
            Number(value < 0) * height,
          height,
          value,
        }
      })
    }

    const bars = computed(() => genBars(items.value, boundary.value))
    const prevBarCount = ref(0)

    function applyTransition (el: SVGRectElement, duration: number, easing: string) {
      el.style.transition = `y ${duration}ms ${easing}, height ${duration}ms ${easing}`
    }

    function collapseNewBars (fromIndex: number, duration: number, easing: string) {
      const barsData = bars.value
      for (let i = fromIndex; i < barsData.length; i++) {
        const el = clipRects.value[i]
        if (!el) continue

        // Snap to collapsed at bar's baseline
        el.style.transition = 'none'
        el.setAttribute('y', String(barsData[i].y + barsData[i].height))
        el.setAttribute('height', '0')
        el.getBoundingClientRect()

        // Animate to final state
        applyTransition(el, duration, easing)
        el.setAttribute('y', String(barsData[i].y))
        el.setAttribute('height', String(barsData[i].height))
      }
    }

    watch(() => props.modelValue, async () => {
      await nextTick()

      if (PREFERS_REDUCED_MOTION() || !clipRects.value.length) return

      const oldCount = prevBarCount.value
      prevBarCount.value = bars.value.length

      // Animation-only mode (no auto-draw): just ensure transition is set
      if (!props.autoDraw) {
        if (props.animation) {
          clipRects.value.forEach(el => {
            if (el) applyTransition(el, animationDuration.value, animationEasing.value)
          })
          if (bars.value.length > oldCount && oldCount > 0) {
            collapseNewBars(oldCount, animationDuration.value, animationEasing.value)
          }
        }
        return
      }

      if (props.autoDraw === 'once' && hasDrawn.value) {
        if (props.animation) {
          clipRects.value.forEach(el => {
            if (el) applyTransition(el, animationDuration.value, animationEasing.value)
          })
          if (bars.value.length > oldCount && oldCount > 0) {
            collapseNewBars(oldCount, animationDuration.value, animationEasing.value)
          }
        }
        return
      }
      hasDrawn.value = true

      const shouldDrawOnce = props.autoDraw === 'once'
      const barsData = bars.value
      clipRects.value.forEach((el, i) => {
        const bar = barsData[i]
        if (!el || !bar) return

        // Snap to collapsed state
        el.style.transition = 'none'
        el.setAttribute('y', String(bar.y + bar.height))
        el.setAttribute('height', '0')
        el.getBoundingClientRect()

        // Animate to final state
        applyTransition(el, autoDrawDuration.value, props.autoDrawEasing)
        el.setAttribute('y', String(bar.y))
        el.setAttribute('height', String(bar.height))

        // After initial draw, switch to animation timing for subsequent changes
        if (shouldDrawOnce && props.animation) {
          el.addEventListener('transitionend', () => {
            applyTransition(el, animationDuration.value, animationEasing.value)
          }, { once: true })
        }
      })
    }, { immediate: true })

    const parsedLabels = computed(() => {
      const labels = []
      const points = genBars(items.value, boundary.value)
      const len = points.length

      for (let i = 0; labels.length < len; i++) {
        const item = points[i]
        let value = props.labels[i]

        if (!value) {
          value = typeof item === 'object'
            ? item.value
            : item
        }

        labels.push({
          x: item.x,
          value: String(value),
        })
      }

      return labels
    })

    const offsetX = computed(() => bars.value.length === 1
      ? (boundary.value.maxX - lineWidth.value) / 2
      : (Math.abs(bars.value[0].x - (bars.value[1].x)) - lineWidth.value) / 2
    )
    const smooth = computed(() => typeof props.smooth === 'boolean' ? (props.smooth ? 2 : 0) : Number(props.smooth))
    const columnWidth = computed(() => {
      const len = bars.value.length
      return totalWidth.value / (len === 1 ? 2 : len)
    })

    // Hover / tooltip state
    const svgRef = shallowRef<SVGSVGElement | null>(null)
    const currentIndex = shallowRef<number | null>(null)
    const tooltipVisible = shallowRef(false)

    const targetX = shallowRef(0)
    const targetY = shallowRef(0)
    const targetHeight = shallowRef(0)

    watch(currentIndex, idx => {
      if (idx === null) return
      const bar = bars.value[idx]
      if (!bar) return
      targetX.value = bar.x + offsetX.value
      targetY.value = bar.y
      targetHeight.value = bar.height
    })

    const transitionOpts = { duration: 150, transition: easingPatterns.easeOutQuad }
    const animatedX = useTransition(targetX, transitionOpts)
    const animatedY = useTransition(targetY, transitionOpts)

    const tooltipTarget = computed<[number, number] | undefined>(() => {
      if (currentIndex.value === null || !svgRef.value) return undefined
      const ctm = svgRef.value.getScreenCTM()
      if (!ctm) return undefined
      const pt = svgRef.value.createSVGPoint()
      pt.x = animatedX.value + lineWidth.value / 2
      pt.y = animatedY.value
      const { x, y } = pt.matrixTransform(ctm)
      return [x, y]
    })

    const tooltipConfig = computed(() => ({
      showCrosshair: false,
      titleFormat: (item: { index: number, value: number }) => String(item.value),
      ...(typeof props.tooltip === 'object' ? props.tooltip : {}),
    }))

    let frame = -1

    function onSvgMousemove (e: MouseEvent) {
      const target = e.currentTarget as SVGSVGElement
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect()
        const svgX = (e.clientX - rect.left) / rect.width * totalWidth.value

        let nearest = 0
        let minDist = Infinity
        bars.value.forEach((bar, i) => {
          const barCenter = bar.x + offsetX.value + lineWidth.value / 2
          const dist = Math.abs(barCenter - svgX)
          if (dist < minDist) { minDist = dist; nearest = i }
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
      if (!bars.value.length) return
      setIndex(bars.value.length - 1)
    }

    function onSvgBlur () {
      tooltipVisible.value = false
      if (!props.tooltip) {
        setIndex(null)
      }
    }

    function onSvgKeydown (e: KeyboardEvent) {
      if (!bars.value.length) return
      const len = bars.value.length

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        const dir = e.key === 'ArrowLeft' ? -1 : 1
        const current = currentIndex.value ?? (dir === 1 ? -1 : len)
        const next = Math.max(0, Math.min(len - 1, current + dir))
        setIndex(next)
      }
    }

    useRender(() => {
      const gradientData = !props.gradient.slice().length ? [''] : props.gradient.slice().reverse()
      return (
        <Fragment>
        <svg
          ref={ svgRef }
          display="block"
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

          <clipPath id={ `${id.value}-clip` }>
            {
              bars.value.map((item, i) => (
                <rect
                    ref={ (el: any) => { if (el) clipRects.value[i] = el } }
                    x={ item.x + offsetX.value }
                    y={ item.y }
                    width={ lineWidth.value }
                    height={ item.height }
                    rx={ smooth.value }
                    ry={ smooth.value }
                />
              ))
            }
          </clipPath>

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
                    x={ item.x + offsetX.value + lineWidth.value / 2 }
                    y={ (parseInt(props.height, 10) - 2) + (parseInt(props.labelSize, 10) || 7 * 0.75) }
                    font-size={ Number(props.labelSize) || 7 }
                  >
                    { slots.label?.({ index: i, value: item.value }) ?? item.value }
                  </text>
                ))
              }
            </g>
          )}

          { props.interactive && currentIndex.value !== null && (
            <rect
              key="highlight"
              x={ animatedX.value - offsetX.value }
              y={ 0 }
              width={ columnWidth.value }
              height={ props.height }
              fill="currentColor"
              opacity={ 0.1 }
              pointer-events="none"
            />
          )}

          <g
            clip-path={ `url(#${id.value}-clip)` }
            fill={ `url(#${id.value})` }
          >
            <rect
              x={ 0 }
              y={ 0 }
              width={ totalWidth.value }
              height={ props.height }
            ></rect>
          </g>
        </svg>

        { !!props.tooltip && (
          <VTooltip
            key="tooltip"
            modelValue={ tooltipVisible.value }
            target={ tooltipTarget.value }
            offset={ tooltipConfig.value.offset }
            contentClass={ tooltipConfig.value.class }
            location="top center"
            onAfterLeave={ onTooltipAfterLeave }
          >
            { currentIndex.value !== null && (
              slots.tooltip?.({
                index: currentIndex.value,
                value: bars.value[currentIndex.value].value,
              }) ?? tooltipConfig.value.titleFormat({
                index: currentIndex.value,
                value: bars.value[currentIndex.value].value,
              })
            )}
          </VTooltip>
        )}
        </Fragment>
      )
    })
  },
})

export type VBarline = InstanceType<typeof VBarline>
