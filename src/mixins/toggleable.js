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
      if (this.isActive !== this.active) {
        this.$emit('active', this.isActive)
      }
    }
  }
}
