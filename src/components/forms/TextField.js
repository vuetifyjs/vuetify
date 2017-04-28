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

  props: {
    autofocus: Boolean,
    autoGrow: Boolean,
    counter: Boolean,
    fullWidth: Boolean,
    name: String,
    maxlength: [Number, String],
    max: {
      type: [Number, String],
      default: 25
    },
    min: {
      type: [Number, String],
      default: 0
    },
    multiLine: Boolean,
    prefix: String,
    readonly: Boolean,
    rows: {
      default: 5
    },
    singleLine: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text'
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
      this.autofocus && this.focus()
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
      this.multiLine && this.autoGrow && this.calculateInputHeight()
    },
    blur () {
      this.validate()
      this.$nextTick(() => (this.focused = false))
    },
    focus () {
      this.focused = true
      this.$refs.input.focus()
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

      const data = {
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
          tabindex: this.tabindex,
          readonly: this.readonly
        },
        on: {
          blur: this.blur,
          input: this.onInput,
          focus: this.focus
        },
        ref: 'input'
      }

      if (this.placeholder) data.domProps.placeholder = this.placeholder
      if (this.autocomplete) data.domProps.autocomplete = true
      if (this.name) data.attrs.name = this.name
      if (this.maxlength) data.attrs.maxlength = this.maxlength

      if (this.multiLine) {
        data.domProps.rows = this.rows
      } else {
        data.domProps.type = this.type
      }

      const children = [this.$createElement(tag, data)]

      this.prefix && children.unshift(this.genFix('prefix'))
      this.suffix && children.push(this.genFix('suffix'))

      return children
    },
    genFix (type) {
      return this.$createElement('span', {
        'class': `input-group--text-field__${type}`
      }, this[type])
    },
    counterIsValid: function counterIsValid () {
      const val = (this.inputValue && this.inputValue.toString() || '')
      return (!this.counter ||
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
    return this.genInputGroup(this.genInput(), { attrs: { tabindex: -1 }})
  }
}
