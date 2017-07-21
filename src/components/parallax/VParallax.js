import Translatable from '~mixins/translatable'

export default {
  name: 'v-parallax',

  mixins: [Translatable],

  props: {
    height: {
      type: [String, Number],
      default: 500
    },
    src: {
      type: String,
      required: true
    }
  },

  computed: {
    styles () {
      return {
        display: 'block',
        transform: `translate3d(-50%, ${this.parallax}px, 0)`
      }
    }
  },

  methods: {
    init () {
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
    const container = h('div', {
      staticClass: 'parallax__image-container'
    }, [
      h('img', {
        staticClass: 'parallax__image',
        style: this.styles,
        attrs: {
          src: this.src
        },
        ref: 'img'
      })
    ])

    const content = h('div', {
      staticClass: 'parallax__content'
    }, this.$slots.default)

    return h('div', {
      staticClass: 'parallax',
      style: {
        height: `${parseInt(this.normalizedHeight)}px`
      },
      on: this.$listeners
    }, [container, content])
  }
}
