import VIcon from '../VIcon'
import Ripple from '../../directives/ripple'

export default {
  name: 'v-stepper-step',

  components: { VIcon },

  directives: { Ripple },

  inject: ['stepClick'],

  data () {
    return {
      isActive: false,
      isInactive: true
    }
  },

  props: {
    complete: Boolean,
    completeIcon: {
      type: String,
      default: 'check'
    },
    editIcon: {
      type: String,
      default: 'edit'
    },
    errorIcon: {
      type: String,
      default: 'warning'
    },
    editable: Boolean,
    rules: {
      type: Array,
      default: () => []
    },
    step: [Number, String]
  },

  computed: {
    classes () {
      return {
        'stepper__step': true,
        'stepper__step--active': this.isActive,
        'stepper__step--editable': this.editable,
        'stepper__step--inactive': this.isInactive,
        'stepper__step--error': this.hasError,
        'stepper__step--complete': this.complete
      }
    },
    hasError () {
      return this.rules.some(i => (i() !== true))
    }
  },

  methods: {
    click (e) {
      e.stopPropagation()

      if (this.editable) {
        this.stepClick(this.step)
      }
    },
    toggle (step) {
      this.isActive = step.toString() === this.step.toString()
      this.isInactive = Number(step) < Number(this.step)
    }
  },

  render (h) {
    const data = {
      'class': this.classes,
      directives: [{
        name: 'ripple',
        value: this.editable
      }],
      on: { click: this.click }
    }
    let stepContent

    if (this.hasError) {
      stepContent = [h('v-icon', {}, this.errorIcon)]
    } else if (this.complete) {
      if (this.editable) {
        stepContent = [h('v-icon', {}, this.editIcon)]
      } else {
        stepContent = [h('v-icon', {}, this.completeIcon)]
      }
    } else {
      stepContent = this.step
    }

    const step = h('span', { 'class': 'stepper__step__step' }, stepContent)
    const label = h('div', { 'class': 'stepper__label' }, this.$slots.default)

    return h('div', data, [step, label])
  }
}
