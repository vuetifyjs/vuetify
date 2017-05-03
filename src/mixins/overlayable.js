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
      const overlay = document.createElement('div')
      overlay.className = 'overlay'
      if (this.absolute) overlay.className += ' overlay--absolute'

      this.$el.parentNode.insertBefore(overlay, this.$el.nextSibling)

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
      })

      this.overlay.className = this.overlay.className.replace('overlay--active', '')
    }
  }
}
