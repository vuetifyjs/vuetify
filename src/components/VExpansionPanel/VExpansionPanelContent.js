import { VExpandTransition } from '../transitions'

import Bootable from '../../mixins/bootable'
import Toggleable from '../../mixins/toggleable'
import Rippleable from '../../mixins/rippleable'
import { inject as RegistrableInject } from '../../mixins/registrable'

import VIcon from '../VIcon'

import { consoleWarn } from '../../util/console'

/* @vue/component */
export default {
  name: 'v-expansion-panel-content',

  mixins: [Bootable, Toggleable, Rippleable, RegistrableInject('expansionPanel', 'v-expansion-panel-content', 'v-expansion-panel')],

  inject: ['expansionPanel'],

  props: {
    disabled: Boolean,
    readonly: Boolean,
    expandIcon: {
      type: String,
      default: '$vuetify.icons.expand'
    },
    hideActions: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: false
    }
  },

  data: () => ({
    height: 'auto'
  }),

  computed: {
    containerClasses () {
      return {
        'v-expansion-panel__container--active': this.isActive,
        'v-expansion-panel__container--disabled': this.isDisabled
      }
    },
    isDisabled () {
      return this.expansionPanel.disabled || this.disabled
    },
    isReadonly () {
      return this.expansionPanel.readonly || this.readonly
    }
  },

  mounted () {
    this.expansionPanel.register(this._uid, this.toggle)

    // Can be removed once fully deprecated
    if (typeof this.value !== 'undefined') consoleWarn('v-model has been deprecated', this)
  },

  beforeDestroy () {
    this.expansionPanel.unregister(this._uid)
  },

  methods: {
    onKeydown (e) {
      // Ensure element is the activeElement
      if (
        e.keyCode === 13 &&
        this.$el === document.activeElement
      ) this.expansionPanel.panelClick(this._uid)
    },
    onHeaderClick () {
      this.isReadonly || this.expansionPanel.panelClick(this._uid)
    },
    genBody () {
      return this.$createElement('div', {
        ref: 'body',
        class: 'v-expansion-panel__body',
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }, this.showLazyContent(this.$slots.default))
    },
    genHeader () {
      return this.$createElement('div', {
        staticClass: 'v-expansion-panel__header',
        directives: [{
          name: 'ripple',
          value: this.ripple
        }],
        on: {
          click: this.onHeaderClick
        }
      }, [
        this.$slots.header,
        this.genIcon()
      ])
    },
    genIcon () {
      if (this.hideActions) return null

      const icon = this.$slots.actions ||
        this.$createElement(VIcon, this.expandIcon)

      return this.$createElement('transition', {
        attrs: { name: 'fade-transition' }
      }, [
        this.$createElement('div', {
          staticClass: 'header__icon',
          directives: [{
            name: 'show',
            value: !this.isDisabled
          }]
        }, [icon])
      ])
    },
    toggle (active) {
      if (active) this.isBooted = true

      // We treat bootable differently
      // Needs time to calc height
      this.$nextTick(() => (this.isActive = active))
    }
  },

  render (h) {
    const children = []

    this.$slots.header && children.push(this.genHeader())
    children.push(h(VExpandTransition, [this.genBody()]))

    return h('li', {
      staticClass: 'v-expansion-panel__container',
      class: this.containerClasses,
      attrs: {
        tabindex: this.isReadonly || this.isDisabled ? null : 0
      },
      on: {
        keydown: this.onKeydown
      }
    }, children)
  }
}
