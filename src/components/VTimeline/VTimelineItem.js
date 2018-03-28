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
    fillColor: { type: String }
  },

  computed: {
    classes () {
      if (this.lineColor) {
        return this.addTextColorClassChecks(null, this.lineColor)
      }

      return ''
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
              staticClass: 'timeline__item--head-icon'
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
