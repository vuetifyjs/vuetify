// Composables
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, nextTick, ref, watch } from 'vue'
import { makeLineProps } from './util/line'
import { genPath as _genPath } from './util/path'
import { genericComponent, getPropertyFromItem, getUid, isCssColor, propsFactory, useRender } from '@/util'

// Types
export type VMultiTrendSlots = {
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

export const makeVMultiTrendProps = propsFactory({
  fill: Boolean,
  ...makeLineProps(),
  ...makeThemeProps(),
}, 'VMultiTrend')

export const VMultiTrend = genericComponent<VMultiTrendSlots>()({
  name: 'VMultiTrend',

  props: makeVMultiTrendProps(),

  setup (props, { slots }) {
    const theme = provideTheme(props)
    const uid = getUid()
    const id = computed(() => props.id || `multitrend-${uid}`)
    const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || (props.fill ? 500 : 2000))

    const lastLength = ref(0)
    const paths = ref<SVGPathElement[] | []>([])

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
    const items = computed(() => {
      let lines = []
      if (!Array.isArray(props.modelValue?.[0])) {
        lines = [props.modelValue.map(item => getPropertyFromItem(item, props.itemValue, item))]
      } else {
        lines = props.modelValue.map(item => (item as SparklineItem[]).map(nested => getPropertyFromItem(nested, props.itemValue, nested)))
      }
      // Need to make lines the same length
      const longestLine = lines.reduce((longest, line) => line.length > longest ? line.length : longest, 0)
      lines = lines.map(line => line.length === longestLine
        ? line
        : [...line, ...Array.from({ length: longestLine - line.length }, (v, i) => line.at(-1))]
      )
      return lines
    })
    const parsedLabels = computed(() => {
      const labels = []
      const points = items.value.map(item => genPoints(item, boundary.value))
      const len = points.length

      for (let i = 0; labels.length < len; i++) {
        const item = points[0][i]
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

      if (!props.autoDraw || !paths.value || !paths.value.length) return
      for (const path of paths.value) {
        const pathRef = path
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
          pathRef.style.fill = 'black'
          // Your existing logic for filled paths remains the same
          pathRef.style.transformOrigin = 'bottom center'
          pathRef.style.transition = 'none'
          pathRef.style.transform = `scaleY(0)`
          pathRef.getBoundingClientRect()
          pathRef.style.transition = `transform ${autoDrawDuration.value}ms ${props.autoDrawEasing}`
          pathRef.style.transform = `scaleY(1)`
        }
      }

      lastLength.value = length
    }, { immediate: true })

    function genPath (index: number, fill: boolean) {
      return _genPath(
        genPoints(items.value[index], boundary.value),
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
          {
            items.value.map((item, i) => (
              <path
                ref={ paths }
                d={ genPath(i, props.fill) }
                fill={ props.fill ? `url(#${id.value}-line${i})` : 'none' }
                stroke={ props.fill ? 'none' : Array.isArray(props.color)
                  ? props.color[i]
                    ? isCssColor(props.color[i])
                      ? props.color[i]
                      : theme.current.value.colors[props.color[i]]
                    : isCssColor(props.color.at(-1))
                      ? props.color.at(-1)
                      : theme.current.value.colors[props.color.at(-1)]
                  : isCssColor(props.color) ? props.color : theme.current.value.colors[props.color] }
              />
            ))
          }

          { props.fill && (
            <path
              d={ genPath(0, false) }
              fill="none"
              stroke={ (Array.isArray(props.color) ? props.color[0] : props.color) ?? props.gradient?.[0] }
            />
          )}
        </svg>
      )
    })
  },
})

export type VMultiTrend = InstanceType<typeof VMultiTrend>
