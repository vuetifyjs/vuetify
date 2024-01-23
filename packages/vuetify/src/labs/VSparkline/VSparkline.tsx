// Utilities
import { computed, nextTick, ref, watch } from 'vue'
import { genPath } from './helpers/path'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

// Types
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

export interface Bar {
  x: number
  y: number
  height: number
  value: number
}

export const makeVSparklineProps = propsFactory({
  autoDraw: Boolean,
  autoDrawDuration: {
    type: Number,
    default: 2000,
  },
  autoDrawEasing: {
    type: String,
    default: 'ease',
  },
  autoLineWidth: Boolean,
  color: String,
  fill: Boolean,
  gradient: {
    type: Array as PropType<string[]>,
    default: () => ([]),
  },
  gradientDirection: {
    type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
    validator: (val: string) => ['top', 'bottom', 'left', 'right'].includes(val),
    default: 'top',
  },
  height: {
    type: [String, Number],
    default: 75,
  },
  labels: {
    type: Array as PropType<SparklineItem[]>,
    default: () => ([]),
  },
  labelSize: {
    type: [Number, String],
    default: 7,
  },
  lineWidth: {
    type: [String, Number],
    default: 4,
  },
  padding: {
    type: [String, Number],
    default: 8,
  },
  showLabels: Boolean,
  smooth: {
    type: [Boolean, Number, String],
    default: false,
  },
  type: {
    type: String as PropType<'trend' | 'bar'>,
    default: 'trend',
    validator: (val: string) => ['trend', 'bar'].includes(val),
  },
  modelValue: {
    type: Array as PropType<SparklineItem[]>,
    default: () => ([]),
  },
  width: {
    type: [Number, String],
    default: 300,
  },
}, 'VSparkline')

export type VSparklineSlots = {
  label: never
}

export const VSparkline = genericComponent<VSparklineSlots>()({
  name: 'VSparkline',

  props: makeVSparklineProps(),

  setup (props, { attrs, slots }) {
    const lastLength = ref(0)
    const path = ref<SVGPathElement | null>(null)

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
      if (props.autoLineWidth && props.type !== 'trend') {
        const totalPadding = Number(props.padding) * (props.modelValue.length + 1)
        return (Number(props.width) - totalPadding) / props.modelValue.length
      } else {
        return parseFloat(props.lineWidth) || 4
      }
    })

    const totalWidth = computed(() => props.type === 'bar'
      ? Math.max(props.modelValue.length * lineWidth.value, Number(props.width))
      : Number(props.width))

    const boundary = computed<Boundary>(() => {
      if (props.type === 'bar') {
        return {
          minX: 0,
          maxX: totalWidth.value,
          minY: 0,
          maxY: parseInt(props.height, 10),
        }
      }

      const padding = Number(props.padding)

      return {
        minX: padding,
        maxX: totalWidth.value - padding,
        minY: padding,
        maxY: parseInt(props.height, 10) - padding,
      }
    })

    function genBars (
      values: number[],
      boundary: Boundary
    ): Bar[] {
      const { minX, maxX, minY, maxY } = boundary
      const totalValues = values.length
      let maxValue = Math.max(...values)
      let minValue = Math.min(...values)

      if (minValue > 0) minValue = 0
      if (maxValue < 0) maxValue = 0

      const gridX = maxX / totalValues
      const gridY = (maxY - minY) / ((maxValue - minValue) || 1)
      const horizonY = maxY - Math.abs(minValue * gridY)

      return values.map((value, index) => {
        const height = Math.abs(gridY * value)

        return {
          x: minX + index * gridX,
          y: horizonY - height +
            +(value < 0) * height,
          height,
          value,
        }
      })
    }

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

    const parsedLabels = computed(() => {
      const labels = []
      const points = (props.type === 'trend'
        ? genPoints(
          props.modelValue.map(item => (typeof item === 'number' ? item : item.value)),
          boundary.value
        )
        : genBars(
          props.modelValue.map(item => (typeof item === 'number' ? item : item.value)),
          boundary.value
        )
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

    watch(() => props.modelValue, val => {
      nextTick(() => {
        if (
          !props.autoDraw ||
          props.type === 'bar' ||
          !path.value
        ) return

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
    })

    const bars = computed(() => genBars(props.modelValue.map(item => (typeof item === 'number' ? item : item.value)), boundary.value))
    const offsetX = computed(() => (Math.abs(bars.value[0].x - bars.value[1].x) - lineWidth.value) / 2)

    useRender(() => {
      const gradientData = !props.gradient.slice().length ? [''] : props.gradient.slice().reverse()

      return (
        <svg
          {
            ...{
              ...attrs,
              ...(props.type === 'trend' ? {
                display: 'block',
                'stroke-width': parseFloat(props.lineWidth) ?? 4,
                viewBox: `0 0 ${props.width} ${totalHeight.value}`,
              } : {
                ...attrs,
                display: 'block',
                viewBox: `0 0 ${Math.max(props.modelValue.length * lineWidth.value, Number(props.width))} ${hasLabels.value
                  ? parseInt(props.height, 10) + parseInt(props.labelSize, 10) * 1.5
                  : parseInt(props.height, 10)}`,
              }),
            }
          }
        >
          {
            props.type === 'trend' ? (
              <>
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
                    style={ `fontSize: 8; textAnchor: 'middle'; dominantBaseline: 'mathematical'; fill: 'currentColor'` }
                  >
                    {
                      parsedLabels.value.map((item, i) => (
                        <text
                          x={ item.x + (lineWidth.value / 2) + lineWidth.value / 2 }
                          y={ (props.type === 'trend'
                            ? parseInt(props.height, 10) - 4
                            : parseInt(props.height, 10)
                          ) + (parseInt(props.labelSize, 10) || 7 * 0.75)}
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

                { genPoints.length && (
                  <path
                    d={ genPath(
                      genPoints(
                        props.modelValue.map(item => (typeof item === 'number' ? item : item.value)),
                        boundary.value
                      ),
                      props.smooth === true ? 8 : Number(props.smooth),
                      props.fill,
                      parseInt(props.height, 10)
                    )}
                    fill={ props.fill ? `url(#1)` : 'none' }
                    stroke={ props.fill ? 'none' : `url(#1)` }
                    ref="path"
                  />
                )}
              </>
            ) : (
              <>
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

                <clipPath id={ `sparkline-bar-${1}-clip` }>
                  {
                    bars.value.map(item => (
                      <rect
                        x={ item.x + offsetX.value }
                        y={ item.y }
                        width={ lineWidth.value }
                        height={ item.height }
                        rx={ typeof props.smooth === 'number'
                          ? props.smooth
                          : props.smooth ? 2 : 0 }
                        ry={ typeof props.smooth === 'number'
                          ? props.smooth
                          : props.smooth ? 2 : 0 }
                      >
                        {
                          props.autoDraw ? (
                            <animate
                              attributeName="height"
                              from="0"
                              to={ item.height }
                              dur={ `${props.autoDrawDuration}ms` }
                              fill="freeze"
                            ></animate>
                          ) : undefined as never
                        }
                      </rect>
                    ))
                  }
                </clipPath>

                { hasLabels.value && (
                  <g
                    style={ `fontSize: 8; textAnchor: 'middle'; dominantBaseline: 'mathematical'; fill: 'currentColor'` }
                  >
                    {
                      parsedLabels.value.map((item, i) => (
                        <text
                          x={ item.x + (offsetX.value / 2) + lineWidth.value / 2 }
                          y={ (props.type === 'trend'
                            ? parseInt(props.height, 10) - 4
                            : parseInt(props.height, 10)
                          ) + (parseInt(props.labelSize, 10) || 7 * 0.75)}
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

                <g
                  clip-path={ `url(#sparkline-bar-${1}-clip)` }
                  fill={ `url(#${1})` }
                >
                  <rect
                    x={ 0 }
                    y={ 0 }
                    width={ Math.max(props.modelValue.length * lineWidth.value, Number(props.width)) }
                    height={ props.height }
                  ></rect>
                </g>
              </>
            )
          }
        </svg>
      )
    })

    return {}
  },
})

export type VSparkline = InstanceType<typeof VSparkline>
