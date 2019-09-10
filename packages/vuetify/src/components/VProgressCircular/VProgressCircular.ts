// Styles
import './VProgressCircular.sass'

// Mixins
import Colorable from '../../mixins/colorable'

// Utils
import { convertToUnit } from '../../util/helpers'

// Types
import { VNode, VNodeChildren } from 'vue'

/* @vue/component */
export default Colorable.extend({
  name: 'v-progress-circular',

  props: {
    button: Boolean,
    indeterminate: Boolean,
    rotate: {
      type: [Number, String],
      default: 0,
    },
    size: {
      type: [Number, String],
      default: 32,
    },
    width: {
      type: [Number, String],
      default: 4,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
  },

  data: () => ({
    radius: 20,
  }),

  computed: {
    calculatedSize (): number {
      return Number(this.size) + (this.button ? 8 : 0)
    },

    circumference (): number {
      return 2 * Math.PI * this.radius
    },

    classes (): object {
      return {
        'v-progress-circular--indeterminate': this.indeterminate,
        'v-progress-circular--button': this.button,
      }
    },

    normalizedValue (): number {
      if (this.value < 0) {
        return 0
      }

      if (this.value > 100) {
        return 100
      }

      return parseFloat(this.value)
    },

    strokeDashArray (): number {
      return Math.round(this.circumference * 1000) / 1000
    },

    strokeDashOffset (): string {
      return ((100 - this.normalizedValue) / 100) * this.circumference + 'px'
    },

    strokeWidth (): number {
      return Number(this.width) / +this.size * this.viewBoxSize * 2
    },

    styles (): object {
      return {
        height: convertToUnit(this.calculatedSize),
        width: convertToUnit(this.calculatedSize),
      }
    },

    svgStyles (): object {
      return {
        transform: `rotate(${Number(this.rotate)}deg)`,
      }
    },

    viewBoxSize (): number {
      return this.radius / (1 - Number(this.width) / +this.size)
    },
  },

  methods: {
    genCircle (name: string, offset: string | number): VNode {
      return this.$createElement('circle', {
        class: `v-progress-circular__${name}`,
        attrs: {
          fill: 'transparent',
          cx: 2 * this.viewBoxSize,
          cy: 2 * this.viewBoxSize,
          r: this.radius,
          'stroke-width': this.strokeWidth,
          'stroke-dasharray': this.strokeDashArray,
          'stroke-dashoffset': offset,
        },
      })
    },
    genSvg (): VNode {
      const children = [
        this.indeterminate || this.genCircle('underlay', 0),
        this.genCircle('overlay', this.strokeDashOffset),
      ] as VNodeChildren

      return this.$createElement('svg', {
        style: this.svgStyles,
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: `${this.viewBoxSize} ${this.viewBoxSize} ${2 * this.viewBoxSize} ${2 * this.viewBoxSize}`,
        },
      }, children)
    },
    genInfo (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-progress-circular__info',
      }, this.$slots.default)
    },
  },

  render (h): VNode {
    return h('div', this.setTextColor(this.color, {
      staticClass: 'v-progress-circular',
      attrs: {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue,
      },
      class: this.classes,
      style: this.styles,
      on: this.$listeners,
    }), [
      this.genSvg(),
      this.genInfo(),
    ])
  },
})
