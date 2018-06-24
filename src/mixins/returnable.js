/* @vue/component */
export default {
  name: 'returnable',

  props: {
    returnValue: null
  },

  data: () => ({
    originalValue: null
  }),

  watch: {
    isActive (val) {
      if (val) {
        this.originalValue = this.returnValue
      } else {
        this.$emit('update:returnValue', this.originalValue)
      }
    }
  },

  methods: {
    save (value) {
      this.originalValue = value
      this.isActive = false
    }
  }
}
