// Types
import mixins from '../../util/mixins'
import { VNode } from 'vue'

// Components
import VIcon from '../VIcon'

// Mixins
import Themeable from '../../mixins/themeable'
import Colorable from '../../mixins/colorable'

export default mixins(
  Colorable,
  Themeable
/* @vue/component */
).extend({
  name: 'v-timeline-item',

  props: {
    color: {
      type: String,
      default: 'primary'
    },
    icon: String,
    iconColor: String,
    left: Boolean,
    right: Boolean,
    small: Boolean
  },

  methods: {
    genBody () {
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__body'
      }, this.$slots.default)
    },
    genIcon () {
      return this.$createElement(VIcon, {
        props: {
          color: this.iconColor,
          dark: !this.theme.isDark,
          small: this.small
        }
      }, this.icon)
    },
    genInnerDot () {
      const children = []

      this.icon && children.push(this.genIcon())

      let data = {
        staticClass: 'v-timeline-item__inner-dot'
      }

      data = this.setBackgroundColor(this.color, data)

      return this.$createElement('div', data, children)
    },
    genDot () {
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__dot',
        class: {
          'v-timeline-item__dot--small': this.small
        }
      }, [this.genInnerDot()])
    },
    genOpposite () {
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__opposite'
      }, [this.$slots.opposite])
    }
  },

  render (h): VNode {
    const children = [this.genDot(), this.genBody()]

    if (this.$slots.opposite) children.push(this.genOpposite())

    return h('div', {
      staticClass: 'v-timeline-item',
      class: {
        'v-timeline-item--left': this.left,
        'v-timeline-item--right': this.right,
        ...this.themeClasses
      }
    }, children)
  }
})
