export default {
  data () {
    return {
      isActive: !!this.value
    }
  },

  props: {
    value: {
      required: false
    }
  },

  watch: {
    value (val) {
      this.isActive = !!val
    },
    isActive (val) {
      !!val !== this.value && this.$emit('input', val)
    }
  }
}
