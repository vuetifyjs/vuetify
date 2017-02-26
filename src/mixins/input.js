export default {
  data () {
    return {
      errors: [],
      focused: false,
      lazyValue: this.value
    }
  },

  props: {
    appendIcon: String,
    dark: Boolean,
    disabled: Boolean,
    hint: String,
    hintOnFocus: Boolean,
    label: String,
    lazy: Boolean,
    light: {
      type: Boolean,
      default: true
    },
    prependIcon: String,
    required: Boolean,
    rules: {
      type: Array,
      default: () => []
    },
    value: {
      required: false
    }
  },

  computed: {
    hasError () {
      return this.errors.length !== 0
    },
    inputGroupClasses () {
      return Object.assign({}, {
        'input-group': true,
        'input-group--focused': this.focused,
        'input-group--dirty': this.inputValue,
        'input-group--disabled': this.disabled,
        'input-group--light': this.light && !this.dark,
        'input-group--dark': this.dark,
        'input-group--error': this.hasError || this.errors.length > 0,
        'input-group--append-icon': this.appendIcon,
        'input-group--prepend-icon': this.prependIcon,
        'input-group--required': this.required
      }, this.classes)
    }
  },

  created () {
    this.validate()
  },

  methods: {
    genLabel (h) {
      return h('label', {}, this.label)
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
        key: 'hint'
      }, this.hint)
    },
    genError (h, error) {
      return h(
        'div',
        {
          'class': 'input-group__error',
          key: error
        },
        error
      )
    },
    genIcon (h, type) {
      return h('v-icon', {
        'class': 'input-group__' + type + '-icon',
        domProps: {
          innerText: this[`${type}Icon`]
        }
      })
    },
    genInputGroup (h, input, data = {}) {
      const children = []
      const wrapperChildren = []
      const detailsChildren = []

      data = Object.assign(data, {
        'class': this.inputGroupClasses
      })

      if (this.label) {
        children.push(this.genLabel(h))
      }

      wrapperChildren.push(input)

      if (this.prependIcon) {
        wrapperChildren.unshift(this.genIcon(h, 'prepend'))
      }

      if (this.appendIcon) {
        wrapperChildren.push(this.genIcon(h, 'append'))
      }

      children.push(
        h('div', {
          'class': 'input-group__input'
        }, wrapperChildren)
      )

      if (this.errors.length > 0 || this.hint) {
        detailsChildren.push(this.genMessages(h))
      }

      if (this.counter) {
        detailsChildren.push(this.genCounter(h))
      }

      children.push(
        h('div', {
          'class': 'input-group__details'
        }, detailsChildren)
      )

      return h('div', data, children)
    },
    validate () {
      this.errors = []

      this.rules.forEach(rule => {
        const valid = rule()

        if (valid !== true) {
          this.errors.push(valid)
        }
      })
    }
  }
}
