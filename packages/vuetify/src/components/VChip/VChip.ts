import '../../stylus/components/_chips.styl'

// Types
import { CreateElement, VNode } from 'vue'
import mixins from '../../util/mixins'

// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import Toggleable from '../../mixins/toggleable'

/* @vue/component */
export default mixins(Colorable, Themeable, Toggleable).extend({
  name: 'v-chip',

  props: {
    close: Boolean,
    disabled: Boolean,
    label: Boolean,
    outline: Boolean,
    // Used for selects/tagging
    selected: Boolean,
    small: Boolean,
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
        'v-chip--small': this.small,
        'v-chip--removable': this.close,
        ...this.themeClasses
      }
    }
  },

  methods: {
    genClose (h: CreateElement): VNode {
      const data = {
        staticClass: 'v-chip__close',
        on: {
          click: (e: Event) => {
            e.stopPropagation()

            this.$emit('input', false)
          }
        }
      }

      return h('div', data, [
        h(VIcon, '$vuetify.icons.delete')
      ])
    },
    genContent (h: CreateElement): VNode {
      return h('span', {
        staticClass: 'v-chip__content'
      }, [
        this.$slots.default,
        this.close && this.genClose(h)
      ])
    }
  },

  render (h): VNode {
    const data = this.setBackgroundColor(this.color, {
      staticClass: 'v-chip',
      'class': this.classes,
      attrs: { tabindex: this.disabled ? -1 : 0 },
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    })

    const color = this.textColor || (this.outline && this.color)
    return h('span', this.setTextColor(color, data), [this.genContent(h)])
  }
})
