
// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import Bootable from '../../mixins/bootable'
import Toggleable from '../../mixins/toggleable'
import Rippleable from '../../mixins/rippleable'

// Components
import VIcon from '../VIcon'
import VExpansionPanel from './VExpansionPanel'
import { VExpandTransition } from '../transitions'

// Utilities
import mixins, { ExtractVue } from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
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
    typeof Rippleable
  ]>
/* eslint-enable indent */
>(
  Bootable,
  Toggleable,
  Rippleable,
  GroupableFactory('expansionPanel', 'v-expansion-panel-content', 'v-expansion-panel')
  /* @vue/component */
).extend({
  name: 'v-expansion-panel-content',

  props: {
    activeClass: {
      type: String,
      default: 'v-expansion-panel__container--active'
    },
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

  computed: {
    containerClasses (): object {
      return {
        'v-expansion-panel__container--disabled': this.isDisabled,
        ...this.groupClasses
      }
    },
    isDisabled (): boolean {
      return this.expansionPanel.disabled || this.disabled
    },
    isReadonly (): boolean {
      return this.expansionPanel.readonly || this.readonly
    }
  },

  mounted () {
    // Can be removed once fully deprecated
    if (typeof this.value !== 'undefined') consoleWarn('v-model has been deprecated', this)
  },

  methods: {
    onKeydown (e: KeyboardEvent) {
      // Ensure element is the activeElement
      if (
        e.keyCode === 13 &&
        this.$el === document.activeElement
      ) this.toggle()
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
    genHeader () {
      const children = [...this.$slots.header]

      if (!this.hideActions) children.push(this.genIcon())

      return this.$createElement('div', {
        staticClass: 'v-expansion-panel__header',
        directives: [{
          name: 'ripple',
          value: this.ripple
        }] as any,
        on: { click: this.toggle }
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
          }] as any
        }, icon)
      ])
    },
    toggle () {
      this.isReadonly || this.$emit('change')
    }
  },

  render (h): VNode {
    const children = []

    this.$slots.header && children.push(this.genHeader())
    children.push(h(VExpandTransition, [this.genBody()]))

    return h('div', {
      staticClass: 'v-expansion-panel__container',
      class: this.containerClasses,
      attrs: {
        tabindex: this.isReadonly || this.isDisabled ? null : 0
      },
      on: { keydown: this.onKeydown }
    }, children)
  }
})
