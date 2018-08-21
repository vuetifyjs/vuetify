import '../../stylus/components/_jumbotrons.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'

// Utils
import { deprecate } from '../../util/console'

/* @vue/component */
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
      return this.themeClasses
    },
    styles () {
      return {
        height: this.height
      }
    }
  },

  mounted () {
    deprecate('v-jumbotron', this.src ? 'v-img' : 'v-responsive', this)
  },

  methods: {
    genBackground () {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'v-jumbotron__background',
        style: this.backgroundStyles
      }))
    },
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-jumbotron__content'
      }, this.$slots.default)
    },
    genImage () {
      if (!this.src) return null
      if (this.$slots.img) return this.$slots.img({ src: this.src })

      return this.$createElement('img', {
        staticClass: 'v-jumbotron__image',
        attrs: { src: this.src }
      })
    },
    genWrapper () {
      return this.$createElement('div', {
        staticClass: 'v-jumbotron__wrapper'
      }, [
        this.genImage(),
        this.genBackground(),
        this.genContent()
      ])
    }
  },

  render (h) {
    const { tag, data } = this.generateRouteLink(this.classes)
    data.staticClass = 'v-jumbotron'
    data.style = this.styles

    return h(tag, data, [this.genWrapper()])
  }
}
