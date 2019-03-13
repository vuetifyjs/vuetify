// Components
import VExpansionPanel from './VExpansionPanel'
import { VExpandTransition } from '../transitions'
import VIcon from '../VIcon'

// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import Bootable from '../../mixins/bootable'
import Rippleable from '../../mixins/rippleable'

// Utilities
import { keyCodes } from '../../util/helpers'
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import { VNode } from 'vue'

const baseMixins = mixins(
  Bootable,
  GroupableFactory('expansionPanel'),
  Rippleable
)

interface options extends ExtractVue<typeof baseMixins> {
  $refs: {
    header: HTMLElement
  }
  expansionPanel: InstanceType<typeof VExpansionPanel>
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-expansion-panel-item',

  props: {
    disabled: Boolean,
    readonly: Boolean,
    expandIcon: {
      type: String,
      default: '$vuetify.icons.expand'
    },
    hideActions: Boolean,
    disableIconRotate: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: false
    }
  },

  data: () => ({
    height: 'auto',
    hasMousedown: false
  }),

  computed: {
    classes (): object {
      return {
        'v-expansion-panel-item--active': this.isActive,
        'v-expansion-panel-item--disabled': this.isDisabled,
        'v-expansion-panel-item--has-mousedown': this.hasMousedown,
        'v-expansion-panel-item--disable-item-rotate': this.disableIconRotate,
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

  methods: {
    onKeydown (e: KeyboardEvent) {
      // Ensure element is the activeElement
      if (
        e.keyCode === keyCodes.enter &&
        this.$refs.header === document.activeElement
      ) this.click(e)
    },
    click (e: MouseEvent | KeyboardEvent) {
      if (e.detail) this.$refs.header.blur()

      this.$emit('click', e)

      this.isReadonly || this.toggle()
    },
    genBody () {
      return this.$createElement('div', {
        class: 'v-expansion-panel-item__body',
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
        staticClass: 'v-expansion-panel-item__header',
        attrs: {
          tabindex: this.isReadonly || this.isDisabled ? null : 0
        },
        directives: [{
          name: 'ripple',
          value: this.ripple
        }],
        on: {
          click: this.click,
          keydown: this.onKeydown,
          mousedown: this.onMousedown,
          mouseup: this.onMouseup
        },
        ref: 'header'
      }, children)
    },
    genIcon () {
      const icon = this.$slots.actions ||
        [this.$createElement(VIcon, this.expandIcon)]

      return this.$createElement('transition', {
        attrs: { name: 'fade-transition' }
      }, [
        this.$createElement('div', {
          staticClass: 'v-expansion-panel-item__header__icon',
          directives: [{
            name: 'show',
            value: !this.isDisabled
          }]
        }, icon)
      ])
    },
    onMousedown (e: Event) {
      this.hasMousedown = true
      this.$emit('mousedown', e)
    },
    onMouseup (e: Event) {
      this.hasMousedown = false
      this.$emit('mouseup', e)
    },
    toggle () {
      this.isBooted = true

      this.$nextTick(() => this.$emit('change'))
    }
  },

  render (h): VNode {
    return h('li', {
      staticClass: 'v-expansion-panel-item',
      class: this.classes,
      attrs: {
        'aria-expanded': String(!!this.isActive)
      }
    }, [
      this.$slots.header && this.genHeader(),
      h(VExpandTransition, [this.genBody()])
    ])
  }
})
