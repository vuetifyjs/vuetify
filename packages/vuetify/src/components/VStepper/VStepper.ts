// Styles
import './VStepper.sass'

// Extensions
import VSheet from '../VSheet'

// Components
import VStepperStep from './VStepperStep'
import VStepperContent from './VStepperContent'

// Mixins
import { provide as RegistrableProvide } from '../../mixins/registrable'
import Proxyable from '../../mixins/proxyable'

// Utilities
import mixins from '../../util/mixins'
import { breaking } from '../../util/console'

// Types
import { VNode } from 'vue'

const baseMixins = mixins(
  VSheet,
  RegistrableProvide('stepper'),
  Proxyable,
)

type VStepperStepInstance = InstanceType<typeof VStepperStep>
type VStepperContentInstance = InstanceType<typeof VStepperContent>

/* @vue/component */
export default baseMixins.extend({
  name: 'v-stepper',

  provide (): object {
    return {
      stepClick: this.stepClick,
      isVertical: this.vertical,
    }
  },

  props: {
    altLabels: Boolean,
    nonLinear: Boolean,
    flat: Boolean,
    vertical: Boolean,
  },

  data () {
    const data: Dictionary<any> = {
      isBooted: false,
      steps: [] as VStepperStepInstance[],
      content: [] as VStepperContentInstance[],
      isReverse: false,
    }

    data.internalLazyValue = this.value != null
      ? this.value
      : (data[0] || {}).step || 1

    return data
  },

  computed: {
    classes (): object {
      return {
        'v-stepper--flat': this.flat,
        'v-stepper--is-booted': this.isBooted,
        'v-stepper--vertical': this.vertical,
        'v-stepper--alt-labels': this.altLabels,
        'v-stepper--non-linear': this.nonLinear,
        ...VSheet.options.computed.classes.call(this),
      }
    },
    styles (): object {
      return {
        ...VSheet.options.computed.styles.call(this),
      }
    },
  },

  watch: {
    internalValue (val, oldVal) {
      this.isReverse = Number(val) < Number(oldVal)

      oldVal && (this.isBooted = true)

      this.updateView()
    },
  },

  created () {
    /* istanbul ignore next */
    if (this.$listeners.input) {
      breaking('@input', '@change', this)
    }
  },

  mounted () {
    this.updateView()
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
      this.$nextTick(() => (this.internalValue = step))
    },
    updateView () {
      for (let index = this.steps.length; --index >= 0;) {
        this.steps[index].toggle(this.internalValue as any)
      }
      for (let index = this.content.length; --index >= 0;) {
        this.content[index].toggle(this.internalValue as any, this.isReverse)
      }
    },
  },

  render (h): VNode {
    return h(this.tag, {
      staticClass: 'v-stepper',
      class: this.classes,
      style: this.styles,
    }, this.$slots.default)
  },
})
