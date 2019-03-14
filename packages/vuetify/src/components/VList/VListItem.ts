// Styles
import './VListItem.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import { factory as GroupableFactory } from '../../mixins/groupable'
import Themeable from '../../mixins/themeable'

// Directives
import Ripple, { RippleOptions } from '../../directives/ripple'

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
  GroupableFactory('listItemGroup'),
  Routable,
  Themeable
)

interface options extends ExtractVue<typeof baseMixins> {
  $el: HTMLElement
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-list-item',

  directives: {
    Ripple
  },

  inheritAttrs: false,

  props: {
    activeClass: {
      type: String,
      default (): string | undefined {
        if (!this.listItemGroup) return 'primary--text'

        return this.listItemGroup.activeClass
      }
    } as any as PropValidator<string>,
    dense: Boolean,
    inactive: Boolean,
    link: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: null
    },
    threeLine: Boolean,
    twoLine: Boolean,
    value: { default: null }
  },

  data: () => ({
    proxyClass: 'v-list-item--active'
  }),

  computed: {
    classes (): object {
      return {
        'v-list-item': true,
        'v-list-item--active': this.isActive,
        'v-list-item--dense': this.dense,
        'v-list-item--disabled': this.disabled,
        'v-list-item--link': this.isLink && !this.inactive,
        'v-list-item--three-line': this.threeLine,
        'v-list-item--two-line': this.twoLine,
        ...this.themeClasses,
        [this.activeClass]: this.isActive
      }
    },
    computedRipple (): RippleOptions | boolean {
      if (this.disabled) return false
      return this.ripple !== null ? this.ripple : this.isLink
    },
    isLink (): boolean {
      const hasClick = this.$listeners && (this.$listeners.click || this.$listeners['!click'])

      return Boolean(
        this.href ||
        this.to ||
        this.listItemGroup ||
        this.link ||
        hasClick
      )
    }
  },

  created () {
    /* istanbul ignore next */
    if ('avatar' in this.$attrs) {
      removed('avatar')
    }
  },

  methods: {
    click (e: MouseEvent | KeyboardEvent) {
      if (e.detail) this.$el.blur()

      this.$emit('click', e)

      this.to || this.toggle()
    }
  },

  render (h): VNode {
    const isRouteLink = !this.inactive && this.isLink
    const { tag, data } = isRouteLink ? this.generateRouteLink(this.classes) : {
      tag: this.tag || 'div',
      data: {
        class: this.classes
      }
    }

    data.attrs = {
      ...data.attrs,
      'aria-selected': String(this.isActive),
      role: 'listitem',
      tabindex: tag === 'a' ? 0 : -1
    }
    data.on = {
      ...data.on,
      click: this.click,
      keydown: (e: KeyboardEvent) => {
        /* istanbul ignore else */
        if (e.keyCode === keyCodes.enter) this.click(e)

        this.$emit('keydown', e)
      }
    }
    data.ref = 'link'

    const children = this.$scopedSlots.default
      ? this.$scopedSlots.default({
        active: this.isActive,
        toggle: this.toggle
      })
      : this.$slots.default

    return h(tag, this.setBackgroundColor(this.color, data), children)
  }
})
