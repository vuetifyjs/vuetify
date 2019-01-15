import { VExpandTransition } from '../transitions'

import Bootable from '../../mixins/bootable'
import Toggleable from '../../mixins/toggleable'
import Rippleable from '../../mixins/rippleable'
import { Registrable, inject as RegistrableInject } from '../../mixins/registrable'

import VIcon from '../VIcon'
import VExpansionPanel from './VExpansionPanel'

import mixins, { ExtractVue } from '../../util/mixins'
import Vue, { VNode } from 'vue'

import { consoleWarn } from '../../util/console'

type VExpansionPanelInstance = InstanceType<typeof VExpansionPanel>

interface options extends Vue {
  expansionPanel: VExpansionPanelInstance
}

export default mixins<options &
/* eslint-disable indent */
  ExtractVue<[
    typeof Bootable,
    typeof Toggleable,
    typeof Rippleable,
    Registrable<'expansionPanel'>
  ]>
/* eslint-enable indent */
>(
  Bootable,
  Toggleable,
  Rippleable,
  RegistrableInject('expansionPanel', 'v-expansion-panel-content', 'v-expansion-panel')
  /* @vue/component */
).extend({
  name: 'v-expansion-panel-content',

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
    containerClasses (): object {
      return {
        'v-expansion-panel__container--active': this.isActive,
        'v-expansion-panel__container--disabled': this.isDisabled
      }
    },
    isDisabled (): boolean {
      return this.expansionPanel.disabled || this.disabled
    },
    isReadonly (): boolean {
      return this.expansionPanel.readonly || this.readonly
    }
  },

  beforeMount () {
    this.expansionPanel.register(this)

    // Can be removed once fully deprecated
    if (typeof this.value !== 'undefined') consoleWarn('v-model has been deprecated', this)
  },

  beforeDestroy () {
    this.expansionPanel.unregister(this)
  },

  methods: {
    onKeydown (e: KeyboardEvent) {
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
      const children = [...(this.$slots.header || [])]

      if (!this.hideActions) children.push(this.genIcon())

      return this.$createElement('div', {
        staticClass: 'v-expansion-panel__header',
        directives: [{
          name: 'ripple',
          value: this.ripple
        }],
        on: {
          click: this.onHeaderClick
        }
      }, children)
    },
    genIcon () {
      const icon = this.$slots.actions ||
        [this.$createElement(VIcon, this.expandIcon)]

      return this.$createElement('transition', {
        attrs: { name: 'fade-transition' }
      }, [
        this.$createElement('div', {
          staticClass: 'v-expansion-panel__header__icon',
          directives: [{
            name: 'show',
            value: !this.isDisabled
          }]
        }, icon)
      ])
    },
    toggle (active: boolean) {
      if (active) this.isBooted = true

      this.isActive = active
    }
  },

  render (h): VNode {
    return h('li', {
      staticClass: 'v-expansion-panel__container',
      class: this.containerClasses,
      attrs: {
        tabindex: this.isReadonly || this.isDisabled ? null : 0,
        'aria-expanded': Boolean(this.isActive)
      },
      on: {
        keydown: this.onKeydown
      }
    }, [
      this.$slots.header && this.genHeader(),
      h(VExpandTransition, [this.genBody()])
    ])
  }
})
