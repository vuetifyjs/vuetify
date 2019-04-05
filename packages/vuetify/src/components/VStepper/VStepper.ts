// Styles
import '../../stylus/components/_steppers.styl'

// Components
import VStepperStep from './VStepperStep'
import VStepperContent from './VStepperContent'

// Mixins
import { provide as RegistrableProvide } from '../../mixins/registrable'
import Themeable from '../../mixins/themeable'

// Util
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

type VStepperStepInstance = InstanceType<typeof VStepperStep>
type VStepperContentInstance = InstanceType<typeof VStepperContent>

export default mixins(
  RegistrableProvide('stepper'),
  Themeable
/* @vue/component */
).extend({
  name: 'v-stepper',

  provide (): object {
    return {
      stepClick: this.stepClick,
      isVertical: this.vertical
    }
  },

  props: {
    nonLinear: Boolean,
    altLabels: Boolean,
    vertical: Boolean,
    value: [Number, String]
  },

  data () {
    return {
      inputValue: null as any,
      isBooted: false,
      steps: [] as VStepperStepInstance[],
      content: [] as VStepperContentInstance[],
      isReverse: false
    }
  },

  computed: {
    classes (): object {
      return {
        'v-stepper': true,
        'v-stepper--is-booted': this.isBooted,
        'v-stepper--vertical': this.vertical,
        'v-stepper--alt-labels': this.altLabels,
        'v-stepper--non-linear': this.nonLinear,
        ...this.themeClasses
      }
    }
  },

  watch: {
    inputValue (val, prev) {
      this.isReverse = Number(val) < Number(prev)
      for (let index = this.steps.length; --index >= 0;) {
        this.steps[index].toggle(this.inputValue)
      }
      for (let index = this.content.length; --index >= 0;) {
        this.content[index].toggle(this.inputValue, this.isReverse)
      }

      this.$emit('input', this.inputValue)
      prev && (this.isBooted = true)
    },
    value () {
      this.$nextTick(() => (this.inputValue = this.value))
    }
  },

  mounted () {
    this.inputValue = this.value || this.steps[0].step || 1
  },

  methods: {
    register (item: VStepperStepInstance | VStepperContentInstance) {
      if (item.$options.name === 'v-stepper-step') {
        this.steps.push(item as VStepperStepInstance)
      } else if (item.$options.name === 'v-stepper-content') {
        (item as VStepperContentInstance).isVertical = this.vertical
        this.content.push(item as VStepperContentInstance)
      }
    },
    unregister (item: VStepperStepInstance | VStepperContentInstance) {
      if (item.$options.name === 'v-stepper-step') {
        this.steps = this.steps.filter((i: VStepperStepInstance) => i !== item)
      } else if (item.$options.name === 'v-stepper-content') {
        (item as VStepperContentInstance).isVertical = this.vertical
        this.content = this.content.filter((i: VStepperContentInstance) => i !== item)
      }
    },
    stepClick (step: string | number) {
      this.$nextTick(() => (this.inputValue = step))
    }
  },

  render (h): VNode {
    return h('div', {
      'class': this.classes
    }, this.$slots.default)
  }
})
