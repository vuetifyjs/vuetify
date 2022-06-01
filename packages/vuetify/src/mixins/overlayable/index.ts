// Components
import VOverlay from '../../components/VOverlay'

// Utilities
import {
  keyCodes,
  addOnceEventListener,
  addPassiveEventListener,
  getZIndex,
  composedPath,
} from '../../util/helpers'

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
    hideOverlay: Boolean,
    overlayColor: String,
    overlayOpacity: [Number, String],
  },

  data () {
    return {
      animationFrame: 0,
      overlay: null as InstanceType<typeof VOverlay> | null,
    }
  },

  watch: {
    hideOverlay (value) {
      if (!this.isActive) return

      if (value) this.removeOverlay()
      else this.genOverlay()
    },
  },

  beforeDestroy () {
    this.removeOverlay()
  },

  methods: {
    createOverlay () {
      const overlay = new VOverlay({
        propsData: {
          absolute: this.absolute,
          value: false,
          color: this.overlayColor,
          opacity: this.overlayOpacity,
        },
      })

      overlay.$mount()

      const parent = this.absolute
        ? this.$el.parentNode
        : document.querySelector('[data-app]')

      parent && parent.insertBefore(overlay.$el, parent.firstChild)

      this.overlay = overlay
    },
    genOverlay () {
      this.hideScroll()

      if (this.hideOverlay) return

      if (!this.overlay) this.createOverlay()

      this.animationFrame = requestAnimationFrame(() => {
        if (!this.overlay) return

        if (this.activeZIndex !== undefined) {
          this.overlay.zIndex = String(this.activeZIndex - 1)
        } else if (this.$el) {
          this.overlay.zIndex = getZIndex(this.$el)
        }

        this.overlay.value = true
      })

      return true
    },
    /** removeOverlay(false) will not restore the scollbar afterwards */
    removeOverlay (showScroll = true) {
      if (this.overlay) {
        addOnceEventListener(this.overlay.$el, 'transitionend', () => {
          if (
            !this.overlay ||
            !this.overlay.$el ||
            !this.overlay.$el.parentNode ||
            this.overlay.value ||
            this.isActive
          ) return

          this.overlay.$el.parentNode.removeChild(this.overlay.$el)
          this.overlay.$destroy()
          this.overlay = null
        })

        // Cancel animation frame in case
        // overlay is removed before it
        // has finished its animation
        cancelAnimationFrame(this.animationFrame)

        this.overlay.value = false
      }

      showScroll && this.showScroll()
    },
    scrollListener (e: WheelEvent | KeyboardEvent) {
      if ('key' in e) {
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
        this.checkPath(e as WheelEvent)) e.preventDefault()
    },
    hasScrollbar (el?: Element) {
      if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

      const style = window.getComputedStyle(el)
      return ((['auto', 'scroll'].includes(style.overflowY!) || el.tagName === 'SELECT') && el.scrollHeight > el.clientHeight) ||
      ((['auto', 'scroll'].includes(style.overflowX!)) && el.scrollWidth > el.clientWidth)
    },
    shouldScroll (el: Element, e: WheelEvent): boolean {
      if (el.hasAttribute('data-app')) return false

      const dir = e.shiftKey || e.deltaX ? 'x' : 'y'
      const delta = dir === 'y' ? e.deltaY : e.deltaX || e.deltaY

      let alreadyAtStart: boolean
      let alreadyAtEnd: boolean
      if (dir === 'y') {
        alreadyAtStart = el.scrollTop === 0
        alreadyAtEnd = el.scrollTop + el.clientHeight === el.scrollHeight
      } else {
        alreadyAtStart = el.scrollLeft === 0
        alreadyAtEnd = el.scrollLeft + el.clientWidth === el.scrollWidth
      }

      const scrollingUp = delta < 0
      const scrollingDown = delta > 0

      if (!alreadyAtStart && scrollingUp) return true
      if (!alreadyAtEnd && scrollingDown) return true
      if ((alreadyAtStart || alreadyAtEnd)) {
        return this.shouldScroll(el.parentNode as Element, e)
      }

      return false
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
      const path = composedPath(e)

      if (e.type === 'keydown' && path[0] === document.body) {
        const dialog = this.$refs.dialog
        // getSelection returns null in firefox in some edge cases, can be ignored
        const selected = window.getSelection()!.anchorNode as Element
        if (dialog && this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
          return !this.shouldScroll(dialog, e)
        }
        return true
      }

      for (let index = 0; index < path.length; index++) {
        const el = path[index]

        if (el === document) return true
        if (el === document.documentElement) return true
        if (el === this.$refs.content) return true

        if (this.hasScrollbar(el as Element)) return !this.shouldScroll(el as Element, e)
      }

      return true
    },
    hideScroll () {
      if (this.$vuetify.breakpoint.smAndDown) {
        document.documentElement!.classList.add('overflow-y-hidden')
      } else {
        addPassiveEventListener(window, 'wheel', this.scrollListener, { passive: false })
        window.addEventListener('keydown', this.scrollListener)
      }
    },
    showScroll () {
      document.documentElement!.classList.remove('overflow-y-hidden')
      window.removeEventListener('wheel', this.scrollListener)
      window.removeEventListener('keydown', this.scrollListener)
    },
  },
})
