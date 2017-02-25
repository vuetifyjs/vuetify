import Contextualable from '../../mixins/contextualable'
import Input from '../../mixins/input'

export default {
  name: 'radio',

  mixins: [Contextualable, Input],

  data () {
    return {
      inputValue: this.value === this.valueV
    }
  },

  props: {
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
        'radio': true,
        'input-group--selection-controls': true,
        'input-group--active': this.inputValue,
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

    return this.genInputGroup(h, [transition, ripple])
  }
}
