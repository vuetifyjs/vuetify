export default {
  data () {
    return {
      errors: [],
      focused: false,
      lazyValue: this.value,
      appendIconAlt: '',
      prependIconAlt: '',
      appendIconCbPrivate: null,
      prependIconCbPrivate: null
    }
  },

  props: {
    appendIcon: String,
    appendIconCb: Function,
    dark: Boolean,
    disabled: Boolean,
    hint: String,
    persistentHint: Boolean,
    label: String,
    light: {
      type: Boolean,
      default: true
    },
    prependIcon: String,
    prependIconCb: Function,
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
      return Object.assign({
        'input-group': true,
        'input-group--focused': this.focused,
        'input-group--dirty': this.isDirty(),
        'input-group--disabled': this.disabled,
        'input-group--light': this.light && !this.dark,
        'input-group--dark': this.dark,
        'input-group--error': this.hasError || this.errors.length > 0,
        'input-group--append-icon': this.appendIcon,
        'input-group--prepend-icon': this.prependIcon,
        'input-group--required': this.required
      }, this.classes)
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
    }
  },

  mounted () {
    this.validate()
  },

  methods: {
    isDirty () {
      return this.inputValue
    },
    genLabel (h) {
      return h('label', {}, this.label)
    },
    genMessages (h) {
      let messages = []

      if ((this.hint &&
            this.focused ||
            this.hint &&
            this.persistentHint) &&
          this.errors.length === 0
      ) {
        messages = [this.genHint(h)]
      } else if (this.errors.length) {
        messages = this.errors.map(i => this.genError(h, i))
      }

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
        'class': 'input-group__hint',
        key: this.hint
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
      const icon = this[`${type}IconAlt`] || this[`${type}Icon`]
      const callback = this[`${type}IconCb`]
      const callbackPrivate = this[`${type}IconCbPrivate`]

      return h(
        'v-icon',
        {
          'class': 'input-group__' + type + '-icon',
          'nativeOn': {
            'click': e => {
              if (typeof callbackPrivate === 'function') callbackPrivate(e)
              if (typeof callback === 'function') callback(e)
            }
          }
        },
        icon
      )
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

      detailsChildren.push(this.genMessages(h))

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
        const valid = typeof rule === 'function'
          ? rule(this.value)
          : rule

        if (valid !== true) {
          this.errors.push(valid)
        }
      })
    }
  }
}
