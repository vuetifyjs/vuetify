// Types
import mixins from '../../util/mixins'
import { VNode, VNodeData } from 'vue'

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
    fillDot: Boolean,
    hideDot: Boolean,
    icon: String,
    iconColor: String,
    large: Boolean,
    left: Boolean,
    right: Boolean,
    small: Boolean
  },

  computed: {
    hasIcon (): boolean {
      return !!this.icon || !!this.$slots.icon
    }
  },

  methods: {
    genBody () {
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__body'
      }, this.$slots.default)
    },
    genIcon (): VNode | VNode[] {
      if (this.$slots.icon) {
        return this.$slots.icon
      }

      return this.$createElement(VIcon, {
        props: {
          color: this.iconColor,
          dark: !this.theme.isDark,
          small: this.small
        }
      }, this.icon)
    },
    genInnerDot () {
      const data: VNodeData = this.setBackgroundColor(this.color)

      return this.$createElement('div', {
        staticClass: 'v-timeline-item__inner-dot',
        ...data
      }, [this.hasIcon && this.genIcon()])
    },
    genDot () {
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__dot',
        class: {
          'v-timeline-item__dot--small': this.small,
          'v-timeline-item__dot--large': this.large
        }
      }, [this.genInnerDot()])
    },
    genOpposite () {
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__opposite'
      }, this.$slots.opposite)
    }
  },

  render (h): VNode {
    const children = [this.genBody()]

    if (!this.hideDot) children.unshift(this.genDot())
    if (this.$slots.opposite) children.push(this.genOpposite())

    return h('div', {
      staticClass: 'v-timeline-item',
      class: {
        'v-timeline-item--fill-dot': this.fillDot,
        'v-timeline-item--left': this.left,
        'v-timeline-item--right': this.right,
        ...this.themeClasses
      }
    }, children)
  }
})
