export default {
  name: 'text-input',

  data () {
    return {
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
        'input-group--error': this.error,
        'input-group--append-icon': this.appendIcon,
        'input-group--prepend-icon': this.prependIcon,
        'input-group--multi-line': this.multiLine
      }
    },

    count () {
      return `${(this.inputValue || '').length} / ${this.max}`
    }
  },

  props: {
    appendIcon: String,
    counter: Boolean,
    dark: Boolean,
    disabled: Boolean,
    error: String,
    label: String,
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
    placeholder: String,
    prependIcon: String,
    required: Boolean,
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
      this.$emit('input', this.inputValue)
    },

    focused () {
      this.$emit('focused', this.focused)
    }
  },

  methods: {
    blur () {
      this.focused = false
    },

    focus () {
      this.focused = true
    },

    updateValue (e) {
      this.inputValue = e.target.value
    }
  },

  render (h) {
    const tag = this.multiLine ? 'textarea' : 'input'
    const children = []
    const wrapperChildren = []
    const detailsChildren = []

    if (this.label) {
      children.push(
        h('label', {
          domProps: {
            for: this.id || this.name,
            innerHTML: this.label
          }
        })
      )
    }

    const inputData = {
      domProps: {
        disabled: this.disabled,
        id: this.id || this.name,
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

    wrapperChildren.push(h(tag, inputData))

    if (this.prependIcon) {
      wrapperChildren.unshift(
        h('v-icon', {
          'class': { 'input-group__prepend-icon': true },
          domProps: {
            innerText: this.prependIcon
          }
        })
      )
    }

    if (this.appendIcon) {
      wrapperChildren.push(
        h('v-icon', {
          'class': { 'input-group__append-icon': true },
          domProps: {
            innerText: this.appendIcon
          }
        })
      )
    }

    children.push(
      h('div', {
        'class': { 'input-group__wrapper': true }
      }, wrapperChildren)
    )

    detailsChildren.push(
      h('div', {
        'class': { 'input-group__hint': true },
        domProps: {
          innerText: this.error || ''
        }
      })
    )

    if (this.counter) {
      detailsChildren.push(
        h('div', {
          'class': {
            'input-group__counter': true,
            'input-group__counter--error': (this.inputValue || '').length > this.max
          },
          domProps: {
            innerText: this.count
          }
        })
      )
    }

    children.push(
      h('div', {
        'class': { 'input-group__details': true }
      }, detailsChildren)
    )

    return h('div', { 'class': this.classes }, children)
  }
}
