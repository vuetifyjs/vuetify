import Themeable from './themeable'

export default {
  mixins: [Themeable],

  data () {
    return {
      errorBucket: [],
      focused: false,
      tabFocused: false,
      lazyValue: this.value
    }
  },

  props: {
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    error: Boolean,
    errorMessages: {
      type: [String, Array],
      default: () => []
    },
    hint: String,
    hideDetails: Boolean,
    label: String,
    persistentHint: Boolean,
    placeholder: String,
    prependIcon: String,
    prependIconCb: Function,
    required: Boolean,
    rules: {
      type: Array,
      default: () => []
    },
    tabindex: {
      default: 0
    },
    value: {
      required: false
    }
  },

  computed: {
    hasError () {
      return this.validations.length || this.error
    },
    inputGroupClasses () {
      return Object.assign({
        'input-group': true,
        'input-group--focused': this.focused,
        'input-group--dirty': this.isDirty,
        'input-group--tab-focused': this.tabFocused,
        'input-group--disabled': this.disabled,
        'input-group--error': this.hasError,
        'input-group--append-icon': this.appendIcon,
        'input-group--prepend-icon': this.prependIcon,
        'input-group--required': this.required,
        'input-group--hide-details': this.hideDetails,
        'input-group--placeholder': !!this.placeholder,
        'theme--dark': this.dark,
        'theme--light': this.light
      }, this.classes)
    },
    isDirty () {
      return this.inputValue
    },
    modifiers () {
      const modifiers = {
        lazy: false,
        number: false,
        trim: false
      }

      if (!this.$vnode.data.directives) {
        return modifiers
      }

      const model = this.$vnode.data.directives.find(i => i.name === 'model')

      if (!model) {
        return modifiers
      }

      return Object.assign(modifiers, model.modifiers)
    },
    validations () {
      return (!Array.isArray(this.errorMessages)
        ? [this.errorMessages]
        : this.errorMessages).concat(this.errorBucket)
    }
  },

  watch: {
    rules () {
      this.validate()
    }
  },

  mounted () {
    this.validate()
  },

  methods: {
    genLabel () {
      return this.$createElement('label', {
        attrs: {
          for: this.$attrs.id
        }
      }, this.$slots.label || this.label)
    },
    genMessages () {
      let messages = []

      if ((this.hint &&
            this.focused ||
            this.hint &&
            this.persistentHint) &&
          this.validations.length === 0
      ) {
        messages = [this.genHint()]
      } else if (this.validations.length) {
        messages = this.validations.map(i => this.genError(i))
      }

      return this.$createElement(
        'transition-group',
        {
          'class': 'input-group__messages',
          props: {
            tag: 'div',
            name: 'slide-y-transition'
          }
        },
        messages
      )
    },
    genHint () {
      return this.$createElement('div', {
        'class': 'input-group__hint',
        key: this.hint,
        domProps: { innerHTML: this.hint }
      })
    },
    genError (error) {
      return this.$createElement(
        'div',
        {
          'class': 'input-group__error',
          key: error
        },
        error
      )
    },
    genIcon (type) {
      const icon = this[`${type}Icon`]
      const cb = this[`${type}IconCb`]
      const hasCallback = typeof cb === 'function'

      return this.$createElement(
        'v-icon',
        {
          'class': {
            [`input-group__${type}-icon`]: true,
            'input-group__icon-cb': hasCallback
          },
          on: {
            click: e => {
              hasCallback && cb(e)
            }
          }
        },
        icon
      )
    },
    genInputGroup (input, data = {}) {
      const children = []
      const wrapperChildren = []
      const detailsChildren = []

      data = Object.assign({}, {
        'class': this.inputGroupClasses,
        attrs: {
          tabindex: this.tabindex
        },
        on: {
          blur: () => (this.tabFocused = false),
          click: () => (this.tabFocused = false),
          keyup: e => {
            if ([9, 16].includes(e.keyCode)) {
              this.tabFocused = true
            }
          },
          keydown: e => {
            if (!this.toggle) return

            if ([13, 32].includes(e.keyCode)) {
              e.preventDefault()
              this.toggle()
            }
          }
        }
      }, data)

      if (this.$slots.label || this.label) {
        children.push(this.genLabel())
      }

      wrapperChildren.push(input)

      if (this.prependIcon) {
        wrapperChildren.unshift(this.genIcon('prepend'))
      }

      if (this.appendIcon) {
        wrapperChildren.push(this.genIcon('append'))
      }

      children.push(
        this.$createElement('div', {
          'class': 'input-group__input'
        }, wrapperChildren)
      )

      detailsChildren.push(this.genMessages())
      this.counter && detailsChildren.push(this.genCounter())

      children.push(
        this.$createElement('div', {
          'class': 'input-group__details'
        }, detailsChildren)
      )

      return this.$createElement('div', data, children)
    },
    validate () {
      this.errorBucket = []

      this.rules.forEach(rule => {
        const valid = typeof rule === 'function'
          ? rule(this.value)
          : rule

        if (valid !== true) {
          this.errorBucket.push(valid)
        }
      })
    }
  }
}
