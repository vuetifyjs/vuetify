import Vue from 'vue'

export default Vue.extend({
  name: 'elevatable',

  props: {
    elevation: [Number, String]
  },

  computed: {
    computedElevation (): string | number | undefined {
      return this.elevation
    },
    elevationClasses (): Record<string, boolean> {
      if (!this.computedElevation && this.computedElevation !== 0) return {}

      return { [`elevation-${this.computedElevation}`]: true }
    }
  }
})
