import styles from '../stylus/components/_overlay.styl' // eslint-disable-line no-unused-vars

export default {
  data () {
    return {
      overlay: null,
      overlayOffset: 0,
      overlayTransitionDuration: 500
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
      if ((!this.isActive || this.hideOverlay) ||
        (this.isActive && this.overlay)
      ) return

      this.overlay = document.createElement('div')
      this.overlay.className = 'overlay'
      this.overlay.onclick = () => {
        if (this.permanent) return
        else if (!this.persistent) this.isActive = false
        else if (this.isMobile) this.isActive = false
      }

      if (this.absolute) this.overlay.className += ' overlay--absolute'

      this.hideScroll()

      if (this.absolute) {
        // Required for IE11
        const parent = this.$el.parentNode
        parent.insertBefore(this.overlay, parent.firstChild)
      } else {
        document.querySelector('[data-app]').appendChild(this.overlay)
      }

      this.overlay.clientHeight // Force repaint
      requestAnimationFrame(() => {
        this.overlay.className += ' overlay--active'
      })

      return true
    },
    removeOverlay () {
      if (!this.overlay) {
        return this.showScroll()
      }

      this.overlay.classList.remove('overlay--active')

      setTimeout(() => {
        // IE11 Fix
        try {
          this.overlay.parentNode.removeChild(this.overlay)
          this.overlay = null
          this.showScroll()
        } catch (e) {}
      }, this.overlayTransitionDuration)
    },
    scrollListener (e) {
      const up = [38, 33, 36]
      const down = [40, 34, 35]
      if (e.type === 'keydown') {
        if (up.includes(e.keyCode)) {
          e.deltaY = -1
        } else if (e.type === 'keydown' && down.includes(e.keyCode)) {
          e.deltaY = 1
        } else {
          return
        }
      }

      if (e.target === this.overlay ||
        e.target === document.body ||
        this.checkPath(e)) e.preventDefault()
    },
    composedPath (el) {
      const path = []

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
    hasScrollbar (el) {
      const style = window.getComputedStyle(el)
      return ['auto', 'scroll'].includes(style['overflow-y'])
    },
    checkPath (e) {
      const path = e.path || this.composedPath(e.target)
      const delta = e.deltaY || -e.wheelDelta

      for (let i = 0; i < path.length; i++) {
        const el = path[i]

        if (this.hasScrollbar(el)) {
          if (el.scrollTop === 0 && delta < 0) return true
          else if (el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0) return true
          else return false
        }

        if (el === this.$refs.content) return true
      }

      return true
    },
    hideScroll () {
      // Check documentElement first for IE11
      // this.overlayOffset = document.documentElement &&
      //   document.documentElement.scrollTop ||
      //   document.body.scrollTop

      // document.body.style.top = `-${this.overlayOffset}px`
      // document.body.style.position = 'fixed'
      // document.documentElement.style.overflow = 'hidden'
      window.addEventListener('mousewheel', this.scrollListener)
      window.addEventListener('keydown', this.scrollListener)
      window.addEventListener('touchmove', this.scrollListener)
    },
    showScroll () {
      window.removeEventListener('mousewheel', this.scrollListener)
      window.removeEventListener('keydown', this.scrollListener)
      window.removeEventListener('touchmove', this.scrollListener)
      // document.documentElement.removeAttribute('style')

      // if (!this.overlayOffset) return
      // document.body.scrollTop = this.overlayOffset
      // document.documentElement.scrollTop = this.overlayOffset
    }
  }
}
