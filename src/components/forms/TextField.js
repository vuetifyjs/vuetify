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
    inputHeight () {
      if (!this.$refs.input) return null

      return this.$refs.input.scrollHeight
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
    }
  },

  props: {
    autofocus: Boolean,
    autoGrow: Boolean,
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
    name: String,
    rows: {
      default: 5
    }
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
      this.multiLine && this.autoGrow && this.calculateInputHeight()
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.multiLine && this.autoGrow && this.calculateInputHeight()
      this.autofocus && this.$refs.input.focus()
    })
  },

  methods: {
    calculateInputHeight () {
      this.inputHeight = this.$refs.input.scrollHeight
    },
    isDirty () {
      return this.lazyValue !== null &&
        typeof this.lazyValue !== 'undefined' &&
        this.lazyValue.toString().length > 0
    },
    blur () {
      this.validate()
      this.$nextTick(() => (this.focused = false))
    },
    genCounter (h) {
      return h('div', {
        'class': {
          'input-group__counter': true,
          'input-group__counter--error': !this.counterIsValid()
        }
      }, this.count)
    },
    genInput (h) {
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
          input: e => (this.inputValue = e.target.value),
          focus: () => (this.focused = true)
        },
        ref: 'input'
      }
      // add only if set
      if (this.name) {
        inputData.attrs = { name: this.name }
      }

      if (this.multiLine) {
        inputData.domProps.rows = this.rows
      } else {
        inputData.domProps.type = this.type
      }

      return h(tag, inputData)
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

  render (h) {
    return this.genInputGroup(h, this.genInput(h))
  }
}
