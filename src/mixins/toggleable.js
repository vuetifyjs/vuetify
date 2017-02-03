export default {
  data () {
    return {
      isActive: false
    }
  },

  props: {
    value: Boolean
  },

  watch: {
    value () {
      this.isActive = this.value
    },

    isActive () {
      this.$emit('input', this.isActive)
    }
  }
}
