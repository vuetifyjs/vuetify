// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-timeline-item',

  inject: ['iconParent', 'noIconParent', 'circleFillColorParent'],

  mixins: [Colorable],

  props: {
    icon: {
      type: String
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    circleFillColor: {
      type: String
    }
  },

  computed: {
    classes () {
      return this.addBackgroundColorClassChecks({
        'v-timeline__item--body': true
      })
    },
    circleClasses () {
      const circleFillColorClass = this.circleFillColor || this.circleFillColorParent
      const classes = {
        [circleFillColorClass]: true
      }
      this.addBackgroundColorClassChecks({}, classes)
    }
  },

  methods: {
    genBody () {
      return this.$createElement(
        'div',
        {
          staticClass: 'v-timeline__item--body__container'
        },
        [
          this.$createElement(
            'div',
            {
              ref: 'body',
              class: this.classes
            },
            this.$slots.item
          )
        ]
      )
    },
    genIconHeader () {
      const icon = this.icon ? this.icon : this.iconParent
      const iconSize = this.iconSize ? this.iconSize : this.iconSizeParent

      const iconElement =
        this.noIcon || this.noIconParent
          ? null
          : this.$slots.icon ||
            this.$createElement(
              VIcon,
              {
                props: {
                  size: iconSize + 'px'
                }
              },
              icon
            )
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

    children.push(this.genIconHeader())
    children.push(this.genBody())

    return h(
      'li',
      {
        staticClass: 'v-timeline__item'
      },
      [
        h('div', {
          staticClass: 'v-timeline__line',
          class: this.lineClasses
        }),
        children
      ]
    )
  }
}
