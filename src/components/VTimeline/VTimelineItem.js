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
    iconColor: String
  },

  methods: {
    genBody () {
      return this.$createElement('div', {
        staticClass: 'v-timeline-item__body'
      }, this.$slots.default)
    },
    genBtn () {
      return this.$createElement(VBtn, {
        props: {
          absolute: true,
          color: this.color,
          fab: true,
          relative: true
        }
      }, [
        this.icon
          ? this.$createElement(VIcon, {
            props: {
              color: this.iconColor
            }
          }, this.icon)
          : null
      ])
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'v-timeline-item'
    }, [
      this.genBtn(),
      this.genBody()
    ])
  }
}
