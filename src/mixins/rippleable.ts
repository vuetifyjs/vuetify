import Vue from 'vue'

import Ripple from '../directives/ripple'

/** @mixin */
export default Vue.extend({
  name: 'rippleable',

  directives: { Ripple },

  props: {
    disabled: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  data: () => ({
    rippleClasses: null
  }),

  methods: {
    genRipple (data: any = {}) {
      if (!this.ripple) return null

      data.staticClass = 'v-input--selection-controls__ripple'

      if (this.rippleClasses) data.staticClass += ` ${this.rippleClasses}`

      data.directives = data.directives || []
      data.directives.push({
        name: 'ripple',
        value: this.ripple && !this.disabled && { center: true }
      })
      data.on = Object.assign({
        click: this.onChange
      }, this.$listeners)

      return this.$createElement('div', data)
    },
    onChange () {}
  }
})
