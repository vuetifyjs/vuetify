import { VExpandTransition } from '../transitions'

import Bootable from '../../mixins/bootable'
import Toggleable from '../../mixins/toggleable'
import Rippleable from '../../mixins/rippleable'
import { inject as RegistrableInject } from '../../mixins/registrable'

import VIcon from '../VIcon'

import ClickOutside from '../../directives/click-outside'

export default {
  name: 'v-expansion-panel-content',

  mixins: [Bootable, Toggleable, Rippleable, RegistrableInject('expansionPanel', 'v-expansion-panel', 'v-expansion-panel-content')],

  components: {
    VIcon
  },

  directives: {
    ClickOutside
  },

  inject: ['focusable', 'panelClick'],

  data () {
    return {
      height: 'auto'
    }
  },

  props: {
    expandIcon: {
      type: String,
      default: 'keyboard_arrow_down'
    },
    hideActions: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: false
    }
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
        this.$createElement('v-icon', this.expandIcon)

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

  mounted () {
    this.expansionPanel.register(this._uid, this.toggle)
  },

  beforeDestroy () {
    this.expansionPanel.unregister(this._uid)
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
