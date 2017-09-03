import Resize from '../directives/resize'
import Scroll from '../directives/scroll'

export default {
  directives: {
    Resize,
    Scroll
  },

  data () {
    return {
      normalizedHeight: null,
      parallax: null,
      parallaxDist: null,
      percentScrolled: null,
      scrollTop: null,
      windowHeight: null,
      windowBottom: null
    }
  },

  computed: {
    imgHeight () {
      return this.objHeight()
    }
  },

  watch: {
    height () {
      this.$nextTick(this.translate)
    }
  },

  methods: {
    directives () {
      return [
        {
          name: 'scroll',
          value: this.translate
        },
        {
          name: 'resize',
          value: this.translate
        }
      ]
    },

    translate () {
      this.calcDimensions()

      this.percentScrolled = (
        (this.windowBottom - this.elOffsetTop) /
        (this.normalizedHeight + this.windowHeight)
      )

      this.parallax = Math.round(this.parallaxDist * this.percentScrolled)

      if (this.translated) {
        this.translated()
      }
    },

    calcDimensions () {
      const offset = this.$el.getBoundingClientRect()

      this.normalizedHeight = offset.height
      this.scrollTop = window.pageYOffset
      this.parallaxDist = this.imgHeight - this.normalizedHeight
      this.elOffsetTop = offset.top + this.scrollTop
      this.windowHeight = window.innerHeight
      this.windowBottom = this.scrollTop + this.windowHeight
    }
  }
}
