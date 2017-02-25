import Contextualable from './contextualable'
import Input from './input'

export default {
  mixins: [Contextualable, Input],

  data () {
    return {
      inputValue: this.value
    }
  },

  props: {
    valueV: {
      required: false
    }
  },

  computed: {
    isActive () {
      return (
        (Array.isArray(this.value) &&
          this.value.indexOf(this.valueV) !== -1) ||
        (!Array.isArray(this.value) &&
          this.value)
      )
    }
  },

  methods: {
    toggle () {
      if (this.disabled) {
        return
      }

      let input = this.value
      if (Array.isArray(input)) {
        const i = input.indexOf(this.valueV)

        if (i === -1) {
          input.push(this.valueV)
        } else {
          input.splice(i, 1)
        }
      } else {
        input = !input
      }

      this.$emit('input', input)
    }
  }
}
