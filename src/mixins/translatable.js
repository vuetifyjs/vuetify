export default {
  data () {
    return {
      parallax: null,
      parallaxDist: null,
      percentScrolled: null,
      scrollTop: null,
      windowHeight: null,
      windowBottom: null
    }
  },

  computed: {
    normalizedHeight () {
      if (this.jumbotron) {
        return isNaN(this.height) ? this.height : `${this.height}px`
      }

      return Number(this.height.toString().replace(/(^[0-9]*$)/, '$1'))
    },

    imgHeight () {
      return this.objHeight()
    }
  },

  mounted () {
    this.$vuetify.load(this.init)
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.translate, false)
    window.removeEventListener('resize', this.translate, false)
  },

  methods: {
    listeners () {
      window.addEventListener('scroll', this.translate, false)
      window.addEventListener('resize', this.translate, false)
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

      this.scrollTop = window.pageYOffset
      this.parallaxDist = this.imgHeight - this.normalizedHeight
      this.elOffsetTop = offset.top + this.scrollTop
      this.windowHeight = window.innerHeight
      this.windowBottom = this.scrollTop + this.windowHeight
    }
  }
}
