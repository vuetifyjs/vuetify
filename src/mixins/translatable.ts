import Vue from 'vue'

export default Vue.extend({
  name: 'translatable',

  props: {
    height: Number
  },

  data: () => ({
    parallax: 0,
    parallaxDist: 0,
    percentScrolled: 0,
    windowHeight: 0,
    windowBottom: 0
  }),

  computed: {
    imgHeight (): number {
      return this.objHeight()
    }
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.translate, false)
    window.removeEventListener('resize', this.translate, false)
  },

  methods: {
    calcDimensions () {
      this.parallaxDist = this.imgHeight - this.height
      this.windowHeight = window.innerHeight
      this.windowBottom = window.pageYOffset + this.windowHeight
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
        (this.windowBottom - this.$el.offsetTop) /
        (parseInt(this.height) + this.windowHeight)
      )

      this.parallax = Math.round(this.parallaxDist * this.percentScrolled)
    }
  }
})
