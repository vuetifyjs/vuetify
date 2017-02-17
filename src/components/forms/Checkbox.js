import Contextualable from '../../mixins/contextualable'

export default {
  name: 'checkbox',

  render (h) {
    const icon = h('v-icon', {
      'class': {
        'icon--checkbox': this.icon === 'check_box'
      }
    }, this.icon)

    const transition = h('v-fade-transition', {}, [icon])
    const ripple = h('div', {
      'class': 'input-group--selection-controls__ripple',
      on: {
        click: this.toggle
      },
      directives: [
        {
          name: 'ripple',
          value: { center: true }
        }
      ]
    })

    const container = h('div', {
      'class': this.classes
    }, [transition, ripple])

    const label = h('label', {
      on: {
        click: this.toggle
      }
    }, this.label)

    return h('div', {
      'class': 'input-group input-group--selection-controls'
    }, [container, label])
  },

  mixins: [Contextualable],

  data () {
    return {
      focused: false,
      inputValue: typeof this.value !== undefined ? this.value : false,
      inputDeterminate: this.indeterminate
    }
  },

  props: {
    disabled: Boolean,
    filled: Boolean,
    gap: Boolean,
    id: {
      type: String,
      default: ''
    },
    indeterminate: Boolean,
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      required: false
    },
    valueV: {
      required: false
    }
  },

  watch: {
    inputValue () {
      if (this.indeterminate) {
        this.inputDeterminate = false
      }

      const input = this.inputValue
      if (Array.isArray(this.inputValue)) {
        const i = this.inputValue.indexOf(this.valueV)

        if (i === -1) {
          input.push(this.valueV)
        } else {
          input.splice(i, 1)
        }
      }

      this.$emit('input', input)
    },

    value () {
      this.inputValue = this.value
    }
  },

  computed: {
    classes () {
      return {
        'input-group--selection-controls__container': true,
        'primary--text': this.primary,
        'secondary--text': this.secondary,
        'error--text': this.error,
        'success--text': this.success,
        'info--text': this.info,
        'warning--text': this.warning
      }
    },

    icon () {
      if (this.inputDeterminate) {
        return 'indeterminate_check_box'
      } else if (this.inputValue) {
        return 'check_box'
      } else {
        return 'check_box_outline_blank'
      }
    }
  },

  methods: {
    toggle () {
      this.inputValue = !this.inputValue
    }
  }
}
