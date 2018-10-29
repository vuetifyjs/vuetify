// Styles
import '../../stylus/components/_steppers.styl'

// Mixins
import { provide as RegistrableProvide } from '../../mixins/registrable'
import Themeable from '../../mixins/themeable'

/* @vue/component */
export default {
  name: 'v-stepper',

  mixins: [
    RegistrableProvide('stepper'),
    Themeable
  ],

  provide () {
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
      inputValue: null,
      isBooted: false,
      steps: [],
      content: [],
      isReverse: false
    }
  },

  computed: {
    classes () {
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
    register (item) {
      if (item.$options.name === 'v-stepper-step') {
        this.steps.push(item)
      } else if (item.$options.name === 'v-stepper-content') {
        item.isVertical = this.vertical
        this.content.push(item)
      }
    },
    unregister (item) {
      if (item.$options.name === 'v-stepper-step') {
        this.steps = this.steps.filter(i => i !== item)
      } else if (item.$options.name === 'v-stepper-content') {
        item.isVertical = this.vertical
        this.content = this.content.filter(i => i !== item)
      }
    },
    stepClick (step) {
      this.$nextTick(() => (this.inputValue = step))
    }
  },

  render (h) {
    return h('div', {
      'class': this.classes
    }, this.$slots.default)
  }
}
