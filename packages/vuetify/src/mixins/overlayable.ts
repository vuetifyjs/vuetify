// Styles
import '../stylus/components/_overlay.styl'

// Utilities
import { keyCodes, addPassiveEventListener } from '../util/helpers'

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
      overlayOffset: 0,
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
    scrollListener (e: WheelEvent & KeyboardEvent) {
      if (e.type === 'keydown') {
        if (
          ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as Element).tagName) ||
          // https://github.com/vuetifyjs/vuetify/issues/4715
          (e.target as HTMLElement).isContentEditable
        ) return

        const up = [keyCodes.up, keyCodes.pageup]
        const down = [keyCodes.down, keyCodes.pagedown]

        if (up.includes(e.keyCode)) {
          (e as any).deltaY = -1
        } else if (down.includes(e.keyCode)) {
          (e as any).deltaY = 1
        } else {
          return
        }
      }

      if (e.target === this.overlay ||
        (e.type !== 'keydown' && e.target === document.body) ||
        this.checkPath(e)) e.preventDefault()
    },
    hasScrollbar (el?: Element) {
      if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

      const style = window.getComputedStyle(el)
      return ['auto', 'scroll'].includes(style.overflowY!) && el.scrollHeight > el.clientHeight
    },
    shouldScroll (el: Element, delta: number) {
      if (el.scrollTop === 0 && delta < 0) return true
      return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0
    },
    isInside (el: Element, parent: Element): boolean {
      if (el === parent) {
        return true
      } else if (el === null || el === document.body) {
        return false
      } else {
        return this.isInside(el.parentNode as Element, parent)
      }
    },
    checkPath (e: WheelEvent) {
      const path = e.path || this.composedPath(e)
      const delta = e.deltaY

      if (e.type === 'keydown' && path[0] === document.body) {
        const dialog = this.$refs.dialog
        const selected = window.getSelection().anchorNode as Element
        if (dialog && this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
          return this.shouldScroll(dialog, delta)
        }
        return true
      }

      for (let index = 0; index < path.length; index++) {
        const el = path[index]

        if (el === document) return true
        if (el === document.documentElement) return true
        if (el === this.$refs.content) return true

        if (this.hasScrollbar(el as Element)) return this.shouldScroll(el as Element, delta)
      }

      return true
    },
    /**
     * Polyfill for Event.prototype.composedPath
     */
    composedPath (e: WheelEvent): EventTarget[] {
      if (e.composedPath) return e.composedPath()

      const path = []
      let el = e.target as Element

      while (el) {
        path.push(el)

        if (el.tagName === 'HTML') {
          path.push(document)
          path.push(window)

          return path
        }

        el = el.parentElement!
      }
      return path
    },
    hideScroll () {
      if (this.$vuetify.breakpoint.smAndDown) {
        document.documentElement!.classList.add('overflow-y-hidden')
      } else {
        addPassiveEventListener(window, 'wheel', this.scrollListener as EventHandlerNonNull, { passive: false })
        window.addEventListener('keydown', this.scrollListener as EventHandlerNonNull)
      }
    },
    showScroll () {
      document.documentElement!.classList.remove('overflow-y-hidden')
      window.removeEventListener('wheel', this.scrollListener as EventHandlerNonNull)
      window.removeEventListener('keydown', this.scrollListener as EventHandlerNonNull)
    }
  }
})
