export default {
  name: 'v-carousel-item',

  data () {
    return {
      active: false,
      reverse: false
    }
  },

  props: {
    src: {
      type: String,
      required: true
    },

    transition: {
      type: String,
      default: 'tab-transition'
    },

    reverseTransition: {
      type: String,
      default: 'tab-reverse-transition'
    }
  },

  computed: {
    computedTransition () {
      return this.reverse ? this.reverseTransition : this.transition
    },

    styles () {
      return {
        backgroundImage: `url(${this.src})`
      }
    }
  },

  methods: {
    open (id, reverse) {
      this.active = this._uid === id
      this.reverse = reverse
    }
  },

  render (h) {
    const item = h('div', {
      class: {
        'carousel__item': true,
        'reverse': this.reverse
      },
      style: this.styles,
      on: this.$listeners,
      directives: [
        {
          name: 'show',
          value: this.active
        }
      ]
    }, [this.$slots.default])

    return h('transition', { props: { name: this.computedTransition } }, [item])
  }
}
