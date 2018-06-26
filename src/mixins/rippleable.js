import Ripple from '../directives/ripple'

/* @vue/component */
export default {
  name: 'rippleable',

  directives: { Ripple },

  props: {
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  methods: {
    genRipple (data = {}) {
      if (!this.ripple) return null

      data.staticClass = 'v-input--selection-controls__ripple'

      if (this.rippleClasses) data.staticClass += ` ${this.rippleClasses}`

      data.directives = data.directives || []
      data.directives.push({
        name: 'ripple',
        value: { center: true }
      })
      data.on = Object.assign({
        click: this.onChange
      }, this.$listeners)

      return this.$createElement('div', data)
    },
    onChange () {}
  }
}
