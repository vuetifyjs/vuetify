// Styles
import '../../stylus/components/_buttons.styl'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import mixins, { ExtractVue } from '../../util/mixins'
import { RippleOptions } from '../../directives/ripple'

// Components
import VProgressCircular from '../VProgressCircular'

// Mixins
import Colorable from '../../mixins/colorable'
import { factory as GroupableFactory } from '../../mixins/groupable'
import Positionable from '../../mixins/positionable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'

// Utilities
import { getObjectValueByPath } from '../../util/helpers'

const baseMixins = mixins(
  Colorable,
  Routable,
  Positionable,
  Themeable,
  GroupableFactory('btnToggle'),
  ToggleableFactory('inputValue')
  /* @vue/component */
)
interface options extends ExtractVue<typeof baseMixins> {
  $el: HTMLElement
}

export default baseMixins.extend<options>().extend({
  name: 'v-btn',

  props: {
    activeClass: {
      type: String,
      default: 'v-btn--active'
    },
    block: Boolean,
    depressed: Boolean,
    fab: Boolean,
    flat: Boolean,
    icon: Boolean,
    large: Boolean,
    loading: Boolean,
    outline: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: null
    },
    round: Boolean,
    small: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    },
    value: null as any as PropValidator<any>
  },

  computed: {
    classes (): any {
      return {
        'v-btn': true,
        [this.activeClass]: this.isActive,
        'v-btn--absolute': this.absolute,
        'v-btn--block': this.block,
        'v-btn--bottom': this.bottom,
        'v-btn--disabled': this.disabled,
        'v-btn--flat': this.flat,
        'v-btn--floating': this.fab,
        'v-btn--fixed': this.fixed,
        'v-btn--icon': this.icon,
        'v-btn--large': this.large,
        'v-btn--left': this.left,
        'v-btn--loader': this.loading,
        'v-btn--outline': this.outline,
        'v-btn--depressed': (this.depressed && !this.flat) || this.outline,
        'v-btn--right': this.right,
        'v-btn--round': this.round,
        'v-btn--router': this.to,
        'v-btn--small': this.small,
        'v-btn--top': this.top,
        ...this.themeClasses
      }
    },
    computedRipple (): RippleOptions | boolean {
      const defaultRipple = this.icon || this.fab ? { circle: true } : true
      if (this.disabled) return false
      else return this.ripple !== null ? this.ripple : defaultRipple
    }
  },

  watch: {
    '$route': 'onRouteChange'
  },

  methods: {
    // Prevent focus to match md spec
    click (e: MouseEvent): void {
      !this.fab &&
      e.detail &&
      this.$el.blur()

      this.$emit('click', e)

      this.btnToggle && this.toggle()
    },
    genContent (): VNode {
      return this.$createElement(
        'div',
        { 'class': 'v-btn__content' },
        this.$slots.default
      )
    },
    genLoader (): VNode {
      return this.$createElement('span', {
        class: 'v-btn__loading'
      }, this.$slots.loader || [this.$createElement(VProgressCircular, {
        props: {
          indeterminate: true,
          size: 23,
          width: 2
        }
      })])
    },
    onRouteChange () {
      if (!this.to || !this.$refs.link) return

      const path = `_vnode.data.class.${this.activeClass}`

      this.$nextTick(() => {
        if (getObjectValueByPath(this.$refs.link, path)) {
          this.toggle()
        }
      })
    }
  },

  render (h): VNode {
    const setColor = (!this.outline && !this.flat && !this.disabled) ? this.setBackgroundColor : this.setTextColor
    const { tag, data } = this.generateRouteLink(this.classes)
    const children = [
      this.genContent(),
      this.loading && this.genLoader()
    ]

    if (tag === 'button') data.attrs!.type = this.type

    data.attrs!.value = ['string', 'number'].includes(typeof this.value)
      ? this.value
      : JSON.stringify(this.value)

    if (this.btnToggle) {
      data.ref = 'link'
    }

    return h(tag, setColor(this.color, data), children)
  }
})
