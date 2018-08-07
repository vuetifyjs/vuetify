// Styles
import '../../stylus/components/_inputs.styl'

// Components
import VIcon from '../VIcon'
import VLabel from '../VLabel'
import VMessages from '../VMessages'

// Mixins
import Colorable from '../../mixins/colorable'
import Loadable from '../../mixins/loadable'
import Themeable from '../../mixins/themeable'
import Validatable from '../../mixins/validatable'

// Utilities
import {
  convertToUnit,
  kebabCase
} from '../../util/helpers'
import { deprecate } from '../../util/console'

/* @vue/component */
export default {
  name: 'v-input',

  mixins: [
    Colorable,
    Loadable,
    Themeable,
    Validatable
  ],

  props: {
    appendIcon: String,
    /** @deprecated */
    appendIconCb: Function,
    backgroundColor: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    height: [Number, String],
    hideDetails: Boolean,
    hint: String,
    label: String,
    persistentHint: Boolean,
    prependIcon: String,
    /** @deprecated */
    prependIconCb: Function,
    readonly: Boolean,
    value: { required: false }
  },

  data: vm => ({
    lazyValue: vm.value,
    isFocused: false
  }),

  computed: {
    classesInput () {
      return {
        ...this.classes,
        'v-input--has-state': this.hasState,
        'v-input--hide-details': this.hideDetails,
        'v-input--is-label-active': this.isLabelActive,
        'v-input--is-dirty': this.isDirty,
        'v-input--is-disabled': this.disabled,
        'v-input--is-focused': this.isFocused,
        'v-input--is-loading': this.loading !== false,
        'v-input--is-readonly': this.readonly,
        ...this.addTextColorClassChecks({}, this.validationState),
        ...this.themeClasses
      }
    },
    directivesInput () {
      return []
    },
    hasHint () {
      return !this.hasMessages &&
        this.hint &&
        (this.persistentHint || this.isFocused)
    },
    hasLabel () {
      return Boolean(this.$slots.label || this.label)
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
        this.$emit(this.$_modelEvent, val)
      }
    },
    isDirty () {
      return !!this.lazyValue
    },
    isDisabled () {
      return Boolean(this.disabled || this.readonly)
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

  beforeCreate () {
    // v-radio-group needs to emit a different event
    // https://github.com/vuetifyjs/vuetify/issues/4752
    this.$_modelEvent = (this.$options.model && this.$options.model.event) || 'input'
  },

  methods: {
    genContent () {
      return [
        this.genPrependSlot(),
        this.genControl(),
        this.genAppendSlot()
      ]
    },
    genControl () {
      return this.$createElement('div', {
        staticClass: 'v-input__control'
      }, [
        this.genInputSlot(),
        this.genMessages()
      ])
    },
    genDefaultSlot () {
      return [
        this.genLabel(),
        this.$slots.default
      ]
    },
    // TODO: remove shouldDeprecate (2.0), used for clearIcon
    genIcon (type, cb, shouldDeprecate = true) {
      const icon = this[`${type}Icon`]
      const eventName = `click:${kebabCase(type)}`
      cb = cb || this[`${type}IconCb`]

      if (shouldDeprecate && type && cb) {
        deprecate(`:${type}-icon-cb`, `@${eventName}`, this)
      }

      const data = {
        props: {
          color: this.validationState,
          dark: this.dark,
          disabled: this.disabled,
          light: this.light
        },
        on: !(this.$listeners[eventName] || cb)
          ? null
          : {
            click: e => {
              e.preventDefault()
              e.stopPropagation()

              this.$emit(eventName, e)
              cb && cb(e)
            },
            // Container has mouseup event that will
            // trigger menu open if enclosed
            mouseup: e => {
              e.preventDefault()
              e.stopPropagation()
            }
          }
      }

      return this.$createElement('div', {
        staticClass: `v-input__icon v-input__icon--${kebabCase(type)}`,
        key: `${type}${icon}`
      }, [
        this.$createElement(
          VIcon,
          data,
          icon
        )
      ])
    },
    genInputSlot () {
      return this.$createElement('div', {
        staticClass: 'v-input__slot',
        class: this.addBackgroundColorClassChecks({}, this.backgroundColor),
        style: { height: convertToUnit(this.height) },
        directives: this.directivesInput,
        on: {
          click: this.onClick,
          mousedown: this.onMouseDown,
          mouseup: this.onMouseUp
        },
        ref: 'input-slot'
      }, [
        this.genDefaultSlot(),
        this.genProgress()
      ])
    },
    genLabel () {
      if (!this.hasLabel) return null

      return this.$createElement(VLabel, {
        props: {
          color: this.validationState,
          dark: this.dark,
          focused: this.hasState,
          for: this.$attrs.id,
          light: this.light
        }
      }, this.$slots.label || this.label)
    },
    genMessages () {
      if (this.hideDetails) return null

      const messages = this.hasHint
        ? [this.hint]
        : this.validations

      return this.$createElement(VMessages, {
        props: {
          color: this.hasHint ? '' : this.validationState,
          dark: this.dark,
          light: this.light,
          value: (this.hasMessages || this.hasHint) ? messages : []
        }
      })
    },
    genSlot (type, location, slot) {
      if (!slot.length) return null

      const ref = `${type}-${location}`

      return this.$createElement('div', {
        staticClass: `v-input__${ref}`,
        ref
      }, slot)
    },
    genPrependSlot () {
      const slot = []

      if (this.$slots['prepend']) {
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
    onClick (e) {
      this.$emit('click', e)
    },
    onMouseDown (e) {
      this.$emit('mousedown', e)
    },
    onMouseUp (e) {
      this.$emit('mouseup', e)
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'v-input',
      attrs: this.attrsInput,
      'class': this.classesInput
    }, this.genContent())
  }
}
