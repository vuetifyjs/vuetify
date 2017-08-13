import Colorable from '~mixins/colorable'
import TabFocusable from '~mixins/tab-focusable'

export default {
  name: 'v-radio',

  inheritAttrs: false,

  inject: ['isMandatory'],

  mixins: [Colorable, TabFocusable],

  props: {
    disabled: Boolean,
    value: [String, Number],
    label: String
  },

  data () {
    return {
      isActive: false
    }
  },

  computed: {
    classes () {
      return this.addColorClassChecks({
        'input-group': true,
        'input-group--active': this.isActive,
        'input-group--selection-controls': true,
        'input-group--tab-focused': this.tabFocused,
        'radio': true
      })
    },

    icon () {
      return this.isActive ? 'radio_button_checked' : 'radio_button_unchecked'
    }
  },

  methods: {
    genInput (radio) {
      const input = this.$createElement('input', {
        ref: 'input',
        style: {
          display: 'none'
        },
        attrs: Object.assign({
          name: 'test', // from parent?
          id: this.id,
          type: 'radio',
          value: this.value
        }, this.$attrs)
      }, [this.value])

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
        on: {
          keydown: e => {
            if ([13, 32].includes(e.keyCode)) {
              e.preventDefault()
              this.click()
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
          click: this.click
        }
      }, this.label)
    },
    click () {
      const mandatory = this.isMandatory &&
        this.isMandatory() || false

      if (!this.disabled && (!this.isActive || !mandatory)) {
        this.$refs.input.checked = !this.$refs.input.checked
        this.isActive = !this.isActive
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
      on: Object.assign({}, {
        click: this.click
      }, this.$listeners),
      directives: [
        {
          name: 'ripple',
          value: { center: true }
        }
      ]
    })

    return this.genWrapper([transition, ripple])
  }
}
