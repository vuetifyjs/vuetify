import '../../stylus/components/_dialogs.styl'

// Mixins
import Dependent from '../../mixins/dependent'
import Detachable from '../../mixins/detachable'
import Overlayable from '../../mixins/overlayable'
import Returnable from '../../mixins/returnable'
import Stackable from '../../mixins/stackable'
import Toggleable from '../../mixins/toggleable'

// Directives
import ClickOutside from '../../directives/click-outside'

// Helpers
import { convertToUnit, keyCodes, getSlotType } from '../../util/helpers'
import ThemeProvider from '../../util/ThemeProvider'
import { consoleError } from '../../util/console'

/* @vue/component */
export default {
  name: 'v-dialog',

  directives: {
    ClickOutside
  },

  mixins: [
    Dependent,
    Detachable,
    Overlayable,
    Returnable,
    Stackable,
    Toggleable
  ],

  props: {
    disabled: Boolean,
    persistent: Boolean,
    fullscreen: Boolean,
    fullWidth: Boolean,
    noClickAnimation: Boolean,
    light: Boolean,
    dark: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 'none'
    },
    origin: {
      type: String,
      default: 'center center'
    },
    width: {
      type: [String, Number],
      default: 'auto'
    },
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'dialog-transition'
    }
  },

  data () {
    return {
      animate: false,
      animateTimeout: null,
      stackClass: 'v-dialog__content--active',
      stackMinZIndex: 200
    }
  },

  computed: {
    classes () {
      return {
        [(`v-dialog ${this.contentClass}`).trim()]: true,
        'v-dialog--active': this.isActive,
        'v-dialog--persistent': this.persistent,
        'v-dialog--fullscreen': this.fullscreen,
        'v-dialog--scrollable': this.scrollable,
        'v-dialog--animated': this.animate
      }
    },
    contentClasses () {
      return {
        'v-dialog__content': true,
        'v-dialog__content--active': this.isActive
      }
    },
    hasActivator () {
      return Boolean(
        !!this.$slots.activator ||
        !!this.$scopedSlots.activator
      )
    }
  },

  watch: {
    isActive (val) {
      if (val) {
        this.show()
        this.hideScroll()
      } else {
        this.removeOverlay()
        this.unbind()
      }
    },
    fullscreen (val) {
      if (!this.isActive) return

      if (val) {
        this.hideScroll()
        this.removeOverlay(false)
      } else {
        this.showScroll()
        this.genOverlay()
      }
    }
  },

  beforeMount () {
    this.$nextTick(() => {
      this.isBooted = this.isActive
      this.isActive && this.show()
    })
  },

  mounted () {
    if (getSlotType(this, 'activator', true) === 'v-slot') {
      consoleError(`v-dialog's activator slot must be bound, try '<template #activator="data"><v-btn v-on="data.on>'`, this)
    }
  },

  beforeDestroy () {
    if (typeof window !== 'undefined') this.unbind()
  },

  methods: {
    animateClick () {
      this.animate = false
      // Needed for when clicking very fast
      // outside of the dialog
      this.$nextTick(() => {
        this.animate = true
        clearTimeout(this.animateTimeout)
        this.animateTimeout = setTimeout(() => (this.animate = false), 150)
      })
    },
    closeConditional (e) {
      // If the dialog content contains
      // the click event, or if the
      // dialog is not active
      if (!this.isActive || this.$refs.content.contains(e.target)) return false

      // If we made it here, the click is outside
      // and is active. If persistent, and the
      // click is on the overlay, animate
      if (this.persistent) {
        if (!this.noClickAnimation &&
          this.overlay === e.target
        ) this.animateClick()

        return false
      }

      // close dialog if !persistent, clicked outside and we're the topmost dialog.
      // Since this should only be called in a capture event (bottom up), we shouldn't need to stop propagation
      return this.activeZIndex >= this.getMaxZIndex()
    },
    hideScroll () {
      if (this.fullscreen) {
        document.documentElement.classList.add('overflow-y-hidden')
      } else {
        Overlayable.options.methods.hideScroll.call(this)
      }
    },
    show () {
      !this.fullscreen && !this.hideOverlay && this.genOverlay()
      this.$refs.content.focus()
      this.bind()
    },
    bind () {
      window.addEventListener('focusin', this.onFocusin)
    },
    unbind () {
      window.removeEventListener('focusin', this.onFocusin)
    },
    onKeydown (e) {
      if (e.keyCode === keyCodes.esc && !this.getOpenDependents().length) {
        if (!this.persistent) {
          this.isActive = false
          const activator = this.getActivator()
          this.$nextTick(() => activator && activator.focus())
        } else if (!this.noClickAnimation) {
          this.animateClick()
        }
      }
      this.$emit('keydown', e)
    },
    onFocusin (e) {
      const { target } = event

      if (
        // It isn't the document or the dialog body
        ![document, this.$refs.content].includes(target) &&
        // It isn't inside the dialog body
        !this.$refs.content.contains(target) &&
        // We're the topmost dialog
        this.activeZIndex >= this.getMaxZIndex() &&
        // It isn't inside a dependent element (like a menu)
        !this.getOpenDependentElements().some(el => el.contains(target))
        // So we must have focused something outside the dialog and its children
      ) {
        // Find and focus the first available element inside the dialog
        const focusable = this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        focusable.length && focusable[0].focus()
      }
    },
    getActivator (e) {
      if (this.$refs.activator) {
        return this.$refs.activator.children.length > 0
          ? this.$refs.activator.children[0]
          : this.$refs.activator
      }

      if (e) {
        this.activatedBy = e.currentTarget || e.target
      }

      if (this.activatedBy) return this.activatedBy

      if (this.activatorNode) {
        const activator = Array.isArray(this.activatorNode) ? this.activatorNode[0] : this.activatorNode
        const el = activator && activator.elm
        if (el) return el
      }

      return null
    },
    genActivator () {
      if (!this.hasActivator) return null

      const listeners = this.disabled ? {} : {
        click: e => {
          e.stopPropagation()
          this.getActivator(e)
          if (!this.disabled) this.isActive = !this.isActive
        }
      }

      if (getSlotType(this, 'activator') === 'scoped') {
        const activator = this.$scopedSlots.activator({ on: listeners })
        this.activatorNode = activator
        return activator
      }

      return this.$createElement('div', {
        staticClass: 'v-dialog__activator',
        class: {
          'v-dialog__activator--disabled': this.disabled
        },
        ref: 'activator',
        on: listeners
      }, this.$slots.activator)
    }
  },

  render (h) {
    const children = []
    const data = {
      'class': this.classes,
      ref: 'dialog',
      directives: [
        {
          name: 'click-outside',
          value: () => { this.isActive = false },
          args: {
            closeConditional: this.closeConditional,
            include: this.getOpenDependentElements
          }
        },
        { name: 'show', value: this.isActive }
      ],
      on: {
        click: e => { e.stopPropagation() }
      }
    }

    if (!this.fullscreen) {
      data.style = {
        maxWidth: this.maxWidth === 'none' ? undefined : convertToUnit(this.maxWidth),
        width: this.width === 'auto' ? undefined : convertToUnit(this.width)
      }
    }

    children.push(this.genActivator())

    let dialog = h('div', data, this.showLazyContent(this.$slots.default))
    if (this.transition) {
      dialog = h('transition', {
        props: {
          name: this.transition,
          origin: this.origin
        }
      }, [dialog])
    }

    children.push(h('div', {
      'class': this.contentClasses,
      attrs: {
        tabIndex: '-1',
        ...this.getScopeIdAttrs()
      },
      on: {
        keydown: this.onKeydown
      },
      style: { zIndex: this.activeZIndex },
      ref: 'content'
    }, [
      this.$createElement(ThemeProvider, {
        props: {
          root: true,
          light: this.light,
          dark: this.dark
        }
      }, [dialog])
    ]))

    return h('div', {
      staticClass: 'v-dialog__container',
      style: {
        display: (!this.hasActivator || this.fullWidth) ? 'block' : 'inline-block'
      }
    }, children)
  }
}
