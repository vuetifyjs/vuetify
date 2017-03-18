import Contextualable from '../../mixins/contextualable'
import Input from '../../mixins/input'

export default {
  name: 'radio',

  mixins: [Contextualable, Input],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    inputValue: [String, Number]
  },

  computed: {
    isActive () {
      return this.inputValue === this.value
    },
    classes () {
      return {
        'radio': true,
        'input-group--selection-controls': true,
        'input-group--active': this.isActive,
        'primary--text': this.primary,
        'secondary--text': this.secondary,
        'error--text': this.error,
        'success--text': this.success,
        'info--text': this.info,
        'warning--text': this.warning
      }
    },

    icon () {
      return this.isActive ? 'radio_button_checked' : 'radio_button_unchecked'
    }
  },

  methods: {
    genLabel (h) {
      return h('label', { on: { click: this.toggle }}, this.label)
    },
    toggle () {
      if (!this.disabled) {
        this.$emit('change', this.value)
      }
    }
  },

  render (h) {
    const transition = h('v-fade-transition', {}, [
      h('v-icon', {
        'class': {
          'icon--radio': this.isActive
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

    return this.genInputGroup([transition, ripple])
  }
}
