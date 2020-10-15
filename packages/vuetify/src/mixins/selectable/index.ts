// Components
import VInput from '../../components/VInput'

// Mixins
import Rippleable from '../rippleable'
import Comparable from '../comparable'

// Utilities
import mixins from '../../util/mixins'

export function prevent (e: Event) {
  e.preventDefault()
}

/* @vue/component */
export default mixins(
  VInput,
  Rippleable,
  Comparable
).extend({
  name: 'selectable',

  model: {
    prop: 'inputValue',
    event: 'change',
  },

  props: {
    id: String,
    inputValue: null as any,
    falseValue: null as any,
    trueValue: null as any,
    multiple: {
      type: Boolean,
      default: null,
    },
    label: String,
  },

  data () {
    return {
      hasColor: this.inputValue,
      lazyValue: this.inputValue,
    }
  },

  computed: {
    computedColor (): string | undefined {
      if (!this.isActive) return undefined
      if (this.color) return this.color
      if (this.isDark && !this.appIsDark) return 'white'
      return 'primary'
    },
    isMultiple (): boolean {
      return this.multiple === true || (this.multiple === null && Array.isArray(this.internalValue))
    },
    isActive (): boolean {
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
    isDirty (): boolean {
      return this.isActive
    },
    rippleState (): string | undefined {
      return !this.isDisabled && !this.validationState
        ? undefined
        : this.validationState
    },
  },

  watch: {
    inputValue (val) {
      this.lazyValue = val
      this.hasColor = val
    },
  },

  methods: {
    genLabel () {
      const label = VInput.options.methods.genLabel.call(this)

      if (!label) return label

      label!.data!.on = {
        // Label shouldn't cause the input to focus
        click: prevent,
      }

      return label
    },
    genInput (type: string, attrs: object) {
      return this.$createElement('input', {
        attrs: Object.assign({
          'aria-checked': this.isActive.toString(),
          disabled: this.isDisabled,
          id: this.computedId,
          role: type,
          type,
        }, attrs),
        domProps: {
          value: this.value,
          checked: this.isActive,
        },
        on: {
          blur: this.onBlur,
          change: this.onChange,
          focus: this.onFocus,
          keydown: this.onKeydown,
          click: prevent,
        },
        ref: 'input',
      })
    },
    onBlur () {
      this.isFocused = false
    },
    onClick (e: Event) {
      this.onChange()
      this.$emit('click', e)
    },
    onChange () {
      if (!this.isInteractive) return

      const value = this.value
      let input = this.internalValue

      if (this.isMultiple) {
        if (!Array.isArray(input)) {
          input = []
        }

        const length = input.length

        input = input.filter((item: any) => !this.valueComparator(item, value))

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
      this.hasColor = input
    },
    onFocus () {
      this.isFocused = true
    },
    /** @abstract */
    onKeydown (e: Event) {},
  },
})
