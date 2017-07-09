import Overlayable from '~mixins/overlayable'
import Themeable from '~mixins/themeable'
import touch from '~util/touch'

export default {
  name: 'navigation-drawer',

  mixins: [Overlayable, Themeable],

  data () {
    return {
      isActive: this.value,
      isBooted: false,
      isMobile: false,
      mobileBreakPoint: 1024,
      swipeArea: null
    }
  },

  props: {
    absolute: Boolean,
    clipped: Boolean,
    disableRouteWatcher: Boolean,
    enableResizeWatcher: Boolean,
    height: String,
    floating: Boolean,
    miniVariant: Boolean,
    permanent: Boolean,
    persistent: Boolean,
    right: Boolean,
    temporary: Boolean,
    value: { required: false }
  },

  computed: {
    calculatedHeight () {
      return this.height || '100%'
    },
    classes () {
      return {
        'navigation-drawer': true,
        'navigation-drawer--absolute': this.absolute,
        'navigation-drawer--is-booted': this.isBooted,
        'navigation-drawer--clipped': this.clipped,
        'navigation-drawer--close': !this.isActive,
        'navigation-drawer--floating': this.floating,
        'navigation-drawer--is-mobile': this.isMobile,
        'navigation-drawer--mini-variant': this.miniVariant,
        'navigation-drawer--open': this.isActive,
        'navigation-drawer--permanent': this.permanent,
        'navigation-drawer--persistent': this.persistent,
        'navigation-drawer--right': this.right,
        'navigation-drawer--temporary': this.temporary,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    },
    showOverlay () {
      return !this.permanent && this.isActive && (this.temporary || this.isMobile)
    }
  },

  watch: {
    $route () {
      if (!this.disableRouteWatcher) {
        this.isActive = !this.closeConditional()
      }
    },
    isActive (val) {
      this.$emit('input', val)
      this.showOverlay && val && this.genOverlay() || this.removeOverlay()
      this.$el.scrollTop = 0
    },
    permanent (val) {
      this.$emit('input', val)
    },
    value (val) {
      if (this.permanent) return
      if (val !== this.isActive) this.isActive = val
    }
  },

  mounted () {
    this.$vuetify.load(this.init)
  },

  beforeDestroy () {
    if (this.permanent) return
    window.removeEventListener('resize', this.onResize, { passive: false })
    touch.unbind(this.$el)
    this.swipeArea && touch.unbind(this.swipeArea)
  },

  methods: {
    init () {
      this.checkIfMobile()
      setTimeout(() => (this.isBooted = true), 0)

      if (this.permanent) {
        this.isActive = true
        return
      } else if (this.isMobile) this.isActive = false
      else if (!this.value && (this.persistent || this.temporary)) this.isActive = false

      window.addEventListener('resize', this.onResize, { passive: false })

      this.genSwipeArea()

      const prevent = (e) => { e.preventDefault() }

      touch.bind(this.$el, true, false)
        .start((e) => {
          document.addEventListener('touchmove', prevent, { passive: false })

          const top = this.$el.scrollTop
          const totalScroll = this.$el.scrollHeight
          const currentScroll = top + this.$el.offsetHeight

          if (top === 0) {
            this.$el.scrollTop = 1
          } else if (currentScroll === totalScroll) {
            this.$el.scrollTop = top - 1
          }

          this.$el.style.transition = 'none'
        })
        .move((e) => {
          e.stopPropagation()

          if (e.offsetX > 0 || Math.abs(e.offsetX) < 15) return

          this.$el.style['overflow-y'] = 'hidden'
          this.$el.style.transform = `translate3d(${e.offsetX}px, 0, 0)`
          this.$el.style['-webkit-transform'] = `translate3d(${e.offsetX}px, 0, 0)`
        })
        .end(({ offsetX }) => {
          document.removeEventListener('touchmove', prevent)
          this.$el.style['overflow-y'] = null
          this.$el.style.transition = null
          this.isActive = offsetX !== 0 && Math.abs(offsetX) > 15 ? offsetX > 15 : this.isActive

          if (!this.isActive) {
            this.$el.style.transform = 'translate3d(-300px, 0, 0)'
            this.$el.style['-webkit-transform'] = 'translate3d(-300px, 0, 0)'
            setTimeout(() => {
              this.$el.style.transform = null
            }, 75)
          } else {
            this.$el.style.transform = null
          }
        })
    },
    checkIfMobile () {
      this.isMobile = window.innerWidth <= parseInt(this.mobileBreakPoint)
    },
    closeConditional () {
      return !this.permanent && (this.temporary || this.isMobile)
    },
    onResize () {
      if (!this.enableResizeWatcher || this.permanent || this.temporary) return
      this.checkIfMobile()
      this.isActive = !this.isMobile
    },
    genSwipeArea () {
      const overlay = document.createElement('div')
      overlay.className = 'navigation-drawer--swipe-area'

      touch.bind(overlay, true)
        .move(({ offsetX }) => {
          this.$el.style.transform = `translate3d(${Math.min(0, offsetX - 300)}px, 0, 0)`
        })
        .end(({ offsetX }) => {
          this.isActive = offsetX > 0
          this.$el.style.transform = null
        })

      this.$el.parentNode.insertBefore(overlay, this.$el.parentNode.firstChild)

      return overlay
    }
  },

  render (h) {
    const data = {
      'class': this.classes,
      style: { height: this.calculatedHeight },
      directives: [{
        name: 'click-outside',
        value: this.closeConditional
      }],
      on: {
        click: () => {
          this.$emit('update:miniVariant', false)
        }
      }
    }

    return h('aside', data, this.$slots.default)
  }
}
