import Ripple from '../directives/ripple'

/** @mixin */
export default {
  directives: { Ripple },

  methods: {
    genRipple () {
      return this.$createElement('div', {
        'class': this.rippleClasses || 'input-group--selection-controls__ripple',
        on: Object.assign({}, {
          click: this.toggle
        }, this.$listeners),
        directives: [{
          name: 'ripple',
          value: !this.disabled && { center: true }
        }]
      })
    }
  }
}
