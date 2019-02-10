import Vue from 'vue'

export default Vue.extend({
  name: 'elevatable',

  props: {
    elevation: [Number, String],
    flat: Boolean
  },

  computed: {
    computedElevation (): string | number | undefined {
      return this.flat ? undefined : this.elevation
    },
    elevationClasses (): Record<string, boolean> {
      if (!this.computedElevation) return {}

      return { [`elevation-${this.computedElevation}`]: true }
    }
  }
})
