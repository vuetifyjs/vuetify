import '../../stylus/components/_chips.styl'

// Types
import { CreateElement, VNode, VNodeChildren } from 'vue'
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
      const classes = this.addBackgroundColorClassChecks({
        'v-chip--disabled': this.disabled,
        'v-chip--selected': this.selected && !this.disabled,
        'v-chip--label': this.label,
        'v-chip--outline': this.outline,
        'v-chip--small': this.small,
        'v-chip--removable': this.close,
        'theme--light': this.light,
        'theme--dark': this.dark
      })

      return (this.textColor || this.outline)
        ? this.addTextColorClassChecks(classes, this.textColor || this.color)
        : classes
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
      const children: VNodeChildren = [this.$slots.default]

      this.close && children.push(this.genClose(h))

      return h('span', {
        staticClass: 'v-chip__content'
      }, children)
    }
  },

  render (h): VNode {
    const data = {
      staticClass: 'v-chip',
      'class': this.classes,
      attrs: { tabindex: this.disabled ? -1 : 0 },
      directives: [{
        name: 'show',
        value: this.isActive
      }] as any,
      on: this.$listeners
    }

    return h('span', data, [this.genContent(h)])
  }
})
