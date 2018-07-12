// Style
import '../../stylus/components/_parallax.styl'

// Mixins
import Translatable from '../../mixins/translatable'

// Types
import { VNode } from 'vue/types/vnode'
import mixins from '../../util/mixins'

export default mixins(Translatable).extend({
  name: 'v-parallax',

  props: {
    alt: String,
    height: {
      type: [String, Number],
      default: 500
    },
    src: String
  },

  data: () => ({
    isBooted: false
  }),

  watch: {
    parallax () {
      this.isBooted = true
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      const img = this.$refs.img as HTMLImageElement

      if (!img) return

      if (img.complete) {
        this.translate()
        this.listeners()
      } else {
        img.addEventListener('load', () => {
          this.translate()
          this.listeners()
        }, false)
      }
    },
    objHeight () {
      return (this.$refs.img as HTMLImageElement).naturalHeight
    }
  },

  render (h): VNode {
    const imgData = {
      staticClass: 'v-parallax__image',
      style: {
        display: 'block',
        opacity: this.isBooted ? 1 : 0,
        transform: `translate(-50%, ${this.parallax}px)`
      },
      attrs: {
        alt: null as null | string,
        src: this.src
      },
      ref: 'img'
    }

    if (this.alt) imgData.attrs.alt = this.alt

    const container = h('div', {
      staticClass: 'v-parallax__image-container'
    }, [
      h('img', imgData)
    ])

    const content = h('div', {
      staticClass: 'v-parallax__content'
    }, this.$slots.default)

    return h('div', {
      staticClass: 'v-parallax',
      style: {
        height: `${this.height}px`
      },
      on: this.$listeners
    }, [container, content])
  }
})
