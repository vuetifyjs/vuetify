import {
  VTabTransition,
  VTabReverseTransition
} from '../transitions'

export default {
  name: 'v-stepper-content',

  components: {
    VTabTransition,
    VTabReverseTransition
  },

  data () {
    return {
      height: 0,
      isActive: false,
      isReverse: false,
      isVertical: false
    }
  },

  props: {
    step: {
      type: [Number, String],
      required: true
    }
  },

  computed: {
    classes () {
      return {
        'stepper__content': true
      }
    },
    computedTransition () {
      return this.isReverse
        ? 'v-tab-reverse-transition'
        : 'v-tab-transition'
    },
    styles () {
      if (!this.isVertical) return {}

      return {
        height: !isNaN(this.height) ? `${this.height}px` : this.height
      }
    },
    wrapperClasses () {
      return {
        'stepper__wrapper': true
      }
    }
  },

  watch: {
    isActive () {
      if (!this.isVertical) {
        return
      }

      if (this.isActive) {
        this.enter()
      } else {
        this.leave()
      }
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
    onTransition () {
      if (!this.isActive) return

      this.height = 'auto'
    },
    enter () {
      let scrollHeight = 0

      // Render bug with height
      setTimeout(() => {
        scrollHeight = this.$refs.wrapper.scrollHeight
      }, 0)

      this.height = 0

      // Give the collapsing element time to collapse
      setTimeout(() => (this.height = (scrollHeight || 'auto')), 450)
    },
    leave () {
      this.height = this.$refs.wrapper.clientHeight
      setTimeout(() => (this.height = 0), 0)
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
