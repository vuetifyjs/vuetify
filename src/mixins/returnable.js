export default {
  name: 'returnable',

  data: () => ({
    originalValue: null
  }),

  props: {
    returnValue: null
  },

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
      this.$emit('update:returnValue', value)
      this.isActive = false
    }
  }
}
