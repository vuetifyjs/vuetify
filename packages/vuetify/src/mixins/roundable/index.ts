import Vue from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'roundable',

  props: {
    rounded: [Boolean, String],
    tile: Boolean,
  },

  computed: {
    roundedClasses (): Record<string, boolean> {
      const composite = []
      const rounded = typeof this.rounded === 'string'
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
