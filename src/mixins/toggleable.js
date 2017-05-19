export default {
  data () {
    return {
      isActive: this.value
    }
  },

  props: {
    value: {
      required: false
    }
  },

  watch: {
    value () {
      this.isActive = Boolean(this.value)
    },
    isActive () {
      this.$emit('input', this.isActive)
    }
  }
}
