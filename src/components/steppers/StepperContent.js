export default {
  name: 'stepper-content',

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
      return this.isVertical
        ? { 'height': `${this.height}px` }
        : {}
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

  methods: {
    enter () {
      let scrollHeight = 0

      // Render bug with height
      setTimeout(() => {
        scrollHeight = this.$refs.wrapper.scrollHeight
      }, 0)

      this.height = 0

      setTimeout(() => (this.height = scrollHeight), 450)
    },
    leave () {
      this.height = 0
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

    return h(this.computedTransition, {}, [content])
  }
}
