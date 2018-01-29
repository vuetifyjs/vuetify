// Components
import { VFadeTransition } from '../transitions'
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import Rippleable from '../../mixins/rippleable'
import TabFocusable from '../../mixins/tab-focusable'
import Themeable from '../../mixins/themeable'
import {
  inject as RegistrableInject
} from '../../mixins/registrable'

export default {
  name: 'v-radio',

  inheritAttrs: false,

  inject: ['isMandatory', 'name'],

  components: {
    VFadeTransition,
    VIcon
  },

  mixins: [
    Colorable,
    Rippleable,
    RegistrableInject('radio', 'v-radio', 'v-radio-group'),
    TabFocusable,
    Themeable
  ],

  data: () => ({
    defaultColor: 'accent',
    isActive: false,
    parentError: false
  }),

  props: {
    disabled: Boolean,
    value: null,
    label: String
  },

  computed: {
    classes () {
      const classes = {
        'input-group': true,
        'input-group--active': this.isActive,
        'input-group--disabled': this.disabled,
        'input-group--selection-controls': true,
        'input-group--tab-focused': this.tabFocused,
        'radio': true,
        'theme--dark': this.dark,
        'theme--light': this.light
      }

      if (!this.parentError) {
        return this.addTextColorClassChecks(classes)
      }

      return classes
    },
    icon () {
      return this.isActive ? 'radio_button_checked' : 'radio_button_unchecked'
    }
  },

  methods: {
    genInput (radio) {
      const value = ['string', 'number'].includes(typeof this.value)
        ? this.value
        : JSON.stringify(this.value)
      const input = this.$createElement('input', {
        ref: 'input',
        style: {
          display: 'none'
        },
        attrs: Object.assign({
          name: this.name && this.name(),
          id: this.id,
          type: 'radio',
          value
        }, this.$attrs)
      }, [value])

      radio.push(input)

      return this.$createElement('div', {
        class: 'input-group__input'
      }, radio)
    },
    genWrapper (radio) {
      const children = []

      children.push(this.genLabel())
      children.push(this.genInput(radio))

      return this.$createElement('div', {
        class: this.classes,
        attrs: {
          role: 'radio',
          'aria-checked': this.isActive ? 'true' : 'false',
          'aria-label': this.label
        },
        on: {
          keydown: e => {
            if ([13, 32].includes(e.keyCode)) {
              e.preventDefault()
              this.toggle()
            }
          },
          blur: e => {
            this.$emit('blur', e)
            this.tabFocused = false
          }
        }
      }, children)
    },
    genLabel () {
      return this.$createElement('label', {
        on: {
          click: this.toggle
        }
      }, this.$slots.label || this.label)
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

  mounted () {
    this.radio.register(this)
  },

  beforeDestroy () {
    this.radio.unregister(this)
  },

  render (h) {
    const transition = h('v-fade-transition', {}, [
      h('v-icon', {
        staticClass: 'icon--selection-control',
        'class': {
          'icon--radio': this.isActive
        },
        key: this.icon,
        on: Object.assign({
          click: this.toggle
        }, this.$listeners)
      }, this.icon)
    ])

    const ripple = this.ripple ? this.genRipple() : null

    return this.genWrapper([transition, ripple])
  }
}
