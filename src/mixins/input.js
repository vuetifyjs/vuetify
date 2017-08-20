import Themeable from './themeable'
import Validatable from './validatable'

export default {
  mixins: [Themeable, Validatable],

  data () {
    return {
      focused: false,
      tabFocused: false,
      internalTabIndex: null,
      lazyValue: this.value
    }
  },

  props: {
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    label: String,
    persistentHint: Boolean,
    placeholder: String,
    prependIcon: String,
    prependIconCb: Function,
    required: Boolean,
    tabindex: {
      default: 0
    },
    value: {
      required: false
    }
  },

  computed: {
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
      return !!this.inputValue
    }
  },

  methods: {
    groupFocus (e) {},
    groupBlur (e) {
      this.tabFocused = false
    },
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
        messages = [this.genError(this.validations[0])]
      }

      return this.$createElement('transition-group', {
        'class': 'input-group__messages',
        props: {
          tag: 'div',
          name: 'slide-y-transition'
        }
      }, messages)
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
          tabindex: this.disabled
            ? -1
            : this.internalTabIndex || this.tabindex
        },
        on: {
          focus: this.groupFocus,
          blur: this.groupBlur,
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

      if (typeof this.counter !== 'undefined') {
        detailsChildren.push(this.genCounter())
      }

      children.push(
        this.$createElement('div', {
          'class': 'input-group__details'
        }, detailsChildren)
      )

      return this.$createElement('div', data, children)
    }
  }
}
