// Styles
import '../../stylus/components/_overlay.styl'

// Mixins
import Colorable from './../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import Toggleable from './../../mixins/toggleable'

// Utilities
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

/* @vue/component */
export default mixins(
  Colorable,
  Themeable,
  Toggleable
).extend({
  name: 'v-overlay',

  props: {
    absolute: Boolean,
    color: {
      type: String,
      default: '#212121'
    },
    opacity: {
      type: [Number, String],
      default: 0.46
    },
    lazy: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 1
    }
  },

  computed: {
    __scrim (): VNode {
      const data = this.setBackgroundColor(this.color, {
        staticClass: 'v-overlay__scrim',
        style: {
          opacity: this.computedOpacity
        }
      })

      return this.$createElement('div', data)
    },
    classes (): object {
      return {
        'v-overlay--absolute': this.absolute,
        'v-overlay--active': this.isActive,
        ...this.themeClasses
      }
    },
    computedOpacity (): string | number {
      if (!this.isActive) return 0

      return this.opacity
    },
    styles (): object {
      return {
        zIndex: this.zIndex
      }
    }
  },

  methods: {
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-overlay__content'
      }, this.$slots.default)
    }
  },

  render (h): VNode {
    const children = [this.__scrim]

    if (this.isActive) children.push(this.genContent())

    return h('div', {
      staticClass: 'v-overlay',
      class: this.classes,
      style: this.styles
    }, children)
  }
})
