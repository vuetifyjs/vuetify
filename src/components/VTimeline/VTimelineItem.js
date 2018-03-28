import { inject as RegistrableInject } from '../../mixins/registrable'

import Colorable from '../../mixins/colorable'

import VIcon from '../VIcon'

export default {
  name: 'v-timeline-item',

  mixins: [Colorable, RegistrableInject('timeline', 'v-timeline', 'v-timeline-item')],

  props: {
    icon: {
      type: String,
      default: 'event'
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    lineColor: { type: String },
    iconFillColor: { type: String }
  },

  computed: {
    classes () {
      if (this.lineColor) {
        return this.addTextColorClassChecks({}, this.lineColor)
      }

      return ''
    },
    iconFillColorClasses () {
      return this.iconFillColor ? this.iconFillColor : this.$parent.$props.iconFillColor ? this.$parent.$props.iconFillColor : null
    }
  },

  methods: {
    genBody () {
      return this.$createElement(
        'div',
        {
          ref: 'body',
          class: 'timeline__item--body'
        },
        this.$slots.item
      )
    },
    genIconHeader () {
      const icon = this.noIcon || this.$parent.$props.noIcon ? null : this.$slots.icon || this.$createElement(VIcon, this.icon)
      return this.$createElement(
        'div',
        {
          staticClass: 'timeline__item--head'
        },
        [
          this.$createElement(
            'div',
            {
              staticClass: 'timeline__item--head-icon',
              class: this.iconFillColorClasses
            },
            [icon]
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
        staticClass: 'timeline__item',
        class: this.classes
      },
      children
    )
  }
}
