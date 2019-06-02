// Styles
import './VListItem.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import { factory as GroupableFactory } from '../../mixins/groupable'
import Themeable from '../../mixins/themeable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'

// Directives
import Ripple from '../../directives/ripple'

// Utilities
import { keyCodes } from './../../util/helpers'
import { ExtractVue } from './../../util/mixins'

// Types
import mixins from '../../util/mixins'
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { removed } from '../../util/console'

const baseMixins = mixins(
  Colorable,
  Routable,
  Themeable,
  GroupableFactory('listItemGroup'),
  ToggleableFactory('inputValue')
)

interface options extends ExtractVue<typeof baseMixins> {
  $el: HTMLElement
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-list-item',

  directives: {
    Ripple,
  },

  inheritAttrs: false,

  props: {
    activeClass: {
      type: String,
      default (): string | undefined {
        if (!this.listItemGroup) return ''

        return this.listItemGroup.activeClass
      },
    } as any as PropValidator<string>,
    dense: Boolean,
    inactive: Boolean,
    link: Boolean,
    tag: {
      type: String,
      default: 'div',
    },
    threeLine: Boolean,
    twoLine: Boolean,
    value: null as any as PropValidator<any>,
  },

  data: () => ({
    proxyClass: 'v-list-item--active',
  }),

  computed: {
    classes (): object {
      return {
        'v-list-item': true,
        ...Routable.options.computed.classes.call(this),
        'v-list-item--dense': this.dense,
        'v-list-item--disabled': this.disabled,
        'v-list-item--link': this.isClickable && !this.inactive,
        'v-list-item--three-line': this.threeLine,
        'v-list-item--two-line': this.twoLine,
        ...this.themeClasses,
      }
    },
    isClickable (): boolean {
      return Boolean(
        Routable.options.computed.isClickable.call(this) ||
        this.listItemGroup
      )
    },
  },

  created () {
    /* istanbul ignore next */
    if ('avatar' in this.$attrs) {
      removed('avatar', this)
    }
  },

  methods: {
    click (e: MouseEvent | KeyboardEvent) {
      if (e.detail) this.$el.blur()

      this.$emit('click', e)

      this.to || this.toggle()
    },
  },

  render (h): VNode {
    let { tag, data } = this.generateRouteLink()

    data.attrs = {
      ...data.attrs,
      'aria-selected': String(this.isActive),
      role: 'listitem',
      tabindex: tag === 'a' && this.isClickable ? 0 : -1,
    }
    data.on = {
      ...data.on,
      click: this.click,
      keydown: (e: KeyboardEvent) => {
        /* istanbul ignore else */
        if (e.keyCode === keyCodes.enter) this.click(e)

        this.$emit('keydown', e)
      },
    }

    const children = this.$scopedSlots.default
      ? this.$scopedSlots.default({
        active: this.isActive,
        toggle: this.toggle,
      })
      : this.$slots.default

    tag = this.inactive ? 'div' : tag

    return h(tag, this.setTextColor(this.color, data), children)
  },
})
