import {
  VTabTransition,
  VTabReverseTransition
} from '../transitions'

// Helpers
import { convertToUnit } from '../../util/helpers'

/* @vue/component */
export default {
  name: 'v-stepper-content',

  props: {
    step: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      height: 0,
      // Must be null to allow
      // previous comparison
      isActive: null,
      isReverse: false,
      isVertical: false
    }
  },

  computed: {
    classes () {
      return {
        'v-stepper__content': true
      }
    },
    computedTransition () {
      return this.isReverse
        ? VTabReverseTransition
        : VTabTransition
    },
    styles () {
      if (!this.isVertical) return {}

      return {
        height: convertToUnit(this.height)
      }
    },
    wrapperClasses () {
      return {
        'v-stepper__wrapper': true
      }
    }
  },

  watch: {
    isActive (current, previous) {
      // If active and the previous state
      // was null, is just booting up
      if (current && previous == null) {
        return (this.height = 'auto')
      }

      if (!this.isVertical) return

      if (this.isActive) this.enter()
      else this.leave()
    }
  },

  mounted () {
    this.$refs.wrapper.addEventListener(
      'transitionend',
      this.onTransition,
      false
    )
  },

  beforeDestroy () {
    this.$refs.wrapper.removeEventListener(
      'transitionend',
      this.onTransition,
      false
    )
  },

  methods: {
    onTransition (e) {
      if (!this.isActive ||
        e.propertyName !== 'height'
      ) return

      this.height = 'auto'
    },
    enter () {
      let scrollHeight = 0

      // Render bug with height
      requestAnimationFrame(() => {
        scrollHeight = this.$refs.wrapper.scrollHeight
      })

      this.height = 0

      // Give the collapsing element time to collapse
      setTimeout(() => (this.height = (scrollHeight || 'auto')), 450)
    },
    leave () {
      this.height = this.$refs.wrapper.clientHeight
      setTimeout(() => (this.height = 0), 10)
    },
    toggle (step, reverse) {
      this.isActive = step.toString() === this.step.toString()
      this.isReverse = reverse
    }
  },

  render (h) {
    const contentData = {
      'class': this.classes
    }
    const wrapperData = {
      'class': this.wrapperClasses,
      style: this.styles,
      ref: 'wrapper'
    }

    if (!this.isVertical) {
      contentData.directives = [{
        name: 'show',
        value: this.isActive
      }]
    }

    const wrapper = h('div', wrapperData, [this.$slots.default])
    const content = h('div', contentData, [wrapper])

    return h(this.computedTransition, {
      on: this.$listeners
    }, [content])
  }
}
