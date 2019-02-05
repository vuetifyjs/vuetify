// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import { inject as RegistrableInject, Registrable } from '../../mixins/registrable'

// Directives
import Ripple from '../../directives/ripple'

// Util
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

type VuetifyStepperRuleValidator = () => string | false

interface options extends Vue {
  stepClick: (step: number | string) => void
}

export default mixins<options &
/* eslint-disable indent */
  ExtractVue<[
    typeof Colorable,
    Registrable<'stepper'>
  ]>
/* eslint-enable indent */
>(
  Colorable,
  RegistrableInject('stepper', 'v-stepper-step', 'v-stepper')
/* @vue/component */
).extend({
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
    } as PropValidator<VuetifyStepperRuleValidator[]>,
    step: [Number, String]
  },

  data () {
    return {
      isActive: false,
      isInactive: true
    }
  },

  computed: {
    classes (): object {
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
    hasError (): boolean {
      return this.rules.some(validate => validate() !== true)
    }
  },

  mounted () {
    this.stepper && this.stepper.register(this)
  },

  beforeDestroy () {
    this.stepper && this.stepper.unregister(this)
  },

  methods: {
    click (e: MouseEvent) {
      e.stopPropagation()

      this.$emit('click', e)

      if (this.editable) {
        this.stepClick(this.step)
      }
    },
    toggle (step: number | string) {
      this.isActive = step.toString() === this.step.toString()
      this.isInactive = Number(step) < Number(this.step)
    }
  },

  render (h): VNode {
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
      stepContent = String(this.step)
    }

    const color = (!this.hasError && (this.complete || this.isActive)) ? this.color : false
    const step = h('span', this.setBackgroundColor(color, {
      staticClass: 'v-stepper__step__step'
    }), stepContent)

    const label = h('div', {
      staticClass: 'v-stepper__label'
    }, this.$slots.default)

    return h('div', data, [step, label])
  }
})
