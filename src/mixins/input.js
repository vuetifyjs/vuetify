import Loadable from './loadable'
import Themeable from './themeable'
import Validatable from './validatable'
import VIcon from '../components/VIcon'

export default {
  name: 'input',

  mixins: [Loadable, Themeable, Validatable],

  data () {
    return {
      isFocused: false,
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
    readonly: Boolean,
    required: Boolean,
    tabindex: {
      default: 0
    },
    toggleKeys: {
      type: Array,
      default: () => [13, 32]
    },
    value: {
      required: false
    }
  },

  computed: {
    inputGroupClasses () {
      return Object.assign({
        'v-input-group': true,
        'v-input-group--async-loading': this.loading !== false,
        'v-input-group--focused': this.isFocused,
        'v-input-group--dirty': this.isDirty,
        'v-input-group--tab-focused': this.tabFocused,
        'v-input-group--disabled': this.disabled,
        'v-input-group--error': this.hasError,
        'v-input-group--append-icon': this.appendIcon,
        'v-input-group--prepend-icon': this.prependIcon,
        'v-input-group--required': this.required,
        'v-input-group--hide-details': this.hideDetails,
        'v-input-group--placeholder': !!this.placeholder,
        'theme--dark': this.dark,
        'theme--light': this.light
      }, this.classes)
    },
    isDirty () {
      return !!this.inputValue
    }
  },

  methods: {
    groupFocus () {},
    groupBlur () {
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
      let messages = null

      if (
        this.hint &&
        (this.isFocused || this.persistentHint) &&
        !this.validations.length
      ) {
        messages = [this.genHint()]
      } else if (this.validations.length) {
        messages = [this.genError(this.validations[0])]
      }

      return this.$createElement('transition', {
        props: {
          name: 'slide-y-transition'
        }
      }, messages)
    },
    genHint () {
      return this.$createElement('div', {
        'class': 'v-input-group__messages v-input-group__hint',
        domProps: { innerHTML: this.hint }
      })
    },
    genError (error) {
      return this.$createElement(
        'div',
        {
          'class': 'v-input-group__messages v-input-group__error'
        },
        error
      )
    },
    genIcon (type, defaultCallback = null) {
      const shouldClear = type === 'append' && this.clearable && this.isDirty
      const icon = shouldClear ? '$vuetify.icons.clear' : this[`${type}Icon`]
      const callback = shouldClear
        ? this.clearableCallback
        : (this[`${type}IconCb`] || defaultCallback)

      return this.$createElement(VIcon, {
        'class': {
          [`v-input-group__${type}-icon`]: true,
          'v-input-group__icon-cb': !!callback,
          'v-input-group__icon-clearable': shouldClear
        },
        props: {
          disabled: this.disabled
        },
        on: {
          click: e => {
            if (!callback) return

            e.stopPropagation()
            callback()
          }
        }
      }, icon)
    },
    genInputGroup (input, data = {}, defaultAppendCallback = null) {
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

            if (this.toggleKeys.includes(e.keyCode)) {
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

      if (this.appendIcon || this.clearable) {
        wrapperChildren.push(this.genIcon('append', defaultAppendCallback))
      }

      const progress = this.genProgress()
      progress && detailsChildren.push(progress)

      children.push(
        this.$createElement('div', {
          'class': 'v-input-group__input'
        }, wrapperChildren)
      )

      !this.hideDetails && detailsChildren.push(this.genMessages())

      if (this.counter) {
        detailsChildren.push(this.genCounter())
      }

      children.push(
        this.$createElement('div', {
          'class': 'v-input-group__details'
        }, detailsChildren)
      )

      return this.$createElement('div', data, children)
    }
  }
}
