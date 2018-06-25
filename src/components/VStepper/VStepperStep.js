// Components
import VIcon from '../VIcon'

// Directives
import Ripple from '../../directives/ripple'

/* @vue/component */
export default {
  name: 'v-stepper-step',

  directives: { Ripple },

  inject: ['stepClick'],

  props: {
    color: {
      type: String,
      default: 'primary'
    },
    complete: Boolean,
    completeIcon: {
      type: String,
      default: '$vuetify.icons.complete'
    },
    editIcon: {
      type: String,
      default: '$vuetify.icons.edit'
    },
    errorIcon: {
      type: String,
      default: '$vuetify.icons.error'
    },
    editable: Boolean,
    rules: {
      type: Array,
      default: () => []
    },
    step: [Number, String]
  },

  data () {
    return {
      isActive: false,
      isInactive: true
    }
  },

  computed: {
    classes () {
      return {
        'v-stepper__step': true,
        'v-stepper__step--active': this.isActive,
        'v-stepper__step--editable': this.editable,
        'v-stepper__step--inactive': this.isInactive,
        'v-stepper__step--error': this.hasError,
        'v-stepper__step--complete': this.complete,
        'error--text': this.hasError
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
      stepContent = [h(VIcon, {}, this.errorIcon)]
    } else if (this.complete) {
      if (this.editable) {
        stepContent = [h(VIcon, {}, this.editIcon)]
      } else {
        stepContent = [h(VIcon, {}, this.completeIcon)]
      }
    } else {
      stepContent = this.step
    }

    const step = h('span', {
      staticClass: 'v-stepper__step__step',
      'class': {
        [this.color]: !this.hasError && (this.complete || this.isActive)
      }
    }, stepContent)

    const label = h('div', {
      staticClass: 'v-stepper__label'
    }, this.$slots.default)

    return h('div', data, [step, label])
  }
}
