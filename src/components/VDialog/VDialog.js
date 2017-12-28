require('../../stylus/components/_dialogs.styl')

// Mixins
import Dependent from '../../mixins/dependent'
import Detachable from '../../mixins/detachable'
import Overlayable from '../../mixins/overlayable'
import Stackable from '../../mixins/stackable'
import Toggleable from '../../mixins/toggleable'

// Directives
import ClickOutside from '../../directives/click-outside'

// Helpers
import { getZIndex } from '../../util/helpers'

export default {
  name: 'v-dialog',

  mixins: [Dependent, Detachable, Overlayable, Stackable, Toggleable],

  directives: {
    ClickOutside
  },

  data () {
    return {
      isDependent: false,
      stackClass: 'dialog__content__active',
      stackMinZIndex: 200
    }
  },

  props: {
    disabled: Boolean,
    persistent: Boolean,
    fullscreen: Boolean,
    fullWidth: Boolean,
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

  computed: {
    classes () {
      return {
        [(`dialog ${this.contentClass}`).trim()]: true,
        'dialog--active': this.isActive,
        'dialog--persistent': this.persistent,
        'dialog--fullscreen': this.fullscreen,
        'dialog--scrollable': this.scrollable
      }
    },
    contentClasses () {
      return {
        'dialog__content': true,
        'dialog__content__active': this.isActive
      }
    }
  },

  watch: {
    isActive (val) {
      if (val) {
        this.show()
      } else {
        this.removeOverlay()
        this.unbind()
      }
    }
  },

  mounted () {
    this.isBooted = this.isActive
    this.isActive && this.show()
  },

  beforeDestroy () {
    if (typeof window !== 'undefined') this.unbind()
  },

  methods: {
    closeConditional (e) {
      // close dialog if !persistent, clicked outside and we're the topmost dialog.
      // Since this should only be called in a capture event (bottom up), we shouldn't need to stop propagation
      return !this.persistent &&
        getZIndex(this.$refs.content) >= this.getMaxZIndex() &&
        !this.$refs.content.contains(e.target)
    },
    show () {
      !this.fullscreen && !this.hideOverlay && this.genOverlay()
      this.fullscreen && this.hideScroll()
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
          value: {
            callback: this.closeConditional,
            include: this.getOpenDependentElements
          }
        },
        { name: 'show', value: this.isActive }
      ],
      on: { click: e => e.stopPropagation() }
    }

    if (!this.fullscreen) {
      data.style = {
        maxWidth: this.maxWidth === 'none' ? undefined : (isNaN(this.maxWidth) ? this.maxWidth : `${this.maxWidth}px`),
        width: this.width === 'auto' ? undefined : (isNaN(this.width) ? this.width : `${this.width}px`)
      }
    }

    if (this.$slots.activator) {
      children.push(h('div', {
        'class': 'dialog__activator',
        on: {
          click: e => {
            if (!this.disabled) this.isActive = !this.isActive
          }
        }
      }, [this.$slots.activator]))
    }

    const dialog = h('transition', {
      props: {
        name: this.transition || '', // If false, show nothing
        origin: this.origin
      }
    }, [h('div', data,
      this.showLazyContent(this.$slots.default)
    )])

    children.push(h('div', {
      'class': this.contentClasses,
      domProps: { tabIndex: -1 },
      style: { zIndex: this.activeZIndex },
      ref: 'content'
    }, [dialog]))

    return h('div', {
      'class': 'dialog__container',
      style: {
        display: !this.$slots.activator && 'none' || this.fullWidth ? 'block' : 'inline-block'
      }
    }, children)
  }
}
