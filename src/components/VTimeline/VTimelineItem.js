// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-timeline-item',

  inject: [
    'iconParent',
    'iconSizeParent',
    'noIconParent',
    'lineColorParent',
    'hoverParent',
    'raisedParent',
    'circleFillColorParent',
    'circleOutlineSizeParent',
    'circleOutlineColorParent',
    'lineSizeParent',
    'hideCircleOutlineParent'
  ],

  mixins: [Colorable],

  props: {
    raised: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
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
    circleOutlineColor: {
      type: String
    },
    circleFillColor: {
      type: String
    },
    hideCircleOutline: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return this.addBackgroundColorClassChecks({
        'timeline__item--body': true,
        'timeline--hover': this.hover || this.hoverParent,
        'timeline--raised': this.raised || this.raisedParent
      })
    },
    lineClasses () {
      const lineColor = this.lineColor ? this.lineColor : this.lineColorParent
      return this.addTextColorClassChecks({}, lineColor)
    },
    circleClasses () {
      const circleFillColorClass = this.circleFillColor || this.circleFillColorParent
      const classes = {
        [circleFillColorClass]: true
      }
      const circleOutlineColor = this.circleOutlineColor || this.circleOutlineColorParent || this.lineColor || this.lineColorParent

      return this.addTextColorClassChecks(classes, circleOutlineColor)
    },
    lineStyles () {
      const lineSize = parseInt(this.lineSizeParent)
      const calcMargin = (lineSize - 1) * 3 / 100 + 0.45
      const width = lineSize > 12 ? `12px` : lineSize < 0 ? `0px` : lineSize
      const margin = lineSize > 12 ? `-0.78em` : lineSize < 0 ? `-0.42em` : calcMargin

      return {
        width: `${width}px`,
        marginLeft: `-${margin}em`
      }
    },
    circleStyle () {
      const circleOutlineSizeInt = this.circleOutlineSizeParent ? parseInt(this.circleOutlineSizeParent) : parseInt(this.lineSizeParent)
      const isHideCircle = this.hideCircleOutline || this.hideCircleOutlineParent
      const circleOutlineSize = circleOutlineSizeInt > 12 ? 12 : circleOutlineSizeInt < 0 ? 0 : circleOutlineSizeInt
      if (isHideCircle) {
        return { boxShadow: `none` }
      } else {
        return { boxShadow: `currentColor 0px 0px 0px ${circleOutlineSize}px` }
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
          staticClass: 'timeline__item--head',
          class: this.circleClasses
        },
        [
          this.$createElement(
            'div',
            {
              staticClass: 'timeline__icon',
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
