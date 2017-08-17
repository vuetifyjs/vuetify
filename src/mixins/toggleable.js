export default {
  model: {
    prop: 'inputValue',
    event: 'input'
  },

  props: {
    inputValue: {
      required: false
    }
  },

  data () {
    return {
      isActive: !!this.inputValue
    }
  },

  watch: {
    inputValue (val) {
      this.isActive = !!val
    },
    isActive (val) {
      !!val !== this.inputValue && this.$emit('input', val)
    }
  }
}
