import { VExpandTransition } from '../transitions'

import Bootable from '../../mixins/bootable'
import Toggleable from '../../mixins/toggleable'
import Rippleable from '../../mixins/rippleable'
import { Registrable, inject as RegistrableInject } from '../../mixins/registrable'

import VIcon from '../VIcon'
import {
  VListItem,
  VListItemContent,
  VListItemIcon
} from '../VList'
import VExpansionPanel from './VExpansionPanel'
import { VSubtitle1 } from '../typography'

import mixins, { ExtractVue } from '../../util/mixins'
import Vue, { VNode } from 'vue'

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
    },
    title: String
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
    onClick () {
      this.isReadonly || this.expansionPanel.panelClick(this._uid)
    },
    genBody () {
      return this.$createElement('div', {
        ref: 'body',
        class: 'v-expansion-panel__body',
        directives: [{
          name: 'show',
          value: this.isActive
        }] as any
      }, this.showLazyContent(this.$slots.default))
    },
    genActivator () {
      const children = [this.genListItem()]

      if (
        !this.hideActions &&
        !this.$slots.activator
      ) children.push(this.genIcon())

      return this.$createElement('div', {
        staticClass: 'v-expansion-panel__activator',
        directives: [{
          name: 'ripple',
          value: this.ripple
        }] as any,
        on: { click: this.onClick }
      }, children)
    },
    genIcon () {
      const icon = this.$slots.actions ||
        [this.$createElement(VIcon, this.expandIcon)]

      return this.$createElement('transition', {
        attrs: { name: 'fade-transition' }
      }, [
        this.$createElement(VListItemIcon, {
          staticClass: 'v-expansion-panel__icon',
          directives: [{
            name: 'show',
            value: !this.isDisabled
          }] as any
        }, icon)
      ])
    },
    genListItem () {
      if (this.$slots.activator) return this.$slots.activator

      const h = this.$createElement

      return h(VListItem, [
        this.$slots.header ||
        h(VListItemContent, [h(VSubtitle1, this.title)])
      ])
    },
    toggle (active: boolean) {
      if (active) this.isBooted = true

      this.isActive = active
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-expansion-panel__container',
      class: this.containerClasses,
      attrs: {
        tabindex: this.isReadonly || this.isDisabled ? null : 0
      },
      on: { keydown: this.onKeydown }
    }, [
      this.genActivator(),
      h(VExpandTransition, [this.genBody()])
    ])
  }
})
