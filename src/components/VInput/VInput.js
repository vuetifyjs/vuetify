// Styles
import '../../stylus/components/_inputs.styl'

// Components
import VIcon from '../VIcon'
import VMessages from '../VMessages'

// Mixins
import Loadable from '../../mixins/loadable'
import Themeable from '../../mixins/themeable'
import Validatable from '../../mixins/validatable'

export default {
  name: 'v-input',

  mixins: [
    Loadable,
    Themeable,
    Validatable
  ],

  data: vm => ({
    lazyValue: vm.value,
    isFocused: false
  }),

  props: {
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    height: [Number, String],
    hideDetails: Boolean,
    hint: String,
    persistentHint: Boolean,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    tabindex: { default: 0 },
    value: { required: false }
  },

  computed: {
    classesColor () {
      return this.addTextColorClassChecks({}, this.validationState)
    },
    classesInput () {
      return {
        ...this.classes,
        'v-input--has-state': this.hasState,
        'v-input--is-label-active': this.isLabelActive,
        'v-input--is-dirty': this.isDirty,
        'v-input--is-disabled': this.disabled,
        'v-input--is-focused': this.isFocused,
        'v-input--is-loading': this.loading !== false,
        ...this.classesColor,
        'theme--light': !this.dark,
        'theme--dark': this.dark
      }
    },
    // Implementing components can
    // use dynamicHeight to override
    // the default conditional
    computedHeight () {
      return this.dynamicHeight || (!this.height
        ? '32px'
        : `${parseInt(this.height)}px`)
    },
    hasHint () {
      return !this.hasMessages &&
        this.hint &&
        (this.persistentHint || this.isFocused)
    },
    // Proxy for `lazyValue`
    // This allows an input
    // to function without
    // a provided model
    internalValue: {
      get () {
        return this.lazyValue
      },
      set (val) {
        this.lazyValue = val
        this.$emit('input', val)
      }
    },
    isDirty () {
      return !!this.lazyValue
    },
    isLabelActive () {
      return this.isDirty
    }
  },

  watch: {
    value (val) {
      this.lazyValue = val
    }
  },

  methods: {
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-input__control'
      }, [
        this.genInputWrapper(),
        this.genMessages()
      ])
    },
    genIcon (type, cb) {
      cb = cb || this[`${type}IconCb`]

      const data = {
        props: {
          color: this.validationState,
          disabled: this.disabled
        },
        on: cb ? {
          click: e => {
            e.preventDefault()
            e.stopPropagation()

            cb()
          }
        } : null
      }

      return this.$createElement('div', {
        staticClass: `v-input__icon v-input__icon--${type}`
      }, [
        this.$createElement(
          VIcon,
          data,
          this[`${type}Icon`]
        )
      ])
    },
    genDefaultSlot () {
      return this.$slots.default
    },
    genInputWrapper () {
      return this.$createElement('div', {
        staticClass: 'v-input__wrapper',
        'class': this.classesColor,
        style: {
          height: this.computedHeight
        }
      }, this.genDefaultSlot())
    },
    genMessages () {
      if (this.hideDetails) return null

      const messages = this.hasHint
        ? [this.hint]
        : this.validations

      return this.$createElement(VMessages, {
        props: {
          color: this.hasHint ? '' : this.validationState,
          value: (this.hasMessages || this.hasHint) ? messages : []
        }
      })
    },
    genSlot (ref, location, slot) {
      if (!slot.length) return null

      return this.$createElement('div', {
        staticClass: `v-input__${ref}-${location}`
      }, slot)
    },
    genPrependSlot () {
      const slot = []

      // Backwards compat
      // TODO: Deprecate prepend-icon slot 2.0
      if (this.$slots['prepend-icon']) {
        slot.push(this.$slots['prepend-icon'])
      } else if (this.$slots['prepend']) {
        slot.push(this.$slots['prepend'])
      } else if (this.prependIcon) {
        slot.push(this.genIcon('prepend'))
      }

      return this.genSlot('prepend', 'outer', slot)
    },
    genAppendSlot () {
      const slot = []

      // Append icon for text field was really
      // an appended inner icon, v-text-field
      // will overwrite this method in order to obtain
      // backwards compat
      if (this.$slots['append']) {
        slot.push(this.$slots['append'])
      } else if (this.appendIcon) {
        slot.push(this.genIcon('append'))
      }

      return this.genSlot('append', 'outer', slot)
    },
    genListeners () {
      return {
        click: this.onClick
      }
    },
    onClick (e) {
      this.$emit('click', e)
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'v-input',
      'class': this.classesInput,
      on: this.genListeners()
    }, [
      this.genPrependSlot(),
      this.genContent(),
      this.genAppendSlot()
    ])
  }
}
