import Vue from 'vue'

export default Vue.extend({
  name: 'roundable',

  props: {
    rounded: [Boolean, String],
    tile: Boolean,
  },

  computed: {
    roundedClasses (): Record<string, boolean> {
      let composite = ''

      if (this.rounded === true) {
        composite = 'rounded'
      } else if (this.tile) {
        composite = 'rounded-0'
      } else if (this.rounded) {
        const values = this.rounded.split(' ')

        for (const value of values) {
          composite += ` rounded-${value}`
        }
      }

      return composite ? {
        [composite.trim()]: true,
      } : {}
    },
  },
})
