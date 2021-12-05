// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import { inject as RegistrableInject } from '../../mixins/registrable'

// Directives
import ripple from '../../directives/ripple'

// Utilities
import mixins from '../../util/mixins'
import { keyCodes } from '../../util/helpers'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

type VuetifyStepperRuleValidator = () => string | boolean

const baseMixins = mixins(
  Colorable,
  RegistrableInject('stepper', 'v-stepper-step', 'v-stepper')
)

interface options extends InstanceType<typeof baseMixins> {
  stepClick: (step: number | string) => void
}
/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-stepper-step',

  directives: { ripple },

  inject: ['stepClick'],

  props: {
    color: {
      type: String,
      default: 'primary',
    },
    complete: Boolean,
    completeIcon: {
      type: String,
      default: '$complete',
    },
    editable: Boolean,
    editIcon: {
      type: String,
      default: '$edit',
    },
    errorIcon: {
      type: String,
      default: '$error',
    },
    rules: {
      type: Array,
      default: () => [],
    } as PropValidator<VuetifyStepperRuleValidator[]>,
    step: [Number, String],
  },

  data () {
    return {
      isActive: false,
      isInactive: true,
    }
  },

  computed: {
    classes (): object {
      return {
        'v-stepper__step--active': this.isActive,
        'v-stepper__step--editable': this.editable,
        'v-stepper__step--inactive': this.isInactive,
        'v-stepper__step--error error--text': this.hasError,
        'v-stepper__step--complete': this.complete,
      }
    },
    hasError (): boolean {
      return this.rules.some(validate => validate() !== true)
    },
  },

  mounted () {
    this.stepper && this.stepper.register(this)
  },

  beforeDestroy () {
    this.stepper && this.stepper.unregister(this)
  },

  methods: {
    click (e: MouseEvent | KeyboardEvent) {
      e.stopPropagation()

      this.$emit('click', e)

      if (this.editable) {
        this.stepClick(this.step)
      }
    },
    genIcon (icon: string) {
      return this.$createElement(VIcon, icon)
    },
    genLabel () {
      return this.$createElement('div', {
        staticClass: 'v-stepper__label',
      }, this.$slots.default)
    },
    genStep () {
      const color = (!this.hasError && (this.complete || this.isActive)) ? this.color : false

      return this.$createElement('span', this.setBackgroundColor(color, {
        staticClass: 'v-stepper__step__step',
      }), this.genStepContent())
    },
    genStepContent () {
      const children = []

      if (this.hasError) {
        children.push(this.genIcon(this.errorIcon))
      } else if (this.complete) {
        if (this.editable) {
          children.push(this.genIcon(this.editIcon))
        } else {
          children.push(this.genIcon(this.completeIcon))
        }
      } else {
        children.push(String(this.step))
      }

      return children
    },
    keyboardClick (e: KeyboardEvent) {
      if (e.keyCode === keyCodes.space) {
        this.click(e)
      }
    },
    toggle (step: number | string) {
      this.isActive = step.toString() === this.step.toString()
      this.isInactive = Number(step) < Number(this.step)
    },
  },

  render (h): VNode {
    return h('div', {
      attrs: {
        tabindex: this.editable ? 0 : -1,
      },
      staticClass: 'v-stepper__step',
      class: this.classes,
      directives: [{
        name: 'ripple',
        value: this.editable,
      }],
      on: {
        click: this.click,
        keydown: this.keyboardClick,
      },
    }, [
      this.genStep(),
      this.genLabel(),
    ])
  },
})
