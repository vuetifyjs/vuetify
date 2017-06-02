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
        if (!this.persistent) this.isActive = false
      }
      if (this.absolute) overlay.className += ' overlay--absolute'

      document.documentElement.style.overflowY = 'hidden'
      document.documentElement.style.paddingRight = '17px'
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
        document.documentElement.style.overflowY = null
        document.documentElement.style.paddingRight = null
      })

      this.overlay.className = this.overlay.className.replace('overlay--active', '')
    }
  }
}
