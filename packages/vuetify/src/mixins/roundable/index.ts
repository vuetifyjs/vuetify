import Vue from 'vue'

export default Vue.extend({
  name: 'roundable',

  props: {
    rounded: [Boolean, Number, String],
    tile: Boolean,
  },

  computed: {
    roundedClasses (): Record<string, boolean> {
      let composite = ''
      const rounded = typeof this.rounded === 'boolean'
        ? this.rounded
        : String(this.rounded || '')

      console.log(rounded)

      if (rounded === true) {
        composite = 'rounded'
      } else if (this.tile) {
        composite = 'rounded-0'
      } else if (rounded != null) {
        const values = (rounded || '').split(' ')

        console.log(values)

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
