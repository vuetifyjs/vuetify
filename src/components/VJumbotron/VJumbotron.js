require('../../stylus/components/_jumbotrons.styl')

// Mixins
import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-jumbotron',

  mixins: [
    Colorable,
    Routable,
    Themeable
  ],

  props: {
    gradient: String,
    height: {
      type: [Number, String],
      default: '400px'
    },
    src: String,
    tag: {
      type: String,
      default: 'div'
    }
  },

  computed: {
    backgroundStyles () {
      const styles = {}

      if (this.gradient) {
        styles.background = `linear-gradient(${this.gradient})`
      }

      return styles
    },
    classes () {
      return {
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    },
    styles () {
      return {
        height: this.height
      }
    }
  },

  methods: {
    genBackground () {
      return this.$createElement('div', {
        staticClass: 'jumbotron__background',
        'class': this.addBackgroundColorClassChecks(),
        style: this.backgroundStyles
      })
    },
    genContent () {
      return this.$createElement('div', {
        staticClass: 'jumbotron__content'
      }, this.$slots.default)
    },
    genImage () {
      if (!this.src) return null
      if (this.$slots.img) return this.$slots.img({ src: this.src })

      return this.$createElement('img', {
        staticClass: 'jumbotron__image',
        attrs: { src: this.src }
      })
    },
    genWrapper () {
      return this.$createElement('div', {
        staticClass: 'jumbotron__wrapper'
      }, [
        this.genImage(),
        this.genBackground(),
        this.genContent()
      ])
    }
  },

  render (h) {
    const { tag, data } = this.generateRouteLink()
    data.staticClass = 'jumbotron'
    data.style = this.styles

    return h(tag, data, [this.genWrapper()])
  }
}
