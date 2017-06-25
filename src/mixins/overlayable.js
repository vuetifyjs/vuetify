import { addOnceEventListener } from '../util/helpers'

export default {
  data () {
    return {
      overlay: null,
      isTransitioning: false
    }
  },

  props: {
    hideOverlay: Boolean,
    overflow: Boolean
  },

  beforeDestroy () {
    this.removeOverlay()
  },

  methods: {
    genOverlay () {
      if (!this.isActive || this.hideOverlay) return

      const overlay = document.createElement('div')
      overlay.className = 'overlay'
      overlay.onclick = () => {
        if (this.permanet) return
        else if (!this.persistent) this.isActive = false
        else if (this.isMobile) this.isActive = false
      }

      if (this.absolute) overlay.className += ' overlay--absolute'

      this.hideScroll()

      let app
      // #820 Instead of requiring polyfill, do conditional
      if (window.Element && !Element.prototype.closest) {
        app = document.querySelector('[data-app]')
      } else {
        app = this.$el.closest('[data-app]')
      }

      app &&
        app.appendChild(overlay) ||
        console.warn('Application is missing <v-app> component')

      this.isTransitioning = true
      addOnceEventListener(overlay, 'transitionend', () => (this.isTransitioning = false))

      setTimeout(() => {
        overlay.className += ' overlay--active'
        this.overlay = overlay
      }, 0)

      return true
    },
    removeOverlay () {
      if (!this.overlay) return

      addOnceEventListener(this.overlay, 'transitionend', () => {
        this.overlay && this.overlay.remove()
        this.overlay = null
        this.showScroll()
        this.isTransitioning = false
      })

      this.isTransitioning = true
      this.overlay.className = this.overlay.className.replace('overlay--active', '')
    },
    hideScroll () {
      if (this.overflow) return
      document.documentElement.style.overflowY = 'hidden'
    },
    showScroll () {
      document.documentElement.style.overflowY = null
    }
  }
}
