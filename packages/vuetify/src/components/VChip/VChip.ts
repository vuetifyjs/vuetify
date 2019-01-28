// STyles
import './VChip.sass'

// Types
import { VNode } from 'vue'
import mixins from '../../util/mixins'

// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import { factory as GroupableFactory } from '../../mixins/groupable'
import Themeable from '../../mixins/themeable'
import Toggleable from '../../mixins/toggleable'
import Sizeable from '../../mixins/sizeable'

// Directives
import Ripple from '../../directives/ripple'

// Utilities
import { deprecate } from '../../util/console'

/* @vue/component */
export default mixins(
  Colorable,
  GroupableFactory('chipGroup'),
  Sizeable,
  Themeable,
  Toggleable
).extend({
  name: 'v-chip',

  directives: { Ripple },

  props: {
    close: Boolean,
    disabled: Boolean,
    draggable: Boolean,
    filter: Boolean,
    label: Boolean,
    outline: Boolean,
    outlined: Boolean,
    pill: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: null
    },
    // Used for selects/tagging
    selected: Boolean,
    textColor: String
  },

  computed: {
    classes (): object {
      return {
        'v-chip--disabled': this.disabled,
        'v-chip--draggable': this.draggable,
        'v-chip--pill': this.pill,
        'v-chip--selected': !this.disabled && this.isActive,
        'v-chip--label': this.label,
        'v-chip--outlined': this.hasOutline,
        'v-chip--removable': this.close,
        'v-chip--clickable': Boolean(
          this.chipGroup ||
          this.$listeners.click ||
          this.$listeners['!click']
        ),
        ...this.themeClasses,
        ...this.sizeableClasses,
        ...this.groupClasses
      }
    },
    hasOutline (): boolean {
      return this.outline || this.outlined
    }
  },

  methods: {
    genFilter (): VNode {
      return this.$createElement(VIcon, {
        staticClass: 'v-chip__filter',
        props: { left: true }
      }, '$vuetify.icons.complete')
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
      }, '$vuetify.icons.delete')
    },
    genContent (): VNode {
      return this.$createElement('span', {
        staticClass: 'v-chip__content'
      }, [
        this.filter && this.isActive && this.genFilter(),
        this.$slots.default,
        this.close && this.genClose()
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
        draggable: this.draggable ? 'true' : undefined,
        tabindex: this.disabled ? -1 : this.$attrs.tabindex
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
