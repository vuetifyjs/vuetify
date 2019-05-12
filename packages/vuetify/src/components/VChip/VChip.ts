// Styles
import './VChip.sass'

// Types
import { VNode } from 'vue'
import mixins from '../../util/mixins'

// Components
import { VExpandXTransition } from '../transitions'
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import { factory as GroupableFactory } from '../../mixins/groupable'
import Themeable from '../../mixins/themeable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'
import Sizeable from '../../mixins/sizeable'

// Directives
import Ripple from '../../directives/ripple'

// Utilities
import { deprecate } from '../../util/console'

// Types
import { PropValidator } from 'vue/types/options'

/* @vue/component */
export default mixins(
  Colorable,
  GroupableFactory('chipGroup'),
  Sizeable,
  Themeable,
  ToggleableFactory('inputValue')
).extend({
  name: 'v-chip',

  directives: { Ripple },

  props: {
    close: Boolean,
    closeIcon: {
      type: String,
      default: '$vuetify.icons.delete'
    },
    disabled: Boolean,
    draggable: Boolean,
    filter: Boolean,
    filterIcon: {
      type: String,
      default: '$vuetify.icons.complete'
    },
    label: Boolean,
    link: Boolean,
    outline: Boolean,
    outlined: Boolean,
    pill: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: null
    },
    // Used for selects/tagging
    selected: Boolean,
    textColor: String,
    value: null as any as PropValidator<any>
  },

  computed: {
    classes (): object {
      return {
        'v-chip--clickable': this.isClickable,
        'v-chip--disabled': this.disabled,
        'v-chip--draggable': this.draggable,
        'v-chip--label': this.label,
        'v-chip--no-color': !this.color,
        'v-chip--outlined': this.hasOutline,
        'v-chip--pill': this.pill,
        'v-chip--removable': this.hasClose,
        'v-chip--selected': !this.disabled && this.isActive,
        ...this.themeClasses,
        ...this.sizeableClasses,
        ...this.groupClasses
      }
    },
    hasClose (): boolean {
      return Boolean(
        this.close ||
        this.$listeners['click:close']
      )
    },
    hasOutline (): boolean {
      return this.outline || this.outlined
    },
    isClickable (): boolean {
      return Boolean(
        this.link ||
        this.chipGroup ||
        this.$listeners.click ||
        this.$listeners['!click'] ||
        this.$attrs.tabindex
      )
    }
  },

  methods: {
    genFilter (): VNode {
      const children = []

      if (this.isActive) {
        children.push(
          this.$createElement(VIcon, {
            staticClass: 'v-chip__filter',
            props: { left: true }
          }, this.filterIcon)
        )
      }

      return this.$createElement(VExpandXTransition, children)
    },
    genClose (): VNode {
      return this.$createElement(VIcon, {
        staticClass: 'v-chip__close',
        props: {
          right: true
        },
        on: {
          click: (e: Event) => {
            e.stopPropagation()

            this.$emit('click:close')
          }
        }
      }, this.closeIcon)
    },
    genContent (): VNode {
      return this.$createElement('span', {
        staticClass: 'v-chip__content'
      }, [
        this.filter && this.genFilter(),
        this.$slots.default,
        this.hasClose && this.genClose()
      ])
    }
  },

  created () {
    if (this.outline) deprecate('outline', 'outlined', this)
    if (this.selected) deprecate('selected', 'value', this)
  },

  render (h): VNode {
    const data = this.setBackgroundColor(this.color, {
      staticClass: 'v-chip',
      class: this.classes,
      attrs: {
        ...this.$attrs,
        draggable: this.draggable ? 'true' : undefined,
        tabindex: this.disabled ? -1 : this.$attrs.tabindex || +this.isClickable - 1
      },
      directives: [{
        name: 'ripple',
        value: this.ripple != null ? this.ripple : !this.disabled
      }],
      on: this.$listeners
    })

    const color = this.textColor || (this.hasOutline && this.color)

    if (!this.disabled && this.chipGroup) {
      this._g(data, { click: this.toggle })
    }

    return h(
      'span',
      this.setTextColor(color, data),
      [this.genContent()]
    )
  }
})
