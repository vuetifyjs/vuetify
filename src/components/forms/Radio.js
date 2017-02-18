import Contextualable from '../../mixins/contextualable'

export default {
  name: 'radio',

  mixins: [Contextualable],

  data () {
    return {
      focused: false,
      inputValue: this.value === this.valueV
    }
  },

  props: {
    dark: Boolean,
    disabled: Boolean,
    label: String,
    light: Boolean,
    value: {
      required: false
    },
    valueV: {
      required: false
    }
  },

  watch: {
    value () {
      if (!this.disabled) {
        this.inputValue = this.value === this.valueV
      }
    }
  },

  computed: {
    classes () {
      return {
        'input-group--selection-controls__container': true,
        'input-group--selection-controls__container--active': this.inputValue,
        'input-group--selection-controls__container--light': this.light,
        'input-group--selection-controls__container--dark': this.dark,
        'input-group--selection-controls__container--disabled': this.disabled,
        'primary--text': this.primary,
        'secondary--text': this.secondary,
        'error--text': this.error,
        'success--text': this.success,
        'info--text': this.info,
        'warning--text': this.warning
      }
    },

    icon () {
      return this.inputValue ? 'radio_button_checked' : 'radio_button_unchecked'
    }
  },

  methods: {
    toggle () {
      if (!this.disabled) {
        this.$emit('input', this.valueV)
      }
    }
  },

  render (h) {
    const transition = h('v-fade-transition', {}, [
      h('v-icon', {
        'class': {
          'icon--radio': this.inputValue
        },
        key: this.icon
      }, this.icon)
    ])

    const ripple = h('div', {
      'class': 'input-group--selection-controls__ripple',
      on: { click: this.toggle },
      directives: [
        {
          name: 'ripple',
          value: { center: true }
        }
      ]
    })

    return h('div', {
      'class': 'input-group input-group--selection-controls'
    }, [
      h('div', { 'class': this.classes }, [transition, ripple]),
      h('label', { on: { click: this.toggle }}, this.label)
    ])
  }
}
