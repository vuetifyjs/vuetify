import Input from '../../mixins/input'

export default {
  name: 'text-field',

  mixins: [Input],

  data () {
    return {
      hasFocused: false,
      inputHeight: null
    }
  },

  computed: {
    classes () {
      return {
        'input-group--text-field': true,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine,
        'input-group--full-width': this.fullWidth
      }
    },
    hasError () {
      return this.errors.length !== 0 ||
        !this.counterIsValid() ||
        !this.validateIsValid()
    },
    count () {
      const inputLength = (this.inputValue && this.inputValue.toString() || '').length
      let min = inputLength

      if (this.min !== 0 && inputLength < this.min) {
        min = this.min
      }

      return `${min} / ${this.max}`
    },
    inputValue: {
      get () {
        return this.value
      },
      set (val) {
        if (this.modifiers.trim) {
          val = val.trim()
        }

        if (this.modifiers.number) {
          val = Number(val)
        }

        if (!this.modifiers.lazy) {
          this.$emit('input', val)
        }

        this.lazyValue = val
      }
    },
    isDirty () {
      return this.lazyValue !== null &&
        typeof this.lazyValue !== 'undefined' &&
        this.lazyValue.toString().length > 0
    }
  },

  props: {
    autofocus: Boolean,
    counter: Boolean,
    fullWidth: Boolean,
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 25
    },
    multiLine: Boolean,
    singleLine: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    name: String
  },

  watch: {
    focused () {
      this.$emit('focused', this.focused)
      this.hasFocused = true

      if (!this.focused) {
        this.$emit('change', this.lazyValue)
      }
    },
    value () {
      this.lazyValue = this.value
      this.validate()
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.calculateInputHeight()
      this.autofocus && this.$refs.input.focus()
    })
  },

  methods: {
    calculateInputHeight () {
      this.inputHeight = this.$refs.input.scrollHeight
    },
    onInput (e) {
      this.inputValue = e.target.value
      this.calculateInputHeight()
    },
    blur () {
      this.validate()
      this.$nextTick(() => (this.focused = false))
    },
    genCounter () {
      return this.$createElement('div', {
        'class': {
          'input-group__counter': true,
          'input-group__counter--error': !this.counterIsValid()
        }
      }, this.count)
    },
    genInput () {
      const tag = this.multiLine ? 'textarea' : 'input'

      const inputData = {
        style: {
          'height': this.inputHeight && `${this.inputHeight}px`
        },
        domProps: {
          autocomplete: this.autocomplete,
          disabled: this.disabled,
          required: this.required,
          value: this.lazyValue
        },
        on: {
          blur: this.blur,
          input: this.onInput,
          focus: () => (this.focused = true)
        },
        ref: 'input'
      }
      // add only if set
      if (this.name) {
        inputData.attrs = { name: this.name }
      }

      if (this.multiLine) {
        inputData.domProps.rows = 5
      } else {
        inputData.domProps.type = this.type
      }

      return this.$createElement(tag, inputData)
    },
    counterIsValid: function counterIsValid () {
      const val = (this.inputValue && this.inputValue.toString() || '')
      return (!this.counter ||
        !this.inputValue.toString() ||
        (val.length >= this.min && val.length <= this.max)
      )
    },
    validateIsValid () {
      return (!this.required ||
        (this.required &&
          this.inputValue) ||
        !this.hasFocused ||
        (this.hasFocused && this.focused))
    }
  },

  render () {
    return this.genInputGroup(this.genInput())
  }
}
