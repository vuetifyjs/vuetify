import '../../stylus/components/_responsive.styl'

// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

// Utils
import { convertToUnit } from '../../util/helpers'

type UnknownProp = PropValidator<string | number | undefined>

export default Vue.extend({
  name: 'v-responsive',

  props: {
    aspectRatio: [String, Number] as UnknownProp,
    height: [String, Number] as UnknownProp,
    maxHeight: [String, Number] as UnknownProp
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
    __cachedSizer (): VNode | never[] {
      if (!this.aspectStyle) return []

      return this.$createElement('div', {
        style: this.aspectStyle,
        staticClass: 'v-responsive__sizer'
      })
    }
  },

  methods: {
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-responsive__content'
      }, this.$slots.default)
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-responsive',
      style: {
        height: convertToUnit(this.height),
        maxHeight: convertToUnit(this.maxHeight)
      },
      on: this.$listeners
    }, [
      this.__cachedSizer,
      this.genContent()
    ])
  }
})
