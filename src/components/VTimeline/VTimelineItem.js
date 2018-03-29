import { inject as RegistrableInject } from '../../mixins/registrable'
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-timeline-item',

  mixins: [Colorable, RegistrableInject('timeline', 'v-timeline', 'v-timeline-item')],

  props: {
    icon: {
      type: String
    },
    iconSize: {
      type: [Number, String]
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    lineColor: {
      type: String
    },
    hideCircleOutline: {
      type: Boolean,
      default: false
    },
    circleOutlineColor: {
      type: String
    },
    circleFillColor: {
      type: String
    },
    raised: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return this.addBackgroundColorClassChecks({
        'timeline__item--body': true,
        'timeline--hover': this.hover || this.$parent.$props.hover,
        'timeline--raised': this.raised || this.$parent.$props.raised
      })
    },
    lineClasses () {
      if (this.lineColor) {
        return this.addTextColorClassChecks({}, this.lineColor)
      }

      return ''
    },
    circleClasses () {
      const circleFillColorClass = this.circleFillColor ? this.circleFillColor : this.$parent.$props.circleFillColor
      const classes = {
        [circleFillColorClass]: true
      }
      const circleOutlineColor = this.circleOutlineColor ? this.circleOutlineColor : this.$parent.$props.circleOutlineColor

      return this.addTextColorClassChecks(classes, circleOutlineColor)
    },
    lineStyles () {
      const lineSize = parseInt(this.$parent.$props.lineSize)
      const calcMargin = (lineSize - 1) * 3 / 100 + 0.45
      const width = lineSize > 12 ? `12px` : lineSize < 0 ? `0px` : lineSize
      const margin = lineSize > 12 ? `-0.78em` : lineSize < 0 ? `-0.42em` : calcMargin

      return {
        width: `${width}px`,
        marginLeft: `-${margin}em`
      }
    },
    circleStyle () {
      const circleOutlineSizeInt = this.$parent.$props.circleOutlineSize
        ? parseInt(this.$parent.$props.circleOutlineSize)
        : parseInt(this.$parent.$props.lineSize)
      const isHideCircle = this.hideCircleOutline || this.$parent.$props.hideCircleOutline
      const circleOutlineSize = isHideCircle ? 0 : circleOutlineSizeInt > 12 ? 12 : circleOutlineSizeInt < 0 ? 0 : circleOutlineSizeInt

      return {
        boxShadow: `0 0 0 ${circleOutlineSize}px currentColor`
      }
    }
  },

  methods: {
    genBody () {
      return this.$createElement(
        'div',
        {
          staticClass: 'timeline__item--body__container'
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
      const icon = this.icon ? this.icon : this.$parent.$props.icon
      const iconSize = this.iconSize ? this.iconSize : this.$parent.$props.iconSize

      const iconElement =
        this.noIcon || this.$parent.$props.noIcon
          ? null
          : this.$slots.icon ||
            this.$createElement(
              VIcon,
              {
                props: {
                  size: iconSize
                }
              },
              icon
            )
      return this.$createElement(
        'div',
        {
          staticClass: 'timeline__item--head',
          class: this.circleClasses
        },
        [
          this.$createElement(
            'div',
            {
              staticClass: 'timeline__item--head-icon',
              class: this.circleClasses,
              style: this.circleStyle
            },
            [iconElement]
          )
        ]
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
        staticClass: 'timeline__item'
      },
      [
        h('div', {
          staticClass: 'timeline__line',
          class: this.lineClasses,
          style: this.lineStyles
        }),
        children
      ]
    )
  }
}
