// Mixins
import Colorable from '../../mixins/colorable'

// Utilities
import mixins, { ExtractVue } from '../../util/mixins'
import { genPoints } from './helpers/core'
import { genPath } from './helpers/path'

// Types
import Vue, { VNode } from 'vue'
import { Prop, PropValidator } from 'vue/types/options'

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

export interface BarText {
  points: Point[]
  boundary: Boundary
  offsetX: number
}

interface options extends Vue {
  $refs: {
    path: SVGPathElement
  }
}

export default mixins<options &
/* eslint-disable indent */
  ExtractVue<[
    typeof Colorable
  ]>
/* eslint-enable indent */
>(
  Colorable
).extend({
  name: 'VSparkline',

  props: {
    autoDraw: Boolean,
    autoDrawDuration: {
      type: Number,
      default: 2000
    },
    autoDrawEasing: {
      type: String,
      default: 'ease'
    },
    autoLineWidth: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    fill: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: Array as Prop<string[]>,
      default: () => ([])
    },
    gradientDirection: {
      type: String as Prop<'top' | 'bottom' | 'left' | 'right'>,
      validator: (val: string) => ['top', 'bottom', 'left', 'right'].includes(val),
      default: 'top'
    },
    height: {
      type: [String, Number],
      default: 75
    },
    labels: {
      type: Array as Prop<SparklineItem[]>,
      default: () => ([])
    },
    lineWidth: {
      type: [String, Number],
      default: 4
    },
    padding: {
      type: [String, Number],
      default: 8
    },
    smooth: {
      type: [Boolean, Number, String],
      default: false
    },
    showLabels: Boolean,
    type: {
      type: String,
      default: 'trend',
      validator: (val: string) => ['trend', 'bar'].includes(val)
    } as PropValidator<'trend' | 'bar'>,
    value: {
      type: Array as Prop<SparklineItem[]>,
      default: () => ([])
    },
    width: {
      type: [Number, String],
      default: 300
    },
    labelSize: {
      type: [Number, String],
      default: 7
    }
  },

  data: () => ({
    lastLength: 0
  }),

  computed: {
    parsedPadding (): number {
      return Number(this.padding)
    },
    parsedWidth (): number {
      return Number(this.width)
    },
    totalBars (): number {
      return this.value.length
    },
    _lineWidth (): number {
      if (this.autoLineWidth && this.type !== 'trend') {
        const totalPadding = this.parsedPadding * (this.totalBars + 1)
        return (this.parsedWidth - totalPadding) / this.totalBars
      } else {
        return Number(this.lineWidth) || 4
      }
    },
    boundary (): Boundary {
      const height = Number(this.height)

      return {
        minX: this.parsedPadding,
        minY: this.parsedPadding,
        maxX: this.parsedWidth - this.parsedPadding,
        maxY: height - this.parsedPadding
      }
    },
    hasLabels (): boolean {
      return Boolean(
        this.showLabels ||
        this.labels.length > 0 ||
        this.$scopedSlots.label
      )
    },
    parsedLabels (): SparklineText[] {
      const labels = []
      const points = this.points
      const len = points.length

      for (let i = 0; labels.length < len; i++) {
        const item = points[i]
        let value = this.labels[i]

        if (!value) {
          value = item === Object(item)
            ? item.value
            : item
        }

        labels.push({
          ...item,
          value: String(value)
        })
      }

      return labels
    },
    points (): Point[] {
      return genPoints(this.value.slice(), this.boundary, this.type)
    },
    textY (): number {
      return this.boundary.maxY + 6
    }
  },

  watch: {
    value: {
      immediate: true,
      handler () {
        this.$nextTick(() => {
          if (!this.autoDraw || this.type === 'bar') return

          const path = this.$refs.path
          const length = path.getTotalLength()

          if (!this.fill) {
            path.style.transition = 'none'
            path.style.strokeDasharray = length + ' ' + length
            path.style.strokeDashoffset = Math.abs(length - (this.lastLength || 0)).toString()
            path.getBoundingClientRect()
            path.style.transition = `stroke-dashoffset ${this.autoDrawDuration}ms ${this.autoDrawEasing}`
            path.style.strokeDashoffset = '0'
          } else {
            path.style.transformOrigin = 'bottom center'
            path.style.transition = 'none'
            path.style.transform = `scaleY(0)`
            path.getBoundingClientRect()
            path.style.transition = `transform ${this.autoDrawDuration}ms ${this.autoDrawEasing}`
            path.style.transform = `scaleY(1)`
          }
          this.lastLength = length
        })
      }
    }
  },

  methods: {
    genGradient () {
      const gradientDirection = this.gradientDirection
      const gradient = this.gradient.slice()

      // Pushes empty string to force
      // a fallback to currentColor
      if (!gradient.length) gradient.push('')

      const len = Math.max(gradient.length - 1, 1)
      const stops = gradient.reverse().map((color, index) =>
        this.$createElement('stop', {
          attrs: {
            offset: index / len,
            'stop-color': color || this.color || 'currentColor'
          }
        })
      )

      return this.$createElement('defs', [
        this.$createElement('linearGradient', {
          attrs: {
            id: this._uid,
            x1: +(gradientDirection === 'left'),
            y1: +(gradientDirection === 'top'),
            x2: +(gradientDirection === 'right'),
            y2: +(gradientDirection === 'bottom')
          }
        }, stops)
      ])
    },
    genG (children: VNode[]) {
      return this.$createElement('g', {
        style: {
          fontSize: '8',
          textAnchor: 'middle',
          dominantBaseline: 'mathematical',
          fill: this.color || 'currentColor'
        }
      }, children)
    },
    genLabels () {
      if (!this.hasLabels) return undefined

      return this.genG(this.parsedLabels.map(this.genText))
    },
    genPath () {
      const radius = this.smooth === true ? 8 : Number(this.smooth)

      return this.$createElement('path', {
        attrs: {
          id: this._uid,
          d: genPath(this.points.slice(), radius, this.fill, Number(this.height)),
          fill: this.fill ? `url(#${this._uid})` : 'none',
          stroke: this.fill ? 'none' : `url(#${this._uid})`
        },
        ref: 'path'
      })
    },
    genText (item: SparklineText, index: number) {
      const children = this.$scopedSlots.label
        ? this.$scopedSlots.label({ index, value: item.value })
        : item.value

      return this.$createElement('text', {
        attrs: {
          x: item.x,
          y: this.textY
        }
      }, [children])
    },
    genBar () {
      if (!this.value || this.totalBars < 2) return undefined as never
      const { width, height, parsedPadding, _lineWidth } = this
      const viewWidth = width || this.totalBars * parsedPadding * 2
      const viewHeight = height || 75
      const boundary: Boundary = {
        minX: parsedPadding,
        minY: parsedPadding,
        maxX: Number(viewWidth) - parsedPadding,
        maxY: Number(viewHeight) - parsedPadding
      }
      const props = {
        ...this.$props
      }

      props.points = genPoints(this.value, boundary, this.type)

      const totalWidth = boundary.maxX / (props.points.length - 1)

      props.boundary = boundary
      props.lineWidth = _lineWidth || (totalWidth - Number(parsedPadding || 5))
      props.offsetX = 0
      if (!this.autoLineWidth) {
        props.offsetX = ((boundary.maxX / this.totalBars) / 2) - boundary.minX
      }

      return this.$createElement('svg', {
        attrs: {
          width: '100%',
          height: '25%',
          viewBox: `0 0 ${viewWidth} ${viewHeight}`
        }
      }, [
        this.genGradient(),
        this.genClipPath(props.offsetX, props.lineWidth, 'sparkline-bar-' + this._uid),
        this.hasLabels ? this.genBarLabels(props as BarText) : undefined as never,
        this.$createElement('g', {
          attrs: {
            transform: `scale(1,-1) translate(0,-${boundary.maxY})`,
            'clip-path': `url(#sparkline-bar-${this._uid}-clip)`,
            fill: `url(#${this._uid})`
          }
        }, [
          this.$createElement('rect', {
            attrs: {
              x: 0,
              y: 0,
              width: viewWidth,
              height: viewHeight
            }
          })
        ])
      ])
    },
    genClipPath (offsetX: number, lineWidth: number, id: string) {
      const { maxY } = this.boundary
      const rounding = typeof this.smooth === 'number'
        ? this.smooth
        : this.smooth ? 2 : 0

      return this.$createElement('clipPath', {
        attrs: {
          id: `${id}-clip`
        }
      }, this.points.map(item => {
        return this.$createElement('rect', {
          attrs: {
            x: item.x + offsetX,
            y: 0,
            width: lineWidth,
            height: Math.max(maxY - item.y, 0),
            rx: rounding,
            ry: rounding
          }
        }, [
          this.autoDraw ? this.$createElement('animate', {
            attrs: {
              attributeName: 'height',
              from: 0,
              to: maxY - item.y,
              dur: `${this.autoDrawDuration}ms`,
              fill: 'freeze'
            }
          }) : undefined as never
        ])
      }))
    },
    genBarLabels (props: BarText): VNode {
      const offsetX = props.offsetX || 0

      const children = props.points.map(item => (
        this.$createElement('text', {
          attrs: {
            x: item.x + offsetX + this._lineWidth / 2,
            y: props.boundary.maxY + (Number(this.labelSize) || 7),
            'font-size': Number(this.labelSize) || 7
          }
        }, item.value.toString())
      ))

      return this.genG(children)
    },
    genTrend () {
      return this.$createElement('svg', this.setTextColor(this.color, {
        attrs: {
          'stroke-width': this._lineWidth || 1,
          width: '100%',
          height: '25%',
          viewBox: `0 0 ${this.width} ${this.height}`
        }
      }), [
        this.genGradient(),
        this.genLabels(),
        this.genPath()
      ])
    }
  },

  render (h): VNode {
    if (this.totalBars < 2) return undefined as never

    return this.type === 'trend'
      ? this.genTrend()
      : this.genBar()
  }
})
