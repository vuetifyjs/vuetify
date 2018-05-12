// Components
import VIcon from '../VIcon'
import VBtn from '../VBtn'

// Mixins
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-timeline-item',

  mixins: [Colorable],

  props: {
    icon: [Boolean, String],
    color: String,
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
      return this.$createElement(VBtn, {
        staticClass: 'v-timeline-item__btn',
        props: {
          absolute: true,
          color: this.color,
          fab: true
        }
      }, [this.icon ? this.genIcon() : null])
    },
    genOpposite () {
      if (this.$slots.opposite) {
        return this.$createElement('div', {
          staticClass: 'v-timeline-item__opposite'
        }, [this.$slots.opposite])
      }
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'v-timeline-item',
      class: {
        'v-timeline-item--left': this.left,
        'v-timeline-item--right': this.right
      }
    }, [
      this.genBtn(),
      this.genBody(),
      this.genOpposite()
    ])
  }
}
