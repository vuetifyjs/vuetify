import { cloneVNode } from 'vue';
// Styles
import './VListItem.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import { factory as GroupableFactory } from '../../mixins/groupable'
import Themeable from '../../mixins/themeable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'

// Utilities
import { defineComponent, h, withDirectives } from 'vue'
import { keyCodes } from './../../util/helpers'
import { removed } from '../../util/console'

// Types
import type { Prop } from 'vue'

// interface options extends ExtractVue<typeof baseMixins> {
//   $el: HTMLElement
//   isInGroup: boolean
//   isInList: boolean
//   isInMenu: boolean
//   isInNav: boolean
// }

export default defineComponent({
  name: 'v-list-item',

  mixins: [
    Colorable,
    Routable,
    Themeable,
    GroupableFactory('listItemGroup'),
    ToggleableFactory('inputValue'),
  ],

  inject: {
    isInGroup: {
      default: false,
    },
    isInList: {
      default: false,
    },
    isInMenu: {
      default: false,
    },
    isInNav: {
      default: false,
    },
  },

  inheritAttrs: false,

  props: {
    activeClass: {
      type: String,
      default (): string | undefined {
        if (!this.listItemGroup) return ''

        return this.listItemGroup.activeClass
      },
    } as any as Prop<string>,
    dense: Boolean,
    inactive: Boolean,
    link: Boolean,
    selectable: {
      type: Boolean,
    },
    tag: {
      type: String,
      default: 'div',
    },
    threeLine: Boolean,
    twoLine: Boolean,
    value: null as any as Prop<any>,
  },

  data: () => ({
    proxyClass: 'v-list-item--active',
  }),

  computed: {
    classes (): object {
      return {
        'v-list-item': true,
        ...Routable.computed!.classes.call(this),
        'v-list-item--dense': this.dense,
        'v-list-item--disabled': this.disabled,
        'v-list-item--link': this.isClickable && !this.inactive,
        'v-list-item--selectable': this.selectable,
        'v-list-item--three-line': this.threeLine,
        'v-list-item--two-line': this.twoLine,
        ...this.themeClasses,
      }
    },
    isClickable (): boolean {
      return Boolean(
        Routable.computed!.isClickable.call(this) ||
        this.listItemGroup
      )
    },
  },

  created () {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('avatar')) {
      removed('avatar', this)
    }
  },

  methods: {
    click (e: MouseEvent | KeyboardEvent) {
      if (e.detail) this.$el.blur()

      this.$emit('click', e)

      this.to || this.toggle()
    },
    genAttrs () {
      const attrs: Record<string, any> = {
        'aria-disabled': this.disabled ? true : undefined,
        tabindex: this.isClickable && !this.disabled ? 0 : -1,
      }

      if (this.$attrs.hasOwnProperty('role')) {
        // do nothing, role already provided
      } else if (this.isInNav) {
        // do nothing, role is inherit
      } else if (this.isInGroup) {
        attrs.role = 'listitem'
        attrs['aria-selected'] = String(this.isActive)
      } else if (this.isInMenu) {
        attrs.role = this.isClickable ? 'menuitem' : undefined
        attrs.id = attrs.id || `list-item-${this._uid}`
      } else if (this.isInList) {
        attrs.role = 'listitem'
      }

      return attrs
    },
  },

  render () {
    const vnode = this.generateRouteLink(
      this.$slots.default?.({
        active: this.isActive,
        toggle: this.toggle,
      })
    )
    const data: Dictionary = {
      ...this.genAttrs(),
      onKeydown: (e: KeyboardEvent) => {
        /* istanbul ignore else */
        if (e.keyCode === keyCodes.enter) this.click(e)

        this.$emit('keydown', e)
      },
    }

    if (this.inactive) vnode.type = 'div'

    return cloneVNode(vnode, this.setTextColor(this.color, data))
  },
})
