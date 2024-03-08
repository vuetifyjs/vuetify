// Utilities
import { computed, nextTick, ref, watch } from 'vue'
import { makeLineProps } from './util/line'
import { genPath as _genPath } from './util/path'
import { genericComponent, getPropertyFromItem, getUid, propsFactory, useRender } from '@/util'

// Types
export type VTrendlineSlots = {
  default: void
  label: { index: number, value: string }
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

  props: makeVTrendlineProps(),

  setup (props, { slots }) {
    const uid = getUid()
    const id = computed(() => props.id || `trendline-${uid}`)
    const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || (props.fill ? 500 : 2000))

    const lastLength = ref(0)
    const path = ref<SVGPathElement | null>(null)

    function genPoints (
      values: number[],
      boundary: Boundary
    ): Point[] {
      const { minX, maxX, minY, maxY } = boundary
      const totalValues = values.length
      const maxValue = props.max != null ? Number(props.max) : Math.max(...values)
      const minValue = props.min != null ? Number(props.min) : Math.min(...values)

      const gridX = (maxX - minX) / (totalValues - 1)
      const gridY = (maxY - minY) / ((maxValue - minValue) || 1)

      return values.map((value, index) => {
        return {
          x: minX + index * gridX,
          y: maxY - (value - minValue) * gridY,
          value,
        }
      })
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
    const parsedLabels = computed(() => {
      const labels = []
      const points = genPoints(items.value, boundary.value)
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

    watch(() => props.modelValue, async () => {
      await nextTick()

      if (!props.autoDraw || !path.value) return

      const pathRef = path.value
      const length = pathRef.getTotalLength()

      if (!props.fill) {
        // Initial setup to "hide" the line by using the stroke dash array
        pathRef.style.strokeDasharray = `${length}`
        pathRef.style.strokeDashoffset = `${length}`

        // Force reflow to ensure the transition starts from this state
        pathRef.getBoundingClientRect()

        // Animate the stroke dash offset to "draw" the line
        pathRef.style.transition = `stroke-dashoffset ${autoDrawDuration.value}ms ${props.autoDrawEasing}`
        pathRef.style.strokeDashoffset = '0'
      } else {
        // Your existing logic for filled paths remains the same
        pathRef.style.transformOrigin = 'bottom center'
        pathRef.style.transition = 'none'
        pathRef.style.transform = `scaleY(0)`
        pathRef.getBoundingClientRect()
        pathRef.style.transition = `transform ${autoDrawDuration.value}ms ${props.autoDrawEasing}`
        pathRef.style.transform = `scaleY(1)`
      }

      lastLength.value = length
    }, { immediate: true })

    function genPath (fill: boolean) {
      return _genPath(
        genPoints(items.value, boundary.value),
        props.smooth ? 8 : Number(props.smooth),
        fill,
        parseInt(props.height, 10)
      )
    }

    useRender(() => {
      const gradientData = !props.gradient.slice().length ? [''] : props.gradient.slice().reverse()

      return (
        <svg
          display="block"
          stroke-width={ parseFloat(props.lineWidth) ?? 4 }
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
            ref={ path }
            d={ genPath(props.fill) }
            fill={ props.fill ? `url(#${id.value})` : 'none' }
            stroke={ props.fill ? 'none' : `url(#${id.value})` }
          />

          { props.fill && (
            <path
              d={ genPath(false) }
              fill="none"
              stroke={ props.color ?? props.gradient?.[0] }
            />
          )}
        </svg>
      )
    })
  },
})

export type VTrendline = InstanceType<typeof VTrendline>
