// Components
import VInput from '../components/VInput'

// Mixins
import Rippleable from './rippleable'
import Comparable from './comparable'

// Utils
import { keyCodes } from '../util/helpers'

/* @vue/component */
export default {
  name: 'selectable',

  extends: VInput,

  mixins: [Rippleable, Comparable],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    color: {
      type: String,
      default: 'accent'
    },
    id: String,
    inputValue: null,
    falseValue: null,
    trueValue: null,
    multiple: {
      type: Boolean,
      default: null
    },
    label: String,
    toggleKeys: {
      type: Array,
      default: () => [keyCodes.enter, keyCodes.space]
    }
  },

  data: vm => ({
    lazyValue: vm.inputValue
  }),

  computed: {
    classesSelectable () {
      return this.addTextColorClassChecks(
        {},
        this.isDirty ? this.color : this.validationState
      )
    },
    isMultiple () {
      return this.multiple === true || (this.multiple === null && Array.isArray(this.internalValue))
    },
    isActive () {
      const value = this.value
      const input = this.internalValue

      if (this.isMultiple) {
        if (!Array.isArray(input)) return false

        return input.some(item => this.valueComparator(item, value))
      }

      if (this.trueValue === undefined || this.falseValue === undefined) {
        return value
          ? this.valueComparator(value, input)
          : Boolean(input)
      }

      return this.valueComparator(input, this.trueValue)
    },
    isDirty () {
      return this.isActive
    }
  },

  watch: {
    inputValue (val) {
      this.lazyValue = val
    }
  },

  methods: {
    genLabel () {
      if (!this.hasLabel) return null

      const label = VInput.methods.genLabel.call(this)

      label.data.on = { click: this.onChange }

      return label
    },
    genInput (type, attrs) {
      return this.$createElement('input', {
        attrs: Object.assign({
          'aria-label': this.label,
          'aria-checked': this.isActive.toString(),
          disabled: this.isDisabled,
          id: this.id,
          role: type,
          type,
          value: this.inputValue
        }, attrs),
        domProps: {
          checked: this.isActive
        },
        on: {
          blur: this.onBlur,
          change: this.onChange,
          focus: this.onFocus,
          keydown: this.onKeydown
        },
        ref: 'input'
      })
    },
    onBlur () {
      this.isFocused = false
    },
    onChange () {
      if (this.isDisabled) return

      const value = this.value
      let input = this.internalValue

      if (this.isMultiple) {
        if (!Array.isArray(input)) {
          input = []
        }

        const length = input.length

        input = input.filter(item => !this.valueComparator(item, value))

        if (input.length === length) {
          input.push(value)
        }
      } else if (this.trueValue !== undefined && this.falseValue !== undefined) {
        input = this.valueComparator(input, this.trueValue) ? this.falseValue : this.trueValue
      } else if (value) {
        input = this.valueComparator(input, value) ? null : value
      } else {
        input = !input
      }

      this.validate(true, input)
      this.internalValue = input
    },
    onFocus () {
      this.isFocused = true
    },
    onKeydown (e) {
      // Overwrite default behavior to only allow
      // the specified keyCodes
      if (this.toggleKeys.indexOf(e.keyCode) > -1) {
        e.preventDefault()

        this.onChange()
      }
    }
  }
}
