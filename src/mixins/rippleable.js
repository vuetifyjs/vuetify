import Ripple from '../directives/ripple'

/** @mixin */
export default {
  directives: { Ripple },

  props: {
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  methods: {
    genRipple () {
      return this.$createElement('div', {
        'class': this.rippleClasses || 'input-group--selection-controls__ripple',
        on: Object.assign({
          click: this.toggle
        }, this.$listeners),
        directives: [{
          name: 'ripple',
          value: this.ripple && !this.disabled && { center: true }
        }]
      })
    }
  }
}
