import Vue from 'vue'

export default Vue.extend({
  name: 'elevationable',

  props: {
    elevation: {
      type: Number,
      default: () => 0
    }
  },

  computed: {
    elevationClass (): object {
      const elevation = this.elevation || 0;

      return {
        [`elevation-${elevation}`]: true
      }
    }
  }
})
