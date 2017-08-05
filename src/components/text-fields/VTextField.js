import Input from '~mixins/input'

export default {
  name: 'v-text-field',

  mixins: [Input],

  inheritAttrs: false,

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
    max: [Number, String],
    min: [Number, String],
    multiLine: Boolean,
    placeholder: String,
    prefix: String,
    rows: {
      default: 5
    },
    singleLine: Boolean,
    solo: Boolean,
    suffix: String,
    textarea: Boolean,
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
        'input-group--solo': this.solo,
        'input-group--multi-line': this.multiLine,
        'input-group--full-width': this.fullWidth,
        'input-group--prefix': this.prefix,
        'input-group--suffix': this.suffix,
        'input-group--textarea': this.textarea
      }
    },
    hasError () {
      return this.validations.length ||
        this.errorMessages.length > 0 ||
        !this.counterIsValid() ||
        !this.validateIsValid() ||
        this.error
    },
    count () {
      let inputLength
      if (this.inputValue) inputLength = this.inputValue.toString().length
      else inputLength = 0
      let min = inputLength

      if (this.counterMin !== 0 && inputLength < this.counterMin) {
        min = this.counterMin
      }

      return `${min} / ${this.counterMax}`
    },
    counterMin () {
      const parsedMin = parseInt(this.min, 10)
      return isNaN(parsedMin) ? 0 : parsedMin
    },
    counterMax () {
      const parsedMax = parseInt(this.max, 10)
      return isNaN(parsedMax) ? 25 : parsedMax
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
        this.lazyValue.toString().length > 0 ||
        this.placeholder
    }
  },

  watch: {
    focused (val) {
      this.hasFocused = true
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
      this.inputHeight = null

      this.$nextTick(() => {
        const height = this.$refs.input.scrollHeight
        const minHeight = this.rows * 24
        const inputHeight = height < minHeight ? minHeight : height
        this.inputHeight = inputHeight
      })
    },
    onChange (e) {
      this.lazyValue = e.target.value
      this.$emit('change', this.lazyValue)
    },
    onInput (e) {
      console.log('here')
      this.inputValue = e.target.value
      this.multiLine && this.autoGrow && this.calculateInputHeight()
    },
    blur (e) {
      this.validate()
      this.$nextTick(() => (this.focused = false))
      this.$emit('blur', e)
    },
    focus (e) {
      this.focused = true
      this.$refs.input.focus()
      this.$emit('focus', e)
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
      const tag = this.multiLine || this.textarea ? 'textarea' : 'input'

      const data = {
        style: {
          'height': this.inputHeight && `${this.inputHeight}px`
        },
        domProps: {
          autofocus: this.autofocus,
          disabled: this.disabled,
          required: this.required,
          value: this.lazyValue
        },
        attrs: {
          ...this.$attrs,
          tabindex: this.tabindex
        },
        on: {
          ...this.$listeners,
          blur: this.blur,
          change: this.onChange,
          input: this.onInput,
          focus: this.focus
        },
        ref: 'input'
      }

      if (this.placeholder) data.domProps.placeholder = this.placeholder

      if (!this.counter) {
        if (![undefined, null].includes(this.max)) data.attrs.max = this.max
        if (![undefined, null].includes(this.min)) data.attrs.min = this.min
      }

      if (!this.textarea && !this.multiLine) {
        data.domProps.type = this.type
      } else {
        data.domProps.rows = this.rows
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
        (val.length >= this.counterMin && val.length <= this.counterMax)
      )
    },
    validateIsValid () {
      return (!this.required ||
        (this.required &&
          this.isDirty) ||
        !this.hasFocused ||
        (this.hasFocused && this.focused))
    }
  },

  render () {
    return this.genInputGroup(this.genInput(), { attrs: { tabindex: false } })
  }
}
