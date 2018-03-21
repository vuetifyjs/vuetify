// Styles
import '../../stylus/components/_radios.styl'

// Components
import VIcon from '../VIcon'
import VLabel from '../VLabel'

// Mixins
import Colorable from '../../mixins/colorable'
import Rippleable from '../../mixins/rippleable'
import Themeable from '../../mixins/themeable'
import {
  inject as RegistrableInject
} from '../../mixins/registrable'

export default {
  name: 'v-radio',

  inheritAttrs: false,

  inject: [
    'isMandatory',
    'name',
    'validationState'
  ],

  mixins: [
    Colorable,
    Rippleable,
    RegistrableInject('radio', 'v-radio', 'v-radio-group'),
    Themeable
  ],

  data: () => ({
    isActive: false,
    parentError: false
  }),

  props: {
    color: {
      type: [Boolean, String],
      default: 'accent'
    },
    disabled: Boolean,
    value: null,
    label: String
  },

  computed: {
    classes () {
      const classes = {
        'theme--dark': this.dark,
        'theme--light': this.light
      }

      if (!this.parentError) {
        return this.addTextColorClassChecks(classes)
      }

      return classes
    },
    classesSelectable () {
      return this.addTextColorClassChecks(
        {},
        this.isActive ? this.color : this.validationStateProxy
      )
    },
    computedIcon () {
      return this.isActive
        ? '$vuetify.icons.radioOn'
        : '$vuetify.icons.radioOff'
    },
    hasState () {
      return this.isActive || !!this.validationStateProxy
    },
    validationStateProxy () {
      return this.validationState()
    }
  },

  mounted () {
    this.radio.register(this)
  },

  beforeDestroy () {
    this.radio.unregister(this)
  },

  methods: {
    genInput (type, attrs) {
      return this.$createElement('input', {
        attrs: Object.assign({}, attrs, {
          'aria-label': this.label,
          role: type,
          type,
          value: this.inputValue
        }),
        on: {
          blur: this.onBlur,
          change: this.toggle, // TODO: change this name
          focus: this.onFocus,
          keydown: e => {
            if ([13, 32].includes(e.keyCode)) {
              e.preventDefault()
              this.toggle()
            }
          }
        },
        ref: 'input'
      })
    },
    genLabel () {
      return this.$createElement(VLabel, {
        on: { click: this.toggle },
        attrs: {
          for: this.id
        },
        props: {
          color: this.validationStateProxy,
          focused: this.hasState
        }
      }, this.$slots.label || this.label)
    },
    genRadio () {
      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input'
      }, [
        this.genInput('checkbox', {
          'aria-checked': this.isActive.toString()
        }),
        this.genRipple({
          'class': this.classesSelectable
        }),
        this.$createElement(VIcon, {
          'class': this.classesSelectable
        }, this.computedIcon)
      ])
    },
    onFocus () {
      this.isFocused = true
    },
    onBlur () {
      this.isFocused = false
    },
    toggle () {
      const mandatory = !!this.isMandatory && this.isMandatory()

      if (!this.disabled && (!this.isActive || !mandatory)) {
        this.$refs.input.checked = true
        this.isActive = true
        this.$emit('change', this.value)
      }
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'v-radio'
    }, [
      this.genRadio(),
      this.genLabel()
    ])
  }
}
