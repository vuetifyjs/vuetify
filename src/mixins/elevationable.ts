import Vue from 'vue'

export default Vue.extend({
  name: 'elevationable',

  props: {
    elevation: {
      type: Number,
      default: 0
    }
  },

  computed: {
    elevationClass (): object {
      console.log(this.elevation)
      
      return {
        [`elevation-${this.elevation}`]: true
      }
    }
  }
})
