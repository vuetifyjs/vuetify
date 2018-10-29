import Vue from 'vue'

export default Vue.extend({
  name: 'elevatable',

  props: {
    elevation: [Number, String]
  },

  computed: {
    elevationClasses (): Record<string, boolean> {
      if (!this.elevation) return {}

      return { [`elevation-${this.elevation}`]: true }
    }
  }
})
