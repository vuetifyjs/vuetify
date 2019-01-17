import './VChip.sass'

// Types
import { VNode } from 'vue'
import mixins from '../../util/mixins'

// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import Toggleable from '../../mixins/toggleable'
import Sizeable from '../../mixins/sizeable'

// Directives
import Ripple from '../../directives/ripple'

/* @vue/component */
export default mixins(
  Colorable,
  Sizeable,
  Themeable,
  Toggleable
).extend({
  name: 'v-chip',

  directives: { Ripple },

  props: {
    close: Boolean,
    disabled: Boolean,
    label: Boolean,
    outline: Boolean,
    ripple: [Object, Boolean],
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
        'v-chip--selected': this.selected && !this.disabled,
        'v-chip--label': this.label,
        'v-chip--outline': this.outline,
        'v-chip--removable': this.close,
        ...this.themeClasses,
        ...this.sizeableClasses
      }
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

            this.$emit('input', false)
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

  render (h): VNode {
    const data = this.setBackgroundColor(this.color, {
      staticClass: 'v-chip',
      class: this.classes,
      attrs: { tabindex: this.disabled ? -1 : 0 },
      directives: [
        {
          name: 'show',
          value: this.isActive
        },
        {
          name: 'ripple',
          value: this.ripple || !this.disabled
        }
      ],
      on: this.$listeners
    })

    const color = this.textColor || (this.outline && this.color)

    return h(
      'span',
      this.setTextColor(color, data),
      [this.genContent()]
    )
  }
})
