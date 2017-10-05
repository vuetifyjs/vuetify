require('../../stylus/components/_dialogs.styl')

import Detachable from '../../mixins/detachable'
import Overlayable from '../../mixins/overlayable'
import Toggleable from '../../mixins/toggleable'
import { factory as DependentFactory } from '../../mixins/dependent'

const Dependent = DependentFactory({ closeDependents: true, isDependent: false })

import ClickOutside from '../../directives/click-outside'

import { getZIndex } from '../../util/helpers'

export default {
  name: 'v-dialog',

  mixins: [Detachable, Overlayable, Toggleable, Dependent],

  directives: {
    ClickOutside
  },

  props: {
    disabled: Boolean,
    persistent: Boolean,
    fullscreen: Boolean,
    fullWidth: Boolean,
    origin: {
      type: String,
      default: 'center center'
    },
    width: {
      type: [String, Number],
      default: 290
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
        'dialog--stacked-actions': this.stackedActions && !this.fullscreen,
        'dialog--scrollable': this.scrollable
      }
    },
    contentClasses () {
      return {
        'dialog__content': true,
        'dialog__content__active': this.isActive
      }
    },
    activeZIndex () {
      var thisContent = this.$refs.content
      if (!this.isActive) {
        // Return zero if we've not yet been created, else return our last z-index so close transition dont look funky
        return thisContent ? getZIndex(thisContent) : 0
      }
      // start with lowest allowed z-index (For now, dialogs start at 200)
      var zis = [200]
      // get z-index for all active dialogs
      var activeDialogs = document.getElementsByClassName('dialog__content__active')
      for (const activeDialog of activeDialogs) {
        if (thisContent !== activeDialog) {
          zis.push(getZIndex(activeDialog))
        }
      }
      // Return max current z-index + 2 (overlay will be this z-index - 1)
      return Math.max(...zis) + 2
    }
  },

  watch: {
    isActive (val) {
      if (val) {
        !this.fullscreen && !this.hideOverlay && this.genOverlay()
        this.fullscreen && this.hideScroll()
        this.$refs.content.focus()
      } else {
        if (!this.fullscreen) this.removeOverlay()
        else this.showScroll()
      }
    }
  },

  mounted () {
    this.isBooted = this.isActive
    this.$vuetify.load(() => (this.isActive && this.genOverlay()))
  },

  methods: {
    closeConditional (e) {
      // close dialog if !persistent and doesn't have an overlay (clicked overlay will close dialog), and clicked outside
      const result = !this.persistent && this.hideOverlay
      if (result) e.stopPropagation() // If we're going to close this dialog, stop propagaton so we don't close others below us as well.
      return result
    }
  },

  render (h) {
    const children = []
    const data = {
      'class': this.classes,
      ref: 'dialog',
      directives: [
        { name: 'click-outside', value: this.closeConditional },
        { name: 'show', value: this.isActive }
      ],
      on: {
        click: e => {
          e.stopPropagation()
        }
      }
    }

    if (!this.fullscreen) {
      data.style = {
        width: isNaN(this.width) ? this.width : `${this.width}px`
      }
    }

    if (this.$slots.activator) {
      children.push(h('div', {
        'class': 'dialog__activator',
        on: {
          click: e => {
            e.stopPropagation()
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
      style: {
        zIndex: this.activeZIndex
      },
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
