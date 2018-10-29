// Extensions
import VWindowItem from '../VWindow/VWindowItem'

// Components
import { VImg } from '../VImg'

/* @vue/component */
export default VWindowItem.extend({
  name: 'v-carousel-item',

  inheritAttrs: false,

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
    onBeforeLeave () { /* noop */ },
    onEnterCancelled () { /* noop */ }
  }
})
