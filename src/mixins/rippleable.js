import Ripple from '../directives/ripple'

/** @mixin */
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
    genRipple (data = { directives: [] }) {
      data.class = this.rippleClasses || 'input-group--selection-controls__ripple'
      data.directives.push({
        name: 'ripple',
        value: this.ripple && !this.disabled && { center: true }
      })
      data.on = Object.assign({}, this.$listeners, {
        click: e => {
          this.$emit('click', e)
          this.toggle()
        }
      })

      return this.$createElement('div', data)
    }
  }
}
