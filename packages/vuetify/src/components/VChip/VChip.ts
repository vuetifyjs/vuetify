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
import Routable from '../../mixins/routable'
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
  Sizeable,
  Routable,
  Themeable,
  GroupableFactory('chipGroup'),
  ToggleableFactory('inputValue')
).extend({
  name: 'v-chip',

  directives: { Ripple },

  props: {
    activeClass: {
      type: String,
      default (): string | undefined {
        if (!this.chipGroup) return ''

        return this.chipGroup.activeClass
      }
    } as any as PropValidator<string>,
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
    // Used for selects/tagging
    selected: Boolean,
    tag: {
      type: String,
      default: 'span'
    },
    textColor: String,
    value: null as any as PropValidator<any>
  },

  data: () => ({
    proxyClass: 'v-chip--active'
  }),

  computed: {
    classes (): object {
      return {
        'v-chip': true,
        ...Routable.options.computed.classes.call(this),
        'v-chip--clickable': this.isClickable,
        'v-chip--disabled': this.disabled,
        'v-chip--draggable': this.draggable,
        'v-chip--label': this.label,
        'v-chip--link': this.isClickable,
        'v-chip--no-color': !this.color,
        'v-chip--outlined': this.hasOutline,
        'v-chip--pill': this.pill,
        'v-chip--removable': this.hasClose,
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
        Routable.options.computed.isClickable.call(this) ||
        this.chipGroup
      )
    }
  },

  methods: {
    click (e: MouseEvent): void {
      this.$emit('click', e)

      this.chipGroup && this.toggle()
    },
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
    const children = [this.genContent()]
    let { tag, data } = this.generateRouteLink()

    data.attrs = {
      ...data.attrs,
      draggable: this.draggable ? 'true' : undefined,
      tabindex: this.chipGroup && !this.disabled ? 0 : data.attrs!.tabindex
    }
    data = this.setBackgroundColor(this.color, data)

    const color = this.textColor || (this.hasOutline && this.color)

    return h(tag, this.setTextColor(color, data), children)
  }
})
