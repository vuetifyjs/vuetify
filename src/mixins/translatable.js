export default {
  name: 'translatable',

  data () {
    return {
      parallax: null,
      parallaxDist: null,
      percentScrolled: null,
      scrollTop: null,
      windowHeight: null,
      windowBottom: null,
      lastScroll: 0
    }
  },

  computed: {
    imgHeight () {
      return this.objHeight()
    }
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.translate, false)
    window.removeEventListener('resize', this.translate, false)
  },

  methods: {
    listeners () {
      window.addEventListener('scroll', this.translate, false)
      window.addEventListener('resize', this.translate, false)

      let isFirefox = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      let isEdge = window.navigator.userAgent.toLowerCase().indexOf('edge') > -1

      if (isFirefox || isEdge) requestAnimationFrame(this.checkScrolling)
    },

    checkScrolling () {
      if (this.lastScroll !== window.pageYOffset) {
        this.lastScroll = window.pageYOffset
        this.translate()
      }

      requestAnimationFrame(this.checkScrolling)
    },

    translate () {
      this.calcDimensions()

      this.percentScrolled = (
        (this.windowBottom - this.elOffsetTop) /
        (parseInt(this.height) + this.windowHeight)
      )

      this.parallax = Math.round(this.parallaxDist * this.percentScrolled)

      if (this.translated) {
        this.translated()
      }
    },

    calcDimensions () {
      const offset = this.$el.getBoundingClientRect()

      this.scrollTop = window.pageYOffset
      this.parallaxDist = this.imgHeight - this.height
      this.elOffsetTop = offset.top + this.scrollTop
      this.windowHeight = window.innerHeight
      this.windowBottom = this.scrollTop + this.windowHeight
    }
  }
}
