// Styles
import './VDialog.sass'

// Components
import { VThemeProvider } from '../VThemeProvider'

// Mixins
import Activatable from '../../mixins/activatable'
import Dependent from '../../mixins/dependent'
import Detachable from '../../mixins/detachable'
import Overlayable from '../../mixins/overlayable'
import Returnable from '../../mixins/returnable'
import Stackable from '../../mixins/stackable'
import Toggleable from '../../mixins/toggleable'

// Directives
import ClickOutside from '../../directives/click-outside'

// Helpers
import mixins from '../../util/mixins'
import { removed } from '../../util/console'
import {
  convertToUnit,
  keyCodes,
} from '../../util/helpers'

// Types
import { VNode, VNodeData } from 'vue'

const baseMixins = mixins(
  Activatable,
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

  directives: { ClickOutside },

  props: {
    dark: Boolean,
    disabled: Boolean,
    fullscreen: Boolean,
    light: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 'none',
    },
    noClickAnimation: Boolean,
    origin: {
      type: String,
      default: 'center center',
    },
    persistent: Boolean,
    retainFocus: {
      type: Boolean,
      default: true,
    },
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'dialog-transition',
    },
    width: {
      type: [String, Number],
      default: 'auto',
    },
  },

  data () {
    return {
      activatedBy: null as EventTarget | null,
      animate: false,
      animateTimeout: -1,
      isActive: !!this.value,
      stackMinZIndex: 200,
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
        'v-dialog--animated': this.animate,
      }
    },
    contentClasses (): object {
      return {
        'v-dialog__content': true,
        'v-dialog__content--active': this.isActive,
      }
    },
    hasActivator (): boolean {
      return Boolean(
        !!this.$slots.activator ||
        !!this.$scopedSlots.activator
      )
    },
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
    },
  },

  created () {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('full-width')) {
      removed('full-width', this)
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
        window.clearTimeout(this.animateTimeout)
        this.animateTimeout = window.setTimeout(() => (this.animate = false), 150)
      })
    },
    closeConditional (e: Event) {
      const target = e.target as HTMLElement
      // Ignore the click if the dialog is closed or destroyed,
      // if it was on an element inside the content,
      // if it was dragged onto the overlay (#6969),
      // or if this isn't the topmost dialog (#9907)
      return !(
        this._isDestroyed ||
        !this.isActive ||
        this.$refs.content.contains(target) ||
        (this.overlay && target && !this.overlay.$el.contains(target))
      ) && this.activeZIndex >= this.getMaxZIndex()
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
      this.$nextTick(() => {
        this.$refs.content.focus()
        this.bind()
      })
    },
    bind () {
      window.addEventListener('focusin', this.onFocusin)
    },
    unbind () {
      window.removeEventListener('focusin', this.onFocusin)
    },
    onClickOutside (e: Event) {
      this.$emit('click:outside', e)

      if (this.persistent) {
        this.noClickAnimation || this.animateClick()
      } else {
        this.isActive = false
      }
    },
    onKeydown (e: KeyboardEvent) {
      if (e.keyCode === keyCodes.esc && !this.getOpenDependents().length) {
        if (!this.persistent) {
          this.isActive = false
          const activator = this.getActivator()
          this.$nextTick(() => activator && (activator as HTMLElement).focus())
        } else if (!this.noClickAnimation) {
          this.animateClick()
        }
      }
      this.$emit('keydown', e)
    },
    // On focus change, wrap focus to stay inside the dialog
    // https://github.com/vuetifyjs/vuetify/issues/6892
    onFocusin (e: Event) {
      if (!e || !this.retainFocus) return

      const target = e.target as HTMLElement

      if (
        !!target &&
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
        const el = [...focusable].find(el => !el.hasAttribute('disabled')) as HTMLElement | undefined
        el && el.focus()
      }
    },
    genContent () {
      return this.showLazyContent(() => [
        this.$createElement(VThemeProvider, {
          props: {
            root: true,
            light: this.light,
            dark: this.dark,
          },
        }, [
          this.$createElement('div', {
            class: this.contentClasses,
            attrs: {
              role: 'document',
              tabindex: this.isActive ? 0 : undefined,
              ...this.getScopeIdAttrs(),
            },
            on: { keydown: this.onKeydown },
            style: { zIndex: this.activeZIndex },
            ref: 'content',
          }, [this.genTransition()]),
        ]),
      ])
    },
    genTransition () {
      const content = this.genInnerContent()

      if (!this.transition) return content

      return this.$createElement('transition', {
        props: {
          name: this.transition,
          origin: this.origin,
          appear: true,
        },
      }, [content])
    },
    genInnerContent () {
      const data: VNodeData = {
        class: this.classes,
        ref: 'dialog',
        directives: [
          {
            name: 'click-outside',
            value: {
              handler: this.onClickOutside,
              closeConditional: this.closeConditional,
              include: this.getOpenDependentElements,
            },
          },
          { name: 'show', value: this.isActive },
        ],
        style: {
          transformOrigin: this.origin,
        },
      }

      if (!this.fullscreen) {
        data.style = {
          ...data.style as object,
          maxWidth: this.maxWidth === 'none' ? undefined : convertToUnit(this.maxWidth),
          width: this.width === 'auto' ? undefined : convertToUnit(this.width),
        }
      }

      return this.$createElement('div', data, this.getContentSlot())
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-dialog__container',
      class: {
        'v-dialog__container--attached':
          this.attach === '' ||
          this.attach === true ||
          this.attach === 'attach',
      },
      attrs: { role: 'dialog' },
    }, [
      this.genActivator(),
      this.genContent(),
    ])
  },
})
