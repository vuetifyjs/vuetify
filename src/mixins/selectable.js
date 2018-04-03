// Components
import VInput from '../components/VInput'
import VLabel from '../components/VLabel'

// Mixins
import Rippleable from './rippleable'

export default {
  name: 'selectable',

  extends: VInput,

  mixins: [Rippleable],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  data: vm => ({
    lazyValue: vm.inputValue
  }),

  props: {
    color: {
      type: String,
      default: 'accent'
    },
    id: String,
    inputValue: null,
    falseValue: null,
    label: String,
    toggleKeys: {
      type: Array,
      default: () => [13, 32]
    },
    trueValue: null
  },

  computed: {
    classesSelectable () {
      return this.addTextColorClassChecks(
        {},
        this.isDirty ? this.color : this.validationState
      )
    },
    isActive () {
      if ((Array.isArray(this.internalValue))) {
        return this.internalValue.indexOf(this.value) !== -1
      }

      if (!this.trueValue || !this.falseValue) {
        return this.value
          ? this.value === this.internalValue
          : Boolean(this.internalValue)
      }

      return this.internalValue === this.trueValue
    },
    isDirty () {
      return this.isActive
    }
  },

  watch: {
    inputValue (val) {
      this.internalValue = val
    }
  },

  methods: {
    genLabel () {
      return this.$createElement(VLabel, {
        on: { click: this.onChange },
        attrs: {
          for: this.id
        },
        props: {
          color: 'error',
          focused: this.hasState
        }
      }, this.$slots.label || this.label)
    },
    genInput (type, attrs) {
      return this.$createElement('input', {
        attrs: Object.assign({}, {
          'aria-label': this.label,
          'aria-checked': this.isActive.toString(),
          role: type,
          type,
          value: this.inputValue
        }, attrs),
        on: {
          blur: this.onBlur,
          change: this.onChange,
          focus: this.onFocus,
          keydown: this.onKeydown
        }
      })
    },
    onBlur () {
      this.isFocused = false
    },
    onChange () {
      if (this.disabled) return

      let input = this.lazyValue
      // If inputValue is an array
      if (Array.isArray(input)) {
        input = input.slice()
        const i = input.indexOf(this.value)

        if (i === -1) {
          input.push(this.value)
        } else {
          input.splice(i, 1)
        }
      // If has a true or false value set
      } else if (this.trueValue || this.falseValue) {
        input = input === this.trueValue ? this.falseValue : this.trueValue
      // If has a value set
      } else if (this.value) {
        input = this.inputValue === this.value
          ? null
          : this.value
      } else {
        input = !input
      }

      this.validate(true, input)
      this.lazyValue = input
      this.$emit('change', input)
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
