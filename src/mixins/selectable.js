import Colorable from './colorable'
import Input from './input'
import { looseEqual } from "../util/helpers"

export default {
  name: 'selectable',

  mixins: [Input, Colorable],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  data: () => ({
    defaultColor: 'accent'
  }),

  props: {
    id: String,
    inputValue: null,
    falseValue: null,
    trueValue: null,
    multiple: {
      type: Boolean,
      default: false
    },
    valueComparator: {
      type: Function,
      default: looseEqual
    }
  },

  computed: {
    isActive () {
      const value = this.value
      const inputValue = this.inputValue

      if (this.multiple) {
        if (!Array.isArray(inputValue)) return false

        for (let i = 0, m = inputValue.length; i < m; i++) {
          if (this.valueComparator(inputValue[i], value)) return true
        }

        return false
      }

      if (!this.trueValue || !this.falseValue) {
        return value
          ? this.valueComparator(value, inputValue)
          : Boolean(inputValue)
      }

      return this.valueComparator(inputValue, this.trueValue)
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

      const value = this.value
      let input = this.inputValue

      if (this.multiple) {
        if (!Array.isArray(input)) {
          // Cannot toggle if not an array
          return
        }

        let removed = false

        for (let i = 0, m = input.length; i < m; i++) {
          if (this.valueComparator(input[i], value)) {
            removed = true
            input.splice(i, 1)
            i--; m--
          }
        }

        if (!removed) {
          input.push(value)
        }
      } else if (this.trueValue || this.falseValue) {
        input = this.valueComparator(input, this.trueValue)
          ? this.falseValue
          : this.trueValue
      } else if (value) {
        input = this.valueComparator(value, input)
          ? null
          : value
      } else {
        input = !input
      }

      this.validate(true, input)

      this.$emit('change', input)
    }
  }
}
