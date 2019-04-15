// Styles
import '../../stylus/components/_radios.styl'

// Components
import VIcon from '../VIcon'
import VLabel from '../VLabel'

// Mixins
import Colorable from '../../mixins/colorable'
import Rippleable from '../../mixins/rippleable'
import Themeable from '../../mixins/themeable'
import Selectable from '../../mixins/selectable'
import {
  inject as RegistrableInject
} from '../../mixins/registrable'

/* @vue/component */
export default {
  name: 'v-radio',

  mixins: [
    Colorable,
    Rippleable,
    RegistrableInject('radio', 'v-radio', 'v-radio-group'),
    Themeable
  ],

  inheritAttrs: false,

  props: {
    color: {
      type: String,
      default: 'accent'
    },
    disabled: Boolean,
    label: String,
    onIcon: {
      type: String,
      default: '$vuetify.icons.radioOn'
    },
    offIcon: {
      type: String,
      default: '$vuetify.icons.radioOff'
    },
    readonly: Boolean,
    value: null
  },

  data: () => ({
    isActive: false,
    isFocused: false,
    parentError: false
  }),

  computed: {
    computedData () {
      return this.setTextColor(!this.parentError && this.isActive && this.color, {
        staticClass: 'v-radio',
        'class': {
          'v-radio--is-disabled': this.isDisabled,
          'v-radio--is-focused': this.isFocused,
          ...this.themeClasses
        }
      })
    },
    computedColor () {
      return this.isActive ? this.color : this.radio.validationState || false
    },
    computedIcon () {
      return this.isActive
        ? this.onIcon
        : this.offIcon
    },
    hasState () {
      return this.isActive || !!this.radio.validationState
    },
    isDisabled () {
      return this.disabled || !!this.radio.disabled
    },
    isReadonly () {
      return this.readonly || !!this.radio.readonly
    }
  },

  mounted () {
    this.radio.register(this)
  },

  beforeDestroy () {
    this.radio.unregister(this)
  },

  methods: {
    genInput (...args) {
      // We can't actually use the mixin directly because
      // it's made for standalone components, but its
      // genInput method is exactly what we need
      return Selectable.options.methods.genInput.call(this, ...args)
    },
    genLabel () {
      return this.$createElement(VLabel, {
        on: { click: this.onChange },
        attrs: {
          for: this.id
        },
        props: {
          color: this.radio.validationState || '',
          dark: this.dark,
          focused: this.hasState,
          light: this.light
        }
      }, this.$slots.label || this.label)
    },
    genRadio () {
      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input'
      }, [
        this.genInput('radio', {
          name: this.radio.name || (this.radio._uid ? 'v-radio-' + this.radio._uid : false),
          value: this.value,
          ...this.$attrs
        }),
        this.genRipple(this.setTextColor(this.computedColor)),
        this.$createElement(VIcon, this.setTextColor(this.computedColor, {
          props: {
            dark: this.dark,
            light: this.light
          }
        }), this.computedIcon)
      ])
    },
    onFocus (e) {
      this.isFocused = true
      this.$emit('focus', e)
    },
    onBlur (e) {
      this.isFocused = false
      this.$emit('blur', e)
    },
    onChange () {
      if (this.isDisabled || this.isReadonly) return

      if (!this.isDisabled && (!this.isActive || !this.radio.mandatory)) {
        this.$emit('change', this.value)
      }
    },
    onKeydown () {}
  },

  render (h) {
    return h('div', this.computedData, [
      this.genRadio(),
      this.genLabel()
    ])
  }
}
