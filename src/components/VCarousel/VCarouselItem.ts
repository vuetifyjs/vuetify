// Components
import { VImg } from '../VImg'

// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable'

// Utilities
import mixins from '../../util/mixins'

// Types
import { VNode, VNodeDirective } from 'vue'

export default mixins(
  RegistrableInject('carousel', 'v-carousel-item', 'v-carousel')
  /* @vue/component */
).extend({
  name: 'v-carousel-item',

  inheritAttrs: false,

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

  data () {
    return {
      active: false,
      reverse: false
    }
  },

  computed: {
    computedTransition (): string {
      return (this.reverse === !this.$vuetify.rtl)
        ? this.reverseTransition
        : this.transition
    }
  },

  mounted () {
    this.carousel.register(this._uid, this.open)
  },

  beforeDestroy () {
    this.carousel.unregister(this._uid)
  },

  methods: {
    open (id: number, reverse: boolean) {
      this.active = this._uid === id
      this.reverse = reverse
    }
  },

  render (h): VNode {
    const item = h(VImg, {
      staticClass: 'v-carousel__item',
      props: {
        ...this.$attrs,
        height: '100%'
      },
      on: this.$listeners,
      directives: [{
        name: 'show',
        value: this.active
      }] as VNodeDirective[]
    }, this.$slots.default)

    return h('transition', { props: { name: this.computedTransition } }, [item])
  }
})
