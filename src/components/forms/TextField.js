import Input from '../../mixins/input'

export default {
  name: 'text-field',

  mixins: [Input],

  data () {
    return {
      hasFocused: false
    }
  },

  computed: {
    classes () {
      return {
        'input-group--text-field': true,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine
      }
    },
    hasError () {
      return this.errors.length !== 0 ||
        !this.counterIsValid() ||
        !this.validateIsValid()
    },
    count () {
      const inputLength = (this.inputValue || '').length
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
        if (!this.lazy) {
          this.$emit('input', val)
        }

        this.lazyValue = val
      }
    }
  },

  props: {
    autocomplete: Boolean,
    counter: Boolean,
    id: String,
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 25
    },
    menu: Boolean,
    multiLine: Boolean,
    name: String,
    singleLine: Boolean,
    type: {
      default: 'text'
    }
  },

  watch: {
    focused () {
      this.$emit('focused', this.focused)
      this.hasFocused = true

      if (!this.focused) {
        this.$emit('input', this.lazyValue)
      }
    },
    value () {
      this.lazyValue = this.value
      this.validate()
    }
  },

  methods: {
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
        domProps: {
          autocomplete: this.autocomplete,
          disabled: this.disabled,
          id: this.id || this.name || this._uid,
          name: this.name,
          required: this.required,
          value: this.inputValue
        },
        on: {
          blur: this.blur,
          input: e => (this.inputValue = e.target.value),
          focus: () => (this.focused = true)
        },
        ref: 'input'
      }

      if (this.multiLine) {
        inputData.domProps.rows = 5
      } else {
        inputData.domProps.type = this.type
      }

      return h(tag, inputData)
    },
    counterIsValid () {
      return (!this.counter ||
        !this.inputValue ||
        (this.inputValue.length >= this.min && this.inputValue.length <= this.max)
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
