// Mixins
import Colorable from '../../mixins/colorable'

// Utilities
import mixins, { ExtractVue } from '../../util/mixins'
import { genPoints } from './helpers/core'
import { genPath } from './helpers/path'

// Types
import Vue, { VNode } from 'vue'
import { Prop } from 'vue/types/options'

export type SparklineItem = number | { value: number }

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
    color: {
      type: String,
      default: 'primary'
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
    showLabel: Boolean,
    value: {
      type: Array as Prop<SparklineItem[]>,
      default: () => ([])
    },
    width: {
      type: [Number, String],
      default: 300
    }
  },

  data: () => ({
    lastLength: 0
  }),

  computed: {
    boundary (): Boundary {
      const padding = Number(this.padding)
      const height = Number(this.height)
      const width = Number(this.width)

      return {
        minX: padding,
        minY: padding,
        maxX: width - padding,
        maxY: height - padding
      }
    },
    points (): Point[] {
      return genPoints(this.value, this.boundary)
    }
  },

  watch: {
    value: {
      immediate: true,
      handler () {
        this.$nextTick(() => {
          if (!this.autoDraw) return

          const path = this.$refs.path
          const length = path.getTotalLength()

          path.style.transition = 'none'
          path.style.strokeDasharray = length + ' ' + length
          path.style.strokeDashoffset = Math.abs(length - (this.lastLength || 0)).toString()
          path.getBoundingClientRect()
          path.style.transition = `stroke-dashoffset ${this.autoDrawDuration}ms ${this.autoDrawEasing}`
          path.style.strokeDashoffset = '0'
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
            'stop-color': color || 'currentColor'
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
    genLabels () {
      if (!this.showLabel) return undefined

      return this.$createElement('g', {
        style: {
          fontSize: '8',
          textAnchor: 'middle',
          dominantBaseline: 'mathematical',
          fill: 'currentColor'
        }
      }, this.points.map(item => {
        return this.$createElement('text', {
          attrs: {
            x: item.x,
            y: this.boundary.maxY + 4
          }
        }, item.value.toString())
      }))
    },
    genPath () {
      const radius = this.smooth === true ? 8 : Number(this.smooth)

      return this.$createElement('path', {
        attrs: {
          id: this._uid,
          d: genPath(this.points, radius),
          fill: 'none',
          stroke: `url(#${this._uid})`
        },
        ref: 'path'
      })
    }
  },

  render (h): VNode {
    if (this.value.length < 2) return undefined as never

    return h('svg', this.setTextColor(this.color, {
      attrs: {
        'stroke-width': this.lineWidth || 1,
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
})
