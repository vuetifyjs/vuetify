// Components
import VIcon from '../VIcon'
import VBtn from '../VBtn'

// Mixins
import Colorable from '../../mixins/colorable'
import mixins from '../../util/mixins'
import { VNode } from 'vue'

export default mixins(Colorable).extend({
  name: 'v-timeline-item',

  props: {
    icon: String,
    color: {
      type: String,
      default: 'primary'
    },
    iconColor: String,
    left: Boolean,
    right: Boolean
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
          color: this.iconColor
        }
      }, this.icon)
    },
    genBtn () {
      const children = this.icon ? [this.genIcon()] : []

      return this.$createElement(VBtn, {
        staticClass: 'v-timeline-item__btn',
        props: {
          small: true,
          absolute: true,
          color: this.color,
          fab: true
        }
      }, children)
    },
    genOpposite () {
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__opposite'
      }, [this.$slots.opposite])
    }
  },

  render (h): VNode {
    const children = [this.genBtn(), this.genBody()]

    if (this.$slots.opposite) children.push(this.genOpposite())

    return h('div', {
      staticClass: 'v-timeline-item',
      class: {
        'v-timeline-item--left': this.left,
        'v-timeline-item--right': this.right
      }
    }, children)
  }
})
