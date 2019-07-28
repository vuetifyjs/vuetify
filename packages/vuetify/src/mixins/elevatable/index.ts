import Vue from 'vue'

export default Vue.extend({
  name: 'elevatable',

  props: {
    elevation: [Number, String],
  },

  computed: {
    computedElevation (): string | number | undefined {
      return this.elevation
    },
    elevationClasses (): Record<string, boolean> {
      const elevation = this.computedElevation

      if (elevation == null) return {}
      if (isNaN(parseInt(elevation))) return {}
      return { [`elevation-${this.elevation}`]: true }
    },
  },
})
