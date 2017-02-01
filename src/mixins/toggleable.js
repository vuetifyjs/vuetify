export default {
  data () {
    return {
      isActive: false
    }
  },

  props: {
    active: Boolean
  },

  watch: {
    active () {
      this.isActive = this.active
    },

    isActive () {
      this.$emit('active', this.isActive)
    }
  }
}
