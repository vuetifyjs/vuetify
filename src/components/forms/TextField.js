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
      this.hasFocused = true

      if (!this.focused) {
        this.$emit('blur')
        this.$emit('change', this.lazyValue)
      } else {
        this.$emit('focus')
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
      const height = this.$refs.input.scrollHeight
      const minHeight = this.rows * 24
      this.inputHeight = height < minHeight ? minHeight : height
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
          disabled: this.disabled,
          required: this.required,
          value: this.lazyValue,
          autofucus: this.autofocus
        },
        attrs: {
          tabindex: this.tabindex
        },
        on: {
          blur: this.blur,
          input: this.onInput,
          focus: () => (this.focused = true)
        },
        ref: 'input'
      }

      if (this.autocomplete) inputData.domProps.autocomplete = true

      // add only if set
      if (this.name) {
        inputData.attrs = { name: this.name }
      }

      if (this.multiLine) {
        inputData.domProps.rows = this.rows
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
    return this.genInputGroup(this.genInput(), {
      attrs: {
        tabindex: -1
      }
    })
  }
}
