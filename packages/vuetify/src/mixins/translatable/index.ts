import Vue from 'vue'

export default Vue.extend({
  name: 'translatable',

  props: {
    height: Number,
  },

  data: () => ({
    elOffsetTop: 0,
    parallax: 0,
    parallaxDist: 0,
    percentScrolled: 0,
    scrollTop: 0,
    windowHeight: 0,
    windowBottom: 0,
  }),

  computed: {
    imgHeight (): number {
      return this.objHeight()
    },
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.translate, false)
    window.removeEventListener('resize', this.translate, false)
  },

  methods: {
    calcDimensions () {
      const offset = this.$el.getBoundingClientRect()

      this.scrollTop = window.pageYOffset
      this.parallaxDist = this.imgHeight - this.height
      this.elOffsetTop = offset.top + this.scrollTop
      this.windowHeight = window.innerHeight
      this.windowBottom = this.scrollTop + this.windowHeight
    },
    listeners () {
      window.addEventListener('scroll', this.translate, false)
      window.addEventListener('resize', this.translate, false)
    },
    /** @abstract **/
    objHeight (): number {
      throw new Error('Not implemented !')
    },
    translate () {
      this.calcDimensions()

      this.percentScrolled = (
        (this.windowBottom - this.elOffsetTop) /
        (parseInt(this.height) + this.windowHeight)
      )

      this.parallax = Math.round(this.parallaxDist * this.percentScrolled)
    },
  },
})
