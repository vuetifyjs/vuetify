export default {
  name: 'text-input',

  data () {
    return {
      error: false,
      focused: false,
      inputValue: this.value ? this.value.toString() : null
    }
  },

  computed: {
    classes () {
      return {
        'input-group': true,
        'input-group--focused': this.focused,
        'input-group--dirty': this.inputValue,
        'input-group--disabled': this.disabled,
        'input-group--light': this.light && !this.dark,
        'input-group--dark': this.dark,
        'input-group--single-line': this.singleLine,
        'input-group--error': this.error || this.errors.length > 0,
        'input-group--append-icon': this.appendIcon,
        'input-group--prepend-icon': this.prependIcon,
        'input-group--multi-line': this.multiLine,
        'input-group--required': this.required
      }
    },

    count () {
      const inputLength = (this.inputValue || '').length
      let min = inputLength

      if (this.min !== 0 && inputLength < this.min) {
        min = this.min
      }

      return `${min} / ${this.max}`
    }
  },

  props: {
    appendIcon: String,
    counter: Boolean,
    dark: Boolean,
    disabled: Boolean,
    errors: {
      type: Array,
      default: () => []
    },
    hint: String,
    hintOnFocus: Boolean,
    label: String,
    lazy: Boolean,
    light: {
      type: Boolean,
      default: true
    },
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
    prependIcon: String,
    required: Boolean,
    rules: Array,
    singleLine: Boolean,
    type: {
      default: 'text'
    },
    value: {
      required: false
    }
  },

  watch: {
    value (value) {
      this.inputValue = value
    },

    inputValue () {
      if (!this.lazy) {
        this.$emit('input', this.inputValue)
      }
    },

    focused () {
      this.$emit('focused', this.focused)

      if (!this.focused) {
        this.$emit('input', this.inputValue)
      }
    }
  },

  methods: {
    blur () {
      this.validate()
      this.$nextTick(() => (this.focused = false))
    },

    focus () {
      this.focused = true
    },

    updateValue (e) {
      this.inputValue = e.target.value
    },

    /** Generators */
    genCounter (h) {
      return h('div', {
        'class': {
          'input-group__counter': true,
          'input-group__counter--error': !this.counterIsValid()
        }
      }, this.count)
    },

    genHint (h) {
      return h('div', {
        'class': {
          'input-group__hint': true
        },
        directives: [
          {
            name: 'show',
            value: (!this.hintOnFocus || (this.hintOnFocus && this.focused)) && !this.errors.length
          }
        ],
        domProps: {
          innerHTML: this.hint
        },
        key: 'hint'
      })
    },

    genError (h, error) {
      return h(
        'div',
        {
          domProps: {
            className: 'input-group__error'
          },
          key: error
        },
        error
      )
    },

    genIcon (h, type) {
      return h('v-icon', {
        'class': { ['input-group__' + type + '-icon']: true },
        domProps: {
          innerText: this[`${type}Icon`]
        }
      })
    },

    genInput (h) {
      const tag = this.multiLine ? 'textarea' : 'input'

      const inputData = {
        domProps: {
          disabled: this.disabled,
          id: this.id || this.name || this._uid,
          name: this.name,
          required: this.required,
          value: this.inputValue
        },
        on: {
          blur: this.blur,
          input: this.updateValue,
          focus: this.focus
        }
      }

      if (this.multiLine) {
        inputData.domProps.rows = 5
      } else {
        inputData.domProps.type = this.type
      }

      return h(tag, inputData)
    },

    genLabel (h) {
      return h('label', {
        domProps: {
          for: this.id || this.name,
          innerHTML: this.label
        }
      })
    },

    genMessages (h) {
      const messages = [this.genHint(h)]

      this.errors.forEach(i => {
        messages.push(this.genError(h, i))
      })

      return h(
        'transition-group',
        {
          'class': {
            'input-group__messages': true
          },
          props: {
            tag: 'div',
            name: 'slide-y-transition'
          }
        },
        messages
      )
    },

    /** Validators */
    counterIsValid () {
      return (!this.counter ||
        !this.inputValue ||
        (this.inputValue.length >= this.min && this.inputValue.length <= this.max)
      )
    },

    validateIsValid () {
      return (!this.required || this.required &&
        (this.inputValue || '').length !== 0)
    },

    validate () {
      this.error = (
        !this.validateIsValid()
      )
    }
  },

  render (h) {
    const children = []
    const wrapperChildren = []
    const detailsChildren = []

    if (this.label) {
      children.push(this.genLabel(h))
    }

    wrapperChildren.push(this.genInput(h))

    if (this.prependIcon) {
      wrapperChildren.unshift(this.genIcon(h, 'prepend'))
    }

    if (this.appendIcon) {
      wrapperChildren.push(this.genIcon(h, 'append'))
    }

    children.push(
      h('div', {
        'class': { 'input-group__wrapper': true }
      }, wrapperChildren)
    )

    detailsChildren.push(this.genMessages(h))

    if (this.counter) {
      detailsChildren.push(this.genCounter(h))
    }

    children.push(
      h('div', {
        'class': { 'input-group__details': true }
      }, detailsChildren)
    )

    return h('div', { 'class': this.classes }, children)
  }
}
