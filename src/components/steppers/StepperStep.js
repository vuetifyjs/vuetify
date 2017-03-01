import { closestParentTag } from '../../util/helpers'

export default {
  name: 'stepper-step',

  data () {
    return {
      isActive: false
    }
  },

  props: {
    completeIcon: {
      type: String,
      default: 'success'
    },
    editable: Boolean,
    step: [Number, String]
  },

  computed: {
    classes () {
      return {
        'stepper__step': true,
        'stepper__step--active': this.isActive,
        'stepper__step--editable': this.editable
      }
    },
    stepper () {
      return closestParentTag.call(this, 'v-stepper')
    }
  },

  methods: {
    click () {
      if (this.editable) {
        this.stepper.stepClick(this.step)
      }
    },
    toggle (step) {
      this.isActive = step.toString() === this.step.toString()
    }
  },

  render (h) {
    const data = {
      'class': this.classes,
      directives: [{
        name: 'ripple',
        value: this.editable
      }],
      on: {
        click: this.click
      }
    }

    const step = h('span', { 'class': 'stepper__step__step' }, this.step)
    const label = h('div', { 'class': 'stepper__label' }, [this.$slots.default])

    return h('div', data, [step, label])
  }
}
