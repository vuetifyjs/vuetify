const injectWarning = () => {
  return () => console.warn('The v-carousel-item component is not meant to be used outside of a v-carousel.')
}

export default {
  name: 'v-carousel-item',

  inject: {
    register: {
      default: injectWarning
    },
    unregister: {
      default: injectWarning
    }
  },

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

  mounted () {
    this.register(this._uid, this.open)
  },

  beforeDestroy () {
    this.unregister(this._uid, this.open)
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
