// Styles
import '../stylus/components/_overlay.styl'

// Types
import Vue from 'vue'

interface Toggleable extends Vue {
  isActive?: boolean
}

interface Stackable extends Vue {
  activeZIndex: number
}

interface options {
  absolute?: boolean
  $refs: {
    dialog?: HTMLElement
    content?: HTMLElement
  }
}

/* @vue/component */
export default Vue.extend<Vue & Toggleable & Stackable & options>().extend({
  name: 'overlayable',

  props: {
    hideOverlay: Boolean
  },

  data () {
    return {
      overlay: null as HTMLElement | null,
      overlayTimeout: undefined as number | undefined,
      overlayTransitionDuration: 500 + 150 // transition + delay
    }
  },

  watch: {
    hideOverlay (value) {
      if (value) this.removeOverlay()
      else this.genOverlay()
    }
  },

  beforeDestroy () {
    this.removeOverlay()
  },

  methods: {
    genOverlay () {
      // If fn is called and timeout is active
      // or overlay already exists
      // cancel removal of overlay and re-add active
      if ((!this.isActive || this.hideOverlay) ||
        (this.isActive && this.overlayTimeout) ||
        this.overlay
      ) {
        clearTimeout(this.overlayTimeout)

        return this.overlay &&
          this.overlay.classList.add('v-overlay--active')
      }

      this.overlay = document.createElement('div')
      this.overlay.className = 'v-overlay'

      if (this.absolute) this.overlay.className += ' v-overlay--absolute'

      this.hideScroll()

      const parent = this.absolute
        ? this.$el.parentNode
        : document.querySelector('[data-app]')

      parent && parent.insertBefore(this.overlay, parent.firstChild)

      // eslint-disable-next-line no-unused-expressions
      this.overlay.clientHeight // Force repaint
      requestAnimationFrame(() => {
        // https://github.com/vuetifyjs/vuetify/issues/4678
        if (!this.overlay) return

        this.overlay.className += ' v-overlay--active'

        if (this.activeZIndex !== undefined) {
          this.overlay.style.zIndex = String(this.activeZIndex - 1)
        }
      })

      return true
    },
    /** removeOverlay(false) will not restore the scollbar afterwards */
    removeOverlay (showScroll = true) {
      if (!this.overlay) {
        return showScroll && this.showScroll()
      }

      this.overlay.classList.remove('v-overlay--active')

      this.overlayTimeout = window.setTimeout(() => {
        // IE11 Fix
        try {
          if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay)
          }
          this.overlay = null
          showScroll && this.showScroll()
        } catch (e) { console.log(e) }

        clearTimeout(this.overlayTimeout)
        this.overlayTimeout = undefined
      }, this.overlayTransitionDuration)
    },
    hideScroll () {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      const pageScroll = window.scrollY
      document.documentElement.style.top = `${-pageScroll}px`
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`
      document.documentElement.classList.add('v-overlay-visible')
    },
    showScroll () {
      const pageScroll = -parseFloat(document.documentElement.style.top!)
      document.documentElement.style.top = null
      document.documentElement.style.height = null
      document.documentElement.style.paddingRight = null
      document.documentElement.classList.remove('v-overlay-visible')
      window.scrollTo(window.scrollX, pageScroll)
    }
  }
})
