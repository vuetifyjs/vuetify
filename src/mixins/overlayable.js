require('../stylus/components/_overlay.styl')

export default {
  data () {
    return {
      overlay: null,
      overlayOffset: 0,
      overlayTimeout: null,
      overlayTransitionDuration: 500 + 150 // transition + delay
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
      // If fn is called and timeout is active
      // or overlay already exists
      // cancel removal of overlay and re-add active
      if ((!this.isActive || this.hideOverlay) ||
        (this.isActive && this.overlayTimeout) ||
        this.overlay
      ) {
        clearTimeout(this.overlayTimeout)

        return this.overlay &&
          this.overlay.classList.add('overlay--active')
      }

      this.overlay = document.createElement('div')
      this.overlay.className = 'overlay'

      if (this.absolute) this.overlay.className += ' overlay--absolute'

      this.hideScroll()

      const parent = this.absolute
        ? this.$el.parentNode
        : document.querySelector('[data-app]')

      parent.insertBefore(this.overlay, parent.firstChild)

      this.overlay.clientHeight // Force repaint
      requestAnimationFrame(() => {
        this.overlay.className += ' overlay--active'

        if (this.activeZIndex !== undefined) {
          this.overlay.style.zIndex = this.activeZIndex - 1
        }
      })

      return true
    },
    removeOverlay () {
      if (!this.overlay) {
        return this.showScroll()
      }

      this.overlay.classList.remove('overlay--active')

      this.overlayTimeout = setTimeout(() => {
        // IE11 Fix
        try {
          this.overlay.parentNode.removeChild(this.overlay)
          this.overlay = null
          this.showScroll()
        } catch (e) {}

        clearTimeout(this.overlayTimeout)
        this.overlayTimeout = null
      }, this.overlayTransitionDuration)
    },
    /**
     * @param {Event} e
     * @returns void
     */
    scrollListener (e) {
      if (e.type === 'keydown') {
        const up = [38, 33]
        const down = [40, 34]

        if (up.includes(e.keyCode)) {
          e.deltaY = -1
        } else if (down.includes(e.keyCode)) {
          e.deltaY = 1
        } else {
          return
        }
      }

      if (e.target === this.overlay ||
        (e.type !== 'keydown' && e.target === document.body) ||
        this.checkPath(e)) e.preventDefault()
    },
    hasScrollbar (el) {
      const style = window.getComputedStyle(el)
      return ['auto', 'scroll'].includes(style['overflow-y']) && el.scrollHeight > el.clientHeight
    },
    shouldScroll (el, delta) {
      if (el.scrollTop === 0 && delta < 0) return true
      return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0
    },
    isInside (el, parent) {
      if (el === parent) {
        return true
      } else if (el === null || el === document.body) {
        return false
      } else {
        return this.isInside(el.parentNode, parent)
      }
    },
    /**
     * @param {Event} e
     * @returns boolean
     */
    checkPath (e) {
      const path = e.path || this.composedPath(e)
      const delta = e.deltaY || -e.wheelDelta

      if (e.type === 'keydown' && path[0] === document.body) {
        const dialog = this.$refs.dialog
        const selected = window.getSelection().anchorNode
        if (this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
          return this.shouldScroll(dialog, delta)
        }
        return true
      }

      for (const el of path) {
        if ([document, document.documentElement, this.$refs.content].includes(el)) return true
        if (this.hasScrollbar(el)) return this.shouldScroll(el, delta)
      }

      return true
    },
    /**
     * Polyfill for Event.prototype.composedPath
     * @param {Event} e
     * @returns Element[]
     */
    composedPath (e) {
      if (e.composedPath) return e.composedPath()

      const path = []
      let el = e.target

      while (el) {
        path.push(el)

        if (el.tagName === 'HTML') {
          path.push(document)
          path.push(window)

          return path
        }

        el = el.parentElement
      }
    },
    hideScroll () {
      if (this.$vuetify.breakpoint.mdAndDown) {
        document.documentElement.classList.add('overflow-y-hidden')
      } else {
        window.addEventListener('wheel', this.scrollListener)
        window.addEventListener('keydown', this.scrollListener)
      }
    },
    showScroll () {
      document.documentElement.classList.remove('overflow-y-hidden')
      window.removeEventListener('wheel', this.scrollListener)
      window.removeEventListener('keydown', this.scrollListener)
    }
  }
}
