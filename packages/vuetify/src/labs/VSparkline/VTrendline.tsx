// Utilities
import { computed, nextTick, ref, watch } from 'vue'
import { makeLineProps } from './util/line'
import { genPath } from './util/path'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
export type VTrendlineSlots = {
  default: void
  label: void
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
    const lastLength = ref(0)
    const path = ref<SVGPathElement | null>(null)

    function genPoints (
      values: number[],
      boundary: Boundary
    ): Point[] {
      const { minX, maxX, minY, maxY } = boundary
      const totalValues = values.length
      const maxValue = Math.max(...values)
      const minValue = Math.min(...values)

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
    const totalHeight = computed(() => {
      let height = parseInt(props.height, 10)

      if (hasLabels.value) height += parseInt(props.labelSize, 10) * 1.5

      return height
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
    const parsedLabels = computed(() => {
      const labels = []
      const points = genPoints(
        props.modelValue.map(item => (typeof item === 'number' ? item : item.value)),
        boundary.value
      )
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
        pathRef.style.transition = 'none'
        pathRef.style.strokeDasharray = `${length} ${length}`
        pathRef.style.strokeDashoffset = Math.abs(length - (lastLength.value || 0)).toString()
        pathRef.getBoundingClientRect()
        pathRef.style.transition = `stroke-dashoffset ${props.autoDrawDuration}ms ${props.autoDrawEasing}`
        pathRef.style.strokeDashoffset = '0'
      } else {
        pathRef.style.transformOrigin = 'bottom center'
        pathRef.style.transition = 'none'
        pathRef.style.transform = `scaleY(0)`
        pathRef.getBoundingClientRect()
        pathRef.style.transition = `transform ${props.autoDrawDuration}ms ${props.autoDrawEasing}`
        pathRef.style.transform = `scaleY(1)`
      }
      lastLength.value = length
    })

    useRender(() => {
      const gradientData = !props.gradient.slice().length ? [''] : props.gradient.slice().reverse()

      return (
        <svg
          display="block"
          stroke-width={ parseFloat(props.lineWidth) ?? 4 }
          viewBox={ `0 0 ${props.width} ${parseInt(totalHeight.value, 10)}` }
        >
          <defs>
            <linearGradient
              id="1"
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
                fontSize: 8,
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
                    <slot name="label" index={ i } value={ item.value } >
                      { item.value }
                    </slot>
                  </text>
                ))
              }
            </g>
          )}

          <path
            d={ genPath(
              genPoints(
                props.modelValue.map(item => (typeof item === 'number' ? item : item.value)),
                boundary.value
              ),
              props.smooth ? 8 : Number(props.smooth),
              props.fill,
              parseInt(props.height, 10)
            )}
            fill={ props.fill ? `url(#1)` : 'none' }
            stroke={ props.fill ? 'none' : `url(#1)` }
            ref="path"
          />
        </svg>
      )
    })
  },
})

export type VTrendline = InstanceType<typeof VTrendline>
