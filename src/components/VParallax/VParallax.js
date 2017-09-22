require('../../stylus/components/_parallax.styl')

import Translatable from '../../mixins/translatable'

export default {
  name: 'v-parallax',

  mixins: [Translatable],

  data () {
    return {
      isBooted: false
    }
  },

  props: {
    alt: String,
    height: {
      type: [String, Number],
      default: 500
    },
    jumbotron: Boolean,
    src: String
  },

  computed: {
    styles () {
      return {
        display: 'block',
        opacity: this.isBooted ? 1 : 0,
        transform: `translate3d(-50%, ${this.jumbotron ? 0 : this.parallax + 'px'}, 0)`
      }
    }
  },

  watch: {
    parallax () {
      this.isBooted = true
    }
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
      staticClass: 'parallax__image',
      'class': {
        'parallax__image--jumbotron': this.jumbotron
      },
      style: this.styles,
      attrs: {
        src: this.src
      },
      ref: 'img'
    }

    if (this.alt) imgData.attrs.alt = this.alt

    const container = h('div', {
      staticClass: 'parallax__image-container'
    }, [
      h('img', imgData)
    ])

    const content = h('div', {
      staticClass: 'parallax__content'
    }, this.$slots.default)

    return h('div', {
      staticClass: 'parallax',
      style: {
        height: this.jumbotron
          ? this.normalizedHeight
          : `${this.normalizedHeight}px`
      },
      on: this.$listeners
    }, [container, content])
  }
}
