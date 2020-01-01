import './VResponsive.sass'

// Mixins
import Measurable, { NumberOrNumberString } from '../../mixins/measurable'

// Types
import { VNode } from 'vue'

// Utilities
import mixins from '../../util/mixins'
import { convertToUnit } from '../../util/helpers'

/* @vue/component */
export default mixins(Measurable).extend({
  name: 'v-responsive',

  props: {
    aspectRatio: [String, Number] as NumberOrNumberString,
  },

  computed: {
    computedAspectRatio (): number | undefined {
      const aspectRatio = Number(this.aspectRatio)

      return !isNaN(aspectRatio) ? (1 / aspectRatio) : undefined
    },
    computedAspectRatioPercent (): number | undefined {
      if (this.computedAspectRatio == null) return undefined

      return this.computedAspectRatio * 100
    },
    contentAspectStyle (): object | undefined {
      if (this.computedAspectRatioPercent == null) return undefined

      return {
        marginTop: convertToUnit(-1 * this.computedAspectRatioPercent, '%'),
      }
    },
    sizerAspectStyle (): object | undefined {
      if (this.computedAspectRatioPercent == null) return undefined

      return {
        paddingTop: convertToUnit(this.computedAspectRatioPercent, '%'),
      }
    },
  },

  methods: {
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-responsive__sizer',
        style: this.sizerAspectStyle,
      }, [
        this.$createElement('div', {
          staticClass: 'v-responsive__content',
          style: this.contentAspectStyle,
        }, this.$slots.default),
      ])
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-responsive',
      style: this.measurableStyles,
      on: this.$listeners,
    }, [
      this.genContent(),
    ])
  },
})
