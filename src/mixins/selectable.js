import Colorable from './colorable'
import Input from './input'

export default {
  mixins: [Input, Colorable],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    id: String,
    inputValue: null,
    falseValue: null,
    trueValue: null
  },

  computed: {
    isActive () {
      if ((Array.isArray(this.inputValue))
      ) {
        return this.inputValue.indexOf(this.value) !== -1
      }

      if (!this.trueValue || !this.falseValue) {
        return this.value
          ? this.value === this.inputValue
          : Boolean(this.inputValue)
      }

      return this.inputValue === this.trueValue
    },
    isDirty () {
      return this.isActive
    }
  },

  watch: {
    indeterminate (val) {
      this.inputIndeterminate = val
    }
  },

  methods: {
    genLabel () {
      return this.$createElement('label', {
        on: { click: this.toggle },
        attrs: {
          for: this.id
        }
      }, this.$slots.label || this.label)
    },
    toggle () {
      if (this.disabled) {
        return
      }

      let input = this.inputValue
      if (Array.isArray(input)) {
        input = input.slice()
        const i = input.indexOf(this.value)

        if (i === -1) {
          input.push(this.value)
        } else {
          input.splice(i, 1)
        }
      } else if (this.trueValue || this.falseValue) {
        input = input === this.trueValue ? this.falseValue : this.trueValue
      } else if (this.value) {
        input = this.value === this.inputValue
          ? null
          : this.value
      } else {
        input = !input
      }

      this.validate(true, input)

      this.$emit('change', input)
    }
  }
}
