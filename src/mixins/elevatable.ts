import Vue from 'vue'

export interface IElevatable {
  elevation: number
}

export const getElevationClasses = (context: IElevatable) => {
  return {
    [`elevation-${context.elevation}`]: true
  }
}

export default Vue.extend({
  name: 'elevatable',

  props: {
    elevation: {
      type: Number,
      default: 0
    }
  },

  methods: {
    getElevationClasses () {
      return getElevationClasses(this)
    }
  }
})
