import '../../stylus/components/_progress-circular.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import mixins from '../../util/mixins'

// Types
import { CreateElement, VNode, VNodeChildrenArrayContents } from 'vue'

/* @vue/component */
export default mixins(Colorable).extend({
  name: 'v-progress-circular',

  props: {
    button: Boolean,

    indeterminate: Boolean,

    rotate: {
      type: Number,
      default: 0
    },

    size: {
      type: [Number, String],
      default: 32
    },

    width: {
      type: Number,
      default: 4
    },

    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
    calculatedSize (): number {
      return Number(this.size) + (this.button ? 8 : 0)
    },

    circumference (): number {
      return 2 * Math.PI * this.radius
    },

    classes (): object {
      return this.addTextColorClassChecks({
        'v-progress-circular': true,
        'v-progress-circular--indeterminate': this.indeterminate,
        'v-progress-circular--button': this.button
      })
    },

    normalizedValue (): number {
      if (this.value < 0) {
        return 0
      }

      if (this.value > 100) {
        return 100
      }

      return this.value
    },

    radius (): number {
      return 20
    },

    strokeDashArray (): number {
      return Math.round(this.circumference * 1000) / 1000
    },

    strokeDashOffset (): string {
      return ((100 - this.normalizedValue) / 100) * this.circumference + 'px'
    },

    strokeWidth (): number {
      return this.width / +this.size * this.viewBoxSize * 2
    },

    styles (): object {
      return {
        height: `${this.calculatedSize}px`,
        width: `${this.calculatedSize}px`
      }
    },

    svgStyles (): object {
      return {
        transform: `rotate(${this.rotate}deg)`
      }
    },

    viewBoxSize (): number {
      return this.radius / (1 - this.width / +this.size)
    }
  },

  methods: {
    genCircle (h: CreateElement, name: string, offset: string | number): VNode {
      return h('circle', {
        class: `v-progress-circular__${name}`,
        attrs: {
          fill: 'transparent',
          cx: 2 * this.viewBoxSize,
          cy: 2 * this.viewBoxSize,
          r: this.radius,
          'stroke-width': this.strokeWidth,
          'stroke-dasharray': this.strokeDashArray,
          'stroke-dashoffset': offset
        }
      })
    },
    genSvg (h: CreateElement): VNode {
      const children = [
        this.indeterminate || this.genCircle(h, 'underlay', 0),
        this.genCircle(h, 'overlay', this.strokeDashOffset)
      ] as VNodeChildrenArrayContents

      return h('svg', {
        style: this.svgStyles,
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: `${this.viewBoxSize} ${this.viewBoxSize} ${2 * this.viewBoxSize} ${2 * this.viewBoxSize}`
        }
      }, children)
    }
  },

  render (h): VNode {
    const info = h('div', { class: 'v-progress-circular__info' }, [this.$slots.default])
    const svg = this.genSvg(h)

    return h('div', {
      class: this.classes,
      style: this.styles,
      on: this.$listeners
    }, [svg, info])
  }
})
