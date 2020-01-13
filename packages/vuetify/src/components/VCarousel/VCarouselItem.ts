// Extensions
import VWindowItem from '../VWindow/VWindowItem'

// Components
import { VImg } from '../VImg'

// Utilities
import mixins from '../../util/mixins'
import Routable from '../../mixins/routable'

// Types
const baseMixins = mixins(
  VWindowItem,
  Routable
)

/* @vue/component */
export default baseMixins.extend({
  name: 'v-carousel-item',

  inheritAttrs: false,

  methods: {
    genDefaultSlot () {
      return [
        this.$createElement(VImg, {
          staticClass: 'v-carousel__item',
          props: {
            ...this.$attrs,
            height: this.windowGroup.internalHeight,
          },
          on: this.$listeners,
        }, [
          this.$slots.default,
          this.$createElement('template', {
            slot: 'placeholder',
          }, this.$slots.placeholder),
        ]),
      ]
    },
    genWindowItem () {
      const { tag, data } = this.generateRouteLink()

      data.staticClass = 'v-window-item'
      data.directives!.push({
        name: 'show',
        value: this.isActive,
      })

      return this.$createElement(tag, data, this.showLazyContent(this.genDefaultSlot()))
    },
  },
})
