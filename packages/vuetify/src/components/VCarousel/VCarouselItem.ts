// Extensions
import VWindowItem from '../VWindow/VWindowItem'

// Components
import { VImg } from '../VImg'

// Utilities
import mixins, { ExtractVue } from '../../util/mixins'
import { getSlot } from '../../util/helpers'
import Routable from '../../mixins/routable'

// Types
const baseMixins = mixins(
  VWindowItem,
  Routable
)

interface options extends ExtractVue<typeof baseMixins> {
  parentTheme: {
    isDark: boolean
  }
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-carousel-item',

  inject: {
    parentTheme: {
      default: {
        isDark: false,
      },
    },
  },

  // pass down the parent's theme
  provide (): object {
    return {
      theme: this.parentTheme,
    }
  },

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
          scopedSlots: {
            placeholder: this.$scopedSlots.placeholder,
          },
        }, getSlot(this)),
      ]
    },
    genWindowItem () {
      const { tag, data } = this.generateRouteLink()

      data.staticClass = 'v-window-item'
      data.directives!.push({
        name: 'show',
        value: this.isActive,
      })

      return this.$createElement(tag, data, this.genDefaultSlot())
    },
  },
})
