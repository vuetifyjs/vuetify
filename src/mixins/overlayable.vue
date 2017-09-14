<script>
  export default {
    data () {
      return {
        overlay: null,
        overlayOffset: 0,
        overlayTimeout: null,
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
      composedPath (e) {
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
      hasScrollbar (el) {
        const style = window.getComputedStyle(el)
        return ['auto', 'scroll'].includes(style['overflow-y'])
      },
      shouldScroll (el, delta) {
        if (el.scrollTop === 0 && delta < 0) return true
        else if (el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0) return true
        else return false
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
      checkPath (e) {
        const path = e.path || this.composedPath(e)
        const delta = e.deltaY || -e.wheelDelta

        if (e.type === 'keydown' && path[0] === document.body) {
          const dialog = this.$refs.content.querySelector('.dialog')
          const selected = window.getSelection().anchorNode
          if (this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
            return this.shouldScroll(dialog, delta)
          }
          return true
        }

        for (let i = 0; i < path.length; i++) {
          const el = path[i]

          if (el === document) return true
          else if (this.hasScrollbar(el)) {
            return this.shouldScroll(el, delta)
          } else if (el === this.$refs.content) return true
        }

        return true
      },
      hideScroll () {
        if (this.$vuetify.breakpoint.mdAndDown) {
          document.documentElement.style.overflow = 'hidden'
        } else {
          window.addEventListener('mousewheel', this.scrollListener)
          window.addEventListener('keydown', this.scrollListener)
        }
      },
      showScroll () {
        if (this.$vuetify.breakpoint.mdAndDown) {
          document.documentElement.removeAttribute('style')
        } else {
          window.removeEventListener('mousewheel', this.scrollListener)
          window.removeEventListener('keydown', this.scrollListener)
        }
      }
    }
  }
</script>

<style lang="stylus" src="../stylus/components/_overlay.styl"></style>
