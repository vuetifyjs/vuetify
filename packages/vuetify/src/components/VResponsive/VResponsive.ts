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
    contentClass: String,
  },

  computed: {
    computedAspectRatio (): number {
      return Number(this.aspectRatio)
    },
    aspectStyle (): object | undefined {
      return this.computedAspectRatio
        ? { paddingBottom: (1 / this.computedAspectRatio) * 100 + '%' }
        : undefined
    },
    __cachedSizer (): VNode | [] {
      if (!this.aspectStyle) return []

      return this.$createElement('div', {
        style: this.aspectStyle,
        staticClass: 'v-responsive__sizer',
      })
    },
  },

  methods: {
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-responsive__content',
        class: this.contentClass,
      }, this.$slots.default)
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-responsive',
      style: this.measurableStyles,
      on: this.$listeners,
    }, [
      this.__cachedSizer,
      this.genContent(),
    ])
  },
})
