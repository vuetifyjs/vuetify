// Components
import { VImg } from '../VImg'
import VWindowItem from '../VWindow/VWindowItem'

/* @vue/component */
export default VWindowItem.extend({
  name: 'v-carousel-item',

  inheritAttrs: false,

  props: {
    transition: String,
    reverseTransition: String
  },

  computed: {
    computedTransition (): string {
      if (this.windowGroup.internalReverse) {
        return typeof this.transition !== 'undefined'
          ? this.transition
          : this.windowGroup.computedTransition
      } else {
        return typeof this.reverseTransition !== 'undefined'
          ? this.reverseTransition
          : this.windowGroup.computedTransition
      }
    }
  },

  methods: {
    genDefaultSlot () {
      return [
        this.$createElement(VImg, {
          staticClass: 'v-carousel__item',
          props: {
            ...this.$attrs,
            height: this.windowGroup.internalHeight
          },
          on: this.$listeners
        }, this.$slots.default)
      ]
    },
    onBeforeEnter () { /* noop */ },
    onEnter () { /* noop */ },
    onAfterEnter () { /* noop */ },
    onBeforeLeave () { /* noop */ }
  }
})
