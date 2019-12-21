import './VResponsive.sass'

// Mixins
import Measurable, { NumberOrNumberString } from '../../mixins/measurable'

// Types
import { VNode } from 'vue'

// Utils
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(Measurable).extend({
  name: 'v-responsive',

  props: {
    aspectRatio: [String, Number] as NumberOrNumberString,
  },

  computed: {
    computedAspectRatio (): number {
      return Number(this.aspectRatio)
    },
    sizerAspectStyle (): object | undefined {
      return this.computedAspectRatio
        ? { paddingTop: (1 / this.computedAspectRatio) * 100 + '%' }
        : undefined
    },
    contentAspectStyle (): object | undefined {
      return this.computedAspectRatio
        ? { marginTop: -1 * (1 / this.computedAspectRatio) * 100 + '%' }
        : undefined
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
