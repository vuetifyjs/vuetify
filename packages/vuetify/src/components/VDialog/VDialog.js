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
import { getZIndex, convertToUnit } from '../../util/helpers'
import ThemeProvider from '../../util/ThemeProvider'

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
      if (this.$refs.content.contains(e.target) ||
        !this.isActive
      ) return false

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
      return getZIndex(this.$refs.content) >= this.getMaxZIndex()
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
      this.$listeners.keydown && this.bind()
    },
    bind () {
      window.addEventListener('keydown', this.onKeydown)
    },
    unbind () {
      window.removeEventListener('keydown', this.onKeydown)
    },
    onKeydown (e) {
      this.$emit('keydown', e)
    },
    genActivator () {
      if (!this.hasActivator) return null

      const listeners = this.disabled ? {} : {
        click: e => {
          e.stopPropagation()
          if (!this.disabled) this.isActive = !this.isActive
        }
      }

      if (this.$scopedSlots.activator && this.$scopedSlots.activator.length) {
        const activator = this.$scopedSlots.activator({ on: listeners })
        this.activatorNode = activator
        return activator
      }

      return this.$createElement('div', {
        staticClass: 'v-dialog__activator',
        'class': {
          'v-dialog__activator--disabled': this.disabled
        },
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
          value: () => (this.isActive = false),
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
