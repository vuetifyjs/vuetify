// Components
import VJumbotron from '../VJumbotron'

// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable'

export default {
  name: 'v-carousel-item',

  mixins: [RegistrableInject('carousel', 'v-carousel-item', 'v-carousel')],

  inheritAttrs: false,

  data () {
    return {
      active: false,
      reverse: false
    }
  },

  props: {
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
    }
  },

  methods: {
    open (id, reverse) {
      this.active = this._uid === id
      this.reverse = reverse
    }
  },

  mounted () {
    this.carousel.register(this._uid, this.open)
  },

  beforeDestroy () {
    this.carousel.unregister(this._uid, this.open)
  },

  render (h) {
    const item = h(VJumbotron, {
      props: {
        ...this.$attrs,
        height: '100%'
      },
      on: this.$listeners,
      directives: [{
        name: 'show',
        value: this.active
      }]
    }, this.$slots.default)

    return h('transition', { props: { name: this.computedTransition } }, [item])
  }
}
