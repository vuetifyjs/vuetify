// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-timeline-item',

  // inject: ['right', 'left', 'alternate'],

  mixins: [Colorable],

  props: {
    icon: {
      type: String,
      default: 'event'
    },
    iconColor: {
      tyep: String
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    iconFillColor: {
      type: String,
      default: 'white'
    }
  },

  computed: {
    circleClasses () {
      const classes = this.addBackgroundColorClassChecks({}, this.iconFillColor)
      return this.addTextColorClassChecks(classes, this.iconFillColor)
    }
  },

  methods: {
    genBody () {
      return this.$createElement(
        'div',
        {
          staticClass: 'v-timeline__body'
        },
        this.$slots.item
      )
    },
    genHeader () {
      const icon = this.icon
      const iconElement = this.noIcon ? null : this.$createElement(VIcon, icon)
      return this.$createElement(
        'div',
        {
          staticClass: 'v-timeline__icon',
          class: this.circleClasses
        },
        [iconElement]
      )
    }
  },

  render (h) {
    const children = []

    children.push(this.genHeader())
    children.push(this.genBody())

    return h(
      'li',
      {
        staticClass: 'v-timeline__item'
      },
      children
    )
  }
}
