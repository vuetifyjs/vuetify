import '../../stylus/components/_parallax.styl'

import Translatable from '../../mixins/translatable'

/* @vue/component */
export default {
  name: 'v-parallax',

  mixins: [Translatable],

  props: {
    alt: String,
    height: {
      type: [String, Number],
      default: 500
    },
    src: String
  },

  data () {
    return {
      isBooted: false
    }
  },

  computed: {
    styles () {
      return {
        display: 'block',
        opacity: this.isBooted ? 1 : 0,
        transform: `translate(-50%, ${this.parallax}px)`
      }
    }
  },

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
      if (!this.$refs.img) return

      if (this.$refs.img.complete) {
        this.translate()
        this.listeners()
      } else {
        this.$refs.img.addEventListener('load', () => {
          this.translate()
          this.listeners()
        }, false)
      }
    },
    objHeight () {
      return this.$refs.img.naturalHeight
    },
    elOffsetTop () {
      return this.$el.offsetTop
    }
  },

  render (h) {
    const imgData = {
      staticClass: 'v-parallax__image',
      style: this.styles,
      attrs: {
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
}
