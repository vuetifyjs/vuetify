// Components
import VCounter from '../components/VCounter'
import VIcon from '../components/VIcon'
import VLabel from '../components/VLabel'
import VMessages from '../components/VMessages'

// Mixins
import Colorable from './colorable'
import Loadable from './loadable'
import Themeable from './themeable'
import Validatable from './validatable'

export default {
  name: 'input',

  mixins: [
    Colorable,
    Loadable,
    Themeable,
    Validatable
  ],

  data: vm => ({
    isFocused: false,
    tabFocused: false,
    internalTabIndex: null,
    lazyValue: vm.value
  }),

  props: {
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    clearable: Boolean,
    clearIcon: String,
    hint: String,
    hideDetails: Boolean,
    label: String,
    outerIcon: String,
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
    classesColor () {
      return this.addTextColorClassChecks()
    },
    classesInput () {
      return {
        ...this.classes,
        'v-input--is-focused': this.isFocused,
        'v-input--is-loading': this.loading !== false,
        'v-input--is-label-active': this.isLabelActive,
        'v-input--is-disabled': this.disabled,
        'v-input--has-state': this.hasState,
        ...this.classesColor,
        'theme--light': !this.dark,
        'theme--dark': this.dark
      }
    },
    currentColor () {
      if (this.hasError) return 'error'
      if (this.hasSuccess) return 'success'
      if (this.isFocused) return this.color
      return null
    },
    hasState () {
      return this.hasError || this.hasSuccess || this.isFocused
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
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-input__control'
      }, [
        this.genInputWrapper(),
        this.genProgress(),
        this.genMessages(),
        this.genCounter()
      ])
    },
    genCounter () {
      if (this.counter === false) return null

      const length = (this.inputValue || '').length

      return this.$createElement(VCounter, {
        props: {
          value: `${length} / ${this.counter}`
        }
      })
    },
    genIcon (type, defaultCallback = null) {
      const shouldClear = this.shouldClear(type)
      const callback = shouldClear
        ? this.clearableCallback
        : (this[`${type}IconCb`] || defaultCallback)

      const icon = this.$createElement(VIcon, {
        'class': {
          'v-icon--clickable': callback
        },
        props: { disabled: this.disabled },
        on: {
          click: e => {
            if (!callback) return

            e.stopPropagation()
            callback()
          }
        }
      }, shouldClear ? 'clear' : this[`${type}Icon`])

      return this.$createElement('div', {
        staticClass: `v-input__icon v-input__icon--${type}`
      }, [icon])
    },
    genInputWrapper () {
      return this.$createElement('div', {
        staticClass: 'v-input__wrapper',
        'class': this.classesColor
      }, [
        this.genLabel(),
        this.genInput(),
        this.genAppendInner()
      ])
    },
    genLabel () {
      if (this.singleLine && this.isDirty) return null

      const data = {
        props: {
          color: 'primary',
          focused: this.isFocused,
          value: this.isFocused || this.isDirty
        }
      }

      if ((this.attrs || {}).id) data.props.for = this.attrs.id

      return this.$createElement(VLabel, data, [this.$slots.label || this.label])
    },
    genMessages () {
      let messages = []

      if (
        this.hint &&
        (this.isFocused || this.persistentHint) &&
        !this.validations.length
      ) {
        messages = [this.hint]
      } else if (this.validations.length) {
        messages = [this.genError(this.validations[0])]
      }

      return this.$createElement(VMessages, {
        props: { messages }
      }, this.$slots.messages)
    },
    genSlot (ref, location, slot) {
      return this.$createElement('div', {
        staticClass: `v-input__${ref}-${location}`
      }, slot)
    },
    genPrependOuter () {
      const slot = []

      if (this.$slots['prepend-outer']) {
        slot.push(this.$slots['prepend-outer'])
      // For backwards compat
      } else if (this.$slots['prepend-icon']) {
        slot.push(this.$slots['prepend-icon'])
      } else if (this.prependIcon) {
        slot.push(this.genIcon('prepend'))
      }

      return this.genSlot('prepend', 'outer', slot)
    },
    genAppendInner () {
      const slot = []

      if (this.$slots['append-inner']) {
        slot.push(this.$slots['append-inner'])
        // For backwards compat
      } else if (this.$slots['append-icon']) {
        slot.push(this.$slots['append-icon'])
      } else if (this.clearable) {
        const icon = this.clearIcon ? 'clear' : 'append'
        slot.push(this.genIcon(icon))
      }

      return this.genSlot('append', 'inner', slot)
    },
    genAppendOuter () {
      const slot = []

      if (this.$slots['append-outer']) {
        slot.push(this.$slots['append-outer'])
      } else if (this.outerIcon) {
        slot.push(this.genIcon('outer'))
      }

      return this.genSlot('append', 'outer', slot)
    },
    genInputGroup (input, data = {}, defaultAppendCallback = null) {
      return this.$createElement('div', {
        staticClass: 'v-input',
        'class': this.classesInput,
        on: {
          click: this.onClick
        }
      }, [
        this.genPrependOuter(),
        this.genContent(),
        this.genAppendOuter()
      ])
    },
    hasIcon (icon) {
      return this[`${icon}Icon`] || this.$slots[`${icon}Icon`]
    },
    onClick () {
      this.$emit('click')
    },
    shouldClear (type) {
      return (type === 'append' || type === 'clear') &&
        this.clearable &&
        this.isDirty
    }
  }
}
