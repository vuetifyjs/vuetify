// Components
import { VImg } from '../VImg'
import { WindowItemInstance } from '../VWindow/VWindowItem'

// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'

// Utilities
import { ExtractVue } from './../../util/mixins'
import mixins from '../../util/mixins'

// Types
type options = ExtractVue<[typeof WindowItemInstance]>

/* @vue/component */
export default mixins<options>(
  WindowItemInstance,
  GroupableFactory('windowGroup', 'v-carousel-item', 'v-carousel')
).extend({
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
