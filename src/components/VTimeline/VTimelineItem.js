import Rippleable from '../../mixins/rippleable'
import { inject as RegistrableInject } from '../../mixins/registrable'

import VIcon from '../VIcon'

export default {
  name: 'v-timeline-item',

  mixins: [Rippleable, RegistrableInject('timeline', 'v-timeline', 'v-timeline-item')],

  data () {
    return {
      height: 'auto'
    }
  },

  props: {
    icon: {
      type: String,
      default: 'event'
    },
    date: String,
    hideDetail: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: false
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
        this.$slots.default
      )
    },
    genHeader () {
      return this.$createElement(
        'div',
        {
          staticClass: 'timeline__item--head',
          directives: [
            {
              name: 'ripple',
              value: this.ripple
            }
          ]
        },
        [this.$slots.header, this.genIcon(), this.genDate()]
      )
    },
    genIcon (h) {
      if (this.hideDetail) return null

      const icon = this.$slots.icon || this.$createElement(VIcon, this.icon)
      return this.$createElement(
        'div',
        {
          staticClass: 'timeline__item--head-icon'
        },
        [icon]
      )
    },
    genDate (h) {
      if (this.hideDetail) return null

      const date = this.$slots.date || this.$createElement('span', { staticClass: 'caption' }, this.date)
      return this.$createElement(
        'div',
        {
          staticClass: 'timeline__item--head-date'
        },
        [date]
      )
    }
  },

  render (h) {
    const children = []

    children.push(this.genHeader())
    children.push(this.genBody())

    return h(
      'div',
      {
        staticClass: 'timeline__item'
      },
      children
    )
  }
}
