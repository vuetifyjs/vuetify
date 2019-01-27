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

// Utiles
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
    textColor: String,
    value: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes (): object {
      return {
        'v-chip--disabled': this.disabled,
        'v-chip--draggable': this.draggable,
        'v-chip--pill': this.pill,
        'v-chip--selected': this.selected && !this.disabled,
        'v-chip--label': this.label,
        'v-chip--outlined': this.hasOutline,
        'v-chip--removable': this.close,
        'v-chip--clickable': this.$listeners.click || this.$listeners['!click'],
        ...this.themeClasses,
        ...this.sizeableClasses
      }
    },
    hasOutline (): boolean {
      return this.outline || this.outlined
    }
  },

  methods: {
    genClose (): VNode {
      return this.$createElement(VIcon, {
        staticClass: 'v-chip__close',
        props: {
          right: true
        },
        on: {
          click: (e: Event) => {
            e.stopPropagation()

            this.isActive = false
          }
        }
      }, '$vuetify.icons.delete')
    },
    genContent (): VNode {
      return this.$createElement('span', {
        staticClass: 'v-chip__content'
      }, [
        this.$slots.default,
        this.close && this.genClose()
      ])
    }
  },

  created () {
    if (this.outline) deprecate('outline', 'outlined', this)
  },

  render (h): VNode {
    const data = this.setBackgroundColor(this.color, {
      staticClass: 'v-chip',
      class: this.classes,
      attrs: {
        draggable: this.draggable ? 'true' : undefined,
        tabindex: this.disabled ? -1 : (this.$attrs.tabindex || 0)
      },
      directives: [
        {
          name: 'show',
          value: this.isActive
        },
        {
          name: 'ripple',
          value: this.ripple != null ? this.ripple : !this.disabled
        }
      ],
      on: this.$listeners
    })

    const color = this.textColor || (this.hasOutline && this.color)

    return h(
      'span',
      this.setTextColor(color, data),
      [this.genContent()]
    )
  }
})
