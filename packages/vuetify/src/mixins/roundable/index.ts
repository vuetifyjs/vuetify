
import Vue from 'vue'

export default Vue.extend({
  name: 'roundable',

  props: {
    rounded: [Boolean, String],
    tile: Boolean,
  },

  computed: {
    roundedClasses (): Record<string, boolean> {
      const composite = []
      const rounded = ['string', 'number'].includes(typeof this.rounded)
        ? String(this.rounded)
        : this.rounded === true

      if (this.tile) {
        composite.push('rounded-0')
      } else if (typeof rounded === 'string') {
        const values = rounded.split(' ')

        for (const value of values) {
          composite.push(`rounded-${value}`)
        }
      } else if (rounded) {
        composite.push('rounded')
      }

      return composite.length > 0 ? {
        [composite.join(' ')]: true,
      } : {}
    },
  },
})
