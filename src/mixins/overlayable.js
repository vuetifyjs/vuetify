import { addOnceEventListener } from '../util/helpers'

export default {
  data () {
    return {
      overlay: null
    }
  },

  props: {
    hideOverlay: Boolean
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

      const app = this.$el.closest('[data-app]')
      app &&
        app.appendChild(overlay) ||
        document.body.appendChild(overlay)

      setTimeout(() => {
        overlay.className += ' overlay--active'
        this.overlay = overlay
      }, 0)
    },
    removeOverlay () {
      if (!this.overlay) return

      addOnceEventListener(this.overlay, 'transitionend', () => {
        this.overlay && this.overlay.remove()
        this.overlay = null
        this.showScroll()
      })

      this.overlay.className = this.overlay.className.replace('overlay--active', '')
    },
    hideScroll () {
      document.documentElement.style.overflowY = 'hidden'
      window.innerWidth > 1024 &&
        (document.documentElement.style.paddingRight = '17px')
    },
    showScroll () {
      document.documentElement.style.overflowY = null
      document.documentElement.style.paddingRight = null
    }
  }
}
