export default {
  name: 'tabs-content',

  data () {
    return {
      isActive: false,
      reverse: false
    }
  },

  props: {
    id: {
      type: String,
      required: true
    },
    transition: {
      type: String,
      default: 'v-tab-transition'
    },
    reverseTransition: {
      type: String,
      default: 'v-tab-reverse-transition'
    }
  },

  computed: {
    computedTransition () {
      return this.reverse ? this.reverseTransition : this.transition
    }
  },

  methods: {
    toggle (target, reverse, showTransition) {
      this.$el.style.transition = !showTransition ? 'none' : null
      this.reverse = reverse
      this.isActive = this.id === target
    }
  },

  render (h) {
    return h(this.computedTransition, {}, [
      h('div', {
        'class': 'tabs__content',
        domProps: { id: this.id },
        directives: [{
          name: 'show',
          value: this.isActive
        }],
        on: this.$listeners
      }, [this.$slots.default])])
  }
}
