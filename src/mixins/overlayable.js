import { addOnceEventListener } from '../util/helpers'

export default {
  data () {
    return {
      overlayOffset: 0,
      overlay: null
    }
  },

  props: {
    hideOverlay: Boolean
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

      if (this.absolute) {
        // Required for IE11
        this.$el.parentNode.insertBefore(overlay, this.$el.parentNode.firstChild)
      } else {
        document.querySelector('[data-app]').appendChild(overlay)
      }

      setTimeout(() => {
        overlay.className += ' overlay--active'
        this.overlay = overlay
      }, 0)

      return true
    },
    removeOverlay () {
      if (!this.overlay) {
        return this.showScroll()
      }

      this.overlay.className = this.overlay.className.replace('overlay--active', '')

      requestAnimationFrame(() => {
        // IE11 Fix
        try {
          this.overlay.parentNode.removeChild(this.overlay)
          this.overlay = null
          this.showScroll()
        } catch (e) {}
      })
    },
    hideScroll () {
      // Check documentElement first for IE11
      // this.overlayOffset = document.documentElement &&
      //   document.documentElement.scrollTop ||
      //   document.body.scrollTop

      // document.body.style.top = `-${this.overlayOffset}px`
      // document.body.style.position = 'fixed'
      document.documentElement.style.overflow = 'hidden'
    },
    showScroll () {
      document.documentElement.removeAttribute('style')

      // if (!this.overlayOffset) return
      // document.body.scrollTop = this.overlayOffset
      // document.documentElement.scrollTop = this.overlayOffset
    }
  }
}
