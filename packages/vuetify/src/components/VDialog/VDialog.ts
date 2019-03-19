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

// Utilities
import { getZIndex, convertToUnit, getSlotType } from '../../util/helpers'
import ThemeProvider from '../../util/ThemeProvider'
import { consoleError } from '../../util/console'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

const baseMixins = mixins(
  Dependent,
  Detachable,
  Overlayable,
  Returnable,
  Stackable,
  Toggleable
)

/* @vue/component */
export default baseMixins.extend({
  name: 'v-dialog',

  directives: {
    ClickOutside
  },

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
      animateTimeout: -1,
      stackMinZIndex: 200
    }
  },

  computed: {
    classes (): object {
      return {
        [(`v-dialog ${this.contentClass}`).trim()]: true,
        'v-dialog--active': this.isActive,
        'v-dialog--persistent': this.persistent,
        'v-dialog--fullscreen': this.fullscreen,
        'v-dialog--scrollable': this.scrollable,
        'v-dialog--animated': this.animate
      }
    },
    contentClasses (): object {
      return {
        'v-dialog__content': true,
        'v-dialog__content--active': this.isActive
      }
    },
    hasActivator (): boolean {
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
        window.clearTimeout(this.animateTimeout)
        this.animateTimeout = window.setTimeout(() => (this.animate = false), 150)
      })
    },
    closeConditional (e: Event) {
      // If the dialog content contains
      // the click event, or if the
      // dialog is not active
      if (this.$refs.content.contains(e.target as Node) ||
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
    onKeydown (e: KeyboardEvent) {
      this.$emit('keydown', e)
    },
    genActivator () {
      if (!this.hasActivator) return null

      const listeners = this.disabled ? undefined : {
        click: (e: Event) => {
          e.stopPropagation()
          if (!this.disabled) this.isActive = !this.isActive
        }
      }

      if (getSlotType(this, 'activator') === 'scoped') {
        const activator = this.$scopedSlots.activator!({ on: listeners }) || null

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

  render (h): VNode {
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
        click: (e: Event) => { e.stopPropagation() }
      },
      style: {}
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
})
