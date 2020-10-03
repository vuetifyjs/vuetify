import './VResponsive.sass'

// Mixins
import Measurable, { NumberOrNumberString } from '../../mixins/measurable'

// Types
import type { VNode } from 'vue'

// Utils
import { defineComponent, h } from 'vue'

/* @vue/component */
export default defineComponent({
  name: 'v-responsive',

  mixins: [Measurable],

  props: {
    aspectRatio: [String, Number] as NumberOrNumberString,
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

      return h('div', {
        style: this.aspectStyle,
        class: 'v-responsive__sizer',
      })
    },
  },

  methods: {
    genContent (): VNode {
      return h('div', {
        class: 'v-responsive__content',
      }, this.$slots.default?.())
    },
  },

  render (): VNode {
    return h('div', {
      class: 'v-responsive',
      style: this.measurableStyles,
    }, [
      this.__cachedSizer,
      this.genContent(),
    ])
  },
})
