import { VExpandTransition } from '../transitions'

import Bootable from '../../mixins/bootable'
import Toggleable from '../../mixins/toggleable'

import VIcon from '../VIcon'

import Ripple from '../../directives/ripple'
import ClickOutside from '../../directives/click-outside'

export default {
  name: 'v-expansion-panel-content',

  mixins: [Bootable, Toggleable],

  components: {
    VIcon
  },

  directives: {
    Ripple,
    ClickOutside
  },

  inject: ['focusable', 'panelClick'],

  data () {
    return {
      height: 'auto'
    }
  },

  props: {
    hideActions: Boolean,
    ripple: Boolean
  },

  methods: {
    genBody () {
      return this.$createElement('div', {
        ref: 'body',
        class: 'expansion-panel__body',
        directives: [
          {
            name: 'show',
            value: this.isActive
          }
        ]
      }, this.showLazyContent(this.$slots.default))
    },
    genHeader () {
      return this.$createElement('div', {
        staticClass: 'expansion-panel__header',
        directives: [{
          name: 'ripple',
          value: this.ripple
        }],
        on: {
          click: () => this.panelClick(this._uid)
        }
      }, [
        this.$slots.header,
        this.genIcon()
      ])
    },
    genIcon (h) {
      if (this.hideActions) return null

      const icon = this.$slots.actions ||
        this.$createElement('v-icon', 'keyboard_arrow_down')

      return this.$createElement('div', {
        staticClass: 'header__icon'
      }, [icon])
    },
    toggle (uid) {
      const isActive = this._uid === uid && !this.isActive

      if (isActive) this.isBooted = true

      // We treat bootable differently
      // Needs time to calc height
      this.$nextTick(() => (this.isActive = isActive))
    }
  },

  render (h) {
    const children = []

    this.$slots.header && children.push(this.genHeader())
    children.push(h(VExpandTransition, [this.genBody()]))

    return h('li', {
      staticClass: 'expansion-panel__container',
      'class': {
        'expansion-panel__container--active': this.isActive
      },
      attrs: {
        tabindex: 0
      },
      on: {
        keydown: e => {
          // Ensure element is focusable and the activeElement
          if (this.focusable &&
            this.$el === document.activeElement &&
            e.keyCode === 13
          ) this.panelClick(this._uid)
        }
      }
    }, children)
  }
}
